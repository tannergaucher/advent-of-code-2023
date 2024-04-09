import fs from "fs";

export function createRowsFromInput(path: string) {
  return fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .map((row) => row.split(": ")[1])
    .map((row) => row.split("|"));
}

export function countWinningGameNumbers({ game }: { game: string[] }) {
  const winningNumbers = game[0].split(" ").filter(Number);
  const gameHand = game[1].split(" ").filter(Number);

  let count: number = 0;

  winningNumbers.forEach((number) => {
    if (gameHand.includes(number)) {
      count++;
    }
  });

  return count;
}

export function getGamePointsSum({
  winningNumbersCount,
}: {
  winningNumbersCount: number;
}) {
  let sum = 0;

  for (let i = 1; i <= winningNumbersCount; i++) {
    if (i === 1) {
      sum = 1;
    } else {
      sum = sum + sum;
    }
  }

  return sum;
}

function getScratchcardPileTotal({ games }: { games: string[][] }) {
  const gamePoints: number[] = [];

  games.forEach((game) => {
    const winningNumbersCount = countWinningGameNumbers({ game });
    const sum = getGamePointsSum({ winningNumbersCount });
    gamePoints.push(sum);
  });

  return gamePoints.reduce((acc, curr) => acc + curr);
}

// answer: 21138
console.log(
  getScratchcardPileTotal({
    games: createRowsFromInput("./input.txt"),
  })
);
