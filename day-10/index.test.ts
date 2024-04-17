import { describe, expect, it } from "vitest";

import { type MapNode, type VisitedNode, getNextMatrix } from "./index";

describe("getNextMatrix", () => {
  const map: MapNode[][] = [
    [".", ".", ".", ".", "."],
    [".", "S", "-", "7", "."],
    [".", "|", ".", "|", "."],
    [".", "L", "-", "J", "."],
    [".", ".", ".", ".", "."],
  ];

  it("gets the next matrix", () => {
    const visited: VisitedNode[][] = [
      ["white", "white", "white", "white", "white"],
      ["white", "start", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
    ];

    const next = getNextMatrix({
      currentY: 1,
      currentX: 1,
      map,
      visited,
    });

    expect(next).not.toBe(null);
    expect(next?.x).not.toBe(null);
    expect(next?.y).not.toBe(null);
  });

  it.only("handles turning corners", () => {
    const visited: VisitedNode[][] = [
      ["white", "white", "white", "white", "white"],
      ["white", "start", "white", "white", "white"],
      ["white", "grey", "white", "white", "white"],
      ["white", "grey", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
    ];

    const next = getNextMatrix({
      currentY: 3,
      currentX: 1,
      map,
      visited,
    });

    expect(next?.y).toBe(3);
    expect(next?.x).toBe(2);
  });
});
