import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { descriptionFromFrontmatter, resolvePython } from "./runner.mjs";

function yamlDescription(front) {
  const r = spawnSync(
    resolvePython(),
    ["-c", "import sys, yaml\nsys.stdout.write(yaml.safe_load(sys.stdin.read())['description'])"],
    { input: front, encoding: "utf8" },
  );
  assert.equal(r.status, 0, r.stderr);
  return r.stdout;
}

test("quoted skill description matches PyYAML, including trigger quotes", () => {
  const skillPath = fileURLToPath(new URL("../.claude/skills/gauntlet-verify/SKILL.md", import.meta.url));
  const text = readFileSync(skillPath, "utf8");
  const m = /^---\r?\n(.*?)\r?\n---\r?\n/s.exec(text);
  assert.ok(m, "frontmatter");
  const got = descriptionFromFrontmatter(m[1]);
  assert.equal(got, yamlDescription(m[1]));
  assert.equal(got.includes('"as good as X"'), true);
  assert.equal(got.includes("\\"), false);
});

test("folded description drops the YAML indicator and unescapes quotes", () => {
  const front = 'name: gauntlet-verify\ndescription: >-\n  quoted "as good as X"\n  continues\n';
  assert.equal(descriptionFromFrontmatter(front), 'quoted "as good as X" continues');
});
