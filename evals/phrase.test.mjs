import test from "node:test";
import assert from "node:assert/strict";
import { checks, containsPhrase } from "./runner.mjs";

test("a label is not found inside a longer label", () => {
  assert.equal(containsPhrase("only unverified claims ship", "verified"), false);
  assert.equal(containsPhrase("verified (one tier a source)", "verified"), true);
  assert.equal(containsPhrase("label it unverified, or verified", "verified"), true);
});

test("a short word is not found inside another word", () => {
  assert.equal(containsPhrase("that one task", "ask"), false);
  assert.equal(containsPhrase("no reference is named, ask for one", "ask"), true);
});

test("a phrase may end inside a longer word", () => {
  assert.equal(containsPhrase("run the kill tests on every claim", "kill test"), true);
  assert.equal(containsPhrase("the drafting context runs its own self-checks", "self-check"), true);
});

test("matching ignores case and treats metacharacters literally", () => {
  assert.equal(containsPhrase("verified (one tier a source)", "Verified (one tier A source)"), true);
  assert.equal(containsPhrase("verified xone tier a source)", "verified (one"), false);
});

test("a phrase that starts with punctuation needs no word boundary", () => {
  assert.equal(containsPhrase("record `not run` in the trajectory", "`not run`"), true);
});

test("both phrase checks use the word boundary", () => {
  const skill = { description: "only unverified claims", body: "this task is long" };
  assert.equal(checks.skill_description_contains({ phrases: ["verified"] }, skill).ok, false);
  assert.equal(checks.skill_contains_all({ phrases: ["ask"] }, skill).ok, false);
});
