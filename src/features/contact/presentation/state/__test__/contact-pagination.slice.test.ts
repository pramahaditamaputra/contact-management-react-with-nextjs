import { describe, it, expect } from "vitest";
import reducer, {
  setPagination,
  resetPagination,
} from "../contact-pagination.slice";

describe("contactPagination slice", () => {
  it("setPagination replaces state", () => {
    const next = reducer(
      undefined,
      setPagination({ pageIndex: 1, pageSize: 10 } as any),
    );
    expect(next.pageIndex).toBe(1);
    expect(next.pageSize).toBe(10);
  });

  it("resetPagination returns initial state", () => {
    const state = reducer(
      { pageIndex: 2, pageSize: 20 } as any,
      resetPagination(),
    );
    expect(state.pageIndex).toBe(0);
    expect(state.pageSize).toBe(5);
  });
});
