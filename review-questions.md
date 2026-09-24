# Independent review — questions for the designer

Status: the user has answered all four sets, with three follow-up clarifications. Answers below supersede the original questions where resolved; remaining details are explicitly marked. The original question wording is retained as review history.

An independent read-only subagent reviewed `design-discovery.md`, `prototype-plan.md` and the conversation. The primary agent consolidated 27 questions in four sets. Current design is reflected in the discovery record and updated prototype plan; this file preserves question/answer provenance.

The review supports the static, non-playable designer overview. Gameplay gaps do not block that version when represented explicitly as unresolved content. No game implementation, networking or interactive play is added by this review.

## Main findings

- Deck subjects and resolution aspects use different vocabularies. Matching-aspect voting needs an explicit voting-aspect rule or mapping; otherwise Governance, Ecology, Industry and Social may lack corresponding votes in the provisional deck set.
- “National” clearly specifies who decides, but does not yet specify the default target of scale effects. Personal Employment bonuses and national collapse thresholds can lead to different survival outcomes depending on the comparison.
- Voluntary event selection and prerequisites can leave both face-up slots in a subject deck unwanted or unusable, potentially freezing that subject's advancement.
- Review votes, card expiration and resolution changes need distinct timing and accounting rules.
- A three-deck ending can trigger as the final capstone is revealed, before it can be built. Its timing and precedence with collapse need clarification.
- The app's living rules and the discovery document need a clear source of authority to avoid contradictory edits.

Routine implementation choices remain the implementer's responsibility: CSV parser choice, canonical card dimensions, stable question IDs, distinguishing missing from inapplicable fields, and deduplicating readiness counts.

## Answers and remaining details

| ID | Recorded answer | Remaining detail |
| --- | --- | --- |
| A1 | Late-game overview. | None needed for layout direction. |
| A2 | Write additional provisional cards so the board is not mostly empty. | Exact seed count is an implementation/content choice. |
| A3 | Living rules become the real player rulebook when complete/TODO-free. Keep notes and reasoning, hide in production, add dev toggle. | Current rules and annotations need separate render layers. |
| A4 | Dark content is acceptable, no gore/explicit violence; implied disorder/crime allowed; simple policy/clinical language. User permits 16+ if appropriate. | Assistant selects provisional 16+ editorial target, not a formal classification. |
| A5 | Adaptation to ongoing AI, digital automation, robotics and climate pressures, not eliminating those pressures. Plan research into actual predictions. | Research plan created; forecast synthesis not yet conducted. |
| A6 | Show selected resolution, aspects, ongoing effects, scale adjustments and expiry. Hide ineffective resolution. | Layout must preserve these when overlapping. |
| B1 | National scale changes apply only as an adjustment to the current player. | Exact effect wording follows revised national-limit model. |
| B2 | Use publicly visible effective national limits on ALL scales, moved by Events. | Climate's two sides, numerical comparisons and scoring inputs still open; old personal-offset collapse model superseded. |
| B3 | Low world Wealth reduces world Welfare. | Exact threshold/amount and other penalties open. |
| B4 | Revealed crises activate immediately; National crises automatically go to the revealing player. | Setup assignment and A/B crisis handling still open. |
| B5 | Another player may resolve the crisis and pays the cost themselves. | Cost unit/source and affected-player consent were not answered. |
| B6 | Projects and Policies each have one effect; World versions are voted into play or discarded without effect. | Exact World project ownership/cost cooperation remains open. |
| B7 | Prerequisites count World cards plus your own National cards only. | Build-only versus maintained prerequisites was not answered. |
| C1 | Each event specifies eligible voting aspects. | Vocabulary may be edited without tying it to deck labels. |
| C2 | Minimum voting strength is one. | Recorded as a floor rather than +1 to all totals. |
| C3 | Yes/No/A/B/Abstain are valid as appropriate to event type. | All-abstain/review tie details remain open. |
| C4 | Multiple eligible kinds add; multiple copies of a kind allowed. Follow-up confirms full strength reusable, never spent. | None for basic counting/reuse. |
| C5 | Original deck clock remains relevant; expiration uses absolute tiers of one or more subjects. | Multi-condition any/all logic open. |
| C6 | Selected Event finishes resolving, then review and discard. | Multiple transitions from chained crisis draws need ordering. |
| C7 | Nominations only from advancing subject, no event nominated twice. Follow-up: all matching cards count, including surviving and outgoing cards, before discard. | Nomination order, optionality and initiating player remain open. |
| C8 | Undo previous proposal, then apply the new one. | Non-additive/capped effects and obsolete targets need rules. |
| D1 | Players may pass voluntarily or when blocked; a pass may discard one Event except a capstone. | Printed reminder should distinguish a pass from a crisis-remedy action. |
| D2 | Capstones are at deck ends, use normal project action, can have special rules. | Exact capstone effects/requirements remain unbalanced/provisional. |
| D3 | Both normal endings wait for round end, all players equal turns; collapse takes precedence. | None for basic timing/precedence. |
| D4 | World events intentionally trade personal growth for influence over the world/goal direction; no extra personal benefit needed. | Balance to be playtested later. |
| D5 | Ordinary goals may reward close-to-collapse states. | Formulas and tie resolution remain open. |
| D6 | No special Anarchist sabotage or treatment unless playtests establish a need; ordinary hostile cards can exist. | Any later special-role mechanics are deferred. |

Additional crisis-placement clarification: an activated crisis immediately leaves the display for its national/world area. Refill continues until two non-crisis choices are available or the deck runs out, so multiple crises may enter play from one refill.

## Original review questions

## Set A — prototype content and presentation (6 questions)

These choices improve the static overview and initial content. References: `prototype-plan.md`, Working assumptions; Views and their prose briefs; Content sources and incomplete definitions; Rules, open questions and living readiness. `design-discovery.md`, Fiction and themes.

**A1. Board snapshot:** Should the main overview depict a representative midgame, or a crowded late game with accumulated projects, policies and crises near collapse?

**A2. Example content:** Should we use your existing examples plus prompt-only placeholders, or also write additional explicitly provisional cards to demonstrate every component and state?

**A3. Rule authority:** Once the app exists, should its living rules become authoritative, with discovery notes retained as interview history, or should the app's rules be generated from the discovery record?

**A4. Writing tone:** For the 14+ audience, should cards name themes such as suicide, famine and repression directly in restrained factual language, or describe them indirectly?

**A5. Future branches:** Which developments are unavoidable background pressures, and which can players prevent? For example, must automation eliminate most paid work, or could policy preserve a high-Employment future?

**A6. Tableau visibility:** When cards overlap in fans or stacks, what must remain visible: chosen aspect, selected resolution, ongoing effect, tier, expiry, or all of those? This determines card edges and useful layout density.

## Set B — scales, projects and crises (7 questions)

These are game-design questions affecting labels, examples and eventual mechanics. References: `design-discovery.md`, Core concept; Proposed card system; decision register D04, D13–D16.

**B1. Effect targets:** Do National events normally change shared world tracks, while Projects provide personal modifiers, or does each card explicitly choose world versus national targets?

**B2. Employment comparison:** World Employment is 3, a nation's personal bonus is +2, and its collapse threshold is 4. Does that nation survive because its effective Employment is 5, or collapse because world Employment is 3?

**B3. Recurring penalties:** Does low Wealth reduce world Welfare once per round, or reduce each affected nation's personal Welfare? Should the rules support both kinds of penalty?

**B4. Crisis activation:** Do ongoing crisis penalties begin when the card is revealed, or only after someone selects it? If only selected, leaving it in the display avoids its damage.

**B5. Crisis payment and consent:** When helping another nation, does the remedy spend shared Wealth, the helper's resources/modifiers, or whatever the card specifies? Must the affected nation agree, since removal also takes away its aspects?

**B6. Card actions:** Do Projects and Policies also have A/B resolutions, or are they single-action cards? For World versions, does a vote authorize construction/enactment?

**B7. Prerequisites:** Do project requirements count your national cards plus shared world cards, or cards belonging to every nation? Are requirements checked only when built, or must they remain satisfied afterward?

## Set C — voting, tiers and reviews (8 questions)

These resolve the highest-priority consistency gaps. References: `design-discovery.md`, voting paragraph; Proposed card system; Tier progression, aging and policy reviews. `prototype-plan.md`, provisional subjects and CSV tables.

**C1. Voting aspect:** For a Climate-deck event with Ecology and Economy resolutions, which aspect supplies votes? Should each event name a voting aspect separately from its deck and its two resolution aspects?

**C2. Zero aspects:** Does a nation with no matching aspects have zero voting strength or a minimum vote? If everyone has zero, does the initiator decide through the tie-break rule?

**C3. Ballots:** Should the standard ballot be Yes/No or Proposal A/Proposal B? Is Abstain a real third choice?

**C4. Reusing influence:** Can the same matching aspects contribute their full strength to every vote, including several votes during one review, or is influence spent or allocated between votes?

**C5. Expiration clock:** Does a Technology-deck card resolved as Governance still age with the Technology deck? Should its expiry specify an absolute tier, a number of tier advances after play, or permanence?

**C6. Transition timing:** When immediate refill reveals a new tier, does the selected event finish before the tier review, or does the review interrupt it? This determines whether the new card's aspects participate.

**C7. Review procedure:** May each player nominate a world event from anywhere or only the advancing subject? Do all matching national aspects vote, or only outgoing cards? Can an event be nominated more than once in that review?

**C8. Reversing resolutions:** When a world event switches from A to B, do we apply the numerical difference between the outcomes, change only ongoing effects, or use a separately printed transition effect?

## Set D — progression, endings and incentives (6 questions)

These can remain contextual open questions in the static version, but matter before playtesting. References: `design-discovery.md`, ending and Anarchist paragraphs; decision register D05–D09, D13, D18; ambiguities 14–16.

**D1. Blocked displays:** If both displayed cards in a deck are unwanted or impossible to build, can players bypass/discard one, or is freezing that subject's progress an intended strategy?

**D2. Capstone construction:** Is each capstone placed at the end of its deck and built through the normal take-a-project action once prerequisites are met? Can a World vote reject construction?

**D3. Ending precedence:** Does three-deck exhaustion also wait until round end? If collapse occurs in the same round as a capstone build or exhaustion ending, does collapse take precedence?

**D4. World-action incentives:** National cards grow a player's voting power and project prerequisites. Is the lack of that personal growth an intentional cost of choosing World events, or should the initiator receive a personal benefit?

**D5. Dangerous scoring goals:** May ordinary secret goals reward keeping a world scale close to collapse, or should they reward only safe/constructive outcomes? This determines how much deliberate risk-taking is expected from non-Anarchist players.

**D6. Anarchist tools:** Does the Anarchist use only ordinary actions and votes, or have additional sabotage abilities? Can other players expose or restrict them?
