import fs from "fs";

type Race = { time: number; distance: number };

export function createRacesFromInput(path: string) {
  const races: Race[] = [];

  const times: number[] = [];
  const distances: number[] = [];

  fs.readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .map((row, index) => {
      const currentRow = row
        .split(":")[1]
        .split(" ")
        .filter(Number)
        .map((el) => parseInt(el));

      if (index === 0) {
        times.push(...currentRow);
      }

      if (index === 1) {
        distances.push(...currentRow);
      }
    });

  if (times.length !== distances.length) {
    throw new Error("bad input");
  }

  times.forEach((time, index) => {
    races.push({
      time,
      distance: distances[index],
    });
  });

  return races;
}

export function getRacePossibilities() {}
