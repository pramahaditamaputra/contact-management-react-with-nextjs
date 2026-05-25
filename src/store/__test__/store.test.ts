import { describe, expect, it } from "vitest";

import { store } from "../index";
import { useAppDispatch, useAppSelector } from "../hooks";

describe("store wiring", () => {
  it("starts with the contact pagination slice", () => {
    expect(store.getState().contactPagination).toEqual({
      pageIndex: 0,
      pageSize: 5,
    });
  });

  it("exports the typed redux hooks", () => {
    expect(typeof useAppDispatch).toBe("function");
    expect(typeof useAppSelector).toBe("function");
  });
});