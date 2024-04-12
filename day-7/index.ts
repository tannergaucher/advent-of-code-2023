import fs from "fs";

type Cards = string;

type Bid = string;

export type Hand = [Cards, Bid];

type HandType =
  | "FiveOfAKind"
  | "FourOfAKind"
  | "FullHouse"
  | "ThreeOfAKind"
  | "TwoPair"
  | "OnePair"
  | "HighCard";

export function getHandsFromInput(path: string) {
  return fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .map((hand) => hand.split(" ")) as Hand[];
}

export function getHandType({ cards }: { cards: Cards }): HandType {
  const handObj: Record<string, number> = {};

  for (let el of cards) {
    if (!handObj[el]) {
      handObj[el] = 1;
    } else {
      handObj[el] = handObj[el] + 1;
    }
  }

  if (Object.values(handObj).includes(5)) {
    return "FiveOfAKind";
  }

  if (Object.values(handObj).includes(4)) {
    return "FourOfAKind";
  }

  if (
    Object.values(handObj).includes(3) &&
    Object.values(handObj).includes(2)
  ) {
    return "FullHouse";
  }

  if (Object.values(handObj).includes(3)) {
    return "ThreeOfAKind";
  }

  if (Object.values(handObj).filter((el) => el === 2).length === 2) {
    return "TwoPair";
  }

  if (Object.values(handObj).includes(2)) {
    return "OnePair";
  }

  return "HighCard";
}

export function getComparisonIndex({ hands }: { hands: Hand[] }) {
  let comparisonIndex: number | null = null;
  let pointer = 0;

  while (!comparisonIndex) {
    if (pointer === 4) {
      comparisonIndex = 4;
    }

    let cardCountObj: Record<string, number> = {};

    for (const hand of hands) {
      const cards = hand[0];
      const card = cards[pointer];

      if (!cardCountObj[card]) {
        cardCountObj[card] = 1;
      } else {
        cardCountObj[card] = cardCountObj[card] + 1;
      }
    }

    if (Object.values(cardCountObj).every((count) => count === 1)) {
      comparisonIndex = pointer;
      break;
    }

    pointer++;
  }

  return comparisonIndex;
}
