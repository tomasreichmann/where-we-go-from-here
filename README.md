# Where We Go From Here

A static designer workbench for a competitive game with shared survival. Built with Vite, React, TypeScript and Tailwind. Bright solarpunk surfaces; five public nations; provisional policy responses; a living rulebook.

## Run

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:32851. Port **32851** was randomly selected and verified free during implementation; strict port mode prevents silent changes. If occupied later, use `npm run dev -- --port <another-free-port>`. Production preview uses 32852.

For LAN access, use `npm run dev -- --host 0.0.0.0`. The current machine's address is http://192.168.0.35:32851 (the address may change with the network). The delivered running development server has LAN access enabled at the user's request.

```sh
npm run validate
npm test
npm run build
npm run preview
```

The four views are Overview, Content catalog, Styleguide and Living rules. Overview fits a populated late-game fixture to the viewport. All authored card text and numeric fixtures are illustrative. Real nations, bonuses, formulas and several mechanics are intentionally unfinished. Secret components are exposed for designer inspection. There is no gameplay input, enforcement, simulation or multiplayer.

See [VERIFICATION.md](VERIFICATION.md) for checks and their limits.

## Authoring and architecture

See [AUTHORING.md](AUTHORING.md) for CSV relationships, prompts, validation and contributor workflow. Source content is under `src/content`; overview placement and selections are in `src/views/board-overview/board-overview.fixture.ts`; components consume props. `src/rules.ts` maintains player-facing current rules separately from each section's developer annotations. Historical documents remain decision/research records.

Development has a **Show design notes** toggle. Production renders no toggle or developer annotations. Unfinished player-rule placeholders and content readiness counts remain visible in both builds. Every view owns `view.prompt.md` and `view.meta.ts`; the registry collects the same local tasks rather than maintaining a second checklist.

## Remaining design decisions

- Actual nations, starting bonuses, score equations and tie handling.
- Climate limit sides, collapse comparisons, bounds and stacking.
- Setup crisis owners, automatic A/B crises, remedy costs/consent and matching remedies.
- Maintained prerequisites and distinct capstone special rules.
- Any/all multi-subject expiry, review order/initiators, multi-tier refill chains and non-additive reversal.
- Penalty ordering, amounts and cascading thresholds.

See Living rules for contextual questions and [design-discovery.md](design-discovery.md) for decision history. The 24 written cards are provisional examples, not balanced decks. Two further cards intentionally demonstrate unfinished states. All 26 illustration slots remain prompts; generated art and forecasting research are future work.

## Reused Board code

`src/lib/board/boardController.ts`, `boardLayout.ts` and their tests were copied from the local `mighty-decks-ai-storyteller/apps/web/src/lib/board` source, as requested. The original repository was not changed. The new `Board` is a reduced static adaptation of its canonical item renderer and viewport transform, with ResizeObserver fitting and no interaction/provider dependencies. Center-rotation bounds were corrected locally; source layout helpers and tests are retained for fan/deck/stack/flex reuse. No application, story or multiplayer code was imported.
