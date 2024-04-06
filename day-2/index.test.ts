import { describe, it, expect } from "vitest";

import { getInputRows } from "./index";

describe("get input rows", () => {
  it("returns an array of game hands from the input", () => {
    const games = getInputRows("./input.txt");

    console.log(JSON.stringify(games, null, 2));

    expect(Array.isArray(games)).toBe(true);
  });
});
