import { describe, it, expect } from "vitest";
import reducer, { setKeyword, resetKeyword } from "./contact-filter.slice";

describe("contactFilterSlice", () => {
  it("sets keyword", () => {
    const state = reducer({ keyword: "" }, setKeyword("budi"));
    expect(state.keyword).toBe("budi");
  });

  it("resets keyword", () => {
    const state = reducer({ keyword: "budi" }, resetKeyword());
    expect(state.keyword).toBe("");
  });
});
