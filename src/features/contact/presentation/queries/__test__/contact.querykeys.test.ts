import { describe, it, expect } from "vitest";
import { contactQueryKeys } from "../contact.querykeys";

describe("contactQueryKeys", () => {
  it("builds list and detail keys", () => {
    expect(contactQueryKeys.all).toEqual(["contacts"]);
    expect(contactQueryKeys.lists()).toEqual(["contacts", "list"]);
    expect(contactQueryKeys.list("s", 1, 2)).toEqual([
      "contacts",
      "list",
      { seed: "s", pageIndex: 1, pageSize: 2 },
    ]);
  });
});
