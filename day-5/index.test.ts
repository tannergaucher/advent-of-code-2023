import { describe, expect, it } from "vitest";

import {
  createMapsFromInput,
  getDestinationNumberFromMap,
  isInRange,
  getDestinationNumber,
  Maps,
} from "./index";

describe("createMapsFromInput", () => {
  it("return a map from the input", () => {
    const { seeds, maps } = createMapsFromInput("./input.txt");

    expect(Array.isArray(seeds));
    expect(typeof maps).toBe("object");
    expect(Object.values(maps).every((value) => Array.isArray(value)));
  });
});

describe("getDestinationNumberFromMap", () => {
  it("returns a destination number from a map", () => {
    const maps: Maps = {
      "seed-to-soil": [
        [3333452986, 2926455387, 455063168],
        [3222292973, 1807198589, 111160013],
        [4073195028, 1120843626, 221772268],
        [3215232741, 2255546991, 7060232],
        [1658311530, 2727928910, 32644400],
        [2680271553, 1918358602, 337188389],
        [1690955930, 3973557555, 28589896],
        [2081345351, 4046183137, 248784159],
        [2374165196, 3613106716, 306106357],
        [1553535599, 2504868379, 49003335],
        [4018850546, 3919213073, 54344482],
        [2050713919, 2287201502, 30631432],
        [3183342019, 1775307867, 31890722],
        [3975551599, 2553871714, 43298947],
        [1120843626, 1342615894, 432691973],
        [2330129510, 4002147451, 44035686],
        [1719545826, 2628348978, 99579932],
        [1819125758, 3381518555, 231588161],
        [1627133213, 2597170661, 31178317],
        [3017459942, 2760573310, 165882077],
        [3788516154, 2317832934, 187035445],
        [1602538934, 2262607223, 24594279],
      ],
      "soil-to-fertilizer": [],
      "fertilizer-to-water": [],
      "water-to-light": [],
      "light-to-temperature": [],
      "temperature-to-humidity": [],
      "humidity-to-location": [],
    };

    const destinationNumber = getDestinationNumberFromMap({
      source: 4088478806,
      map: maps["seed-to-soil"],
    });

    expect(destinationNumber).toBe(2123641020);
  });
});

describe("isInRange", () => {
  it("returns true if a number is in range", () => {
    const inRange = isInRange({
      source: 3,
      sourceStart: 2,
      range: 10,
    });

    expect(inRange).toBe(true);
  });

  it("returns false if a number is not in range", () => {
    const inRange = isInRange({
      source: 2,
      sourceStart: 3,
      range: 12,
    });

    expect(inRange).toBe(false);
  });
});

describe("getDestinationNumber", () => {
  it("returns the destination number", () => {
    const destinationNumber = getDestinationNumber({
      source: 3,
      sourceStart: 2,
      destinationStart: 10,
    });

    expect(destinationNumber).toBe(11);
  });
});
