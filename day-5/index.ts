import fs from "fs/promises";

function getDestinationNumberFromMap({
  map,
  source,
}: {
  map:
    | "seed-to-soil"
    | "soil-to-fertilizer"
    | "fertilizer-to-water"
    | "water-to-light"
    | "light-to-temperature"
    | "temperature-to-humidity"
    | "humidity-to-location";
  source: number;
}) {
  // lookup next map from current map
  // iterate the map rows
  // check if the source has a destination value
  //    if so, return the destination value
  // else return the source value
}
