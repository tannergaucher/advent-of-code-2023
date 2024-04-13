import { describe, expect, it } from "vitest";

import {
  getHandsFromInput,
  getHandType,
  type Hand,
  sortHandsByRank,
  groupByConsecutive,
  sortRankedHands,
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

    expect(handType).toBe("fiveOfAKind");
  });

  it("returns the correct hand type for 4 of a kind", () => {
    const handType = getHandType({
      cards: "KK5KK",
    });

    expect(handType).toBe("fourOfAKind");
  });

  it("returns the correct hand type for 3 of a kind", () => {
    const handType = getHandType({
      cards: "KK5K7",
    });

    expect(handType).toBe("threeOfAKind");
  });

  it("returns the correct hand type for a full house", () => {
    const handType = getHandType({
      cards: "KK5K5",
    });

    expect(handType).toBe("fullHouse");
  });

  it("returns the correct hand type for two pair", () => {
    const handType = getHandType({
      cards: "K75K5",
    });

    expect(handType).toBe("twoPair");
  });

  it("returns the correct hand type for one pair", () => {
    const handType = getHandType({
      cards: "K75K4",
    });

    expect(handType).toBe("onePair");
  });

  it("returns the correct hand type for high card", () => {
    const handType = getHandType({
      cards: "K75Q4",
    });

    expect(handType).toBe("highCard");
  });
});

describe("sortHandsByRank", () => {
  it("sorts hands by rank", () => {
    const hands = getHandsFromInput("./input.txt");
    const sortedByRank = sortHandsByRank({ hands });

    expect(Object.keys(sortedByRank).length).toBe(7);
  });
});

describe("groupByConsecutive", () => {
  it("groups hands by consecutive sequence", () => {
    const hands: Hand[] = [
      ["Q4Q7Q", "307"],
      ["QQ6Q3", "252"],
      ["QQQ79", "870"],
      ["Q6JQQ", "742"],
      ["QQQ28", "998"],
      ["Q6AAA", "862"],
      ["Q8886", "433"],
      ["QQQ38", "411"],
      ["QQQ76", "321"],
      ["Q2QJQ", "396"],
      ["QKQTQ", "54"],
    ];

    const grouped = groupByConsecutive({
      char: "Q",
      hands,
    });

    // expect(grouped.length).toBe(2);
  });
});

describe("sortRankedHands", () => {
  it.only("sorts ranked hands", () => {
    const unsortedRanked: Hand[] = [
      ["25722", "304"],
      ["3J777", "548"],
      ["37776", "242"],
      ["ATAA5", "750"],
      ["99J9T", "916"],
      ["Q4Q7Q", "307"],
      ["TTAT8", "483"],
      ["6T6J6", "823"],
      ["229T2", "17"],
      ["QQ6Q3", "252"],
      ["QQQ79", "870"],
      ["AKTKK", "297"],
      ["Q6JQQ", "742"],
      ["59699", "653"],
      ["KK45K", "94"],
      ["QQQ28", "998"],
      ["373J3", "144"],
      ["Q6AAA", "862"],
      ["6669Q", "685"],
      ["55985", "124"],
      ["8TTT2", "337"],
      ["T5T9T", "628"],
      ["4J434", "53"],
      ["T2722", "757"],
      ["33732", "539"],
      ["J8TTT", "933"],
      ["AA9JA", "582"],
      ["77JT7", "151"],
      ["53K33", "290"],
      ["Q8886", "433"],
      ["K9599", "857"],
      ["33J3T", "292"],
      ["7T5TT", "639"],
      ["98995", "593"],
      ["88987", "108"],
      ["3T33Q", "535"],
      ["22TA2", "924"],
      ["TTJTQ", "833"],
      ["36662", "204"],
      ["36566", "796"],
      ["888TJ", "485"],
      ["J9499", "610"],
      ["39KKK", "606"],
      ["97666", "509"],
      ["J4KKK", "257"],
      ["QQQ38", "411"],
      ["AA3A2", "372"],
      ["8QJQQ", "371"],
      ["33Q43", "416"],
      ["9A989", "407"],
      ["A5AAJ", "7"],
      ["J99A9", "305"],
      ["33QJ3", "804"],
      ["5QQQA", "105"],
      ["3Q33A", "197"],
      ["QQQ76", "321"],
      ["6K888", "413"],
      ["JQTQQ", "283"],
      ["KT7KK", "885"],
      ["2K666", "552"],
      ["555KJ", "528"],
      ["44482", "703"],
      ["52242", "216"],
      ["2A322", "38"],
      ["7TQQQ", "515"],
      ["66JK6", "812"],
      ["442J4", "727"],
      ["888JK", "25"],
      ["J9993", "345"],
      ["77297", "12"],
      ["7Q767", "976"],
      ["TTTJ4", "689"],
      ["99495", "826"],
      ["AAAJ6", "122"],
      ["K777J", "646"],
      ["33368", "744"],
      ["888J5", "690"],
      ["6676Q", "251"],
      ["K4TKK", "332"],
      ["9TTT6", "752"],
      ["8988T", "472"],
      ["Q2QJQ", "396"],
      ["588K8", "946"],
      ["37977", "217"],
      ["36444", "504"],
      ["QKQTQ", "54"],
      ["779T7", "625"],
      ["9KKJK", "412"],
      ["J7888", "904"],
      ["59939", "116"],
      ["73757", "382"],
      ["KKQJK", "311"],
      ["4484T", "331"],
      ["666J5", "450"],
      ["449J4", "886"],
      ["K3332", "871"],
      ["K6664", "173"],
      ["7K774", "789"],
      ["45559", "103"],
      ["23622", "366"],
    ];
    const sorted = sortRankedHands({ rankedHands: unsortedRanked });

    console.log(sorted, "sorted");
  });
});
