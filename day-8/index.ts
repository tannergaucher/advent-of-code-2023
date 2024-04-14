import fs from "fs";

export function getDirectionsAndNodesMapFromInput(path: string) {
  const [directions] = fs
    .readFileSync(path)
    .toString()
    .split(/\r?\n/)
    .slice(0, 1)
    .map((el) => el.split(""));

  const nodesMapArr = fs.readFileSync(path).toString().split(/\r?\n/).slice(2);

  const nodesMap: Record<string, [string, string]> = {};

  nodesMapArr.forEach((nodeMap) => {
    const key = nodeMap.split("=")[0].trim();

    const left = nodeMap.split("=")[1].split(",")[0].replace("(", "");
    const right = nodeMap.split("=")[1].split(",")[1].replace(")", "");

    nodesMap[key] = [left, right];
  });

  return {
    directions,
    nodesMap,
  };
}
