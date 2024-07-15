import { expect, describe, it } from "vitest";

import {
  getRowsFromInput,
  isSymbol,
  checkAdjacentRow,
  checkCurrentRow,
} from "./index";

describe("get rows from input", () => {
  it("gets rows from input", () => {
    const arr = getRowsFromInput("./input.txt");

    expect(Array.isArray(arr));
  });
});

describe("is symbol", () => {
  it("returns true on a symbol", () => {
  
    expect(isSymbol("#")).toBe(true);
  });

  it("returns false on no symbol", () => {
    
    expect(isSymbol("4")).toBe(false);
    expect(isSymbol(".")).toBe(false)
  });
});

describe("check adjacent row", () => {
  it("checks the adjacent row elements and returns true for an adjacent symbol", () => {
    const isAdjacent = checkAdjacentRow({
      elementIndex: 0,
      row: "+......497...........................858...923...128..................227..801........487.....664...........................................",
      numberCharsLength: 3,
    });

    expect(isAdjacent).toBe(true);
  });

  it("checks the adjacent row elements and returns true for an adjacent symbol", () => {
    const isAdjacent = checkAdjacentRow({
      elementIndex: 2,
      row: "+......497...........................858...923...128..................227..801........487.....664...........................................",
      numberCharsLength: 3,
    });

    expect(isAdjacent).toBe(false);
  });
});

describe("check current row", () => {
  it("checks the current row and returns true for an adjacent symbol", () => {
    const isAdjacent = checkCurrentRow({
      row: "+.....=497...........................858...923...128..................227..801........487.....664...........................................",
      startIndex: 7,
      numberCharsLength: 3,
    });

    expect(isAdjacent).toBe(true);
  });

  it("checks the current row and returns false for no adjacent symbol", () => {
    const isAdjacent = checkCurrentRow({
      row: "+......497...........................858...923...128..................227..801........487.....664...........................................",
      startIndex: 7,
      numberCharsLength: 3,
    });

    expect(isAdjacent).toBe(false);
  });
});
