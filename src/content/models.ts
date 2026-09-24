import type { Content, Row } from "./loader";
export type CardDisplay = Pick<
  Row,
  | "id"
  | "kind"
  | "scope"
  | "subject"
  | "tier"
  | "prompt"
  | "title"
  | "statement"
  | "illustration"
  | "status"
  | "mode"
  | "activation"
  | "provenance"
> & {
  subjectData?: Row;
  illustrationData?: Row;
  resolutions: (Row & {
    aspects: (Row & { definition: Row })[];
    effects: Row[];
  })[];
  requirements: Row[];
  expiry: Row[];
  voting: Row[];
};
export type ScaleDisplay = Pick<
  Row,
  "id" | "label" | "meaning" | "min" | "max" | "value" | "prompt"
> & { nations: Row[]; limits: Row[] };
export function displayModels(data: Content) {
  return {
    cards: data.cards.map(
      (card) =>
        ({
          ...card,
          subjectData: data.subjects.find((s) => s.id === card.subject),
          illustrationData: data.illustrations.find(
            (i) => i.id === card.illustration,
          ),
          resolutions: data.resolutions
            .filter((r) => r.card === card.id)
            .map((r) => ({
              ...r,
              aspects: data["card-aspects"]
                .filter((a) => a.card === card.id && a.outcome === r.key)
                .map((a) => ({
                  ...a,
                  definition: data.aspects.find((d) => d.id === a.aspect)!,
                })),
              effects: data.effects.filter(
                (e) => e.card === card.id && e.outcome === r.key,
              ),
            })),
          requirements: data.requirements.filter((r) => r.card === card.id),
          expiry: data.expiry.filter((e) => e.card === card.id),
          voting: data["voting-aspects"].filter((v) => v.card === card.id),
        }) as CardDisplay,
    ),
    scales: data.scales.map(
      (s) =>
        ({
          ...s,
          nations: data.nations,
          limits: data.limits.filter((l) => l.scale === s.id),
        }) as ScaleDisplay,
    ),
  };
}
