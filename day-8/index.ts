import fs from "fs";

type NodesMap = Record<string, [string, string]>;

type Direction = "L" | "R";

export function getDirectionsAndNodesMapFromInput(path: string) {
  const [directions] = fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .slice(0, 1)
    .map((el) => el.split("") as Direction[]);

  const nodesMapArr = fs.readFileSync(path).toString().split(/\r?\n/).slice(2);

  const nodesMap: NodesMap = {};

  nodesMapArr.forEach((nodeMap) => {
    const key = nodeMap.split("=")[0].trim();
    const left = nodeMap.split("=")[1].split(",")[0].replace("(", "").trim();
    const right = nodeMap.split("=")[1].split(",")[1].replace(")", "").trim();

    nodesMap[key] = [left, right];
  });

  return {
    directions,
    nodesMap,
  };
}

export function lookupNode({
  node,
  direction,
  nodesMap,
}: {
  node: string;
  direction: Direction;
  nodesMap: NodesMap;
}) {
  const directionIndex = direction === "L" ? 0 : 1;

  const nextNode = nodesMap[node][directionIndex];

  return nextNode;
}

function countStepsToTarget({
  directions,
  nodesMap,
}: {
  directions: Direction[];
  nodesMap: NodesMap;
}) {
  let directionsIndexPointer = 0;
  let steps = 1;
  let node: string | null = null;

  node = lookupNode({
    node: "AAA",
    nodesMap,
    direction: directions[directionsIndexPointer],
  });

  while (node !== "ZZZ") {
    steps++;

    if (directionsIndexPointer === directions.length - 1) {
      directionsIndexPointer = 0;
    } else {
      directionsIndexPointer++;
    }

    node = lookupNode({
      node,
      direction: directions[directionsIndexPointer],
      nodesMap,
    });
  }

  return steps;
}

const { directions, nodesMap } =
  getDirectionsAndNodesMapFromInput("./input.txt");

// Solution: 18727
console.log(
  countStepsToTarget({
    directions,
    nodesMap,
  })
);
