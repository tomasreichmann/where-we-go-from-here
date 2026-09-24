import { readFileSync } from "node:fs";
import { loadContent, readiness, tables } from "../src/content/loader";
const data = loadContent(
  Object.fromEntries(
    tables.map((t) => [t, readFileSync(`src/content/${t}.csv`, "utf8")]),
  ),
);
console.log(
  `Validated ${tables.length} CSV tables, ${data.cards.length} cards. Valid unfinished content:`,
  readiness(data),
);
