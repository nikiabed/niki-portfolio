# 10 Minutes City dataset

`tenminutescity.json` contains a normalized OpenStreetMap snapshot for the Valiasr study area (51.395, 35.705, 51.415, 35.725). The actual retrieval time is stored in `retrievedAt`.

Source: https://api.openstreetmap.org/api/0.6/map.json?bbox=51.395,35.705,51.415,35.725

Data © OpenStreetMap contributors, available under the Open Database License (ODbL): https://www.openstreetmap.org/copyright

The page loads this snapshot immediately. Refresh requests use the OSM map API with a bounded timeout and retain the snapshot if that service cannot be reached. Basemap tiles are requested separately; the bundled feature geometry remains interactive even if tiles are unavailable.

Regenerate with `node scripts/download-tenminutescity.mjs` (Node 22.18+ / 24 recommended for native TypeScript support). Run data checks with `node scripts/test-tenminutescity.mjs`.

Ways are reconstructed from their node references. Features are included when their bounding-box center is inside the study area. Relation members are counted as ways rather than counting the relation again. Service counts represent mapped amenities, shops and public transport features, not verified unique businesses. Distances are straight-line distances, not walking routes.
