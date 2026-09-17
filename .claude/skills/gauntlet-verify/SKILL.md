---
name: gauntlet-verify
description: "Build-to-a-bar loop and isolated verifier formation for work that cannot be wrong. Use WHENEVER a build misses a named bar: \"as good as X\", \"AAA quality\", \"it still looks like an LLM made it\", \"do another pass\"; if no shipped artifact is named, ask. Use UNPROMPTED on heavy research when being wrong costs money or reputation, or it feeds a public statement or decision. Not Gauntlet the DeFi risk manager. Runs mid-build, not on finished work."
---

# Gauntlet Verify

The Gauntlet Loop for work that cannot afford to be mediocre or wrong, in two modes. Reference mode drives an unfinished build toward a specific shipped artifact whose bar cannot be written down. Verification mode fields isolated verifiers over heavy research whose facts must be correct without fail. This skill owns the formations and the loop, not the domain: a research method says what must be true, a design or deck skill supplies the domain reference, a routing layer picks the models, and a rubric review closes the finished artifact at ship. Where one of those neighbors is not installed, do its job inline and say so.

A **seat** is one isolated agent role: builder, critic, judge, or verifier. A **formation** is how many seats a job gets. A **ceiling** is the budget in rounds or tokens, written down before any isolated seat is spawned. A **tell** is what gave the attempt away to a judge.

## Why a reference beats a rubric

A rubric is a lossy compression of a reference. It survives compression when the criteria are mechanical, which is why rubric reviews work on contracts, memos and backtests. It fails when the quality is experiential: a frontend that feels expensive, a deck that lands in the room, prose that does not read as generated. Written as criteria, those become "make it polished", which is a defect in any instruction, because nothing can fail it with a quote.

So do not write the criteria. Name a specific artifact that already clears the bar, and make the pass condition comparative rather than absolute: a judge who never saw the build can name nothing but identity tells to separate it from the reference (step 4).

Verification mode is the deliberate exception. Its bar is statable, the kill tests below, and it lives here anyway so that one skill owns the isolated-agent machinery for both kinds of unforgiving work.

## The gates, one per mode

Reference mode runs only when all four hold.

1. **A named reference exists and is out of reach.** A specific shipped artifact, inspectable, not a category and not a style name, and the build does not match it today. "Linear's settings page" passes. "Good design" does not. Neither does a house aesthetic, a visual style a design skill already encodes. It becomes a reference only when a particular shipped page is named and the current build is failing to match it; then the loop drives and the domain skill supplies. If a build triggers this skill and no reference is named, ask for one.
2. **The bar is not statable in advance.** If you can write three quotable criteria for the finished artifact, build against those criteria and check them with a rubric review; this loop does not apply.
3. **The build is unfinished.** This drives generation. Once the artifact is done, the check that applies is the rubric review at ship.
4. **You will actually keep pressing.** Starting the loop and accepting round one is worse than not starting, because you paid fan-out prices for a single draft.

Verification mode fires unprompted when both hold.

1. **The answer rests on facts outside the model across several load-bearing claims.** Heavy research, due diligence, multi-source synthesis. A quick lookup or a single figure does not raise a formation; a single numeric series belongs to a data pull.
2. **The stakes test passes.** Being wrong costs money or reputation, or the output feeds a public statement or a decision the user will act on.

Anti-triggers, both modes: chat answers, quick lookups, one-shot drafts, work where good enough is genuinely good enough, and Gauntlet (the DeFi risk manager), which shares nothing with this but a word. A complaint that one post reads as generated belongs to a style edit; this loop takes text only when it decomposes into areas that fail independently.

## Formations

Two levels. Light is the default; spend follows consequence, not effort.

| Formation | Seats | When | Cost anchor |
|---|---|---|---|
| Light | One builder or the drafting session itself, one isolated critic or verifier, one judge when the build is ready to ship | Default. Stakes contained, whatever the area count | 100k to 150k tokens, estimated |
| Full | A builder or verifier per area or claim cluster, an isolated critic, a panel of 2 to 3 judges | Stakes test passes: money, reputation, public statement, acted-on decision. Or the user says full gauntlet | About 325k subagent tokens per round, measured once in reference mode (08-08-2026); verification mode unmeasured |

The stakes test decides, whatever the area count: a high-stakes job with two claim clusters still runs full, one verifier per cluster. Escalation is automatic on the stakes test and overridden in either direction by the user's word. A loop may drop to light for a cleanup round; it never climbs silently, it names the escalation and the reason in one line. Unattended, escalation follows the same rule and the written ceiling stays the brake.

## Protocol, reference mode

### 1. Name the reference before building

Out loud, in writing, before a line is generated. The reference has to be one the build is not currently clearing, because a reference you already match sets the bar at your own default and the loop returns nothing.

Capture five things: the reference, the single property being matched (not all of them), how a judge will see it, the formation and why, and the ceiling that step 6 will hold. A reference nobody can show the critic is a reference the critic will invent.

| Reference is | Show the critic |
|---|---|
| A live page or app | Screenshot, or the URL if the critic can fetch |
| A surface where motion is the matched property | A screen recording, or the judge drives the live page in a browser. Stills converge the static frame while the actual gap stays open |
| A document or deck | The file, or the relevant pages |
| A product the critic cannot run | A written spec of the one property, plus any capture that exists |
| The user's own past best | The artifact itself, by path |

The last row is the strongest and the most underused. The user's own best work is inspectable, on-voice, and provably achievable, since the user already shipped it.

### 2. Decompose, then fan out

Split the build into areas that fail independently: structure, visual system, motion, copy, data correctness, edge cases. One builder per area at full formation, in parallel; the drafting session plus one critic at light. Areas, not slices of the same area, or the builders converge and the fan-out buys nothing.

Name the assembler before the fan-out. The orchestrating session splices the areas into one artifact against a slot contract agreed up front: the list of sections each builder fills. Assembly is mechanical; an unfilled slot, an orphaned block, or an edit the assembler is tempted to make is a finding for that area's builder, never something the assembler quietly patches. A finding that spans two areas is split by the assembler into one edit per owning builder.

Builders run on a workhorse seat, a cheaper and faster model. Only the critic and the judge pay frontier prices. Pin the model on every seat and check the model each agent actually ran on; in some orchestrators the session's model choice does not reach subagents. Where the surface cannot spawn parallel agents, run the areas sequentially in fresh contexts; the isolation is the requirement, the parallelism is only the speed.

### 3. Critic that never saw the build

A separate context, given the artifact and the reference and nothing about how the artifact was made. A critic in the builder's context inherits the builder's satisfaction. Where the artifact runs, the critic runs it; a verified finding outranks a read one. Freeze the artifact while the critic and the judges read it: a verdict on an artifact that changed under the reader cannot be attributed to a version.

The critic's instructions, verbatim:

- Name the specific gap to the reference. "Worse than the reference" without a named gap is not a finding.
- Every finding maps to one area and one edit. A finding no builder can act on is commentary.
- Do not praise, do not summarize, no preamble.
- Rank by how much closing it moves the artifact toward the reference, not by how easy it is.
- Being harsh is the job. A critic that finds nothing on round one did not look.

### 4. Blind judge, the actual stop condition

Show the judge both artifacts, unlabeled, in random order, and say what the pair is: one shipped by the reference author, one an attempt to match it. Ask which is the attempt and what gave it away, every tell tagged either craft, fixable by editing the artifact, or identity (age, adoption, ecosystem, brand), which no edit reaches. Do not ask which is better, which invites diplomacy. Do not ask which one the reference author made and leave it there: a famous reference is recognized on sight, so the bare pick measures recognition, not the gap. The pick saturates; the tells carry the verdict.

| Judge says | Read |
|---|---|
| Spots the attempt and names a craft tell an edit can close | Not there. The top craft tell is the next round's brief |
| Spots the attempt but names only craft tells that do not matter | Close. Press the single property from step 1 |
| Names only identity tells, or picks the reference as the attempt, or cannot choose, or the panel splits | Done. Stop, ship it |

At full formation run 2 to 3 judges across at least two model families where the stack allows; a same-family judge shares the priors that produced the gap. One judge guessing right is coin-flip evidence. Where only one family is available, use two model tiers and say the verdict is weaker. Where the reference cannot be shown, one judge holds the written spec and the verdict is weak; say so.

### 5. Loop, and report the delta

Each round: critic findings, builders fix their own area only, judges re-run (every round at full; at light, one judge when the build is ready to ship, and a craft tell from it opens another round). Report one line per round with the delta, the change in open craft tells and critic findings since the previous round, so the trend is visible. A loop whose delta stops moving is finished whatever the judge says: stop and report the trajectory.

### 6. The user is the brake

There is no round cap. The loop stops on the user's call, on judges that stop spotting the attempt by craft, on a delta that stops moving, or on the ceiling written at step 1. A round that would breach the ceiling mid-flight does not start. Unattended, the ceiling is the brake: the loop runs to it, parks with the round-by-round trajectory as the report, and ships nothing on its own. Resuming past the ceiling is the user's call, made on the trajectory.

### 7. Log the run

One line at the moment the loop stops: mode, formation, artifact, reference or claim set, areas, rounds, tokens, and the judge or verifier trajectory. The line goes to durable notes (a memory file, a project log), never only the session's scratch directory, which is discarded with the session. Once three runs each of light formation and of verification mode are logged, use those numbers in place of the estimates in the Formations table. A loop that does not log pays for the same lesson every time.

```
08-08-2026 | reference | full | project README | ref: sharkdp/bat README | 3 areas | 1 round | ~325k subagent tokens | judges: NOT THERE, NOT THERE | parked at 400k ceiling
```

## Protocol, verification mode

The research method runs scoping, fan-out search, and source grading in the drafting context, as always. This skill decides who runs the adversarial stage and seats them. It works from an observation, not a measurement, made across the author's long multi-agent research builds: every layer caught errors in the layer below it and introduced errors only the next layer caught, and no layer's confidence predicted its accuracy. So the defense is the chain, not any single pass.

1. Self-checks first. The drafting context runs its own checks before the gauntlet. The gauntlet runs after them, never instead of them, and without asking permission when the stakes test passes.
2. List the load-bearing claims, set the formation, write the ceiling. Formation per the Formations table: one isolated verifier for all claims at light, one per claim cluster at full. Write the ceiling in rounds or tokens before any verifier is seated.
3. Seat the verifiers. They never see the drafting context's reasoning. They get the claims, where each came from, and this brief, nothing else. The brief tells them, before they look:
   - which claims the draft already labels unsourced or unverified, so a declared gap is not reported as a defect;
   - which self-checks ran and what each found, so they re-run each one independently rather than trust it;
   - which primary-data tools are available and how to load them. A verifier that does not know a tool exists reverts to web search and the kill tests weaken.
4. Run the kill tests, verbatim, on every claim.
   1. Search for the direct contradiction.
   2. Trace to the primary source. If the chain ends at an aggregator, the claim is unverified.
   3. Recompute any number that can be recomputed. For on-chain figures, a direct contract or storage read at a stated block is the recompute path.
   4. Re-fetch every figure quoted from a live source and compare the figure, the source, and the as-of date against what the draft says.
   5. Check the date on every figure. Flag anything older than its natural refresh cycle.
   6. Label the survivors: verified (one tier A source, or two independent tier B), reported (a single tier B), unverified (everything else).
5. Kills and survivals are asymmetric. Any kill with a quote or a primary-source trace stands. Survival requires the verifier to have run every test, not to have found nothing while skimming.
6. Fix or relabel, re-verify only the claims that changed, stop. Unverified claims ship only labeled, with what would settle them. The step 2 ceiling and the unattended brake from reference mode step 6 apply unchanged.
7. Say when it did not run. Where no isolated verifier can be seated, run the self-checks and state in the deliverable that no independent verification pass ran.

Source tiers the verifiers grade against:

| Tier | What | Weight |
|---|---|---|
| A | Primary: filings, official docs, on-chain data, datasets, the actual paper, the actual contract | A load-bearing claim can rest on one |
| B | Named-author reporting at established outlets, counterparty documentation | A load-bearing claim needs two independent |
| C | Aggregators, SEO content, unnamed sources, AI-generated summaries | Leads only, never citations |

Two outlets citing the same press release are one source. A figure a data tool proxies from a vendor grades as that vendor, never as the tool, and counts as that vendor for independence. Never average conflicting numbers: resolve the conflict, or present both with the reason they differ.

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

## Portability

In Claude Code, fan out with subagents or a workflow script, and use `/loop` to pace rounds. The keyword `ultracode` in a prompt runs that one task as an orchestrated workflow, which suits a full-formation loop; `/effort ultracode` does the same for the whole session. On any other agent, run each seat as a fresh context with only its brief; sequential works, shared context does not. Some chat surfaces can spawn only one model family, so the two-family judge rule degrades to two tiers there. Say so in the log line.

## Dated context, 18-09-2026

- Origin: Matt Shumer ran the loop in the prompt behind Claude of Duty and named it the Gauntlet Loop in a write-up dated 27-07-2026. RoboNuggets packaged it as a skill that writes a paste-ready loop prompt. This version runs the loop in session and adds verification mode, used privately from 08-08-2026 and published 18-09-2026. Verification mode knowingly risks collisions with the research method and the rubric review; if a request misroutes, add or sharpen a clause in the description that separates this skill from the one that took it, and keep the description under 450 characters. The current description has such a clause for the rubric review only.
- First measured run, 08-08-2026, reference mode smoke test (a README driven at sharkdp/bat's README): one full-formation round, 3 workhorse builders, 1 frontier critic, 2 judges, roughly 325k subagent tokens and 8 minutes wall. Both judges said NOT THERE, agreeing with the critic. The critic caught an output block the assembler had doctored, so isolation held. The 400k ceiling parked the loop before round 2, so the unattended brake held on its first live test.
- Step 4's question and table were rewritten 08-08-2026 after that run: the question then in use was answered by brand recognition, not craft, so the pick carried no information about the gap. Craft-versus-identity tells are the fix.
- Routing checks, 08-08-2026, on earlier and longer descriptions: 23 of 24 correct across two blind seats, then 5 of 5 after a fix to the clause separating this skill from the research method. The current, shorter description drops that clause and has not been rerun.
- Keep the description under 450 characters and lead with the trigger phrases. Skill listings have a character budget; in Claude Code it scales with the context window, and on overflow the least-used skills lose their descriptions first and keep only their names.

## Eval

1. Give it "build me a pricing page as good as Linear's". Passes if, before generating, it names the reference, the single matched property, how the judge will see it, the formation, and the ceiling, then decomposes by independent area (one builder per area only at full formation) and states the craft-tell stop condition. Fails if it writes a rubric in place of a reference.
2. Give it "dig into whether Hyperliquid's fee revenue really passed Ethereum's, it goes in a public thread this week". Passes if verification mode fires unprompted at full formation (public statement), seats isolated verifiers told which primary-data tools they have, each verifier runs every kill test on every claim, and every claim ships labeled verified, reported, or unverified. Fails if the drafting context's self-checks stand in for the isolated verifiers, or if a "check this before I send it" request on a finished artifact gets taken from the rubric review.

Adapted from [robonuggets/gauntlet-loop](https://github.com/robonuggets/gauntlet-loop) (Jay E, RoboNuggets) under CC BY 4.0. Source, changes, and more eval cases: [EauDoon/gauntlet-verify](https://github.com/EauDoon/gauntlet-verify).
