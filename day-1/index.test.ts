import { describe, expect, it } from "vitest";
import {
  getRowsFromInput,
  getFirstAndLast,
  getCalibrationValue,
} from "./index";

describe("getRowsFromInput", () => {
  it("returns an array from an input file", () => {
    const arr = getRowsFromInput("input.txt");
    console.log(arr);
  });
});

// it gets the first and last number from an array of strings / numbers
describe("getFirstAndLast", () => {
  it("returns the first and last number from an array", () => {
    const arr = ["1", "f", "a", "w", "6", "9"];
    const { first, last } = getFirstAndLast(arr);
    expect(first).toBe(1);
    expect(last).toBe(9);
  });

  it("handles arrays with a single number by returning that number twice", () => {
    const arr = ["1", "f", "a", "w", "t", "t"];
    const { first, last } = getFirstAndLast(arr);
    expect(first).toBe(1);
    expect(last).toBe(1);
  });
});

describe("getCalibrationValue", () => {
  it("returns a string of the first and last number", () => {
    const first = 1;
    const last = 9;
    const calibrationValue = getCalibrationValue(first, last);
    expect(calibrationValue).toBe("19");
  });
});
