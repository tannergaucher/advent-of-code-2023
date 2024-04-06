import { describe, it, expect } from "vitest";

import { getGamesFromInput, checkValidGame } from "./index";

describe("get input rows", () => {
  it("returns an array of game hands from the input", () => {
    const games = getGamesFromInput("./input.txt");

    expect(Array.isArray(games)).toBe(true);
  });
});

describe("check valid game", () => {
  it("returns true for a valid game (each hand has a valid color / number combination)", () => {
    const valid = checkValidGame({
      game: [
        {
          red: 7,
          blue: 11,
        },
        {
          red: 10,
          blue: 5,
          green: 1,
        },
        {
          red: 7,
          green: 1,
          blue: 13,
        },
        {
          red: 9,
        },
        {
          red: 9,
          blue: 17,
        },
        {
          red: 9,
          blue: 9,
        },
      ],
      valid: {
        green: 20,
        blue: 18,
        red: 40,
      },
    });

    expect(valid).toBe(true);

    console.log(valid);
  });

  it("returns false for an game with an invalid hand", () => {
    const valid = checkValidGame({
      game: [
        {
          red: 70,
          blue: 11,
        },
        {
          red: 10,
          blue: 5,
          green: 1,
        },
        {
          red: 7,
          green: 1,
          blue: 13,
        },
        {
          red: 9,
        },
        {
          red: 9,
          blue: 17,
        },
        {
          red: 9,
          blue: 9,
        },
      ],
      valid: {
        green: 20,
        blue: 18,
        red: 40,
      },
    });

    expect(valid).toBe(false);
  });
});
