import test from "node:test";
import assert from "node:assert/strict";
import { headingPattern } from "./runner.mjs";

test("a dot in a heading is literal", () => {
  const re = headingPattern("1. Name the reference before building");
  assert.equal(re.test("## 1. Name the reference before building"), true);
  assert.equal(re.test("## 1X Name the reference before building"), false);
});

test("a plus in a heading does not throw and does not match a shorter title", () => {
  const re = headingPattern("C++ notes");
  assert.equal(re.test("## C++ notes"), true);
  assert.equal(re.test("## C notes"), false);
});
