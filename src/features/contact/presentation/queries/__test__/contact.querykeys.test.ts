import { describe, expect, it } from "vitest";
import { contactQueryKeys } from "../contact.querykeys";

describe("contactQueryKeys", () => {
  it("builds stable list and detail keys", () => {
    expect(contactQueryKeys.all).toEqual(["contacts"]);
    expect(contactQueryKeys.lists()).toEqual(["contacts", "list"]);
    expect(contactQueryKeys.list()).toEqual([
      "contacts",
      "list",
      { keyword: undefined, pageIndex: undefined, pageSize: undefined },
    ]);
    expect(contactQueryKeys.list("budi")).toEqual([
      "contacts",
      "list",
      { keyword: "budi", pageIndex: undefined, pageSize: undefined },
    ]);
    expect(contactQueryKeys.list("budi", 1, 5)).toEqual([
      "contacts",
      "list",
      { keyword: "budi", pageIndex: 1, pageSize: 5 },
    ]);
    expect(contactQueryKeys.details()).toEqual(["contacts", "detail"]);
    expect(contactQueryKeys.detail("1")).toEqual(["contacts", "detail", "1"]);
  });
});
