import { describe, expect, it } from "vitest";

import {
  createRowsFromInput,
  getRowUniverses,
  getColumnUniverses,
} from "./index";

describe("createRowsFromInput", () => {
  it("creates rows from input", () => {
    const rows = createRowsFromInput("./input.txt");

    console.log(rows);

    expect(Array.isArray(rows)).toBe(true);
  });
});

describe("getRowUniverses", () => {
  it("gets the number of universes in a row", () => {
    const row =
      "..................................................................................................#..................#......................";

    const universes = getRowUniverses({ row });

    console.log(universes, "universes");

    expect(universes.length).toBe(2);
  });
});

describe("getColumnUniverses", () => {
  it("gets the number of universes in the column", () => {
    const rows = createRowsFromInput("./input-small.txt");

    const columnUniverses = getColumnUniverses({ rows, columnIndex: 0 });

    expect(columnUniverses.length).toBe(2);

    const c = getColumnUniverses({ rows, columnIndex: 2 });

    expect(c.length).toBe(0);
  });
});
