import fs from "fs";

type MapKey =
  | "seed-to-soil"
  | "soil-to-fertilizer"
  | "fertilizer-to-water"
  | "water-to-light"
  | "light-to-temperature"
  | "temperature-to-humidity"
  | "humidity-to-location";

type Maps = Record<MapKey, number[][]>;

export function createMapFromInput(filePath: string) {
  const file = fs.readFileSync(filePath, "utf-8");
  const lines = file.split("\n");
  const seeds = lines[0]
    .split(" ")
    .map(Number)
    .filter((value) => !isNaN(value));

  const mapArr = lines.slice(1).map((line) => line.split(" ").map(Number));

  const map: Maps = {
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": [],
  };

  let counter = 0;

  mapArr.forEach((el) => {
    if (el.length === 1) {
      counter++;
    }

    if (counter === 1) {
      if (el.length === 3) {
        console.log(el);

        map["seed-to-soil"].push(el);
      }
    }

    if (counter === 2) {
      if (el.length === 3) {
        map["soil-to-fertilizer"].push(el);
      }
    }

    if (counter === 3) {
      if (el.length === 3) {
        map["fertilizer-to-water"].push(el);
      }
    }

    if (counter === 4) {
      if (el.length === 3) {
        map["water-to-light"].push(el);
      }
    }

    if (counter === 5) {
      if (el.length === 3) {
        map["light-to-temperature"].push(el);
      }
    }

    if (counter === 6) {
      if (el.length === 3) {
        map["temperature-to-humidity"].push(el);
      }
    }

    if (counter === 7) {
      if (el.length === 3) {
        map["humidity-to-location"].push(el);
      }
    }
  });

  return { seeds, map };
}

export function getDestinationNumberFromMap({
  map,
  source,
}: {
  source: number;
  map: Maps[MapKey];
}) {
  for (const arr of map) {
    const inRange = isInRange({
      source,
      sourceStart: arr[1],
      range: arr[2],
    });
    console.log(source, arr, inRange);
    if (inRange) {
      const destinationNumber = getDestinationNumber({
        source,
        sourceStart: arr[1],
        destinationStart: arr[0],
      });

      return destinationNumber;
    }
  }
}

export function isInRange({ source, sourceStart, range }) {
  const sourceEnd = sourceStart + range;

  if (source >= sourceStart && source <= sourceEnd) {
    return true;
  }

  return false;
}

export function getDestinationNumber({
  source,
  sourceStart,
  destinationStart,
}: {
  source: number;
  sourceStart: number;
  destinationStart: number;
}) {
  const offset = source - sourceStart;

  return destinationStart + offset;
}
