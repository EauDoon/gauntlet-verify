# Changelog

Dates are DD-MM-YYYY. Upstream dates are the upstream author's local time (UTC+10).

## 18-09-2026, banner redesigned

- New banner in a cyan, translucent glass style: frosted glass panels with rim light over glowing cyan shapes. It ships as `assets/banner.jpg` (159 KB) in place of `banner.png`, and its source stays in `assets/src/banner.html`.

## 18-09-2026, skill renamed

- The skill is now `gauntlet-verify`, matching the repo: the folder is `.claude/skills/gauntlet-verify` and the command is `/gauntlet-verify`. It installs beside upstream's `gauntlet-loop` instead of replacing it. Anyone who installed this fork as `gauntlet-loop` should delete that folder and copy the new one.

## 18-09-2026, fork rewrite

The skill now runs the loop in session, instead of writing a paste-ready prompt and offering to run it. These changes were developed and first measured in a private copy from 08-08-2026 and are published here for the first time. Compared with [robonuggets/gauntlet-loop](https://github.com/robonuggets/gauntlet-loop) at `9b1975a`:

Added

- Verification mode. Isolated verifiers run kill tests on load-bearing claims: search for the contradiction, trace to primary, recompute, re-fetch live figures, check dates, then label verified, reported, or unverified. It fires unprompted when being wrong costs money or reputation, or the result feeds a public statement or a decision someone will act on. Kills and survivals are asymmetric: one sourced kill stands, and survival needs every test run.
- Formations. Light by default, full on the stakes test, escalation always announced. Cost anchors: light estimated at 100k to 150k tokens; full measured once in reference mode at about 325k subagent tokens per round.
- Gates. Reference mode needs a named reference the build does not match today, a bar that cannot be written as criteria, an unfinished build, and the intent to keep pressing.
- An unattended brake. Unattended loops park at the ceiling and ship nothing on their own.
- An assembler rule. Assembly is mechanical; anything the assembler would patch goes back to the owning builder.
- A run log. One line per run, so estimates become measurements.
- Evals, a structural check script with CI, a new banner, and this changelog.

Changed

- Judge question. "Which one is better" became "which one is the attempt, and what gave it away", with every tell tagged craft or identity. The first invites diplomacy, and against a famous reference a bare pick measures recognition, not quality.
- Ceiling. Upstream added a budget line only when the user named one. Now a ceiling in rounds or tokens is always written before any agent runs, and reaching it parks the loop.
- Decomposition. Upstream left decomposition to the agent. Now the build splits by areas that fail independently, against a slot contract.
- Critic and judges. Upstream's single critic ran the blind comparison and named the single biggest gap. Now the critic returns ranked findings, each mapped to one area and one edit, and separate blind judges run the comparison (2 to 3 at full formation, across model families where possible).
- Stop conditions. Upstream stopped when ours won the blind comparison or the user stopped; the stalled delta and the ceiling are added.

Removed

- The paste-ready prompt template and the 120 to 180 word length rule.
- The 2 or 3 candidate bars flow and the bars-by-goal-type table.
- The two filled examples.
- The measurable-half rule (name a number beside the reference).
- The live progress page line.
- Upstream's trigger phrases ("gauntlet loop", "gauntlet this", "make a gauntlet prompt", "loop until it beats X") and its any-goal scope. The description now triggers on a missed named bar or on high-stakes research.

Kept

- The named and fetchable bar, the harsh isolated critic, the blind comparison, no fixed round count, the Matt Shumer credit, and CC BY 4.0.

## 06-08-2026, upstream

Credit Matt Shumer for the gauntlet loop technique.

## 05-08-2026, upstream

Gauntlet Loop skill: turns any goal into a bar-driven builder and critic loop prompt.
