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

// The skill's own "## Eval" section restates each pass condition. A phrase
// check that read it would still pass after the instruction it stands for was
// deleted, so phrase checks read the instructions without that section.
function withoutEvalSection(body) {
  return body.replace(/^##[ \t]+eval[ \t]*$[\s\S]*?(?=^#{1,2}[ \t]|(?![\s\S]))/im, "");
}

// body: the instructions that phrase checks read. text: the whole body, for
// section checks.
function skillFromText(text) {
  const m = /^---\r?\n(.*?)\r?\n---\r?\n/s.exec(text);
  if (!m) throw new Error("SKILL.md frontmatter not found");
  const description = descriptionFromFrontmatter(m[1]);
  const body = text.slice(m[0].length);
  return {
    description: description.toLowerCase(),
    body: withoutEvalSection(body).toLowerCase(),
    text: body.toLowerCase(),
  };
}

function loadSkill() {
  return skillFromText(readFileSync(SKILL_PATH, "utf8"));
}

function caseFiles(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => join(dir, f));
}

const CASE_KINDS = new Set(["behavior", "trigger"]);
const PHRASE_CHECKS = new Set(["skill_description_contains", "skill_contains_all"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// A case that checks nothing must not report PASS. Return every reason the
// case cannot be run as written; an empty list means it is well formed.
function validateCase(data) {
  if (!isObject(data)) return ["case is not a JSON object"];
  const problems = [];
  if (typeof data.id !== "string" || !data.id.trim()) {
    problems.push("id must be a non-empty string");
  }
  if (!CASE_KINDS.has(data.kind)) {
    problems.push(`kind must be behavior or trigger, got ${JSON.stringify(data.kind)}`);
  }
  if (!Array.isArray(data.checks) || data.checks.length === 0) {
    problems.push("checks must be a non-empty array");
    return problems;
  }
  data.checks.forEach((check, i) => {
    const at = `checks[${i}]`;
    if (!isObject(check)) {
      problems.push(`${at} is not an object`);
      return;
    }
    if (typeof check.type !== "string" || !Object.hasOwn(checks, check.type)) {
      problems.push(`${at} has unknown type ${JSON.stringify(check.type)}`);
      return;
    }
    if (PHRASE_CHECKS.has(check.type)) {
      if (!Array.isArray(check.phrases) || check.phrases.length === 0) {
        problems.push(`${at} phrases must be a non-empty array`);
      } else if (check.phrases.some((p) => typeof p !== "string" || !p.trim())) {
        problems.push(`${at} phrases must all be non-empty strings`);
      }
    }
    if (check.type === "skill_has_section" && (typeof check.heading !== "string" || !check.heading.trim())) {
      problems.push(`${at} heading must be a non-empty string`);
    }
  });
  return problems;
}

// Read one case file. A file that cannot be parsed or validated comes back
// with its problems, so it fails on its own and the other cases still run.
function readCase(path) {
  const file = relative(REPO, path);
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch (err) {
    return { file, data: null, problems: [`unreadable: ${err.message}`] };
  }
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    return { file, data: null, problems: [`invalid JSON: ${err.message}`] };
  }
  return { file, data, problems: validateCase(data) };
}

function loadCases(dir = CASES_DIR) {
  const entries = caseFiles(dir).map(readCase);
  const seen = new Map();
  for (const entry of entries) {
    if (entry.problems.length) continue;
    const prior = seen.get(entry.data.id);
    if (prior) entry.problems.push(`duplicate id ${entry.data.id}, also in ${prior}`);
    else seen.set(entry.data.id, entry.file);
  }
  return entries;
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
    return re.test(skill.text)
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
    const fn = Object.hasOwn(checks, check.type) ? checks[check.type] : undefined;
    if (!fn) return [{ ok: false, detail: `unknown check type: ${check.type}` }];
    try {
      results.push(fn(check, skill));
    } catch (err) {
      results.push({ ok: false, detail: `${check.type} threw: ${err.message}` });
    }
  }
  return results;
}

function main(casesDir = CASES_DIR) {
  // Baseline: skill structure must pass (delegates to existing check_skill.py).
  const structCheck = checks.skill_structure_passes();
  console.log(`${structCheck.ok ? "PASS" : "FAIL"} Z0 skill-structure scripts/check_skill.py`);
  if (!structCheck.ok) {
    console.log(`      ${structCheck.detail}`);
  }

  const skill = loadSkill();
  const cases = loadCases(casesDir);
  let pass = structCheck.ok ? 1 : 0;
  let fail = structCheck.ok ? 0 : 1;

  for (const { file, data, problems } of cases) {
    if (problems.length) {
      fail += 1;
      const label = isObject(data) && typeof data.id === "string" && data.id.trim() ? data.id : file;
      console.log(`FAIL ${label} invalid ${file}`);
      console.log(`      ${problems.join("; ")}`);
      continue;
    }
    const caseObj = data;
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

export {
  resolvePython,
  checks,
  descriptionFromFrontmatter,
  headingPattern,
  validateCase,
  loadCases,
  skillFromText,
  runCase,
};

// Optional argument: a directory of case files to run in place of evals/cases.
if (isDirectRun()) main(process.argv[2] ? resolve(process.argv[2]) : CASES_DIR);
