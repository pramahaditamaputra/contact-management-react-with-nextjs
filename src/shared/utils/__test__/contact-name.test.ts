import { describe, expect, it } from "vitest";
import { splitFullName } from "../contact-name";

describe("splitFullName", () => {
  it("splits a full name into first and last names", () => {
    expect(splitFullName("Budi Santoso")).toEqual({
      firstName: "Budi",
      lastName: "Santoso",
    });
  });

  it("handles single-word names", () => {
    expect(splitFullName("Budi")).toEqual({
      firstName: "Budi",
      lastName: "",
    });
  });
});