import fs from "fs";

export function getRowsFromInput(path: string) {
  return fs.readFileSync(path).toString().split(/\r?\n/);
}

export function isSymbol(char: string) {
  const symbols = ["*", "$", "&", "/", "=", "@", "%", "+", "-", "#"];

  return symbols.includes(char);
}

export function checkCurrentRow({
  row,
  startIndex,
  numberCharsLength,
}: {
  row: string;
  startIndex: number;
  numberCharsLength: number;
}) {
  const prevEl = row[startIndex - 1];

  if (isSymbol(prevEl)) {
    return true;
  }

  const nextEl = row[startIndex + numberCharsLength + 1];

  if (isSymbol(nextEl)) {
    return true;
  }

  return false;
}

export function checkAdjacentRow({
  elementIndex,
  row,
  numberCharsLength,
}: {
  elementIndex: number;
  row: string;
  numberCharsLength: number;
}) {
  for (
    let i = elementIndex - 1;
    i <= elementIndex + numberCharsLength + 2;
    i++
  ) {
    if (isSymbol(row[i])) {
      return true;
    }
  }

  return false;
}
