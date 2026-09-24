# Static designer prototype plan

## Outcome and scope

Build a low-fidelity design workbench for **Where We Go From Here** using Vite, React, TypeScript and Tailwind. Its main artifact is a populated late-game five-player overview fitted to a laptop viewport. Component catalogs, a styleguide and illustrated living rules make the design inspectable as content evolves from prompts into finished definitions.

This version is a static designer overview. It does not implement a playable session, rule enforcement, card dragging, voting input, turn controls, multiplayer, AI players or private-player screens. Site navigation, document scrolling and a development-only rules-annotation toggle are included. No app implementation is part of the current planning task.

Confirmed game decisions and unresolved mechanics remain recorded in [design-discovery.md](./design-discovery.md). The prototype must distinguish confirmed design from illustrative fixture values.

## Working assumptions

- Use a 1366 × 768 CSS-pixel viewport as the initial laptop reference; also verify at 1440 × 900 and 1920 × 1080. This is a layout target, not a new game requirement.
- Write additional provisional cards to populate a credible late-game table; the main board should not be mostly empty prompt frames. Retain prompt-only/partial examples in the catalogs and styleguide. Determine exact counts from the five-player composition; full balanced decks are not required.
- Use Technology, Society, Economy and Climate as **provisional display subjects** until the taxonomy is settled. Keep subjects in data so changing their names/count does not require rebuilding card components.
- Keep the confirmed scale names Employment, Welfare and Climate; retain the original Wealth and Energy names until replacements are agreed.
- Use explicit prompt-bearing nation placeholders where actual countries and starting bonuses have not been selected. Do not invent national traits and present them as approved design.
- All numeric fixture values, costs and examples not confirmed in the discovery record are labeled illustrative. No formula evaluation or game simulation is needed.

## Views and their prose briefs

Each view starts with a collocated prose prompt stating its audience, purpose, content hierarchy, component needs, expected states and remaining questions.

| View | Prose brief | Required content |
| --- | --- | --- |
| Board overview | Show a populated late-game world and all five nations at once, including visible vulnerability and accumulated adaptations. | Five world tracks with visible national limits on every scale; illustrative two-sided Climate limit treatment labeled provisional; two non-crisis choices per deck where available; active crises in national/world areas; tiers; world issues; five tableaus; projects/policies; ballots and secret goals; review/discard area. |
| Component styleguide | Let a contributor find the right presentational component and understand when to use it. | Semantic tokens, typography, component index, “use when” definitions, variants, sizes, states and realistic content stress cases. |
| Content catalogs | Let a designer inspect all authored game components from bulk-editable sources. | Separate lists by component type, prompt/partial/defined states, readable card examples, stable IDs, missing-field prompts and associated open questions. |
| Rules and readiness | Develop the actual player rulebook while keeping contextual reasoning and unfinished design available to developers. | Player-facing rule prose and shared-Board examples; development toggle for notes/reasoning/questions/TODOs/readiness; annotations hidden in production. |

Use a simple shared navigation shell. Reserve the remaining viewport for the overview; catalogs, styleguide and rules can scroll normally.

## Content sources and incomplete definitions

Use UTF-8, spreadsheet-friendly CSV as the source of truth for game content. Load through a CSV parser supporting quoted commas and multiline fields; do not parse with string splitting. Choose an existing suitable dependency where available, otherwise add one small parser during implementation.

Suggested tables:

| Source | Purpose |
| --- | --- |
| `subjects.csv`, `aspects.csv` | Stable IDs, labels, icon names, semantic color roles and prompts; keep deck subjects distinct from chosen resolution aspects. |
| `cards.csv` | ID, kind, scope, subject, tier, content prompt, optional title/statement, illustration reference, authoring status and decision mode: A/B, Yes/No, single effect or unresolved. Crises also indicate reveal activation. |
| `resolutions.csv` | Card ID, outcome key, optional label/text and prompt. A/B events have alternatives; Projects/Policies have one enacted outcome. Rejection discards World Projects/Policies without that effect. |
| `card-aspects.csv` | Card/outcome ID, aspect ID and positive quantity. Support multiple kinds and repeated aspects such as Economy ×2. |
| `voting-aspects.csv` | Card ID and eligible aspect ID, independent of deck subject. Ballot options can be listed in a related table or a documented simple field. |
| `effects.csv` | Card/outcome owner, timing (immediate/ongoing), target (world value/national limit/rule), scale/limit side, optional value and plain-language effect/prompt. Descriptive data, no game engine. |
| `requirements.csv` | Project/capstone prerequisite descriptions and optional structured counts/aspect references. |
| `expiry.csv` | Card ID, triggering subject and absolute tier; multiple conditions per card, optional explicit permanence. Any/all combination remains unresolved and must be labeled rather than defaulted silently. |
| `illustrations.csv` | Stable ID, illustration prompt, optional asset path and status. A prompt is required even before an asset exists. |
| `scales.csv` | Labels, meanings and illustrative world ranges/values; national limits belong to fixture records with nation/scale/side IDs and provenance. Separate display values from confirmed rules. |

Allow prompt-only cards with an ID, kind and content prompt. Title, statement, resolutions, effects and illustration assets may remain absent. A missing asset renders its illustration prompt. A missing prose section renders its writing prompt; a short fallback prompt may be derived from the card's content prompt and field name, never from fabricated finished prose.

Normalize source rows into typed display models, retaining authoring provenance. Validate duplicate IDs, broken references, malformed numbers and missing required prompts. Separate **invalid data** from **valid unfinished content**: only the former blocks the build. Report useful file/row/field context.

The initial content set includes revised versions of the user's examples plus additional authored provisional cards. Ensure the table shows real statements, outcomes and effects rather than mostly empty shells. Include capstone examples with proposed, visibly provisional requirements and distinct special-rule prompts when unfinished. Show partial records intentionally in the styleguide/catalog. Do not present obsolete shared-versus-national effects or historical Climate signs as current approved rules.

Represent: immediate National and World crises, a refill chain in a rule figure, national-limit adaptation on several scales, weighted aspects, an event accepting multiple voting aspects, single-effect Projects/Policies, both A/B orientations, a persistent early policy, multi-subject expiry, a near-collapse secret goal and late capstones. Research findings can later refine the fiction without making the static prototype depend on a full forecasting study.

Provide an authoring guide explaining relationships, stable IDs, editing quoted prose, adding a prompt-only record and previewing changes. Catalog lists must derive from these sources rather than duplicate the data inside components.

## Visual system and components

Art direction: bright solarpunk futuristic minimalism, with 16+ as a provisional editorial audience target under the user's authorization, not a formal age rating. Use light warm surfaces, clear dark text, botanical/sky accents and restrained shapes. Dark themes, implied crime and disorder are allowed; no gore or explicit violence. Use clear public-policy language that teenagers can understand, with clinical wording only where it improves precision. See research-plan.md for the rating and sensitive-language references.

Tailwind theme tokens cover surface/background levels, primary and muted text, borders, accent, danger/warning/success, typography and spacing. Subject/aspect colors, nation identities and semantic warning colors have different roles. Pair color with labels, symbols or patterns so nation cubes and aspects remain distinguishable without color alone.

Start with reusable presentational components:

- Prompt placeholder, status badge, aspect symbol, effect row, requirement row, illustration frame and contextual design question.
- Card frame plus event, project, policy, nation, secret-goal and ballot presentations; crisis/breakthrough variants; capstone variant.
- Shared scale, two-sided Climate scale, national-limit markers/summaries for all five scales, tier/expiry indicators and weighted reusable vote-strength display.
- Board region, fan, deck, stack, discard area and world/nation tableau compositions.
- Rule section, Board figure, local TODO list and readiness summary.

Each component's styleguide entry includes its “use when” definition and variants. Card demonstrations include prompt-only, partial, fully written with illustration prompt, A-selected, B-selected, long text, ongoing crisis and non-expiring policy examples.

Keep source content, fixture state and rendering separate. Components receive data through props and do not read CSV, derive game outcomes or own session state.

## Scalable cards and board reuse

Adapt the existing implementation from:

`C:/Projects/mighty-decks-ai-storyteller/apps/web/src/components/board`

Relevant supporting files are `apps/web/src/lib/board/boardController.ts`, `boardLayout.ts` and the small class-name helper. Copy only the required local subset into this project, preserving the original project. Replace its theme-specific styling. Do not import its application, multiplayer or story dependencies.

The inspected code already provides custom item renderers, rotation, viewport fitting, focus, fan/deck/stack/pile/flex layouts and a `StaticBoardFigure` wrapper. Reuse the static path with interaction disabled for this version; automatic fitting still responds to viewport changes. Verify rotated-item bounds and fit behavior before relying on them for the five-player table.

Prefer semantic HTML cards rendered at a canonical design size and scaled as a whole by the Board. Use relative internal typography/spacing so geometry remains consistent across the board, catalogs and rules. Reserve SVG for useful vector diagrams/symbols unless card prototyping demonstrates a specific benefit from full SVG cards.

Render the same card component at larger size in catalogs and rule figures. The overview is for spatial inspection, so small card text there is expected. Keep subject labels, scale states and nation-area headings legible at the reference viewport.

Model unresolved landscape orientation and selected A/B rotation explicitly: A is 90 degrees left, B is 90 degrees right. Lay out text so the active outcome reads correctly after rotation. In a tableau, selected resolution, aspects, ongoing effects, adjustments and expiry must remain exposed; hide the ineffective resolution. Use consistent exposed strips or staggered layouts that fit these fields. A full unselected card can still show both options. Single-effect Projects/Policies use their own applicable presentation.

The initial overview is a deliberately populated late-game state, with all five nations and shared regions. Favor authored provisional content in the board composition; place prompt-only samples deliberately rather than filling the table with them. National-limit positions must be attributable by symbol/label as well as color, including overlapping limits. Include static fan/deck layouts where the required active information stays visible. No controls should imply a playable game. Label normally secret components as shown for designer inspection.

## Rules, open questions and living readiness

The living rules become the actual player rulebook when complete and free of TODOs. Keep player-readable rules as the maintained source of current rules; preserve discovery/review files as decision history and research rationale. During development, every relevant rule section can show:

- Confirmed design, with any illustrative values clearly identified.
- Unresolved questions and their implications, near the rule they affect.
- Missing content or illustration prompts.
- Implementation tasks tied to the corresponding view/component.

Store rule prose and associated developer annotations separately within each structured section, with stable IDs. A development-only “Show design notes” toggle reveals/hides notes, reasoning, questions, TODOs and readiness annotations. Production renders the rule prose and examples without those annotations or the toggle. Do not solve an unfinished rule by hiding its absence: player-prose placeholders remain explicit during development, and readiness must still report them. Producing a final rulebook requires resolving them.

Keep content examples linked to CSV records and use the same `Board`/card renderers for rules illustrations. Avoid duplicated manually edited rules in discovery notes once the living rulebook is established; record decisions there as history and update current rule sections.

Show concrete readiness counts by category, such as rules with open questions, prompt-only cards, incomplete resolutions and missing illustrations. Do not claim a single percentage measures how finished or balanced the game is. Authored status and missing-field detection should agree; empty content must never be marked complete by accident.

Preserve these remaining questions contextually: setup crisis assignment; automatic crisis A/B handling; Climate limit sides and threshold comparisons; crisis-payment units and consent; continued project prerequisites; any/all multi-subject expiry; review order/initiator assignment; multiple tier transitions during refill; non-additive reversal; penalty ordering; nation bonuses and scoring formulas under the new national-limit model.

Previously open issues now have rules: reusable weighted votes with minimum one; explicit eligible aspects; all matching cards vote in reviews before outgoing cards are removed; one nomination per world issue from the advancing subject; current event completes before reviews; capstone and three-deck endings wait until round end, collapse first; normal pass can discard a non-capstone.

## View-local workflow and TODOs

Suggested view folder structure:

```text
src/views/board-overview/
  view.prompt.md
  view.meta.ts
  BoardOverview.tsx
  board-overview.fixture.ts
```

`view.meta.ts` is the single source for view TODOs, question links and readiness references. Views expose it through development annotations; a registry gathers the same metadata for readiness. No duplicate checklist. Rule-section annotations remain close to their prose and can link to view TODOs by ID. Production rendering hides development notes.

Keep the overview's fitted table intact: its local TODOs may live in a companion document section/catalog entry rather than overlaying or shrinking the board unexpectedly. The exact shell treatment should be resolved during the view's layout pass.

Document the required contributor sequence in repository guidance:

1. Read/update the view's prose prompt and local TODOs.
2. Identify existing components and any missing variants.
3. Add/refine presentational components in the styleguide first.
4. Register their variants and “use when” definitions.
5. Compose the view and connect its content records.
6. Update local readiness metadata and inspect the affected view.

This makes TODOs discoverable both to contributors touching a view and to designers inspecting readiness.

## Implementation sequence

1. **Foundation and design contract:** scaffold Vite/React/TypeScript/Tailwind, add the simple navigation shell, semantic theme and view prompts; record this static scope in repository guidance.
2. **Content pipeline:** define the CSV schema and loader, support prompt-only records, validate references, seed representative records and establish authoring/readiness metadata.
3. **Styleguide and scalable pieces:** build tokens, typography, placeholders, card primitives/variants, tracks and markers; register usage guidance and sizes before composing views.
4. **Shared Board and overview:** adapt the source Board subset, apply the new theme, implement the static five-player fixture and verify fit, layout and A/B rotations.
5. **Content catalogs and living rules:** show every content type, embed Board figures, write player-readable rules with contextual developer annotations, implement the dev toggle/production hiding and aggregate readiness.
6. **Verification and handoff:** inspect target viewport sizes, incomplete/long-content cases and source-edit refresh; run scoped checks and document how to run and author the prototype.

## Acceptance and verification

- The populated late-game five-player overview fits inside the available 1366 × 768 viewport without page-level board scrolling or clipped regions. All five scales expose attributable national limits; larger viewports remain composed correctly.
- Cards, tracks and layouts use the same rendering components in the overview, styleguide, catalogs and rules figures.
- Every component type has a styleguide entry with variants and a “use when” definition.
- A newly added prompt-only CSV card appears without requiring invented statement, resolution or illustration content. Related-table edits appear in every view using that record.
- Every missing illustration and placeholder prose block exposes its prompt. Confirmed content, illustrative fixtures and unresolved design are visibly distinguishable.
- Landscape, A/B-rotated and single-effect cards fit their bounds. Overlapping cards retain the selected resolution/aspects/ongoing effects/adjustments/expiry and conceal the inactive outcome.
- View-local TODOs and contextual rule questions appear in the collected readiness view without duplicate manual maintenance.
- The dev toggle shows/hides annotations without removing actual rules; production includes neither the toggle nor rendered developer notes. Readiness continues detecting unresolved player-facing content.
- Navigation, readable text surfaces, status indicators and color-coded pieces receive a basic keyboard/contrast/non-color-label check appropriate to a static site.
- Type checking, production build and content validation pass. Add focused checks for incomplete-record loading, CSV relationships, rotation bounds or readiness aggregation where they protect meaningful behavior; reuse applicable source Board tests when adapting its geometry. Do not build a game-engine test suite for this static scope.

Deliver the source, runnable local preview, authoring instructions and a concise list of remaining design questions. Game implementation, full deck writing, generated art and online hosting are later tasks.

## Parallel research preparation

The user requested a plan for research into real forecasts about AI, work, robotics and climate. See research-plan.md. Source discovery and editorial guidance have been checked; the substantive forecast synthesis is future work. Its evidence records should feed card prompts and developer notes, while the player rulebook remains readable without an academic literature review.
