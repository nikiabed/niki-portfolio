import { UrbanBlock } from "./types";

function random(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const generateUrbanBlock = (seed: number = 10): UrbanBlock[] => {
  const blocks: UrbanBlock[] = [];
  const rows = 3;
  const cols = 3;
  const startX = 180;
  const startY = 100;
  const blockWidth = 180;
  const blockHeight = 130;
  let index = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const variation = random(seed + index) * 30;
      const block: UrbanBlock = {
        id: index,
        x: startX + x * (blockWidth + 45),
        y: startY + y * (blockHeight + 45),
        width: blockWidth - variation,
        height: blockHeight - variation / 2,
        buildings: [],
      };

      // ساختمان داخل بلاک

      const buildingCount = 2 + Math.floor(random(seed + index + 20) * 4);

      for (let i = 0; i < buildingCount; i++) {
        block.buildings.push({
          x: block.x + 15 + random(seed + i) * 60,
          y: block.y + 15 + random(seed + i + 30) * 40,
          width: 40 + random(seed + i + 50) * 40,
          height: 30 + random(seed + i + 70) * 50,
        });
      }

      blocks.push(block);

      index++;
    }
  }

  return blocks;
};
