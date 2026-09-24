# Authoring the workbench

## Contributor sequence

1. Read/update the affected view's `view.prompt.md` and local `view.meta.ts` tasks.
2. Identify existing components and missing variants.
3. Refine presentational components in the Styleguide first.
4. Register variants and “use when” definitions there.
5. Compose the view and connect content records.
6. Update local metadata and inspect the affected view at its target sizes.

Content and fixtures are descriptive. Do not add a game engine, gameplay controls or invented answers to unresolved rules. Use confirmed Employment and Welfare names; Wealth and Energy remain unchanged.

## CSV source of truth

Edit UTF-8 CSV in a spreadsheet or text editor. `scripts/seed.mjs` records the initial one-time authoring operation; **do not rerun it after editing CSV**, because it overwrites those source tables. The app/build do not run it. Vite imports all CSV with hot refresh. Papa Parse supports quoted commas, escaped double quotes (`""`) and multiline fields. Preserve stable IDs when revising prose.

| Table             | Relationships / purpose                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| subjects, aspects | Distinct provisional taxonomies, icons, semantic colors and prompts                                                                           |
| cards             | Stable ID, kind, optional scope/subject/tier, required content prompt, optional prose/art, authoring status, decision mode, reveal activation |
| resolutions       | Card ID and outcome key A/B/enact; outcome prose and prompt                                                                                   |
| card-aspects      | Card + outcome + aspect IDs; strictly positive weighted quantity                                                                              |
| voting-aspects    | Card and eligible aspect IDs, independent from subject; pipe-separated ballot options                                                         |
| effects           | Card + outcome, timing, target, optional scale/side/value, descriptive text/prompt                                                            |
| requirements      | Card, optional aspect/count, descriptive proposed prerequisite and open special-rule prompt                                                   |
| expiry            | Card + subject + absolute tier; explicit permanent flag; combination remains unresolved                                                       |
| illustrations     | Stable ID, required illustration prompt, optional public asset URL/path and status                                                            |
| scales            | Labels/meanings, illustrative range and world value                                                                                           |
| nations           | Public placeholder identities with symbols, colors and required identity prompts                                                              |
| limits            | Nation + scale + lower/upper side, illustrative value and provenance                                                                          |
| goals, ballots    | Scoring prompts and static ballot definitions                                                                                                 |

All numeric fixtures are illustrative. Effects do not compute state. Climate lower/upper fixture markers demonstrate a provisional treatment. Do not infer any/all expiry from row order. Do not restore obsolete personal offsets or historical Climate signs.

## Add a prompt-only card

Add a row to cards.csv with a unique `id`, `kind` and `prompt`. All other fields may be blank; setting status to `prompt` is recommended. Example under the existing header:

```csv
"local-research","Project","","","","Explore public access to automated research.","","","","prompt","unresolved","","Unfinished content"
```

It appears automatically in its catalog, with derived writing prompts instead of fabricated statements, outcomes or art. Later add resolutions linked by card ID, then aspects/effects linked by card ID and outcome key. Set `defined` only when title, statement and at least one written resolution exist. This means authored, never confirmed or balanced. Missing art remains a valid prompt state.

Run `npm run validate` to find invalid IDs, numbers, references and required prompts with file/row/field context. Valid unfinished content does not fail the build. Readiness counts derive from missing fields. Open Living rules in development and turn on design notes to collect rule questions and view-local tasks.

## Inspect changes

Start `npm run dev`. Check the shared component in Styleguide, its Catalog record, any linked rule figure, and its fixture use. Overview targets 1366×768, 1440×900 and 1920×1080; card prose is intentionally small there and readable in document views. Confirm chosen effects/aspects/expiry remain exposed and A/B hides the inactive resolution. Test keyboard navigation, visible focus, and symbol labels independently of color.

Before delivery run `npm test` and `npm run build`; production preview must retain unfinished player prose but omit design-note controls and annotations.
