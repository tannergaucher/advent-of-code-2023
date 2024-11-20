import fs from "fs";

// Day 11 - Cosmic Expansion

// 1. (expansion) If the row or column contains no galaxies, it takes up twice the space.
const createRowsFromInput = (path: string) => {
  return fs.readFileSync(path).toString().split(/\r?\n/);
};

function cosmicExpansion(rows: string[]) {
  console.log(rows, "rows");
  // get the expanded rows
}

cosmicExpansion(createRowsFromInput("./input.txt"));

// 2. (shortest path) Find the length of the shortest path between two galaxies.
