import fs from "fs";
import path from "path";

import { expect, describe, it } from "vitest";

import {
  createRowsFromInput,
  createDifferenceArray,
  calculateNextInSequence,
} from "./index";

describe("getArrayFromInput", () => {
  it("creates an array of arrays or numbers from an input file", async () => {
    const arr = createRowsFromInput(path.join("./input.txt"));
    expect(Array.isArray(arr)).toBe(true);
    expect(arr[0].every((el) => typeof el === "number")).toBe(true);
  });
});

describe("createSumDifferenceArray", () => {
  it("creates an array of the differences of the prev array", () => {
    const arr = createDifferenceArray({
      row: [0, 3, 6, 9, 12, 15],
    });

    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(3);
    expect(arr[1].every((el) => el === 0)).not.toBe(true);
    expect(arr[2].every((el) => el === 0)).toBe(true);

    const arr2 = createDifferenceArray({
      row: [10, 13, 16, 21, 30, 45],
    });

    expect(Array.isArray(arr2)).toBe(true);

    console.log(arr2, "arr2");
  });
});

describe("calculateNextInSequence", () => {
  it("calculates the next number in the sequence, from the difference arrays", () => {
    const inputArray = [
      [0, 3, 6, 9, 12, 15],
      [3, 3, 3, 3, 3],
      [0, 0, 0, 0],
    ];

    const next = calculateNextInSequence({
      array: inputArray,
    });

    expect(next).toBe(18);
  });
});
