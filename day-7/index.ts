import fs from "fs";

type Cards = string;

type Bid = string;

export type Hand = [Cards, Bid];

type HandType =
  | "fiveOfAKind"
  | "fourOfAKind"
  | "fullHouse"
  | "threeOfAKind"
  | "twoPair"
  | "onePair"
  | "highCard";

const sequence = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

export function getHandsFromInput(path: string) {
  return fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .map((hand) => hand.split(" ")) as Hand[];
}

export function sortHandsByRank({ hands }: { hands: Hand[] }) {
  const handsByRank: Record<HandType, Hand[]> = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPair: [],
    onePair: [],
    highCard: [],
  };

  hands.map((hand) => {
    const handType = getHandType({ cards: hand[0] });
    if (handType === "fiveOfAKind") {
      handsByRank.fiveOfAKind.push(hand);
    }

    if (handType === "fourOfAKind") {
      handsByRank.fourOfAKind.push(hand);
    }

    if (handType === "fullHouse") {
      handsByRank.fullHouse.push(hand);
    }

    if (handType === "threeOfAKind") {
      handsByRank.threeOfAKind.push(hand);
    }

    if (handType === "twoPair") {
      handsByRank.twoPair.push(hand);
    }

    if (handType === "onePair") {
      handsByRank.onePair.push(hand);
    }

    if (handType === "highCard") {
      handsByRank.highCard.push(hand);
    }
  });

  return handsByRank;
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
    return "fiveOfAKind";
  }

  if (Object.values(handObj).includes(4)) {
    return "fourOfAKind";
  }

  if (
    Object.values(handObj).includes(3) &&
    Object.values(handObj).includes(2)
  ) {
    return "fullHouse";
  }

  if (Object.values(handObj).includes(3)) {
    return "threeOfAKind";
  }

  if (Object.values(handObj).filter((el) => el === 2).length === 2) {
    return "twoPair";
  }

  if (Object.values(handObj).includes(2)) {
    return "onePair";
  }

  if (Object.values(handObj).includes(1)) {
    return "highCard";
  }

  throw new Error("no hand type");
}

export function sortRankedHands({ rankedHands }: { rankedHands: Hand[] }) {
  const rankedAndSorted: Hand[] = [];

  const initialSort = rankedHands.sort(
    (a, b) => sequence.indexOf(a[0][0]) - sequence.indexOf(b[0][0])
  );

  const rankedByFirstCard = sequence.map((el) => {
    return initialSort.filter((hand) => hand[0][0] === el);
  });

  rankedByFirstCard.map((rankedHandArr) => {
    const cardType = rankedHandArr[0][0][0];

    const grouped = groupByConsecutive({
      char: cardType,
      hands: rankedHandArr,
    });

    rankedAndSorted.push(...grouped[5]);
    rankedAndSorted.push(...grouped[4]);
    rankedAndSorted.push(...grouped[3]);
    rankedAndSorted.push(...grouped[2]);
    rankedAndSorted.push(...grouped[1]);
  });

  return rankedAndSorted;
}

export function groupByConsecutive({
  char,
  hands,
}: {
  char: string;
  hands: Hand[];
}) {
  const fives: Hand[] = [];
  const fours: Hand[] = [];
  const threes: Hand[] = [];
  const twos: Hand[] = [];
  const ones: Hand[] = [];

  hands.map((hand) => {
    if (
      hand[0][0] === char &&
      hand[0][1] === char &&
      hand[0][2] === char &&
      hand[0][3] === char &&
      hand[0][4] === char
    ) {
      fives.push(hand);
    }

    if (
      hand[0][0] === char &&
      hand[0][1] === char &&
      hand[0][2] === char &&
      hand[0][3] === char &&
      hand[0][4] !== char
    ) {
      fours.push(hand);
    }

    if (
      hand[0][0] === char &&
      hand[0][1] === char &&
      hand[0][2] === char &&
      hand[0][3] !== char
    ) {
      threes.push(hand);
    }

    if (hand[0][0] === char && hand[0][1] === char && hand[0][2] !== char) {
      twos.push(hand);
    }

    if (hand[0][0] === char && hand[0][1] !== char) {
      ones.push(hand);
    }
  });

  return {
    char,
    5: fives,
    4: fours.sort(
      (a, b) => sequence.indexOf(a[0][4]) - sequence.indexOf(b[0][4])
    ),
    3: threes.sort(
      (a, b) => sequence.indexOf(a[0][3]) - sequence.indexOf(b[0][3])
    ),
    2: twos.sort(
      (a, b) => sequence.indexOf(a[0][2]) - sequence.indexOf(b[0][2])
    ),
    1: ones.sort(
      (a, b) => sequence.indexOf(a[0][1]) - sequence.indexOf(b[0][1])
    ),
  };
}

console.log(
  determineTotalWinnings({
    hands: getHandsFromInput("./input.txt"),
  })
);

function determineTotalWinnings({ hands }: { hands: Hand[] }) {
  const sorted: Hand[] = [];

  const rankedHands = sortHandsByRank({ hands });

  sorted.push(...rankedHands.fiveOfAKind);

  const sortedFourOfAKind = sortRankedHands({
    rankedHands: rankedHands.fourOfAKind,
  });

  sorted.push(...sortedFourOfAKind);

  const sortedFullHouse = sortRankedHands({
    rankedHands: rankedHands.fullHouse,
  });

  sorted.push(...sortedFullHouse);

  const sortedThreeOfAKind = sortRankedHands({
    rankedHands: rankedHands.threeOfAKind,
  });

  sorted.push(...sortedThreeOfAKind);

  const sortedTwoPair = sortRankedHands({
    rankedHands: rankedHands.twoPair,
  });

  sorted.push(...sortedTwoPair);

  const sortedOnePair = sortRankedHands({
    rankedHands: rankedHands.onePair,
  });

  sorted.push(...sortedOnePair);

  const sortedHighCard = sortRankedHands({
    rankedHands: rankedHands.highCard,
  });

  sorted.push(...sortedHighCard);

  console.log(sorted.length);

  const total = sorted
    .map((hand) => hand[1])
    .reduce(
      (acc, bid, index) => acc + parseInt(bid) * (sorted.length - index),
      0
    );

  return total;
}
