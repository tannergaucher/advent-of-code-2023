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

const isWhite = ({
  matrix,
  visited,
}: {
  matrix: Matrix;
  visited: VisitedNode[][];
}) => {
  return visited[matrix.y][matrix.x] === "white";
};

export function getNextMatrix({
  currentY,
  currentX,
  map,
  visited,
}: {
  currentY: number;
  currentX: number;
  map: MapNode[][];
  visited: VisitedNode[][];
}): Matrix | null {
  const north = currentY === 0 ? null : map[currentY - 1][currentX];
  const south =
    currentY === map.length - 1 ? null : map[currentY + 1][currentX];
  const east =
    currentX === map[currentY].length - 1 ? null : map[currentY][currentX + 1];
  const west = currentX === 0 ? null : map[currentY][currentX - 1];

  if (
    isValidConnection(north) &&
    isWhite({
      visited,
      matrix: {
        y: currentY - 1,
        x: currentX,
      },
    })
  ) {
    return {
      y: currentY - 1,
      x: currentX,
    };
  }

  if (
    isValidConnection(south) &&
    isWhite({
      visited,
      matrix: {
        y: currentY - 1,
        x: currentX,
      },
    })
  ) {
    return {
      y: currentY + 1,
      x: currentX,
    };
  }

  if (
    isValidConnection(east) &&
    isWhite({
      visited,
      matrix: {
        y: currentY,
        x: currentX + 1,
      },
    })
  ) {
    return {
      y: currentY,
      x: currentX + 1,
    };
  }

  if (
    isValidConnection(west) &&
    isWhite({
      visited,
      matrix: {
        y: currentY,
        x: currentX - 1,
      },
    })
  ) {
    return {
      y: currentY,
      x: currentX - 1,
    };
  }

  return null;
}

// function visitNext({
//   y,
//   x,
//   map,
//   stack,
// }: Matrix & { map: MapNode[][]; stack: Matrix & { node: MapNode } }) {
//   const nextNode = map[y][x];

//   const nextNodeValid = isValidConnection(nextNode);

//   if (nextNodeValid) {
//     // set grey in visited array
//     // push {node, y, x } to stack

//     return {
//       node: nextNode,
//       y,
//       x,
//     };
//   }

//   return null;
// }
