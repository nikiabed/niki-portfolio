export type Street = {
  id: number;
  x?: number;
  y?: number;
  width: number;
  direction: "horizontal" | "vertical";
};

export type Parcel = {
  id: number;
  points: string;
  type: "building" | "green" | "public";
};

export type UrbanLayout = {
  streets: Street[];
  parcels: Parcel[];
};

export type GeneratorParams = {
  seed: number;
  density: number;
  openSpace: number;
  parcelCount: number;
};

/* ============================================================
   SEEDED RANDOM
============================================================ */

function random(seed: number) {
  const x = Math.sin(seed * 9999.91) * 43758.5453;
  return x - Math.floor(x);
}

/* ============================================================
   HELPERS
============================================================ */

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/*
  Convert a number into a clean integer.
*/
function round(value: number) {
  return Math.round(value * 100) / 100;
}

/* ============================================================
   SITE
============================================================ */

const SITE = {
  minX: 80,
  maxX: 780,
  minY: 80,
  maxY: 420,
};

/*
  The conceptual site dimensions are:

  width  = 700
  height = 340

  These are diagram dimensions, not real meters.
*/

/* ============================================================
   STREET PARAMETERS
============================================================ */

const STREET_WIDTH = 18;

/*
  Minimum distance between important intersections.

  Conceptually represents approximately 90m.
*/
const MIN_INTERSECTION_DISTANCE = 90;

/* ============================================================
   FIND GOOD STREET POSITIONS
============================================================ */

function generateStreetPositions(seed: number) {
  /*
    Keep the main vertical street away from the edges.

    The range is deliberately large enough to create
    different block proportions without producing
    extremely narrow blocks.
  */

  const minVertical = SITE.minX + 230;
  const maxVertical = SITE.maxX - 230;

  let verticalStreetX = lerp(minVertical, maxVertical, random(seed));

  /*
    Horizontal street.

    Keep enough room above and below so that neither
    block becomes too thin.
  */

  const minHorizontal = SITE.minY + 115;
  const maxHorizontal = SITE.maxY - 115;

  let horizontalStreetY = lerp(minHorizontal, maxHorizontal, random(seed + 10));

  /*
    Ensure the intersection is not too close to the
    conceptual edges.
  */

  verticalStreetX = clamp(
    verticalStreetX,
    SITE.minX + MIN_INTERSECTION_DISTANCE,
    SITE.maxX - MIN_INTERSECTION_DISTANCE,
  );

  horizontalStreetY = clamp(
    horizontalStreetY,
    SITE.minY + MIN_INTERSECTION_DISTANCE,
    SITE.maxY - MIN_INTERSECTION_DISTANCE,
  );

  return {
    verticalStreetX,
    horizontalStreetY,
  };
}

/* ============================================================
   BLOCK AREA
============================================================ */

type BlockArea = {
  id: number;

  minX: number;
  maxX: number;

  minY: number;
  maxY: number;
};

/* ============================================================
   GENERATE PARCEL COUNT DISTRIBUTION
============================================================ */

function distributeParcels(total: number, areas: BlockArea[]) {
  /*
    We distribute parcels according to block area.

    This prevents a tiny block from receiving
    the same number of parcels as a large block.
  */

  const weights = areas.map(
    (area) => (area.maxX - area.minX) * (area.maxY - area.minY),
  );

  const totalArea = weights.reduce((sum, value) => sum + value, 0);

  const result = areas.map((area, index) => {
    const raw = (weights[index] / totalArea) * total;

    return {
      area,
      count: Math.max(2, Math.floor(raw)),
      remainder: raw - Math.floor(raw),
    };
  });

  /*
    Correct rounding differences.
  */

  let current = result.reduce((sum, item) => sum + item.count, 0);

  /*
    Add parcels until we reach target.
  */

  while (current < total) {
    result.sort((a, b) => b.remainder - a.remainder);

    result[0].count += 1;
    current += 1;
  }

  /*
    Remove parcels if rounding went above target.
  */

  while (current > total) {
    result.sort((a, b) => a.remainder - b.remainder);

    const candidate = result.find((item) => item.count > 2);

    if (!candidate) break;

    candidate.count -= 1;
    current -= 1;
  }

  return result;
}

/* ============================================================
   CHOOSE GRID
============================================================ */

function chooseGrid(block: BlockArea, targetCount: number) {
  const width = block.maxX - block.minX;
  const height = block.maxY - block.minY;

  const aspect = width / height;

  /*
    Find a grid whose number of cells is close
    to the requested parcel count.

    We don't blindly use count x 1 because that
    would create extremely long parcels.
  */

  let bestCols = 2;
  let bestRows = 2;

  let bestScore = Infinity;

  for (let cols = 2; cols <= 8; cols++) {
    for (let rows = 1; rows <= 6; rows++) {
      const count = cols * rows;

      if (count < targetCount) continue;

      const cellWidth = width / cols;
      const cellHeight = height / rows;

      const ratio =
        Math.max(cellWidth, cellHeight) / Math.min(cellWidth, cellHeight);

      /*
        Penalize very elongated parcels heavily.
      */

      const ratioPenalty = ratio > 2.8 ? (ratio - 2.8) * 10 : 0;

      const countPenalty = Math.abs(count - targetCount) * 2;

      const score =
        countPenalty + ratioPenalty + Math.abs(aspect - cols / rows);

      if (score < bestScore) {
        bestScore = score;
        bestCols = cols;
        bestRows = rows;
      }
    }
  }

  return {
    cols: bestCols,
    rows: bestRows,
  };
}

/* ============================================================
   CREATE GRID
============================================================ */

function createGrid(
  block: BlockArea,
  cols: number,
  rows: number,
  seed: number,
) {
  const width = block.maxX - block.minX;
  const height = block.maxY - block.minY;

  const xValues: number[] = [];
  const yValues: number[] = [];

  /*
    X positions
  */

  for (let col = 0; col <= cols; col++) {
    xValues.push(block.minX + (width * col) / cols);
  }

  /*
    Y positions
  */

  for (let row = 0; row <= rows; row++) {
    yValues.push(block.minY + (height * row) / rows);
  }

  /*
    Shared grid vertices.

    Every neighboring parcel uses exactly
    the same vertex.

    Therefore:
      no gaps
      no overlaps
  */

  const points: {
    x: number;
    y: number;
  }[][] = [];

  for (let row = 0; row <= rows; row++) {
    points[row] = [];

    for (let col = 0; col <= cols; col++) {
      const outer = row === 0 || row === rows || col === 0 || col === cols;

      if (outer) {
        points[row][col] = {
          x: xValues[col],
          y: yValues[row],
        };

        continue;
      }

      /*
        Internal vertices get a small deformation.

        IMPORTANT:

        The vertex is generated ONCE.

        Neighboring parcels therefore share
        the exact same point.
      */

      const localSeed = seed + row * 137 + col * 71;

      const cellWidth = width / cols;
      const cellHeight = height / rows;

      const maxJitterX = Math.min(cellWidth * 0.12, 12);

      const maxJitterY = Math.min(cellHeight * 0.12, 10);

      points[row][col] = {
        x: xValues[col] + (random(localSeed) - 0.5) * 2 * maxJitterX,

        y: yValues[row] + (random(localSeed + 50) - 0.5) * 2 * maxJitterY,
      };
    }
  }

  return points;
}

/* ============================================================
   PARCEL TYPE
============================================================ */

function getParcelType(
  seed: number,
  index: number,
  density: number,
  openSpace: number,
): Parcel["type"] {
  const value = random(seed + index * 97);

  /*
    openSpace controls how much of the block
    becomes non-building.

    Density controls the tendency toward
    building occupation.
  */

  const openProbability = openSpace / 100;

  const buildingProbability = density / 100;

  /*
    First decide whether this is open space.
  */

  if (value < openProbability) {
    /*
      Split open space between green and public.
    */

    return value < openProbability * 0.7 ? "green" : "public";
  }

  /*
    Everything else becomes building.
  */

  if (value < openProbability + buildingProbability * 0.7) {
    return "building";
  }

  /*
    Keep building dominant enough that the
    generated layout still reads as an urban block.
  */

  return "building";
}

/* ============================================================
   GENERATE URBAN BLOCK
============================================================ */

export function generateUrbanBlock({
  seed,
  density,
  openSpace,
  parcelCount,
}: GeneratorParams): UrbanLayout {
  /*
    ------------------------------------------------------------
    NORMALIZE PARAMETERS
    ------------------------------------------------------------
  */

  const safeDensity = clamp(density, 20, 90);

  const safeOpenSpace = clamp(openSpace, 5, 40);

  const safeParcelCount = clamp(Math.round(parcelCount), 8, 36);

  /*
    ------------------------------------------------------------
    STREETS
    ------------------------------------------------------------
  */

  const { verticalStreetX, horizontalStreetY } = generateStreetPositions(seed);

  const streets: Street[] = [
    {
      id: 1,
      direction: "vertical",
      x: verticalStreetX,
      width: STREET_WIDTH,
    },

    {
      id: 2,
      direction: "horizontal",
      y: horizontalStreetY,
      width: STREET_WIDTH,
    },
  ];

  /*
    ------------------------------------------------------------
    STREET BOUNDARIES
    ------------------------------------------------------------
  */

  const halfStreet = STREET_WIDTH / 2;

  const sx1 = verticalStreetX - halfStreet;

  const sx2 = verticalStreetX + halfStreet;

  const sy1 = horizontalStreetY - halfStreet;

  const sy2 = horizontalStreetY + halfStreet;

  /*
    ------------------------------------------------------------
    FOUR URBAN BLOCKS
    ------------------------------------------------------------
  */

  const blockAreas: BlockArea[] = [
    {
      id: 1,
      minX: SITE.minX,
      maxX: sx1,
      minY: SITE.minY,
      maxY: sy1,
    },

    {
      id: 2,
      minX: sx2,
      maxX: SITE.maxX,
      minY: SITE.minY,
      maxY: sy1,
    },

    {
      id: 3,
      minX: SITE.minX,
      maxX: sx1,
      minY: sy2,
      maxY: SITE.maxY,
    },

    {
      id: 4,
      minX: sx2,
      maxX: SITE.maxX,
      minY: sy2,
      maxY: SITE.maxY,
    },
  ];

  /*
    ------------------------------------------------------------
    DISTRIBUTE PARCELS
    ------------------------------------------------------------
  */

  const distribution = distributeParcels(safeParcelCount, blockAreas);

  const parcels: Parcel[] = [];

  let parcelId = 1;

  /*
    ------------------------------------------------------------
    GENERATE EACH BLOCK
    ------------------------------------------------------------
  */

  distribution.forEach(({ area, count }, blockIndex) => {
    /*
        Choose a sensible grid.

        The grid tries to keep parcel proportions
        close to urban-plausible dimensions.
      */

    const { cols, rows } = chooseGrid(area, count);

    /*
        Shared grid vertices.
      */

    const grid = createGrid(area, cols, rows, seed + blockIndex * 1000);

    /*
        --------------------------------------------------------
        CELLS
        --------------------------------------------------------
      */

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        /*
            Slightly reduce the requested
            number of cells if necessary.

            This keeps the geometry clean.
          */

        const tl = grid[row][col];

        const tr = grid[row][col + 1];

        const br = grid[row + 1][col + 1];

        const bl = grid[row + 1][col];

        /*
            Exact shared geometry.

            No gap.
            No overlap.
          */

        const points = `
            ${round(tl.x)},${round(tl.y)}
            ${round(tr.x)},${round(tr.y)}
            ${round(br.x)},${round(br.y)}
            ${round(bl.x)},${round(bl.y)}
          `;

        /*
            Deterministic land-use assignment.
          */

        const type = getParcelType(
          seed + blockIndex * 1000,
          parcelId,
          safeDensity,
          safeOpenSpace,
        );

        parcels.push({
          id: parcelId++,
          points,
          type,
        });
      }
    }
  });

  return {
    streets,
    parcels,
  };
}
