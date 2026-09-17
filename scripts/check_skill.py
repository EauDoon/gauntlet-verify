"""Structural checks for the skills in this repo.

Checks every .claude/skills/*/SKILL.md for frontmatter that a YAML loader
accepts and that meets the Agent Skills field rules, and every Markdown and
HTML file for em or en dashes and for relative links that do not resolve
inside the repo. Exits 1 on any failure. Needs PyYAML.
"""

import re
import sys
from pathlib import Path
from urllib.parse import unquote

import yaml

ROOT = Path(__file__).resolve().parent.parent
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
MAX_NAME = 64
MAX_DESCRIPTION = 1024
EM, EN = chr(0x2014), chr(0x2013)
DASHES = {
    EM: "em dash", EN: "en dash",
    "&mdash;": "em dash", "&ndash;": "en dash",
    "&#8212;": "em dash", "&#8211;": "en dash",
}
FENCE_RE = re.compile(r"^(`{3,}|~{3,}).*?^\1[^\n]*$", re.M | re.S)
INLINE_CODE_RE = re.compile(r"`[^`\n]+`")
LINK_RES = [
    # [text](target) and [text](<target> "title")
    re.compile(r"\]\(\s*<([^>]+)>[^)]*\)|\]\(\s*([^)\s]+)(?:\s+[\"'(][^)]*)?\s*\)"),
    # [ref]: target
    re.compile(r"^\s{0,3}\[[^\]]+\]:\s*<?([^\s>]+)>?", re.M),
    # <img src="..."> and <a href="...">
    re.compile(r"<(?:img|a)\b[^>]*?\s(?:src|href)\s*=\s*[\"']([^\"']+)[\"']", re.I),
]
EXTERNAL_RE = re.compile(r"^(?:[A-Za-z][A-Za-z0-9+.-]+:|//)")


def check_skills(errors):
    skills = sorted((ROOT / ".claude" / "skills").glob("*/SKILL.md"))
    if not skills:
        errors.append("no .claude/skills/*/SKILL.md found")
    for path in skills:
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        match = re.match(r"---\r?\n(.*?)\r?\n---\r?\n", text, re.S)
        if not match:
            errors.append(f"{rel}: missing frontmatter")
            continue
        try:
            fields = yaml.safe_load(match.group(1))
        except yaml.YAMLError as exc:
            errors.append(f"{rel}: frontmatter is not valid YAML: {exc}")
            continue
        if not isinstance(fields, dict):
            errors.append(f"{rel}: frontmatter is not a mapping")
            continue
        name = fields.get("name")
        description = fields.get("description")
        if not isinstance(name, str) or not isinstance(description, str):
            errors.append(f"{rel}: name and description must both be strings")
            continue
        if name != path.parent.name:
            errors.append(f"{rel}: name '{name}' does not match folder '{path.parent.name}'")
        if not NAME_RE.match(name) or len(name) > MAX_NAME:
            errors.append(f"{rel}: name must be lowercase words joined by hyphens, at most {MAX_NAME} characters")
        if re.search(r"anthropic|claude", name):
            errors.append(f"{rel}: name contains a reserved word")
        if not description.strip():
            errors.append(f"{rel}: description is empty")
        if len(description) > MAX_DESCRIPTION:
            errors.append(f"{rel}: description is {len(description)} characters, limit {MAX_DESCRIPTION}")
        if re.search(r"<[^>]+>", description):
            errors.append(f"{rel}: description contains an XML tag")
        print(f"{rel}: name={name}, description={len(description)} characters")


def check_text(errors):
    files = [p for p in ROOT.rglob("*") if p.suffix in (".md", ".html") and p.is_file()]
    for path in sorted(files):
        if ".git" in path.relative_to(ROOT).parts:
            continue
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        for lineno, line in enumerate(text.splitlines(), 1):
            for dash, label in DASHES.items():
                if dash in line:
                    errors.append(f"{rel}:{lineno}: {label}")
        prose = INLINE_CODE_RE.sub("", FENCE_RE.sub("", text))
        for pattern in LINK_RES:
            for match in pattern.finditer(prose):
                target = next(group for group in match.groups() if group)
                if EXTERNAL_RE.match(target) or target.startswith("#"):
                    continue
                target = unquote(target.split("#")[0].split("?")[0])
                base = ROOT if target.startswith("/") else path.parent
                resolved = (base / target.lstrip("/")).resolve()
                if not resolved.is_relative_to(ROOT) or not resolved.exists():
                    errors.append(f"{rel}: broken relative link '{target}'")


def main():
    errors = []
    check_skills(errors)
    check_text(errors)
    for error in errors:
        print(f"FAIL {error}")
    print("PASS" if not errors else f"{len(errors)} failure(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
