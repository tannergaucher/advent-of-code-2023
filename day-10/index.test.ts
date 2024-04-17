import { describe, expect, it } from "vitest";

import {
  type Direction,
  type MapNode,
  type VisitedNode,
  type MatrixIndex,
} from "./index";

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
