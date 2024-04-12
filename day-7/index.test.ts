import { describe, expect, it } from "vitest";

import {
  getHandsFromInput,
  getHandType,
  getComparisonIndex,
  type Hand,
} from "./index";

describe("getHandsFromInput", () => {
  it("gets an array of hands from the input file", () => {
    const hands = getHandsFromInput("./input.txt");

    expect(Array.isArray(hands)).toBe(true);
  });
});

describe("getHandType", () => {
  it("returns the correct hand type for five of a kind", () => {
    const handType = getHandType({
      cards: "KKKKK",
    });

    expect(handType).toBe("FiveOfAKind");
  });

  it("returns the correct hand type for 4 of a kind", () => {
    const handType = getHandType({
      cards: "KK5KK",
    });

    expect(handType).toBe("FourOfAKind");
  });

  it("returns the correct hand type for 3 of a kind", () => {
    const handType = getHandType({
      cards: "KK5K7",
    });

    expect(handType).toBe("ThreeOfAKind");
  });

  it("returns the correct hand type for a full house", () => {
    const handType = getHandType({
      cards: "KK5K5",
    });

    expect(handType).toBe("FullHouse");
  });

  it("returns the correct hand type for two pair", () => {
    const handType = getHandType({
      cards: "K75K5",
    });

    expect(handType).toBe("TwoPair");
  });

  it("returns the correct hand type for one pair", () => {
    const handType = getHandType({
      cards: "K75K4",
    });

    expect(handType).toBe("OnePair");
  });

  it("returns the correct hand type for high card", () => {
    const handType = getHandType({
      cards: "K75Q4",
    });

    expect(handType).toBe("HighCard");
  });
});

describe("getComparisonIndex", () => {
  it("gets the comparison index at the first card", () => {
    const hands: Hand[] = [
      ["12345", "100"],
      ["34512", "200"],
      ["K4712", "200"],
      ["23451", "300"],
    ];

    const comparisonIndex = getComparisonIndex({ hands });

    expect(comparisonIndex).toBe(0);
  });

  it("gets the comparison index at the second card", () => {
    const hands: Hand[] = [
      ["12345", "100"],
      ["34512", "200"],
      ["15782", "200"],
      ["23451", "300"],
    ];

    const comparisonIndex = getComparisonIndex({ hands });

    expect(comparisonIndex).toBe(1);
  });

  it("gets the comparison index at the third card", () => {
    const hands: Hand[] = [
      ["12345", "100"],
      ["32519", "200"],
      ["15782", "200"],
      ["23451", "300"],
    ];

    const comparisonIndex = getComparisonIndex({ hands });

    expect(comparisonIndex).toBe(2);
  });

  it("gets the comparison index at the fourth card", () => {
    const hands: Hand[] = [
      ["12745", "100"],
      ["32519", "200"],
      ["15782", "200"],
      ["23451", "300"],
    ];

    const comparisonIndex = getComparisonIndex({ hands });

    expect(comparisonIndex).toBe(3);
  });

  it("gets the comparison index at the fifth card", () => {
    const hands: Hand[] = [
      ["12745", "100"],
      ["32589", "200"],
      ["15782", "200"],
      ["23451", "300"],
    ];

    const comparisonIndex = getComparisonIndex({ hands });

    expect(comparisonIndex).toBe(4);
  });
});
