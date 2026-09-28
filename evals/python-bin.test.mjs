import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { resolvePython, checks } from "./runner.mjs";

test("resolvePython returns an interpreter that can import PyYAML", () => {
  const bin = resolvePython();
  const bare = spawnSync("python", ["-c", "import yaml"], { encoding: "utf8" });
  if (bare.error && bare.error.code === "ENOENT") {
    assert.notEqual(bin, "python");
  }
  const r = spawnSync(bin, ["-c", "import yaml; print('ok')"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr || String(r.error));
  assert.match(r.stdout, /ok/);
});

test("skill structure check runs through the resolved interpreter", () => {
  const result = checks.skill_structure_passes();
  assert.equal(result.ok, true, result.detail);
});
