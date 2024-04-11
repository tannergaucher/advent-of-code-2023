import { describe, it, expect } from "vitest";

import { createRacesFromInput, getRacePossibilities } from "./index";

describe("createRacesFromInput", () => {
  it("should return an array of race objects", () => {
    const races = createRacesFromInput("./input.txt");

    expect(races).toEqual([
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

  const race = { time: 53, distance: 275 };

  const possibilities = getRacePossibilities({ race });

  expect(Array.isArray(possibilities));
  expect(possibilities.length).toBe(54);

  expect(possibilities).toEqual([
    { chargeTime: 0, distanceTraveled: 0 },
    { chargeTime: 1, distanceTraveled: 52 },
    { chargeTime: 2, distanceTraveled: 102 },
    { chargeTime: 3, distanceTraveled: 150 },
    { chargeTime: 4, distanceTraveled: 196 },
    { chargeTime: 5, distanceTraveled: 240 },
    { chargeTime: 6, distanceTraveled: 282 },
    { chargeTime: 7, distanceTraveled: 322 },
    { chargeTime: 8, distanceTraveled: 360 },
    { chargeTime: 9, distanceTraveled: 396 },
    { chargeTime: 10, distanceTraveled: 430 },
    { chargeTime: 11, distanceTraveled: 462 },
    { chargeTime: 12, distanceTraveled: 492 },
    { chargeTime: 13, distanceTraveled: 520 },
    { chargeTime: 14, distanceTraveled: 546 },
    { chargeTime: 15, distanceTraveled: 570 },
    { chargeTime: 16, distanceTraveled: 592 },
    { chargeTime: 17, distanceTraveled: 612 },
    { chargeTime: 18, distanceTraveled: 630 },
    { chargeTime: 19, distanceTraveled: 646 },
    { chargeTime: 20, distanceTraveled: 660 },
    { chargeTime: 21, distanceTraveled: 672 },
    { chargeTime: 22, distanceTraveled: 682 },
    { chargeTime: 23, distanceTraveled: 690 },
    { chargeTime: 24, distanceTraveled: 696 },
    { chargeTime: 25, distanceTraveled: 700 },
    { chargeTime: 26, distanceTraveled: 702 },
    { chargeTime: 27, distanceTraveled: 702 },
    { chargeTime: 28, distanceTraveled: 700 },
    { chargeTime: 29, distanceTraveled: 696 },
    { chargeTime: 30, distanceTraveled: 690 },
    { chargeTime: 31, distanceTraveled: 682 },
    { chargeTime: 32, distanceTraveled: 672 },
    { chargeTime: 33, distanceTraveled: 660 },
    { chargeTime: 34, distanceTraveled: 646 },
    { chargeTime: 35, distanceTraveled: 630 },
    { chargeTime: 36, distanceTraveled: 612 },
    { chargeTime: 37, distanceTraveled: 592 },
    { chargeTime: 38, distanceTraveled: 570 },
    { chargeTime: 39, distanceTraveled: 546 },
    { chargeTime: 40, distanceTraveled: 520 },
    { chargeTime: 41, distanceTraveled: 492 },
    { chargeTime: 42, distanceTraveled: 462 },
    { chargeTime: 43, distanceTraveled: 430 },
    { chargeTime: 44, distanceTraveled: 396 },
    { chargeTime: 45, distanceTraveled: 360 },
    { chargeTime: 46, distanceTraveled: 322 },
    { chargeTime: 47, distanceTraveled: 282 },
    { chargeTime: 48, distanceTraveled: 240 },
    { chargeTime: 49, distanceTraveled: 196 },
    { chargeTime: 50, distanceTraveled: 150 },
    { chargeTime: 51, distanceTraveled: 102 },
    { chargeTime: 52, distanceTraveled: 52 },
    { chargeTime: 53, distanceTraveled: 0 },
  ]);
});
