import fs from "fs";

type MapKey =
  | "seed-to-soil"
  | "soil-to-fertilizer"
  | "fertilizer-to-water"
  | "water-to-light"
  | "light-to-temperature"
  | "temperature-to-humidity"
  | "humidity-to-location";

export type Maps = Record<MapKey, number[][]>;

export function createMapsFromInput(filePath: string) {
  const file = fs.readFileSync(filePath, "utf-8");
  const lines = file.split("\n");
  const seeds = lines[0]
    .split(" ")
    .map(Number)
    .filter((value) => !isNaN(value));

  const mapArr = lines.slice(1).map((line) => line.split(" ").map(Number));

  const maps: Maps = {
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": [],
  };

  let pointer = 0;

  mapArr.forEach((el) => {
    if (el.length === 1) {
      pointer++;
    }

    if (pointer === 1) {
      if (el.length === 3) {
        maps["seed-to-soil"].push(el);
      }
    }

    if (pointer === 2) {
      if (el.length === 3) {
        maps["soil-to-fertilizer"].push(el);
      }
    }

    if (pointer === 3) {
      if (el.length === 3) {
        maps["fertilizer-to-water"].push(el);
      }
    }

    if (pointer === 4) {
      if (el.length === 3) {
        maps["water-to-light"].push(el);
      }
    }

    if (pointer === 5) {
      if (el.length === 3) {
        maps["light-to-temperature"].push(el);
      }
    }

    if (pointer === 6) {
      if (el.length === 3) {
        maps["temperature-to-humidity"].push(el);
      }
    }

    if (pointer === 7) {
      if (el.length === 3) {
        maps["humidity-to-location"].push(el);
      }
    }
  });

  return { seeds, maps };
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

    if (inRange) {
      const destinationNumber = getDestinationNumber({
        source,
        sourceStart: arr[1],
        destinationStart: arr[0],
      });

      return destinationNumber;
    }
  }

  return source;
}

export function isInRange({
  source,
  sourceStart,
  range,
}: {
  source: number;
  sourceStart: number;
  range: number;
}) {
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

function getLowestLocationNumber({
  maps,
  seeds,
}: {
  maps: Maps;
  seeds: number[];
}) {
  const locationNumbers: number[] = [];

  seeds.forEach((seed) => {
    const soilNumber = getDestinationNumberFromMap({
      source: seed,
      map: maps["seed-to-soil"],
    });

    const fertilizerNumber = getDestinationNumberFromMap({
      source: soilNumber,
      map: maps["soil-to-fertilizer"],
    });

    const waterNumber = getDestinationNumberFromMap({
      source: fertilizerNumber,
      map: maps["fertilizer-to-water"],
    });

    const lightNumber = getDestinationNumberFromMap({
      source: waterNumber,
      map: maps["water-to-light"],
    });

    const temperatureNumber = getDestinationNumberFromMap({
      source: lightNumber,
      map: maps["light-to-temperature"],
    });

    const humidityNumber = getDestinationNumberFromMap({
      source: temperatureNumber,
      map: maps["temperature-to-humidity"],
    });

    const locationNumber = getDestinationNumberFromMap({
      source: humidityNumber,
      map: maps["humidity-to-location"],
    });

    locationNumbers.push(locationNumber);
  });

  return Math.min(...locationNumbers);
}

const { seeds, maps } = createMapsFromInput("./input.txt");

// answer: 382895070
console.log(
  getLowestLocationNumber({
    maps,
    seeds,
  })
);
