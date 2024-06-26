import fs from "fs";

type Race = { time: number; recordDistance: number };

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
      recordDistance: distances[index],
    });
  });

  return races;
}

type RaceOutcome = { chargeTime: number; distanceTraveled: number };

export function getRacePossibilitiesCount({ race }: { race: Race }) {
  const possibleOutcomes: RaceOutcome[] = [];

  for (let i = 0; i <= race.time; i++) {
    const chargeTime = i;
    const travelTime = race.time - chargeTime;
    const speed = i;
    const distanceTraveled = travelTime * speed;

    if (i === 0) {
      possibleOutcomes.push({
        chargeTime: 0,
        distanceTraveled: 0,
      });
    } else {
      possibleOutcomes.push({
        chargeTime,
        distanceTraveled,
      });
    }
  }

  return possibleOutcomes.filter(
    (possibility) => possibility.distanceTraveled > race.recordDistance
  ).length;
}

function getRacePossibilitiesProduct({ races }: { races: Race[] }) {
  const counts: number[] = [];

  races.forEach((race) => {
    const count = getRacePossibilitiesCount({ race });

    counts.push(count);
  });

  return counts.reduce((acc, curr) => acc * curr);
}

// answer: 449820
console.log(
  getRacePossibilitiesProduct({ races: createRacesFromInput("./input.txt") })
);
