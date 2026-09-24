import test from "node:test";
import assert from "node:assert/strict";
import {
  getItemBounds,
  normalizeItemInput,
  fitBoundsToFrame,
} from "../src/lib/board/boardController";
import { rules } from "../src/rules";
import { registry } from "../src/views/registry";
test("both selected A/B rotations swap width and height around the center", () => {
  for (const rotation of [-90, 90]) {
    const b = getItemBounds(
      normalizeItemInput(
        { kind: "card", x: 0, y: 0, width: 320, height: 200, rotation },
        "selected",
      ),
    );
    assert.equal(Math.round(b.x), 60);
    assert.equal(Math.round(b.y), -60);
    assert.equal(Math.round(b.width), 200);
    assert.equal(Math.round(b.height), 320);
  }
});
test("rotated bounds and fitted board stay inside each reference viewport", () => {
  for (const [width, height] of [
    [1366, 768],
    [1440, 900],
    [1920, 1080],
  ]) {
    const bounds = { x: 0, y: 0, width: 1500, height: 830 };
    const frameSize = { width: width - 52, height: height - 170 };
    const fit = fitBoundsToFrame({
      bounds,
      frameSize,
      padding: 8,
      minZoom: 0.01,
    });
    assert.ok((bounds.x - fit.x) * fit.zoom >= 0);
    assert.ok((bounds.y - fit.y) * fit.zoom >= 0);
    assert.ok((bounds.width - fit.x) * fit.zoom <= frameSize.width);
    assert.ok((bounds.height - fit.y) * fit.zoom <= frameSize.height);
  }
});
test("readiness registry references real rule sections and stable unique task IDs", () => {
  const ids = registry.flatMap((v) => v.todos.map((t) => t.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const view of registry)
    for (const question of view.questions)
      assert.ok(rules.some((r) => r.id === question));
});
