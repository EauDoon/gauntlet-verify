// Each behavior case must fail when the sentence it stands for is changed.
// Every mutation below edits one instruction in SKILL.md and expects the case
// to go red. If a pinned sentence is reworded, the test fails and names it, so
// the pin and the case can be updated together.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadCases, runCase, skillFromText } from "./runner.mjs";

const SKILL_PATH = fileURLToPath(new URL("../.claude/skills/gauntlet-verify/SKILL.md", import.meta.url));
const ORIGINAL = readFileSync(SKILL_PATH, "utf8");
const CASES = new Map(loadCases().map(({ data }) => [data.id, data]));

const MUTATIONS = [
  { id: "B1", from: "the single property being matched (not all of them), ", to: "" },
  { id: "B1", from: "how a judge will see it, ", to: "" },
  { id: "B2", from: "Verification mode does not seat a critic or judges.", to: "" },
  { id: "B2", from: "which primary-data tools are available and how to load them", to: "which tools exist" },
  { id: "B3", from: "no reference is named, ask for one", to: "no reference is named, pick a category" },
  { id: "B4", from: "A round that would breach the ceiling mid-flight does not start. ", to: "" },
  { id: "B4", from: "and ships nothing on its own", to: "and ships the latest round" },
  { id: "B5", from: "Never edit an earlier line. ", to: "" },
  { id: "T6", from: "not Gauntlet the DeFi risk manager", to: "not a risk manager" },
];

function passes(caseObj, text) {
  return runCase(caseObj, skillFromText(text)).every((r) => r.ok);
}

for (const { id, from, to } of MUTATIONS) {
  test(`${id} fails when "${from.trim()}" is changed`, () => {
    const caseObj = CASES.get(id);
    assert.ok(caseObj, `no case ${id}`);
    assert.equal(ORIGINAL.split(from).length - 1, 1, `pinned text must occur once in SKILL.md: ${from}`);
    assert.equal(passes(caseObj, ORIGINAL), true, `${id} must pass on the shipped skill`);
    assert.equal(passes(caseObj, ORIGINAL.replace(from, to)), false, `${id} stayed green after the edit`);
  });
}

test("every behavior case is pinned by at least one mutation", () => {
  const pinned = new Set(MUTATIONS.map((m) => m.id));
  const unpinned = [...CASES.values()].filter((c) => c.kind === "behavior" && !pinned.has(c.id)).map((c) => c.id);
  assert.deepEqual(unpinned, []);
});
