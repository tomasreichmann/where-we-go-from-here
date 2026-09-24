import { loadContent } from "./loader";
import { displayModels } from "./models";
const files = import.meta.glob("./*.csv", {
  query: "?raw",
  import: "default",
  eager: true,
});
export const content = loadContent(
  Object.fromEntries(
    Object.entries(files).map(([path, text]) => [
      path.replace("./", "").replace(".csv", ""),
      text as string,
    ]),
  ),
);
export const models = displayModels(content);
export const getCard = (id: string) => {
  const card = models.cards.find((c) => c.id === id);
  if (!card) throw new Error(`Unknown fixture card: ${id}`);
  return card;
};
