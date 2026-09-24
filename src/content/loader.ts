import Papa from "papaparse";
export type Row = Record<string, string>;
export type Table =
  | "subjects"
  | "aspects"
  | "cards"
  | "resolutions"
  | "card-aspects"
  | "voting-aspects"
  | "effects"
  | "requirements"
  | "expiry"
  | "illustrations"
  | "scales"
  | "nations"
  | "limits"
  | "goals"
  | "ballots";
export const tables: Table[] = [
  "subjects",
  "aspects",
  "cards",
  "resolutions",
  "card-aspects",
  "voting-aspects",
  "effects",
  "requirements",
  "expiry",
  "illustrations",
  "scales",
  "nations",
  "limits",
  "goals",
  "ballots",
];
export type Content = Record<Table, Row[]>;
export function loadContent(sources: Record<string, string>): Content {
  const data = {} as Content;
  const errors: string[] = [];
  for (const name of tables) {
    if (!sources[name]?.trim())
      errors.push(`${name}.csv row 1 field header: missing source table`);
    const parsed = Papa.parse<Row>(sources[name] ?? "", {
      header: true,
      skipEmptyLines: "greedy",
    });
    parsed.errors.forEach((e) =>
      errors.push(`${name}.csv row ${(e.row ?? 0) + 2}: ${e.message}`),
    );
    data[name] = parsed.data;
    const seen = new Set<string>();
    parsed.data.forEach((r, i) => {
      const err = (field: string, msg: string) =>
        errors.push(`${name}.csv row ${i + 2} field ${field}: ${msg}`);
      if (!r.id || seen.has(r.id)) err("id", "missing or duplicate ID");
      seen.add(r.id);
      for (const field of ["tier", "quantity", "value", "min", "max"])
        if (
          r[field] !== undefined &&
          r[field] !== "" &&
          (!Number.isFinite(Number(r[field])) ||
            (field === "quantity" && Number(r[field]) <= 0))
        )
          err(field, "expected a finite number (positive for quantities)");
      if (
        [
          "cards",
          "subjects",
          "aspects",
          "illustrations",
          "nations",
          "goals",
          "ballots",
          "scales",
        ].includes(name) &&
        !r.prompt
      )
        err("prompt", "required writing prompt");
      if (name === "cards" && !r.kind) err("kind", "required card kind");
      const enums: Record<string, string[]> =
        name === "cards"
          ? {
              kind: ["Breakthrough", "Crisis", "Project", "Policy", "Capstone"],
              scope: ["National", "World"],
              mode: ["A/B", "Yes/No", "single", "unresolved"],
              status: ["prompt", "partial", "defined"],
              activation: ["reveal"],
            }
          : name === "effects"
            ? {
                timing: ["immediate", "ongoing"],
                target: ["world value", "national limit", "rule"],
                side: ["lower", "upper"],
              }
            : name === "limits"
              ? { side: ["lower", "upper"] }
              : {};
      for (const [field, values] of Object.entries(enums))
        if (r[field] && !values.includes(r[field]))
          err(field, `expected ${values.join(" / ")}`);
      if (r.tier && (!Number.isInteger(Number(r.tier)) || Number(r.tier) < 1))
        err("tier", "expected a positive integer tier");
      if (
        ["resolutions", "effects", "requirements"].includes(name) &&
        !r.text &&
        !r.prompt
      )
        err("prompt", "missing text requires a writing prompt");
      if (name === "limits" && (!r.provenance || !r.side || !r.value))
        err(
          "provenance/side/value",
          "limit requires provenance, side and value",
        );
    });
  }
  const refs: Partial<Record<Table, Record<string, Table>>> = {
    cards: { subject: "subjects", illustration: "illustrations" },
    resolutions: { card: "cards" },
    "card-aspects": { card: "cards", aspect: "aspects" },
    "voting-aspects": { card: "cards", aspect: "aspects" },
    effects: { card: "cards", scale: "scales" },
    requirements: { card: "cards", aspect: "aspects" },
    expiry: { card: "cards", subject: "subjects" },
    limits: { nation: "nations", scale: "scales" },
  };
  for (const name of tables)
    data[name].forEach((r, i) => {
      for (const [field, target] of Object.entries(refs[name] ?? {}))
        if (r[field] && !data[target].some((x) => x.id === r[field]))
          errors.push(
            `${name}.csv row ${i + 2} field ${field}: unknown ${target} ID ${r[field]}`,
          );
      if (refs[name]?.card && !r.card)
        errors.push(`${name}.csv row ${i + 2} field card: missing owner`);
      if (
        ["effects", "card-aspects"].includes(name) &&
        r.outcome &&
        !data.resolutions.some((x) => x.card === r.card && x.key === r.outcome)
      )
        errors.push(
          `${name}.csv row ${i + 2} field outcome: unknown outcome ${r.outcome} for ${r.card}`,
        );
      if (
        name === "cards" &&
        r.status === "defined" &&
        (!r.title ||
          !r.statement ||
          !data.resolutions.some((x) => x.card === r.id && x.text))
      )
        errors.push(
          `${name}.csv row ${i + 2} field status: defined requires title, statement and resolution`,
        );
      if (
        name === "cards" &&
        r.status === "defined" &&
        r.mode === "A/B" &&
        ["A", "B"].some(
          (key) =>
            !data.resolutions.some(
              (x) => x.card === r.id && x.key === key && x.text,
            ),
        )
      )
        errors.push(
          `${name}.csv row ${i + 2} field status: defined A/B requires both written resolutions`,
        );
    });
  if (errors.length) throw new Error(errors.join("\n"));
  return data;
}
export function readiness(data: Content) {
  return {
    promptCards: data.cards.filter((c) => !c.title && !c.statement).length,
    partialCards: data.cards.filter(
      (c) =>
        !c.title ||
        !c.statement ||
        !data.resolutions.some((r) => r.card === c.id),
    ).length,
    incompleteResolutions: data.cards.filter(
      (c) => !data.resolutions.some((r) => r.card === c.id && r.text),
    ).length,
    missingIllustrations: data.cards.filter(
      (c) => !data.illustrations.find((i) => i.id === c.illustration)?.asset,
    ).length,
  };
}
