#!/usr/bin/env node
// Run every case in evals/cases/*.json against the skill definition.
// Each case describes a scenario and the SKILL.md phrases it requires.
// Exit 0 if every case passes, non-zero otherwise.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = resolve(fileURLToPath(new URL(".", import.meta.url)));
const REPO = resolve(HERE, "..");
const SKILL_PATH = join(REPO, ".claude", "skills", "gauntlet-verify", "SKILL.md");
const CASES_DIR = join(REPO, "evals", "cases");
const CHECK_SCRIPT = join(REPO, "scripts", "check_skill.py");

function descriptionFromFrontmatter(front) {
  const python = resolvePython();
  const program = [
    "import sys, yaml",
    "data = yaml.safe_load(sys.stdin.read())",
    "desc = data.get('description') if isinstance(data, dict) else None",
    "if not isinstance(desc, str):",
    "    sys.exit(2)",
    "sys.stdout.write(desc)",
  ].join("\n");
  const r = spawnSync(python, ["-c", program], { input: front, encoding: "utf8" });
  if (r.status !== 0) {
    throw new Error(
      `description YAML parse failed (exit ${r.status}): ${(r.stderr || "").trim()}`,
    );
  }
  return r.stdout;
}

function loadSkill() {
  const text = readFileSync(SKILL_PATH, "utf8");
  const m = /^---\r?\n(.*?)\r?\n---\r?\n/s.exec(text);
  if (!m) throw new Error("SKILL.md frontmatter not found");
  const description = descriptionFromFrontmatter(m[1]);
  const body = text.slice(m[0].length);
  return { description: description.toLowerCase(), body: body.toLowerCase() };
}

function caseFiles() {
  return readdirSync(CASES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => join(CASES_DIR, f));
}

function loadCase(path) {
  let raw = readFileSync(path, "utf8");
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const data = JSON.parse(raw);
  for (const key of ["id", "kind", "checks"]) {
    if (data[key] === undefined) {
      throw new Error(`case ${path} missing required field ${key}`);
    }
  }
  return data;
}

function normalize(s) {
  return s.toLowerCase();
}

function headingPattern(heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^#{2,}\\s+${escaped}\\s*$`, "im");
}

// GitHub's setup-python provides `python`. A typical Ubuntu image provides
// only `python3`. Either name is fine when it can import PyYAML.
function resolvePython() {
  for (const bin of ["python3", "python"]) {
    const probe = spawnSync(bin, ["-c", "import yaml"], { encoding: "utf8" });
    if (probe.status === 0) return bin;
  }
  return "python3";
}

const checks = {
  skill_description_contains({ phrases }, skill) {
    const missing = phrases.filter((p) => !skill.description.includes(normalize(p)));
    return missing.length
      ? { ok: false, detail: `description missing: ${missing.join(" | ")}` }
      : { ok: true };
  },
  skill_contains_all({ phrases }, skill) {
    const missing = phrases.filter((p) => !skill.body.includes(normalize(p)));
    return missing.length
      ? { ok: false, detail: `SKILL.md missing: ${missing.join(" | ")}` }
      : { ok: true };
  },
  skill_has_section({ heading }, skill) {
    // Match a markdown heading (## or deeper) with the given text.
    const re = headingPattern(heading);
    return re.test(skill.body)
      ? { ok: true }
      : { ok: false, detail: `section not found: ${heading}` };
  },
  skill_structure_passes() {
    // Delegate to scripts/check_skill.py for the structural check.
    const python = resolvePython();
    const r = spawnSync(python, [CHECK_SCRIPT], { cwd: REPO, encoding: "utf8" });
    if (r.status !== 0) {
      return { ok: false, detail: `check_skill.py exit ${r.status}: ${(r.stdout || r.stderr || "").trim().split(/\r?\n/).slice(-3).join(" | ")}` };
    }
    return { ok: true };
  },
};

function runCase(caseObj, skill) {
  const results = [];
  for (const check of caseObj.checks) {
    const fn = checks[check.type];
    if (!fn) return [{ ok: false, detail: `unknown check type: ${check.type}` }];
    try {
      results.push(fn(check, skill));
    } catch (err) {
      results.push({ ok: false, detail: `${check.type} threw: ${err.message}` });
    }
  }
  return results;
}

function main() {
  // Baseline: skill structure must pass (delegates to existing check_skill.py).
  const structCheck = checks.skill_structure_passes();
  console.log(`${structCheck.ok ? "PASS" : "FAIL"} Z0 skill-structure scripts/check_skill.py`);
  if (!structCheck.ok) {
    console.log(`      ${structCheck.detail}`);
  }

  const skill = loadSkill();
  const cases = caseFiles().map(loadCase);
  let pass = structCheck.ok ? 1 : 0;
  let fail = structCheck.ok ? 0 : 1;

  for (const caseObj of cases) {
    const results = runCase(caseObj, skill);
    const allOk = results.every((r) => r.ok);
    const firstFail = results.find((r) => !r.ok);
    if (allOk) {
      pass += 1;
      console.log(`PASS ${caseObj.id} ${caseObj.kind} ${truncate(caseObj.prompt ?? caseObj.context ?? "", 60)}`);
    } else {
      fail += 1;
      console.log(`FAIL ${caseObj.id} ${caseObj.kind} ${truncate(caseObj.prompt ?? caseObj.context ?? "", 60)}`);
      console.log(`      ${firstFail.detail}`);
    }
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

function truncate(s, n) {
  return s.length > n ? s.slice(0, n - 1) + "\u2026" : s;
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  return resolve(entry) === fileURLToPath(import.meta.url);
}

export { resolvePython, checks, descriptionFromFrontmatter, headingPattern };

if (isDirectRun()) main();
