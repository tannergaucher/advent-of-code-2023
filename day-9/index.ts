import fs, { read } from "fs";
// it creates an array of arrays from the input file
export function createRowsFromInput(path: string) {
  const rows = fs.readFileSync(path).toString().split(/\r?\n/);

  return rows.map((el) => el.split(" ").map((str) => parseInt(str)));
}

// it creates an array of arrays of the differences of the prev array until all the array elements are zero
export function createDifferenceArray({ row }: { row: number[] }) {
  const sumDifferenceArray: number[][] = [];

  if (!sumDifferenceArray.length) {
    sumDifferenceArray.push(row);
  }

  return doWork({ row });

  function doWork({ row }: { row: number[] }) {
    const currentArray: number[] = [];

    for (let i = 1; i < row.length; i++) {
      const currentValue = row[i] - row[i - 1];
      currentArray.push(currentValue);
    }

    sumDifferenceArray.push(currentArray);

    if (currentArray.every((el) => el === 0)) {
      return sumDifferenceArray;
    }

    return doWork({
      row: sumDifferenceArray[sumDifferenceArray.length - 1],
    });
  }
}

// it calculates the next number in the sequence from the summed difference array
export function calculateNextInSequence({ array }: { array: number[][] }) {
  array.reverse();

  array.forEach((_el, i) => {
    if (i === 0) {
      array[i] = [...array[i], 0];
    } else {
      const prevArrLastEl = array[i - 1][array[i - 1].length - 1];
      const currentArrLastEl = array[i][array[i].length - 1];
      const nextInSequence = prevArrLastEl + currentArrLastEl;
      array[i] = [...array[i], nextInSequence];
    }
  });

  array.reverse();

  return array[0][array[0].length - 1];
}

const rows = createRowsFromInput("./input.txt");

// it gets the sum of the next number in each row sequence
function getNextInSequenceSum({ rows }: { rows: number[][] }) {
  const nextValues: number[] = [];

  rows.forEach((row) => {
    const diffArray = createDifferenceArray({ row });

    const next = calculateNextInSequence({
      array: diffArray,
    });

    nextValues.push(next);
  });

  return nextValues.reduce((acc, el) => acc + el);
}

console.log(getNextInSequenceSum({ rows }));
