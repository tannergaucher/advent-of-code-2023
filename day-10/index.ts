export type VisitedNode = "start" | "white" | "grey" | "black";

export type MapNode = "S" | "." | "|" | "-" | "L" | "J" | "7" | "F";

export type Direction = "north" | "south" | "east" | "west";

export type Matrix = {
  y: number;
  x: number;
};

const isValidConnection = (node: MapNode | null) => {
  if (!node) {
    return false;
  }

  // todo handle pipe connections by comparing prev and current node
  return node !== ".";
};

function getNextMatrix({
  currentY,
  currentX,
  map,
}: {
  currentY: number;
  currentX: number;
  map: MapNode[][];
}): Matrix | null {
  const north = currentY === 0 ? null : map[currentY - 1][currentX];
  const south =
    currentY === map.length - 1 ? null : map[currentY + 1][currentX];
  const east =
    currentX === map[currentY].length - 1 ? null : map[currentY][currentX + 1];
  const west = currentX === 0 ? null : map[currentY][currentX - 1];

  if (isValidConnection(north)) {
    return {
      y: currentY - 1,
      x: currentX,
    };
  }

  if (isValidConnection(south)) {
    return {
      y: currentY + 1,
      x: currentX,
    };
  }

  if (isValidConnection(east)) {
    return {
      y: currentY,
      x: currentX + 1,
    };
  }

  if (isValidConnection(west)) {
    return {
      y: currentY,
      x: currentX - 1,
    };
  }

  return null;
}

function visitNext({ y, x, map }: Matrix & { map: MapNode[][] }) {
  const nextNode = map[y][x];
  const nextNodeValid = isValidConnection(nextNode);

  if (nextNodeValid) {
    return {
      node: nextNode,
      y,
      x,
    };
  }

  return null;
}
