import { describe, it, expect } from "vitest";
import { getArrayFromInput } from "./index";

describe("getArrayFromInput", () => {
  it("returns an array from an input file", () => {
    const arr = getArrayFromInput("./input.txt");

    expect(Array.isArray(arr)).toBe(true);
  });
});
