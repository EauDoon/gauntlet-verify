// evals/README.md is the copy a person reads to run the cases live; the JSON
// cases are what the runner checks. They must describe the same cases, so a
// case deleted from one, or a pass condition edited in only one, fails here.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadCases } from "./runner.mjs";

const README = readFileSync(fileURLToPath(new URL("./README.md", import.meta.url)), "utf8");
const CASES = loadCases().map(({ data }) => data);

// Rows of the first table under a "## <title>" heading, header row dropped.
function tableRows(title) {
  const start = README.search(new RegExp(`^## ${title}[ \\t]*$`, "m"));
  assert.notEqual(start, -1, `evals/README.md has no "## ${title}" section`);
  const rest = README.slice(start).split("\n").slice(1);
  const end = rest.findIndex((line) => /^#{1,2} /.test(line));
  const lines = (end === -1 ? rest : rest.slice(0, end)).filter((line) => line.startsWith("|"));
  return lines
    .filter((line) => !/^\|\s*-/.test(line))
    .slice(1)
    .map((line) => line.replace(/^\|\s*/, "").replace(/\s*\|\s*$/, "").split(/\s+\|\s+/));
}

// Compare prose without the backticks README adds or a trailing period.
const prose = (s) => s.replace(/`/g, "").replace(/\s+/g, " ").replace(/[.\s]+$/, "").trim();

test("every behavior case appears in evals/README.md with the same conditions", () => {
  const rows = tableRows("Behavior cases");
  const json = CASES.filter((c) => c.kind === "behavior");
  assert.deepEqual(rows.map((r) => r[0]).sort(), json.map((c) => c.id).sort());
  for (const [id, setup, passesIf, failsIf] of rows) {
    const c = json.find((x) => x.id === id);
    if (c.prompt) assert.ok(setup.includes(`"${c.prompt}"`), `${id}: README setup lacks the prompt`);
    if (c.context) assert.ok(setup.includes(c.context), `${id}: README setup lacks the context`);
    assert.equal(prose(passesIf), prose(c.passes_if), `${id}: passes_if differs between README and JSON`);
    assert.equal(prose(failsIf), prose(c.fails_if), `${id}: fails_if differs between README and JSON`);
  }
});

test("every trigger case appears in evals/README.md with the same expectation", () => {
  const rows = tableRows("Trigger cases");
  const json = CASES.filter((c) => c.kind === "trigger");
  const prompts = rows.map(([cell]) => {
    const m = /^"([^"]+)"/.exec(cell);
    assert.ok(m, `trigger row does not start with a quoted prompt: ${cell}`);
    return m[1];
  });
  assert.deepEqual([...prompts].sort(), json.map((c) => c.prompt).sort());
  rows.forEach(([cell, fire, why], i) => {
    const c = json.find((x) => x.prompt === prompts[i]);
    if (c.context) assert.ok(cell.includes(`(${c.context})`), `${c.id}: README lacks the context`);
    if (c.should_fire === "conditional") {
      assert.equal(prose(fire), prose(`No, unless ${c.fire_unless}`), `${c.id}: conditional expectation differs`);
    } else {
      assert.equal(fire.split(",")[0], c.should_fire ? "Yes" : "No", `${c.id}: should_fire differs`);
    }
    if (c.should_fire === true && c.mode) assert.ok(fire.includes(`${c.mode} mode`), `${c.id}: mode differs`);
    if (c.should_fire === true && c.formation) assert.ok(fire.includes(c.formation), `${c.id}: formation differs`);
    assert.equal(prose(why), prose(c.why), `${c.id}: why differs between README and JSON`);
  });
});
