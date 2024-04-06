import fs from "fs";

export function getRowsFromInput(path: string) {
  return fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .map((el) => el.split(""));
}

export function getFirstAndLast(arr: string[]) {
  let first: number | undefined;
  let last: number | undefined;

  arr.forEach((el) => {
    if (!first && parseInt(el)) {
      first = parseInt(el);
    } else {
      if (parseInt(el)) {
        last = parseInt(el);
      }
    }
  });

  if (first && !last) {
    last = first;
  }

  if (!first) {
    throw new Error("No first number found");
  }

  if (!last) {
    throw new Error("No last number found");
  }

  return {
    first,
    last,
  };
}

export function getCalibrationValue(first: number, last: number) {
  return `${first}${last}`;
}

function getCalibrationValuesSum({ rows }: { rows: string[][] }) {
  const calibrationValues: string[] = [];

  rows.forEach((row) => {
    const { first, last } = getFirstAndLast(row);
    const calibrationValue = getCalibrationValue(first, last);
    calibrationValues.push(calibrationValue);
  });

  return calibrationValues.reduce((acc, curr) => acc + parseInt(curr), 0);
}

// answer: 54561
console.log(
  getCalibrationValuesSum({
    rows: getRowsFromInput("input.txt"),
  })
);
