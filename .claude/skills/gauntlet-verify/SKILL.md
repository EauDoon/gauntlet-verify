---
name: gauntlet-verify
description: "Build-to-a-bar loop and isolated verifier formation. Use WHENEVER a build misses a named bar: \"as good as X\", \"AAA quality\", \"it still looks like an LLM made it\", \"do another pass\"; if no shipped artifact is named, ask. Use UNPROMPTED on heavy research when being wrong costs money or reputation, or it feeds a public statement or decision. Not the research method, and not Gauntlet the DeFi risk manager. Runs mid-build, not on finished work."
---

# Gauntlet Verify

The Gauntlet Loop for work that cannot afford to be mediocre or wrong, in two modes. Reference mode drives an unfinished build toward a specific shipped artifact whose bar cannot be written down. Verification mode fields isolated verifiers over heavy research whose facts must be correct without fail. This skill owns the formations and the loop, not the domain (see Boundaries). Where a neighbor skill is not installed, do its job inline and say so.

A **seat** is one isolated agent role: builder, critic, judge, or verifier. A **formation** is how many seats a job gets. A **ceiling** is the budget in rounds or tokens, written down before any isolated seat is spawned. A **tell** is what gave the attempt away to a judge.

## Why a reference beats a rubric

A rubric is a lossy compression of a reference. It works when the criteria are mechanical (contracts, memos, backtests) and fails when the quality is experiential (a frontend that feels expensive, prose that does not read as generated), where criteria collapse into "make it polished", which nothing can fail with a quote. So do not write the criteria: name a shipped artifact that clears the bar, and make the pass condition comparative, a judge who never saw the build naming nothing but identity tells (step 4).

## The gates, one per mode

Reference mode runs only when all four hold.

1. **A named reference exists and is out of reach.** A specific shipped artifact, inspectable, not a category and not a style name, and the build does not match it today. "Linear's settings page" passes. "Good design" does not. Neither does a house aesthetic, a visual style a design skill already encodes. It becomes one only when a particular shipped page is named and the build misses it; then the loop drives and the domain skill supplies. If a build triggers this skill and no reference is named, ask for one.
2. **The bar is not statable in advance.** If you can write three quotable criteria for the finished artifact, build against those criteria and check them with a rubric review; this loop does not apply.
3. **The build is unfinished.** This drives generation. Once the artifact is done, the check that applies is the rubric review at ship.
4. **You will actually keep pressing.** Starting the loop and accepting round one is worse than not starting, because you paid fan-out prices for a single draft.

Verification mode fires unprompted when both hold.

1. **The answer rests on facts outside the model across several load-bearing claims.** Heavy research, due diligence, multi-source synthesis. A quick lookup or a single figure does not raise a formation; a single numeric series belongs to a data pull.
2. **The stakes test passes.** Being wrong costs money or reputation, or the output feeds a public statement or a decision the user will act on.

When the user asks for verification, gate 1 still applies and gate 2 does not; it runs at light unless they say full.

Anti-triggers, both modes: chat answers, quick lookups, one-shot drafts, work where good enough is genuinely good enough, and Gauntlet (the DeFi risk manager), which shares nothing with this but a word. A complaint that one post reads as generated belongs to a style edit; this loop takes text only when it decomposes into areas that fail independently.

## Formations

Two levels. Light is the default; spend follows consequence, not effort.

| Formation | Seats | When | Cost anchor |
|---|---|---|---|
| Light | Reference: the drafting session, one isolated critic, and one judge once the critic's findings stop dropping. Verification: one isolated verifier for all claims | Default, whenever the stakes test fails, whatever the area count | 100k to 150k tokens, estimated; not a spending cap |
| Full | Reference: one builder per area, one isolated critic, and a panel of 2 to 3 judges. Verification: one isolated verifier per claim cluster | Stakes test passes: money, reputation, public statement, acted-on decision. Or the user says full gauntlet | About 325k subagent tokens per round, measured once in reference mode (08-08-2026) before judges ran in both orders; verification mode unmeasured |

Verification mode does not seat a critic or judges.

Escalation is automatic on the stakes test and overridden in either direction by the user's word. A loop may drop to light for a cleanup round; it never climbs silently, it names the escalation and the reason in one line. Unattended, escalation follows the same rule and the written ceiling stays the brake.

## Protocol, reference mode

### 1. Name the reference before building

Out loud, in writing, before a line is generated.

Capture five things: the reference, the single property being matched (not all of them), how a judge will see it, the formation and why, and the ceiling that step 6 will hold. A reference nobody can show the critic is a reference the critic will invent.

| Reference is | Show the critic |
|---|---|
| A live page or app | Screenshot, or the URL if the critic can fetch |
| A surface where motion is the matched property | A screen recording, or the judge drives the live page in a browser. Stills converge the static frame while the actual gap stays open |
| A document or deck | The file, or the relevant pages |
| A product the critic cannot run | A written spec of the one property, plus any capture that exists |
| The user's own past best | The artifact itself, by path |

The last row is the strongest: the user's own best work is inspectable, on-voice, and provably achievable.

### 2. Decompose, then fan out

Split the build into areas that fail independently: structure, visual system, motion, copy, data correctness, edge cases. One builder per area at full formation, in parallel; the drafting session plus one critic at light. Areas, not slices of the same area, or the builders converge and the fan-out buys nothing. Concerns that share one system, where an edit to one changes how the other reads (lighting and materials, type scale and spacing), are one area with one owner; if two builders would edit the same system, merge their areas or run them in sequence.

Name the assembler before the fan-out. The orchestrating session splices the areas into one artifact against a slot contract agreed up front: the list of sections each builder fills. Assembly is mechanical; an unfilled slot, an orphaned block, or an edit the assembler is tempted to make is a finding for that area's builder, never something the assembler quietly patches. A finding that spans two areas is split by the assembler into one edit per owning builder.

At full formation, builders run on a workhorse seat, a cheaper and faster model. Only the critic and the judge pay frontier prices. Pin the model on every seat and check the model each agent actually ran on; in some orchestrators the session's model choice does not reach subagents.

### 3. Critic that never saw the build

A separate context, given the artifact, the reference, the slot contract's area names, and from round two the earlier snapshots, and nothing about how the artifact was made. A critic in the builder's context inherits the builder's satisfaction. Where the artifact runs, the critic runs it; a verified finding outranks a read one. Freeze the artifact while the critic and the judges read it: a verdict on an artifact that changed under the reader cannot be attributed to a version.

The critic's instructions, verbatim:

- Name the specific gap to the reference. "Worse than the reference" without a named gap is not a finding.
- Every finding maps to one area and one edit. A finding no builder can act on is commentary.
- Do not praise, do not summarize, no preamble.
- Rank by how much closing it moves the artifact toward the reference, not by how easy it is.
- Being harsh is the job. A critic that finds nothing on round one did not look.

### 4. Blind judge, the actual stop condition

Show the judge both artifacts, unlabeled, and say what the pair is: one shipped by the reference author, one an attempt to match it. Capture both the same way, at the same viewport, crop, resolution, length, and format, or have the judge drive both live in the same browser, so presentation is not the tell. Run each judge twice, once in each order, each run a fresh context that never sees the other run, earlier verdicts, or the critic's findings; judges favor one position, most when the gap is small. Ask which is the attempt and what gave it away, every tell tagged either craft, fixable by editing the artifact, or identity (age, adoption, ecosystem, brand), which no edit reaches. Do not ask which is better, which invites diplomacy, or only which one the reference author made, which a famous reference answers by recognition. The pick saturates; the tells carry the verdict. A wrong pick, no pick, or a split panel is not a pass on its own.

| Judge says | Read |
|---|---|
| Any judge, in either order, names a craft tell that matters and an edit can close | Not there. The top craft tell is the next round's brief |
| The only craft tells named do not matter | Close. Press the single property from step 1 |
| Every judge, in both orders, names only identity tells or none | Done. Stop and ship it; unattended, park it as ready |

A craft tell matters when a judge names it as what gave the attempt away or it touches the property from step 1; the rest do not.

At full formation run 2 to 3 judges across at least two model families where the stack allows; a same-family judge shares the priors that produced the gap. Where only one family is available, use two model tiers and say the verdict is weaker. Where the reference cannot be shown, one judge holds the written spec and the verdict is weak; say so.

### 5. Loop, and report the delta

Each round: critic findings, builders fix their own area only, judges re-run (every round at full; at light, one judge once the critic's findings stop dropping or the user calls the build ready, and a craft tell from it opens another round). The builder owns the diagnosis: a builder whose measurement contradicts a finding's edit reports the measurement and closes the gap another way; the finding stands. Snapshot the artifact at the end of every round. The critic rechecks every area that passed in an earlier round against that round's snapshot; a regression is a finding for the builder whose edit caused it. Report one line per round with the delta, the change in open craft tells and critic findings since the previous round, so the trend is visible. A loop whose delta stops moving, two rounds in a row with no drop in the combined count, is finished whatever the judge says: stop and report the trajectory. On a Done verdict the judged snapshot is the candidate; at any other stop or park, it is the snapshot with the fewest open craft tells and critic findings (critic findings alone where no judge ran), not the last round.

### 6. The user is the brake

There is no round cap. The loop stops on the user's call, on judges that stop spotting the attempt by craft, on a delta that stops moving, or on the ceiling written at step 1. A round that would breach the ceiling mid-flight does not start: it would when spend so far plus the last round's measured cost, or the cost anchor before round one, passes the ceiling. Where token spend cannot be read, write the ceiling in rounds. Unattended, meaning the user said not to check in or the run is scheduled, the ceiling is the brake: the loop runs to it or to a stop condition, parks with the round-by-round trajectory as the report, and ships nothing on its own. Resuming past the ceiling is the user's call, made on the trajectory, and a new ceiling is written before the next round.

### 7. Log the run

When the loop stops, append one line to `logs/verification-runs.md` in the shared project folder: `/mnt/project-files/` in a project thread, the connected folder in Cowork, or the durable project folder on other agents. Never use the session's scratch directory or the agent's built-in memory as the run log.

Create the `logs` directory and file if absent. Append the complete line in one write, then read the line back to confirm it was saved. Never edit an earlier line. If the project folder is unavailable or the append or readback fails, report the logging failure; do not claim the run was saved. Write `unknown` for an unmeasured value.

Use this shape, with dates in DD-MM-YYYY:

```text
DD-MM-YYYY | gauntlet-verify | mode | formation | artifact | reference or claim set | areas or clusters | rounds | tokens | judge or verifier trajectory
```

Once three runs each of light formation and of verification mode are logged, use those numbers in place of the estimates in the Formations table.

## Protocol, verification mode

The research method scopes, searches, and grades sources in the drafting context; this skill seats the adversarial stage. In the author's research builds each layer caught errors the layer below missed and added errors only the next caught, and no layer's confidence predicted its accuracy (observed, not measured), so the defense is the chain, not any single pass.

1. Self-checks first. The drafting context runs its own checks before the gauntlet. The gauntlet runs after them, never instead of them, and without asking permission when the stakes test passes.
2. List the load-bearing claims, set the formation, write the ceiling. Split each claim into atomic facts that stand alone, one entity, figure, period, or definition each; a claim is verified only if every one of its facts is. Formation per the Formations table: one isolated verifier for all claims at light, one per claim cluster at full. A claim cluster is the claims that rest on the same source set. Write the ceiling in rounds or tokens before any verifier is seated.
3. Seat the verifiers. They never see the drafting context's reasoning. They get the claims, where each came from, and this brief, nothing else. The brief tells them, before they look:
   - which claims the draft already labels unsourced or unverified, so a declared gap is not reported as a defect;
   - which self-checks ran and what each found, so they re-run each one independently rather than trust it;
   - which primary-data tools are available and how to load them. A verifier that does not know a tool exists reverts to web search and the kill tests weaken.
4. Each verifier runs the kill tests, verbatim, on every claim it holds.
   1. Answer the open question behind the claim (what was X in period Y) from your own search, then compare with the claim and search for the direct contradiction. Where a seat can be messaged twice, send the open questions first and the draft's values after.
   2. Trace to the primary source and quote the passage that states the claim with the same metric, period, and unit. If the chain ends at an aggregator, or the source covers the topic without stating the claim, the claim is unverified.
   3. Recompute any number that can be recomputed. For on-chain figures, a direct contract or storage read at a stated block is the recompute path.
   4. Re-fetch every figure quoted from a live source and compare the figure, the source, and the as-of date against what the draft says.
   5. Check the date on every figure. Flag any figure older than its source's own publishing interval (a day for daily data, a quarter for a quarterly filing); where the source states none, flag the figure's age and say so.
   6. Label the survivors: verified (one tier A source, or two independent tier B), reported (a single tier B), unverified (everything else).
5. Kills and survivals are asymmetric. A kill stands when its quote or primary-source trace matches the claim's entity, metric, period, and unit. The drafting context may contest a kill once with a counter-quote; a fresh verifier, given only the claim and both quotes, settles it. Survival requires the verifier to have run every test, not to have found nothing while skimming.
6. Fix or relabel, re-verify the claims that changed and every claim that rests on one of them, stop. Unverified claims ship only labeled, with what would settle them. The step 2 ceiling and the unattended brake from reference mode step 6 apply unchanged.
7. Say when it did not run. Where no isolated verifier can be seated, run the self-checks and state in the deliverable that no independent verification pass ran.
8. Log the run as reference step 7 says, with the claim clusters in the areas field and the verifier trajectory last. If no isolated verifier was seated, record `not run` in the trajectory instead of implying independent verification passed.

Source tiers the verifiers grade against:

| Tier | What | Weight |
|---|---|---|
| A | Primary: filings, official docs, on-chain data, datasets, the actual paper, the actual contract | A load-bearing claim can rest on one |
| B | Named-author reporting at established outlets, counterparty documentation | A load-bearing claim needs two independent |
| C | Aggregators, SEO content, unnamed sources, AI-generated summaries | Leads only, never citations |

Two outlets citing the same press release are one source. A figure a data tool proxies from a vendor grades as that vendor, never as the tool, and counts as that vendor for independence. Never average conflicting numbers: resolve the conflict, or present both with the reason they differ. An unresolved conflict leaves the claim unverified.

## Portability

In Claude Code, fan out with subagents or a workflow script, and use `/loop` to pace rounds. The keyword `ultracode` in a typed prompt runs that one task as an orchestrated workflow, which suits a full-formation loop; `/effort ultracode` does the same for the whole session. The keyword does not fire in `-p` runs or scheduled tasks, so a scheduled loop fans out with subagents instead. On any other agent, run each seat as a fresh context with only its brief; sequential works, shared context does not. Some chat surfaces can spawn only one model family, so the two-family judge rule degrades to two tiers there. Say so in the log line.

## Boundaries

| Neighbor | Owns | Split |
|---|---|---|
| Research method | Scoping, search, and source grading | It says what must be true; this fields the isolated agents that test it, and fires them unprompted on stakes. If it carries its own kill tests and source tiers, use those, and keep the re-fetch test above |
| Rubric review at ship | The pass on a finished artifact against written criteria | Finished and shipping versus in flight. After a verification run, the at-ship check still belongs to the rubric review |
| Data pull | Acquiring and reconciling numeric series | A number is pulled there; a claim built on numbers is verified here |
| Design or deck skill | The design system, the argument spine | It is the reference; this drives the loop toward it |
| Skill standard | The bar an instruction or skill is held to | It sets bars; this one chases one |
| Model routing | Which model runs which seat | It routes seats; this decides the formation exists |
| In-context self-check | Checking while drafting | Continuous and internal versus blind and isolated |

## Eval

1. Give it "build me a pricing page as good as Linear's". Passes if, before generating, it names the reference, the single matched property, how the judge will see it, the formation, and the ceiling, then decomposes by independent area (one builder per area only at full formation) and states the craft-tell stop condition. Fails if it writes a rubric in place of a reference.
2. Give it "dig into whether Hyperliquid's fee revenue really passed Ethereum's, it goes in a public thread this week". Passes if verification mode fires unprompted at full formation (public statement), seats isolated verifiers told which primary-data tools they have, each verifier runs every kill test on every claim, and every claim ships labeled verified, reported, or unverified. Fails if the drafting context's self-checks stand in for the isolated verifiers, or if a "check this before I send it" request on a finished artifact gets taken from the rubric review.
3. Stop one reference run and one verification run in a shared project, first with no log and then with an existing log. Passes if each appends exactly one complete line to `logs/verification-runs.md` in one write, reads it back, leaves every earlier line unchanged, and uses the dated shape above. The verification line names claim clusters and the verifier trajectory. Repeat without an isolated verifier; its trajectory must say `not run`. Fails if it logs only reference mode, writes to scratch or built-in memory, rewrites history, or claims a failed write succeeded.

Adapted from [robonuggets/gauntlet-loop](https://github.com/robonuggets/gauntlet-loop) (Jay E, RoboNuggets) under CC BY 4.0. Source, changes, and more eval cases: [EauDoon/gauntlet-verify](https://github.com/EauDoon/gauntlet-verify).
