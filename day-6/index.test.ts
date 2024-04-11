import { describe, it, expect } from "vitest";

import { createRacesFromInput, getRacePossibilitiesCount } from "./index";

describe("createRacesFromInput", () => {
  it("should return an array of race objects", () => {
    const races = createRacesFromInput("./input.txt");

    expect(races).toEqual([
      { time: 53, recordDistance: 275 },
      { time: 71, recordDistance: 1181 },
      { time: 78, recordDistance: 1215 },
      { time: 80, recordDistance: 1524 },
    ]);
  });
});

describe("getRacePossibilitiesCount", () => {
  it("should count the number of possible winning race strategies");

  const race = { time: 53, recordDistance: 275 };

  const possibilities = getRacePossibilitiesCount({ race });

  expect(typeof possibilities).toBe("number");
  expect(possibilities).toBe(42);
});
