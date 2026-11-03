// Each case must fail when the sentence it stands for is changed.
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
  { id: "B1", from: "are one area with one owner", to: "can go to separate builders" },
  { id: "B2", from: "Verification mode does not seat a critic or judges.", to: "" },
  { id: "B2", from: "which primary-data tools are available and how to load them", to: "which tools exist" },
  { id: "B3", from: "no reference is named, ask for one", to: "no reference is named, pick a category" },
  { id: "B4", from: "A round that would breach the ceiling mid-flight does not start. ", to: "" },
  { id: "B4", from: "and ships nothing on its own", to: "and ships the latest round" },
  { id: "B5", from: "Never edit an earlier line. ", to: "" },
  { id: "B6", from: "Any judge, in either order, names a craft tell an edit can close", to: "Every judge names a craft tell an edit can close" },
  { id: "B6", from: "Run each judge twice, once in each order, each run", to: "Run each judge once, each run" },
  { id: "B6", from: "Every judge, in both orders, names only identity tells or none", to: "Names only identity tells, or the panel splits" },
  { id: "B7", from: "The critic rechecks every area that passed in an earlier round; a regression is a finding for the builder whose edit caused it. ", to: "" },
  { id: "B7", from: ", two rounds in a row with no net drop,", to: "" },
  { id: "B7", from: "the candidate is the snapshot with the fewest open craft tells and critic findings, not the last round", to: "the candidate is the last round" },
  { id: "B7", from: "The builder owns the diagnosis: a builder whose measurement contradicts a finding's edit reports the measurement and closes the gap another way; the finding stands. ", to: "" },
  { id: "B8", from: "Split each claim into atomic facts that stand alone, one entity, figure, period, or definition each; a claim is verified only if every one of its facts is. ", to: "" },
  { id: "B8", from: ", or the source covers the topic without stating the claim,", to: "" },
  { id: "B9", from: "re-verify the claims that changed and every claim that rests on one of them", to: "re-verify only the claims that changed" },
  { id: "B9", from: "A kill stands when its quote or primary-source trace matches the claim's entity, metric, period, and unit.", to: "Any kill with a quote or a primary-source trace stands." },
  { id: "T1", from: "it still looks like an LLM made it", to: "it looks unfinished" },
  { id: "T1", from: "A named reference exists and is out of reach", to: "A reference style is chosen" },
  { id: "T2", from: "do another pass", to: "make it better" },
  { id: "T3", from: "or it feeds a public statement or decision", to: "or it is long" },
  { id: "T3", from: "Verification mode fires unprompted when both hold", to: "Verification mode fires when asked and both hold" },
  { id: "T4", from: "A quick lookup or a single figure does not raise a formation", to: "A quick lookup raises a light formation" },
  { id: "T5", from: "the check that applies is the rubric review at ship", to: "the loop applies again" },
  { id: "T6", from: "not Gauntlet the DeFi risk manager", to: "not a risk manager" },
  { id: "T7", from: "Neither does a house aesthetic", to: "So does a house aesthetic" },
  { id: "T8", from: "belongs to a style edit", to: "belongs to this loop" },
  { id: "T9", from: "Not the research method, and ", to: "" },
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

test("every case is pinned by at least one mutation", () => {
  const pinned = new Set(MUTATIONS.map((m) => m.id));
  const unpinned = [...CASES.values()].filter((c) => !pinned.has(c.id)).map((c) => c.id);
  assert.deepEqual(unpinned, []);
});
