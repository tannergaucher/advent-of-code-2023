import { expect, describe, it } from "vitest";

import { getRowsFromInput, checkAdjacency } from "./index";

describe("get rows from input", () => {
  it("gets rows from input", () => {
    const arr = getRowsFromInput("./input.txt");

    expect(Array.isArray(arr));
  });
});

describe("check adjacency", () => {
  const rows = getRowsFromInput("./input.txt");

  it("returns true if a number has an adjacent symbol", () => {
    const adjacency = checkAdjacency({
      rows,
      rowIndex: 0,
      elementIndex: 7,
    });

    console.log(adjacency, "adjacency");
  });
});
