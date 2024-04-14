import { describe, expect, it } from "vitest";

import { getDirectionsAndNodesMapFromInput } from "./index";

describe("getDirectionsAndNodesMapFromInput", () => {
  it("returns a directions array from input", () => {
    const { directions } = getDirectionsAndNodesMapFromInput("./input.txt");
    expect(Array.isArray(directions)).toBe(true);
    expect(directions.every((el) => el === "L" || el === "R")).toBe(true);
  });

  it("returns a nodesMap from input", () => {
    const { nodesMap } = getDirectionsAndNodesMapFromInput("./input.txt");
    expect(typeof nodesMap).toBe("object");
    expect(Object.keys(nodesMap).includes("AAA")).toBe(true);
    expect(Object.keys(nodesMap).includes("ZZZ")).toBe(true);
  });
});
