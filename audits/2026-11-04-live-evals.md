# Live evals for the medium formation, 04-11-2026

Repository: EauDoon/gauntlet-verify
Change under test: PR 27, head `bd56e5b` (medium formation)
Subject: a frozen copy of that head's `SKILL.md`, read by fresh agents pinned to Opus that saw no other file

## Pass bar, written before any run

| Test | Bar |
|---|---|
| Smoke test | One live medium run per mode. The new mechanics work end to end: cluster cap and merge, judge calibrated before round one, one judge every round, ceiling in rounds, log line written and read back |
| Live behavior evals | B1 to B26 plus four medium boundary cases (X1 to X4). At least 27 of 30 pass, every medium case passes, and no fail is caused by PR 27 |
| Auto-trigger | Two blind routers on T1 to T20 plus four new prompts. At least 18 of 20 trigger cases per router, and T20 passes |

## Results

| Test | Result | Bar met |
|---|---|---|
| Smoke test, reference mode | Ran 2 rounds to its ceiling and parked | Yes |
| Smoke test, verification mode | Ran 2 rounds to its ceiling and stopped | Yes |
| Live behavior evals | 29 of 29 run passed; B12 not run | Yes |
| Auto-trigger, Opus router | Trigger cases 19 of 20; new prompts 3 of 4 | Yes |
| Auto-trigger, Sonnet router | Trigger cases 19 of 20; new prompts 4 of 4 | Yes |

## Smoke test, reference mode (medium)

- Reference: the tldr-pages `tar` page, fetched 04-11-2026. Matched property: example economy. Judges saw both pages as raw Markdown. Ceiling: 2 rounds. The attempt: a tldr-style page for `xz`, every command run against xz 5.4.5.
- Seats: the drafting session built every area; one isolated critic per round; one judge, calibrated before round one in both orders, then run in both orders every round. No builder fan-out and no panel.
- Calibration: the judge named craft tells in both orders (bare short flags), so it could see the gap and stayed.
- Round 1: 9 critic findings, all applied. The judge still named craft tells in both orders; the top tell was a summary line that copied the reference's template, which a round 1 edit had introduced.
- Round 2: the critic's recheck against the v0 snapshot found 7 findings, 5 of them regressions caused by round 1 edits. After the fix, craft tells fell from about 10 to 8 per order (count by the author from the judge reports). Top tell: a combined `-dc` placeholder.
- Stop: the 2-round ceiling parked the loop; candidate v2 (fewest open craft tells; no critic ran on it). Nothing shipped.
- Deviation: v0 was drafted before the plan was written down.
- Cost: about 655k subagent tokens across 8 seat runs, as the harness reported them. A judge run with one tool call reported about 75k, so per-seat overhead in this harness dominates the cost of a small artifact.

## Smoke test, verification mode (medium)

- Question: where to place a private cash reserve this month (short-dated government bills, a government savings bond, or a bank deposit). Stakes pass and the result reaches no one else, so medium.
- Claims: 7 plus 1 derived, on 4 source sets: the central bank (4), the tax authority (1), the pension board (1), and one bank (1). Medium caps seats at three, so the tax authority and the pension board merged onto one verifier. Ceiling: 2 rounds.
- Each verifier answered the open questions first and got the draft's values after.
- Round 1: V1 found, before seeing the draft's values, that the next savings bond issue was already announced, with its rates published, which killed the draft's "not yet announced". It also killed the derived comparison on its comparator and its method. V2 found the draft's tax wording looser than the issuer's own text.
- Round 2: the four changed claims were re-verified; no new kills.
- Labels: every claim ended unverified. The test container's proxy blocked all four primary hosts and the scraping tool's daily allowance was spent, so no verifier loaded a primary page. Each label names that limit. The brief listed the tools without first checking that the primary hosts were reachable; that was a drafting-session error, not a skill rule.
- Cost: about 362k subagent tokens across 3 seats, as the harness reported them.

## Live behavior evals

Each case ran in a fresh agent that read only the frozen `SKILL.md` and answered as the session would at that moment. B5 wrote to a real project folder. The author graded every answer against the case's `passes_if` and `fails_if`.

| Case | Result | Note |
|---|---|---|
| B1 | PASS | reference, property, judge view, light, ceiling before build; visual system as one coupled area; craft-tell stop; uncalibrated Done weaker |
| B3 | PASS | asks for a shipped reference before any agent; no formation or ceiling yet |
| B8 | PASS | atomic facts incl. definition; dashboard covers topic without stating claim; recompute; unverified with what settles it |
| B9 | PASS | re-verifies corrected figure, growth rate, conclusion; kill needs entity, metric, period, unit; contest once |
| B2 | PASS | unprompted verification, full on public statement, self-checks first, ceiling, verifiers told tools, every kill test, labels, no critic or judges |
| B4 | PASS | full on user's word; flags 400k buys one round at 325k; round 2 never starts; parks, trajectory, ships nothing |
| B5 | PASS | real writes: log created, 3 single appends, readback + checksum, earlier lines intact, clusters + trajectory, `not run` |
| B6 | PASS | not there; one-order tell counts; split panel not a pass; each judge twice, fresh, both orders, same capture |
| B7 | PASS | regression to motion builder via critic recheck; snapshots; stops after 2 flat rounds; best snapshot not last |
| B10 | PASS | treats "keep going" as resume; writes new ceiling before round 4; reports against it |
| B11 | PASS | routes footer finding to its builder; assembler does not patch even one line |
| B12 | NOT RUN | agent stopped by model safeguards (API error); not retried per harness note |
| B13 | PASS | refuses design notes; critic gets artifact, reference, area names, earlier snapshot only |
| B14 | PASS | escalates light to full in one line (board = reaches other people); old ceiling holds, asks user to raise |
| B15 | PASS | self-checks only; deliverable states no independent verification pass ran; logs `not run` |
| B16 | PASS | two tiers of one family; verdict called weaker; degradation in log line |
| B17 | PASS | one-property spec plus captures; one judge on spec; verdict weak, stated |
| B18 | PASS | no averaging; proxied figure grades as vendor; unresolved stays unverified with both figures and reason |
| B19 | PASS | seats light judge now, both orders; craft tell opens a round; no stall stop before a judge |
| B20 | PASS | hero easing briefed (named as giveaway, touches matched property); footer type does not matter |
| B21 | PASS | three clusters by source set, one verifier each, every kill test on every claim |
| B22 | PASS | dashboard stale vs daily interval; filing ok within quarter; no-interval report: age flagged, no interval stated |
| B23 | PASS | 300k + 120k = 420k > 400k; round 3 does not start; parks with trajectory |
| B24 | PASS | replaces the judge that named no craft tell before round one |
| B25 | PASS | medium (stakes pass, reaches no one else); ceiling in rounds; 3 verifiers, C+D+E merged; every kill test |
| B26 | PASS | drafting session builds all areas; one critic; one calibrated judge every round, both orders; no fan-out, no panel; ceiling in rounds |
| X2 | PASS | medium to full in one line when result goes public; 5 verifiers, no cap |
| X3 | PASS | two clusters, two verifiers, no merge or padding |
| X4 | PASS | medium calibration: judge replaced, no verdict yet |
| X1 | PASS | light to medium in one line (private money decision, reaches no one else); 3 verifiers by merge; 3-round ceiling held |

B12 was not run: the model's safeguards stopped that agent with an API error, and it was not retried.

X cases, added for this run only:

| Case | Setup | Passes if |
|---|---|---|
| X1 | Light verification; in round 1 the user says the result decides whether to sell their own home, and nothing goes to anyone else | Escalates to medium in one line; one verifier per cluster, at most three; ceiling holds |
| X2 | Medium verification of a private decision; mid-run the user says the conclusion goes on X tomorrow | Escalates to full in one line; one verifier per cluster, no cap |
| X3 | Medium verification with two claim clusters | Two verifiers; no merge and no padding to three |
| X4 | Medium reference; the judge names no craft tell in either order before round one | Replaces the judge; no verdict yet |

## Auto-trigger

Two router seats, Opus and Sonnet, each read 11 skill descriptions (this one and the 10 neighbors below) and 24 shuffled prompts, and listed the skills they would load. The skill counts as fired if it appears anywhere in the list.

Neighbor skills, named here by role: a research method, a rubric review at ship ([cold-read](https://github.com/EauDoon/cold-read)), a data pull, a style edit, a design skill, a protocol research desk, a market desk, an analysis checker, a pitch structure skill, and a prose style guide.

| Case | Should fire | Opus | Sonnet |
|---|---|---|---|
| T1 | yes | fired | fired |
| T2 | yes | fired | fired |
| T3 | yes | fired | fired |
| T4 | no | none | none |
| T5 | no | rubric review | rubric review |
| T6 | no | protocol desk | protocol desk |
| T7 | no unless shipped page named | design skill | none |
| T8 | no | style edit | style edit |
| T9 | no | rubric review | none |
| T10 | yes | fired | fired |
| T11 | yes | fired | fired |
| T12 | yes | fired | fired |
| T13 | yes | MISS (protocol desk) | MISS (none) |
| T14 | yes | fired | fired |
| T15 | no | design skill | design skill |
| T16 | no | rubric review, design skill | rubric review |
| T17 | no | data pull | data pull |
| T18 | no | none | none |
| T19 | no | research method, protocol desk | research method |
| T20 | yes | fired | fired |
| R1 private money research | yes | fired (2nd, after protocol desk) | fired |
| R2 medium gauntlet landing page | yes | fired | fired |
| R3 medium gauntlet on one tweet | no | MISS (fired, would ask for a bar) | style edit |
| R4 Gauntlet medium-risk params | no | protocol desk | protocol desk |
Trigger cases: Opus 19/20, Sonnet 19/20. New prompts: Opus 3/4, Sonnet 4/4.

## Findings

1. The medium tier behaves as written in both modes, in live runs and in every medium eval case.
2. T13 fails routing on both models. "verify the claims in my research notes, a light pass, it is just for me" has no stakes, and the description routes only research with stakes; the rule that an explicit request to verify fires the skill lives in the body, which a router does not read. This gap predates PR 27, which did not change the description. Follow-up: add a short clause to the description (it has 6 characters of headroom under the 450 limit, so something must be trimmed) and re-run T13, T9, and T19.
3. "medium gauntlet" on a single tweet made the Opus router load the skill, which would then ask for a bar and send the request to a style edit per its anti-triggers. Low cost; watch for it.
4. The regression recheck earned its place: in the reference smoke test, 5 of round 2's 7 critic findings were regressions caused by round 1's edits.
5. Per-seat overhead is large in this harness (about 75k reported tokens for a one-call judge), so seat count, not artifact size, drives cost for small artifacts. The light estimate of 100k to 150k tokens looks low for this harness.
