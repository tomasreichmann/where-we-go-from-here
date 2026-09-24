# Repository guidance

Work in the current directory. Do not create a worktree unless explicitly requested.

This is a static design workbench. Do not implement a playable session or silently resolve unfinished mechanics. Read `prototype-plan.md`, `AUTHORING.md`, the affected view prompt and its metadata before changes. Follow the contributor sequence in AUTHORING.md. CSV is the content source of truth; typed loader models, fixture state and presentational components remain separate.

Keep player rules in `src/rules.ts`. Discovery and review documents are decision history. Development annotations are separate from player prose; production must hide the former but retain unfinished player-rule placeholders. All provisional values must remain labeled.

Scoped checks: content changes require `npm run validate`; component/logic changes require `npm test` and `npm run build`, plus visual inspection of affected views. Preserve the random non-default dev port and strict port behavior. Do not regenerate CSV seeds over authored changes.
