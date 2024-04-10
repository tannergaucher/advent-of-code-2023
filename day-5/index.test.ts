import { describe, expect, it } from "vitest";

import { createMapFromInput } from "./index";

describe("createMapsFromInput", () => {
  it("should return a map from the input", () => {
    const { seeds, map } = createMapFromInput("./input.txt");

    expect(Array.isArray(seeds));
    expect(typeof map).toBe("object");
    expect(Object.values(map).every((value) => Array.isArray(value)));
  });
});
