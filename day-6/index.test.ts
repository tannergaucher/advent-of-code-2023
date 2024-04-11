import { describe, it, expect } from "vitest";

import { createRacesFromInput, getRacePossibilities } from "./index";

describe("createRacesFromInput", () => {
  it("should return an array of game objects", () => {
    const games = createRacesFromInput("./input.txt");

    expect(games).toEqual([
      { time: 53, distance: 275 },
      { time: 71, distance: 1181 },
      { time: 78, distance: 1215 },
      { time: 80, distance: 1524 },
    ]);
  });
});

describe("getRacePossibilities", () => {
  it.only(
    "should return an array of objects which contain the time and the distance traveled for that time"
  );
});
