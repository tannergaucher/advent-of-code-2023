import fs from "fs";

export function getRowsFromInput(path: string) {
  return fs.readFileSync(path).toString().split(/\r?\n/);
}

export function checkAdjacency({
  rows,
  rowIndex,
  elementIndex,
}: {
  rows: string[];
  rowIndex: number;
  elementIndex: number;
}) {
  let number = "";
  let pointer = elementIndex;

  let hasAdjacent: boolean = false;

  while (!Number.isNaN(parseInt(rows[rowIndex][pointer]))) {
    number += rows[rowIndex][pointer];
    pointer++;
  }

  const numberCharsLength = number.toString().split("").length;

  const checkCurrentRow = ({
    row,
    startIndex,
    numberCharsLength,
  }: {
    row: string;
    startIndex: number;
    numberCharsLength: number;
  }) => {
    const prevEl = row[startIndex - 1];

    if (isSymbol(prevEl)) {
      return true;
    }

    const nextEl = row[startIndex + numberCharsLength + 1];

    if (isSymbol(nextEl)) {
      return true;
    }
  };

  const checkAdjacentRow = ({
    startIndex,
    row,
    numberCharsLength,
  }: {
    startIndex: number;
    row: string;
    numberCharsLength: number;
  }) => {};

  if (rowIndex === 0) {
    checkCurrentRow({
      startIndex: elementIndex,
      numberCharsLength,
      row: rows[rowIndex],
    });

    // next row
    checkAdjacentRow({
      startIndex: elementIndex,
      row: rows[rowIndex + 1],
      numberCharsLength,
    });
  }

  if (rowIndex === rows.length - 1) {
    // check current
    checkCurrentRow({
      startIndex: elementIndex,
      numberCharsLength,
      row: rows[rowIndex],
    });

    // and check check prev
    checkAdjacentRow({
      startIndex: elementIndex,
      numberCharsLength,
      row: rows[rowIndex - 1],
    });
  }

  // otherwise check all
  checkCurrentRow({
    startIndex: elementIndex,
    numberCharsLength,
    row: rows[rowIndex],
  });

  // prev
  checkAdjacentRow({
    startIndex: elementIndex,
    row: rows[rowIndex - 1],
    numberCharsLength,
  });

  // and next
  checkAdjacentRow({
    startIndex: elementIndex,
    row: rows[rowIndex - 1],
    numberCharsLength,
  });

  return false;
}

function isSymbol(char: string) {
  const symbols = ["*", "$", "&", "/", "=", "@", "%", "+", "-", "#"];

  return symbols.includes(char);
}
