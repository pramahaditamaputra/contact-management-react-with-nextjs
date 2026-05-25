import { describe, expect, it } from "vitest";

import { urlPathNameTransformer } from "../helper";

describe("urlPathNameTransformer", () => {
  it("maps known paths to display labels", () => {
    expect(urlPathNameTransformer["/"]).toBe("Home");
    expect(urlPathNameTransformer["/contacts"]).toBe("Contacts");
  });
});