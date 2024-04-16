export type VisitedNode = "start" | "white" | "grey" | "black";

export type MapNode = "S" | "." | "|" | "-" | "L" | "J" | "7" | "F";

export type Direction = "north" | "south" | "east" | "west";

export type MatrixIndex = {
  x: number;
  y: number;
};

/* 
| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
*/

export function depthFirstSearch({
  graph,
  visited,
  matrixIndex,
  stack,
  direction,
}: {
  visited: VisitedNode[][];
  graph: MapNode[][];
  stack: MapNode[];
  matrixIndex: MatrixIndex;
  direction: Direction;
}) {
  let nextNode: MapNode | null = null;

  let yIndex = getYIndex(matrixIndex, direction);
  let xIndex = getXIndex(matrixIndex, direction);

  nextNode = graph[yIndex][xIndex];

  // temp, todo handle isValid
  const nextNodeIsValid = nextNode === "-" || nextNode === "7";

  if (!nextNodeIsValid) {
    visited[yIndex].splice(xIndex, 1, "black");
  }

  if (nextNodeIsValid) {
    stack.push(nextNode);
    visited[yIndex].splice(xIndex, 1, "black");

    matrixIndex = {
      y: yIndex,
      x: xIndex,
    };

    depthFirstSearch({
      graph,
      visited,
      stack,
      direction,
      matrixIndex,
    });
  }

  return {
    visited,
    stack,
    matrixIndex,
  };
}

const getYIndex = (matrixIndex: MatrixIndex, direction: Direction) => {
  if (direction === "north") {
    return matrixIndex.y - 1;
  }

  if (direction === "south") {
    return matrixIndex.y + 1;
  }

  return matrixIndex.y;
};

const getXIndex = (matrixIndex: MatrixIndex, direction: Direction) => {
  if (direction === "east") {
    return matrixIndex.x + 1;
  }

  if (direction === "west") {
    return matrixIndex.x - 1;
  }

  return matrixIndex.x;
};
