import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Papa from "papaparse";
import { loadContent, readiness, tables } from "../src/content/loader";
const sources = () =>
  Object.fromEntries(
    tables.map((t) => [t, readFileSync(`src/content/${t}.csv`, "utf8")]),
  );
test("prompt-only cards and quoted multiline CSV remain valid unfinished content", () => {
  const input = sources();
  const rows = Papa.parse<Record<string, string>>(input.cards, {
    header: true,
    skipEmptyLines: true,
  }).data;
  rows.push({
    id: "test-prompt",
    kind: "Policy",
    prompt: 'A quote, a comma, and\na second line with "care".',
  });
  input.cards = Papa.unparse(rows);
  const data = loadContent(input);
  assert.equal(data.cards.at(-1)?.prompt, rows.at(-1)?.prompt);
  assert.equal(readiness(data).promptCards, 2);
  assert.equal(readiness(data).missingIllustrations, 27);
});
test("broken cross-table references report file row and field", () => {
  const input = sources();
  input["card-aspects"] = input["card-aspects"].replace(
    '"technology"',
    '"unknown-aspect"',
  );
  assert.throws(
    () => loadContent(input),
    /card-aspects.csv row 2 field aspect/,
  );
});
test("duplicate IDs, malformed numbers and missing prompts block content", () => {
  const input = sources();
  const rows = Papa.parse<Record<string, string>>(input.cards, {
    header: true,
    skipEmptyLines: true,
  }).data;
  rows[1].id = rows[0].id;
  rows[1].tier = "many";
  rows[1].prompt = "";
  input.cards = Papa.unparse(rows);
  assert.throws(
    () => loadContent(input),
    /duplicate ID[\s\S]*expected a finite number[\s\S]*required writing prompt/,
  );
});
test("authored status cannot hide missing prose", () => {
  const input = sources();
  input.cards = input.cards.replace('"partial"', '"defined"');
  assert.throws(
    () => loadContent(input),
    /defined requires title, statement and resolution/,
  );
});
test("outcome relationships are scoped to their owning card", () => {
  const input = sources();
  input.effects = input.effects.replace(
    '"driverless","A"',
    '"driverless","missing"',
  );
  assert.throws(
    () => loadContent(input),
    /field outcome: unknown outcome missing for driverless/,
  );
});
test("related-table edits change normalized content and readiness derives from fields", () => {
  const input = sources();
  input["card-aspects"] = input["card-aspects"].replace('"2"', '"4"');
  const data = loadContent(input);
  assert.equal(data["card-aspects"][0].quantity, "4");
  assert.deepEqual(readiness(data), {
    promptCards: 1,
    partialCards: 2,
    incompleteResolutions: 2,
    missingIllustrations: 26,
  });
});
