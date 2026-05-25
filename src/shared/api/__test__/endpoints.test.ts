import { describe, expect, it } from "vitest";

import { endpoints } from "../endpoints";

describe("endpoints", () => {
  it("exposes the contacts endpoint", () => {
    expect(endpoints.contacts).toBe("/");
  });
});