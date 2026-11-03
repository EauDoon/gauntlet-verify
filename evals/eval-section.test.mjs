import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { checks, skillFromText } from "./runner.mjs";

const FRONT = '---\nname: gauntlet-verify\ndescription: "test"\n---\n';

test("a phrase found only in the Eval section does not satisfy a phrase check", () => {
  const skill = skillFromText(`${FRONT}\n## Protocol\n\nName the reference.\n\n## Eval\n\n1. Passes if it names the single matched property.\n`);
  assert.equal(checks.skill_contains_all({ phrases: ["Name the reference"] }, skill).ok, true);
  assert.equal(checks.skill_contains_all({ phrases: ["single matched property"] }, skill).ok, false);
});

test("sections after the Eval section are still read, and the Eval heading still counts as a section", () => {
  const skill = skillFromText(`${FRONT}\n## Eval\n\n1. restated\n\n## Later\n\nkept instruction\n`);
  assert.equal(checks.skill_contains_all({ phrases: ["kept instruction"] }, skill).ok, true);
  assert.equal(checks.skill_contains_all({ phrases: ["restated"] }, skill).ok, false);
  assert.equal(checks.skill_has_section({ heading: "Eval" }, skill).ok, true);
});

test("a deeper heading inside the Eval section does not end it", () => {
  const skill = skillFromText(`${FRONT}\n## Eval\n\n### Cases\n\nrestated\n`);
  assert.equal(checks.skill_contains_all({ phrases: ["restated"] }, skill).ok, false);
});

test("the shipped skill keeps its instructions and drops only the Eval section", () => {
  const path = fileURLToPath(new URL("../.claude/skills/gauntlet-verify/SKILL.md", import.meta.url));
  const skill = skillFromText(readFileSync(path, "utf8"));
  assert.ok(skill.text.includes("## eval"), "the shipped skill has an Eval section");
  assert.equal(skill.body.includes("## eval"), false);
  assert.ok(skill.body.includes("## portability"));
  assert.ok(skill.body.includes("## boundaries"));
});
