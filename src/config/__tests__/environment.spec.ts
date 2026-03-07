import { describe, it, expect } from "vitest";
import environment from "../environment";

describe("environment", () => {
  it("exports an empty config object", () => {
    expect(environment).toEqual({});
  });
});
