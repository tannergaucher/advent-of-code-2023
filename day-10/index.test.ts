import { describe, expect, it } from "vitest";

import {
  depthFirstSearch,
  type Direction,
  type MapNode,
  type VisitedNode,
  type MatrixIndex,
} from "./index";

describe("depthFirstSearch", () => {
  it("searches 1 line north before backtracking", () => {
    const graph: MapNode[][] = [
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

    const matrixIndex: MatrixIndex = {
      x: 1,
      y: 1,
    };

    const stack: MapNode[] = ["S"];

    const search = depthFirstSearch({
      graph,
      visited,
      stack,
      matrixIndex,
      direction: "north",
    });

    expect(visited[0][1]).toBe("black");
    expect(stack.length).toBe(search.stack.length);
    expect(search.matrixIndex.x).toBe(matrixIndex.x);
    expect(search.matrixIndex.y).toBe(matrixIndex.y);
  });

  it("searches three lines west and then backs one line", () => {
    const graph: MapNode[][] = [
      [".", ".", ".", ".", "."],
      [".", "S", "-", "7", "."],
      [".", "|", ".", "|", "."],
      [".", "L", "-", "J", "."],
      [".", ".", ".", ".", "."],
    ];

    const visited: VisitedNode[][] = [
      ["white", "black", "white", "white", "white"],
      ["white", "start", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white"],
    ];

    const matrixIndex: MatrixIndex = { x: 1, y: 1 };

    const stack: MapNode[] = ["S"];

    const search = depthFirstSearch({
      graph,
      visited,
      stack,
      matrixIndex,
      direction: "east",
    });

    console.log(search);
  });
});
