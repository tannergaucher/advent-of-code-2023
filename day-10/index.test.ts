import { describe, expect, it } from "vitest";

import {
  type MapNode,
  type StackElement,
  type VisitedNode,
  getNextMatrix,
  visitNext,
  traverseMap,
} from "./index";

const map: MapNode[][] = [
  [".", ".", ".", ".", "."],
  [".", "S", "-", "7", "."],
  [".", "|", ".", "|", "."],
  [".", "L", "-", "J", "."],
  [".", ".", ".", ".", "."],
];

describe("getNextMatrix", () => {
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

  it("handles turning corners", () => {
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

describe("visitNext", () => {
  it("handles visiting the next node", () => {
    const stack: StackElement[] = [
      {
        node: "S",
        matrix: {
          y: 1,
          x: 2,
        },
      },
    ];

    const visited: VisitedNode[][] = [
      ["white", "white", "white", "white", "white"],
      ["white", "start", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
    ];

    const next = visitNext({
      map,
      visited,
      stack,
      matrix: {
        y: 2,
        x: 1,
      },
    });

    expect(next?.node).toBe("|");
    expect(next?.stack.length).toBe(2);
    expect(visited[2][1]).toBe("grey");
  });
});

describe("traverse map", () => {
  it.only("handles traversing the map", () => {
    const map: MapNode[][] = [
      [".", ".", ".", ".", "."],
      [".", "S", "-", "7", "."],
      [".", "|", ".", "|", "."],
      [".", "L", "-", "J", "."],
      [".", ".", ".", ".", "."],
    ];

    const visited: VisitedNode[][] = [
      ["white", "white", "white", "white", "white"],
      ["white", "start", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
    ];

    const pathStack = traverseMap({
      map,
      visited,
    });

    expect(pathStack.length).toBe(8);
  });
});
