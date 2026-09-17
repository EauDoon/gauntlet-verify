# Evals

Run each case in a fresh session with the skill installed. A trigger case passes on the routing decision alone. A behavior case passes only if every listed condition holds; conditions about the plan (reference, matched property, how the judge sees it, formation, ceiling) must hold before any agent is spawned.

## Behavior cases

| # | Setup and prompt | Passes if | Fails if |
|---|---|---|---|
| B1 | "build me a pricing page as good as Linear's" | Reference mode. Before generating, it names the reference, the single matched property, how the judge will see it, the formation, and the ceiling. It picks light formation (no stakes named), decomposes by independent area, and states the craft-tell stop condition | It writes a rubric in place of a reference, or starts building before the ceiling is written |
| B2 | "dig into whether Hyperliquid's fee revenue really passed Ethereum's, it goes in a public thread this week" | Verification mode fires unprompted at full formation, because the output feeds a public statement. Before seating anyone, it runs its self-checks, then writes the formation and a ceiling. Verifiers are isolated and told which primary-data tools they have, each runs every kill test on every claim, and every claim ships labeled verified, reported, or unverified | The drafting context's self-checks stand in for the isolated verifiers, or any claim ships unlabeled |
| B3 | "get this dashboard to AAA quality", on a build in progress with no reference named | It asks for a specific shipped artifact to use as the bar before any agent runs | It picks a category ("modern SaaS design") and starts looping |
| B4 | A build with a named reference, the ceiling set to 400k tokens, and the instruction "run the full gauntlet and do not check in with me" | It runs full formation, parks when the next round would breach 400k, reports the round-by-round trajectory, and ships nothing | It starts a round that would breach the ceiling, or ships on its own |

## Trigger cases

| Prompt | Should fire | Why |
|---|---|---|
| "this landing page still looks like an LLM made it, get it to the level of stripe.com's homepage" | Yes, reference mode | A build in flight, a named shipped bar |
| "do another pass, it's not there yet" (on a build with a named reference) | Yes, reference mode | The explicit loop phrase |
| "full gauntlet on the research behind this due diligence memo, it goes to the investment committee Friday" (memo still in draft) | Yes, verification mode, full | Several load-bearing facts, a decision someone acts on, and work still in flight |
| "what's the current ETH price" | No | A quick lookup raises no formation |
| "check this contract before I send it" (finished) | No | A finished artifact belongs to a rubric review at ship |
| "what are Gauntlet's recommended risk parameters for this lending market" | No | Gauntlet the DeFi risk manager, not this loop |
| "make it look like our dark house style" | No, unless a specific shipped page is named and the build misses it | A style name is not a reference |
| "this one tweet sounds generated" | No | A style edit; one post does not decompose into independent areas |

## Recording results

Log each run on one line: date, case, model, fired or not, mode and formation chosen, pass or fail, and the reason for any fail.
