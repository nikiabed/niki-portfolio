import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseOSM } from "../app/tenminutescity/osm.ts";
import { distanceMeters, origin, areaAround, osmBounds, normalizeLongitude } from "../app/tenminutescity/data.ts";

const snapshot = JSON.parse(readFileSync(new URL("../data/tenminutescity.json", import.meta.url)));
for (const key of ["buildings", "streets", "green", "services"]) {
  assert(snapshot[key].length > 0, `${key} must contain real features`);
  assert.equal(new Set(snapshot[key].map(f => f.id)).size, snapshot[key].length);
  for (const feature of snapshot[key]) {
    assert(Number.isFinite(feature.lat) && Number.isFinite(feature.lon));
    assert(feature.geometry.every(p => p.length === 2 && p.every(Number.isFinite)));
  }
}
const parsed = parseOSM({ elements: [
  { type: "node", id: 1, lat: 35.715, lon: 51.405 },
  { type: "node", id: 2, lat: 35.716, lon: 51.406 },
  { type: "node", id: 3, lat: 35.715, lon: 51.406 },
  { type: "way", id: 1, nodes: [1, 2, 3, 1], tags: { building: "yes" } },
  { type: "way", id: 2, nodes: [1, 2], tags: { highway: "residential" } },
  { type: "node", id: 4, lat: 35.715, lon: 51.405, tags: { shop: "supermarket", name: "Test shop" } },
  { type: "node", id: 5, lat: 36, lon: 52, tags: { shop: "supermarket" } },
] }, "2026-09-11T00:00:00Z");
assert(Math.abs(parsed.buildings[0].lat - 35.7155) < 1e-9);
assert.equal(parsed.buildings[0].geometry.length, 4);
assert.equal(parsed.services.length, 1);
assert.equal(distanceMeters(...origin), 0);
assert(distanceMeters(...origin, [35.72, 51.41]) > 0);
const count = radius => snapshot.services.filter(f => distanceMeters(f.lat, f.lon) <= radius).length;
assert(count(400) < count(800));
assert(count(800) < count(1200));
console.log("Passed: OSM node/way parsing, geographic filtering, snapshot integrity, movable origin and radius counts.", { fiveMinutes: count(400), tenMinutes: count(800), fifteenMinutes: count(1200) });

const parisArea = areaAround([48.8566, 2.3522]);
const paris = parseOSM({ elements: [{ type: "node", id: 42, lat: 48.8566, lon: 2.3522, tags: { amenity: "cafe" } }] }, "2026-09-11", parisArea);
assert.equal(paris.services.length, 1, "Locations outside Tehran must not be filtered out");
assert.deepEqual(paris.studyArea, parisArea);
assert.equal(paris.buildings.length, 0, "Sparse areas are valid");
assert.equal(parseOSM({ elements: [] }, "2026-09-11", parisArea).services.length, 0);
const wrapped = areaAround([0, 179.999]);
assert.equal(osmBounds(wrapped).length, 2);
for (const box of osmBounds(wrapped)) assert(box.west >= -180 && box.east <= 180 && box.west < box.east);
const dateline = parseOSM({ elements: [{ type: "node", id: 1, lat: 0, lon: -179.999, tags: { shop: "supermarket" } }] }, "2026-09-11", wrapped);
assert.equal(dateline.services.length, 1);
assert(Math.abs(normalizeLongitude(540) + 180) < 1e-9);
console.log("Passed: arbitrary neighborhoods, valid empty areas, antimeridian bounds and wrapped feature coordinates.");
