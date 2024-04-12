import fs from "fs";

type Cards = string;

type Bid = string;

type Hand = [Cards, Bid];

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
