import { describe, it, expect } from "vitest";

import {
  createRowsFromInput,
  countWinningGameNumbers,
  getGamePointsSum,
} from "./index";

describe("create rows from input", () => {
  it("creates rows from input", () => {
    const rows = createRowsFromInput("./input.txt");

    expect(Array.isArray(rows));
  });
});

describe("count winning game numbers", () => {
  it("counts winning game numbers", () => {
    const game = [
      " 6 82 38 27 32 46 97  9 28 73 ",
      " 77 40  8 64  6 67 14  1 89 73 97  2 54 88 48 47 29 84 90 69 46 31 12 79 71",
    ];

    const count = countWinningGameNumbers({
      game,
    });

    expect(count).toBe(4);
  });

  it("counts winning game numbers", () => {
    const game = [
      " 6 82 38 27 32 46 97  9 28 73 ",
      " 77 40  8 64  67 14  1 89 73 97  2 54 88 48 47 29 84 90 69 46 31 12 79 71",
    ];

    const count = countWinningGameNumbers({
      game,
    });

    expect(count).toBe(3);
  });
});

describe("get game points sum", () => {
  it("gets the game points sum", () => {
    const sum = getGamePointsSum({ winningNumbersCount: 4 });
    expect(sum).toBe(8);
  });
});
