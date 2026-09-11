import fs from "node:fs/promises";
import { parseOSM, studyArea } from "../app/tenminutescity/osm.ts";

const url = `https://api.openstreetmap.org/api/0.6/map.json?bbox=${studyArea.west},${studyArea.south},${studyArea.east},${studyArea.north}`;
const response = await fetch(url, {
  headers: { "User-Agent": "NikiPortfolio/1.0 (neighborhood research)", Accept: "application/json" },
  signal: AbortSignal.timeout(30000),
});
if (!response.ok) throw new Error(`OpenStreetMap returned ${response.status}`);
const snapshot = parseOSM(await response.json(), new Date().toISOString());
snapshot.mode = "snapshot";
await fs.mkdir(new URL("../data/", import.meta.url), { recursive: true });
await fs.writeFile(new URL("../data/tenminutescity.json", import.meta.url), JSON.stringify(snapshot));
console.log("Saved real OpenStreetMap snapshot", Object.fromEntries(["buildings", "streets", "green", "services"].map(key => [key, snapshot[key].length])));
