import fs from "node:fs/promises";
import path from "node:path";

console.log("=================================");
console.log("TEN MINUTES CITY → OSM DOWNLOAD");
console.log("=================================");
console.log("");

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const BBOX = {
  south: 35.7,
  west: 51.39,
  north: 35.735,
  east: 51.43,
};

const query = `
[out:json][timeout:120];

(
  way["building"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["highway"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["landuse"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});

  way["leisure"="park"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["leisure"="garden"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["leisure"="playground"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});

  node["amenity"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["amenity"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});

  node["shop"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["shop"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
);

out body;
>;
out skel qt;
`;

async function main() {
  console.log("BBOX:");
  console.log(BBOX);
  console.log("");

  console.log("Connecting to Overpass...");
  console.log(OVERPASS_URL);
  console.log("");

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "niki-portfolio/1.0",
    },
    body: new URLSearchParams({
      data: query,
    }),
  });

  console.log("OVERPASS STATUS:", response.status);
  console.log("");

  const text = await response.text();

  if (!response.ok) {
    console.error("OVERPASS ERROR:");
    console.error(text.slice(0, 3000));
    process.exit(1);
  }

  console.log("Parsing response...");

  const data = JSON.parse(text);

  console.log("Elements received:", data.elements?.length ?? 0);
  console.log("");

  const output = {
    source: "OpenStreetMap",
    downloadedAt: new Date().toISOString(),
    bbox: BBOX,
    elementCount: data.elements?.length ?? 0,
    elements: data.elements ?? [],
  };

  const outputDir = path.join(process.cwd(), "data");
  const outputFile = path.join(outputDir, "tenminutescity.json");

  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(
    outputFile,
    JSON.stringify(output, null, 2),
    "utf8"
  );

  console.log("=================================");
  console.log("DOWNLOAD COMPLETE");
  console.log("=================================");
  console.log("");
  console.log("Saved to:");
  console.log(outputFile);
  console.log("");
  console.log("Elements:", output.elementCount);
}

main().catch((error) => {
  console.error("");
  console.error("=================================");
  console.error("DOWNLOAD FAILED");
  console.error("=================================");
  console.error("");
  console.error(error);
  process.exit(1);
});