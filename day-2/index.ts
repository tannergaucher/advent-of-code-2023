import fs from "fs";

export function getInputRows(path: string) {
  return fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .map((row) => {
      const game = row.split(":")[1];

      const games = game.split(";").map((game) => game.split(","));

      type GameColor = "red" | "blue" | "green";
      type GameArrElement = { [K in GameColor]?: number };

      return games.map((game) => {
        const gameArr: GameArrElement[] = [];

        let gameObj = {};

        game.map((hand) => {
          const number = parseInt(hand.trim().split(" ")[0]);
          const color = hand.trim().split(" ")[1];
          gameObj[color] = number;
        });

        gameArr.push(gameObj);

        return gameArr;
      });
    });
}

// checkValidGame:
//  if every hand in the games array is valid, return that game id (array's index + 1)
export function checkValidGame() {}

// iterate the game array
// check if valid game
// return the reduced total of the valid game ids
export function getValidGameIdSum() {}
