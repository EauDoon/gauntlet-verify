import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadCases, validateCase } from "./runner.mjs";

const RUNNER = fileURLToPath(new URL("./runner.mjs", import.meta.url));
const base = { id: "X1", kind: "trigger", prompt: "p", should_fire: true, why: "w" };
const phraseCheck = (phrases) => ({ ...base, checks: [{ type: "skill_contains_all", phrases }] });

test("a case with no checks is rejected", () => {
  assert.deepEqual(validateCase({ ...base, checks: [] }), ["checks must be a non-empty array"]);
  assert.deepEqual(validateCase({ ...base }), ["checks must be a non-empty array"]);
  assert.deepEqual(validateCase({ ...base, checks: { type: "skill_contains_all" } }), [
    "checks must be a non-empty array",
  ]);
});

test("an empty phrase list or an empty phrase is rejected", () => {
  assert.deepEqual(validateCase(phraseCheck([])), ["checks[0] phrases must be a non-empty array"]);
  assert.deepEqual(validateCase(phraseCheck([""])), ["checks[0] phrases must all be non-empty strings"]);
  assert.deepEqual(validateCase(phraseCheck(["loop", "  "])), ["checks[0] phrases must all be non-empty strings"]);
  assert.deepEqual(validateCase({ ...base, checks: [{ type: "skill_contains_all" }] }), [
    "checks[0] phrases must be a non-empty array",
  ]);
});

test("a section check needs a heading", () => {
  assert.deepEqual(validateCase({ ...base, checks: [{ type: "skill_has_section", heading: "" }] }), [
    "checks[0] heading must be a non-empty string",
  ]);
});

test("unknown and inherited check types are rejected", () => {
  assert.deepEqual(validateCase({ ...base, checks: [{ type: "skill_mentions" }] }), [
    'checks[0] has unknown type "skill_mentions"',
  ]);
  assert.deepEqual(validateCase({ ...base, checks: [{ type: "toString" }] }), [
    'checks[0] has unknown type "toString"',
  ]);
});

test("id and kind are required", () => {
  const problems = validateCase({ checks: [{ type: "skill_contains_all", phrases: ["loop"] }] });
  assert.deepEqual(problems, ["id must be a non-empty string", "kind must be behavior or trigger, got undefined"]);
  assert.deepEqual(validateCase([]), ["case is not a JSON object"]);
});

test("a trigger case must say what to send and whether it should fire", () => {
  const checks = [{ type: "skill_contains_all", phrases: ["loop"] }];
  assert.deepEqual(validateCase({ id: "X1", kind: "trigger", checks }), [
    "prompt must be a non-empty string",
    'should_fire must be true, false, or "conditional", got undefined',
    "why must be a non-empty string",
  ]);
  assert.deepEqual(validateCase({ ...base, should_fire: "yes", checks }), [
    'should_fire must be true, false, or "conditional", got "yes"',
  ]);
  assert.deepEqual(validateCase({ ...base, should_fire: "conditional", checks }), [
    "a conditional trigger case needs fire_unless",
  ]);
  assert.deepEqual(validateCase({ ...base, should_fire: false, checks }), []);
});

test("a behavior case must state its setup and both outcomes", () => {
  const checks = [{ type: "skill_contains_all", phrases: ["loop"] }];
  assert.deepEqual(validateCase({ id: "X2", kind: "behavior", checks }), [
    "behavior case needs a prompt or a context",
    "passes_if must be a non-empty string",
    "fails_if must be a non-empty string",
  ]);
  assert.deepEqual(
    validateCase({ id: "X2", kind: "behavior", context: "c", passes_if: "p", fails_if: "f", checks }),
    [],
  );
});

test("a well-formed case has no problems", () => {
  assert.deepEqual(validateCase(phraseCheck(["loop"])), []);
});

test("every shipped case is well formed and has a unique id", () => {
  for (const { file, problems } of loadCases()) {
    assert.deepEqual(problems, [], file);
  }
});

test("a malformed case fails on its own and the other cases still run", () => {
  const dir = mkdtempSync(join(tmpdir(), "gauntlet-cases-"));
  try {
    const good = { id: "G1", kind: "trigger", prompt: "good", should_fire: true, why: "w", checks: [{ type: "skill_contains_all", phrases: ["loop"] }] };
    writeFileSync(join(dir, "a-good.json"), JSON.stringify(good));
    writeFileSync(join(dir, "b-broken.json"), '{"id": "G2", broken');
    writeFileSync(join(dir, "c-empty.json"), JSON.stringify({ ...good, id: "G3", checks: [] }));
    writeFileSync(join(dir, "d-dup.json"), JSON.stringify({ ...good, prompt: "dup" }));
    const r = spawnSync(process.execPath, [RUNNER, dir], { encoding: "utf8" });
    assert.equal(r.status, 1, r.stderr);
    assert.match(r.stdout, /^PASS G1 trigger good$/m);
    assert.match(r.stdout, /^FAIL .*b-broken\.json invalid .*b-broken\.json\n\s+invalid JSON/m);
    assert.match(r.stdout, /^FAIL G3 invalid .*\n\s+checks must be a non-empty array/m);
    assert.match(r.stdout, /^FAIL G1 invalid .*d-dup\.json\n\s+duplicate id G1, also in .*a-good\.json/m);
    assert.match(r.stdout, /^2 passed, 3 failed$/m);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("an empty or missing cases directory fails instead of passing", () => {
  const dir = mkdtempSync(join(tmpdir(), "gauntlet-cases-"));
  try {
    const empty = spawnSync(process.execPath, [RUNNER, dir], { encoding: "utf8" });
    assert.equal(empty.status, 1, empty.stdout);
    assert.match(empty.stdout, /^FAIL Z2 cases .*\n\s+no \.json case files found$/m);
    assert.match(empty.stdout, /^1 passed, 1 failed$/m);
    const missing = spawnSync(process.execPath, [RUNNER, join(dir, "absent")], { encoding: "utf8" });
    assert.equal(missing.status, 1, missing.stdout + missing.stderr);
    assert.match(missing.stdout, /^FAIL Z2 cases .*\n\s+cannot read the cases directory: ENOENT/m);
    assert.equal(missing.stderr, "");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
