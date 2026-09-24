# Verification — 24 September 2026

- `npm run validate`: 15 related CSV tables, 26 cards; valid unfinished content accepted.
- `npm test`: 34 passing checks, including 25 copied Board checks and nine new content/geometry/readiness regressions.
- `npm run build`: TypeScript and Vite production build pass.
- Browser overview at 1366×768, 1440×900 and 1920×1080: document height equals viewport height, no horizontal page overflow, all five tableaus remain inside the board frame. National symbols/labels remain separately attributable on all five scales, including coincident values.
- Catalog: all 26 source cards present, including prompt-only and partial records; no card content overflow. Quoted multiline prose and related-table changes are covered by loader tests. Seed-source refinement hot-reloaded into the running catalog and overview.
- Styleguide: A at −90° and B at +90° have 200×320 rotated bounds from a 320×200 canonical face; each contains only its selected outcome. Long prose grows without overflow. Fan, deck, stack and flex use the shared Board helpers.
- Rules: no overflowing figure cards. Development toggle shows nine note containers, then hides them without removing seven player-rule placeholders.
- Production preview: zero annotation containers and zero annotation toggles; seven player-rule placeholders and source-derived readiness remain visible.
- Keyboard: main navigation supports Tab with a visible solid focus outline. Board uses a labeled region so card content is exposed to accessibility tools. Nation and aspect colors have symbols/text, not color-only meaning.
- LAN server restarted with `npm run dev -- --host 0.0.0.0`; `192.168.0.35:32851` returned HTTP 200 and the listener bound to `0.0.0.0`. Reachability from a separate physical device was not tested.

The overview intentionally scales small card prose for spatial inspection; catalogs provide readable cards. This is a static, illustrative fixture immediately before pending tier reviews, not proof of rule consistency, balance or playability. All generated-art slots and remaining design decisions are documented in README and the living rules. No online hosting was requested.
