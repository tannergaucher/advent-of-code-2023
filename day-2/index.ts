import fs from "fs";

type GameColor = "red" | "blue" | "green";
type Game = { [K in GameColor]?: number };

export function getGamesFromInput(path: string) {
  return fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .map((row) => {
      const game = row.split(":")[1];

      const games = game.split(";").map((game) => game.split(","));

      return games.map((game) => {
        let gameObj: Game = {};

        game.map((hand) => {
          const number = parseInt(hand.trim().split(" ")[0]);
          const color = hand.trim().split(" ")[1] as GameColor;

          gameObj[color] = number;
        });

        return gameObj;
      });
    });
}

export function checkValidGame({
  game,
  valid,
}: {
  game: Game[];
  valid: {
    red: number;
    green: number;
    blue: number;
  };
}) {
  let gameValid: boolean = false;
  let redValid: boolean = false;
  let blueValid: boolean = false;
  let greenValid: boolean = false;

  return game
    .map((hand) => {
      gameValid = false;
      redValid = false;
      blueValid = false;
      greenValid = false;

      const { red, green, blue } = hand;

      if (red === undefined || red <= valid.red) {
        redValid = true;
      }

      if (blue === undefined || blue <= valid.blue) {
        blueValid = true;
      }

      if (green === undefined || green <= valid.green) {
        greenValid = true;
      }

      if (redValid && blueValid && greenValid) {
        gameValid = true;
      }

      return gameValid;
    })
    .every((game) => game === true);
}

export function getValidGameIdSum({ games }: { games: Game[][] }) {
  const validGameIds: number[] = [];

  games.forEach((game, index) => {
    const valid = checkValidGame({
      game,
      valid: {
        red: 12,
        green: 13,
        blue: 14,
      },
    });

    if (valid) {
      validGameIds.push(index + 1);
    }
  });

  return validGameIds.reduce((acc, curr) => acc + curr);
}

// 2406
console.log(
  getValidGameIdSum({
    games: getGamesFromInput("./input.txt"),
  })
);
