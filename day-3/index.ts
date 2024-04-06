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

  while (!Number.isNaN(parseInt(rows[rowIndex][pointer]))) {
    number += rows[rowIndex][pointer];
    pointer++;
  }

  const numberCharsLength = number.toString().split("").length;

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

  if (rowIndex > 0 && rowIndex < rows.length) {
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

  return false;
}

function isSymbol(char: string) {
  const symbols = ["*", "$", "&", "/", "=", "@", "%", "+", "-", "#"];

  return symbols.includes(char);
}

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
}) => {
  for (let i = startIndex - 1; i <= startIndex + numberCharsLength + 2; i++) {
    console.log(row[i], "row i");

    if (isSymbol(row[i])) {
      return true;
    }
  }
};
