export type VisitedNode = "start" | "white" | "grey" | "black";

export type MapNode = "S" | "." | "|" | "-" | "L" | "J" | "7" | "F";

export type Direction = "north" | "south" | "east" | "west";

export type Matrix = {
  y: number;
  x: number;
};

export type StackElement = { node: MapNode; matrix: Matrix };

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

  visited[currentY].splice(currentX, 1, "black");

  return null;
}

export function visitNext({
  matrix,
  map,
  stack,
  visited,
}: {
  matrix: Matrix;
  map: MapNode[][];
  stack: StackElement[];
  visited: VisitedNode[][];
}) {
  const nextNode = map[matrix.y][matrix.x];
  const nextNodeValid = isValidConnection(nextNode);

  if (nextNodeValid) {
    stack.push({
      node: nextNode,
      matrix,
    });

    visited[matrix.y].splice(matrix.x, 1, "grey");

    return {
      node: nextNode,
      stack,
    };
  }

  return null;
}

export function traverseMap({
  map,
  visited,
}: {
  map: MapNode[][];
  visited: VisitedNode[][];
}) {
  const stack: StackElement[] = [];

  let backToStart = false;

  const [startMatrix] = map.map((row, rowIndex) => {
    const y = rowIndex;
    const x = row.findIndex((el) => el === "S");
    return {
      y,
      x,
    };
  });

  stack.push({
    node: "S",
    matrix: {
      y: startMatrix.y,
      x: startMatrix.x,
    },
  });

  while (backToStart === false) {
    const nextMatrix = getNextMatrix({
      currentY: stack[stack.length - 1].matrix.y,
      currentX: stack[stack.length - 1].matrix.x,
      map,
      visited,
    });

    if (nextMatrix) {
      const nextNode = visitNext({
        stack,
        map,
        visited,
        matrix: {
          y: nextMatrix.y,
          x: nextMatrix.x,
        },
      });

      console.log(nextNode, "nextNode");

      if (nextNode?.node === "S") {
        backToStart = true;
      }
    } else {
      // handle backtracking on no valid next matrix from current
    }
  }

  return stack;
}
