import fs from "fs";

export function createMapFromInput(filePath: string) {
  const file = fs.readFileSync(filePath, "utf-8");
  const lines = file.split("\n");
  const seeds = lines[0]
    .split(" ")
    .map(Number)
    .filter((value) => !isNaN(value));

  const mapArr = lines.slice(1).map((line) => line.split(" ").map(Number));

  const map: Record<string, number[][]> = {
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

function getDestinationNumberFromMap({
  map,
  source,
}: {
  map:
    | "seed-to-soil"
    | "soil-to-fertilizer"
    | "fertilizer-to-water"
    | "water-to-light"
    | "light-to-temperature"
    | "temperature-to-humidity"
    | "humidity-to-location";
  source: number;
}) {
  // lookup next map from current map
  // iterate the map rows
  // check if the source has a destination value
  //    if so, return the destination value
  // else return the source value
}
