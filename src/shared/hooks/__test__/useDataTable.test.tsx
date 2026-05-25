import React from "react";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";

import useDataTable from "../useDataTable";

type Row = {
  id: string;
  name: string;
};

const columns: ColumnDef<Row, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];

const data: Row[] = [
  { id: "1", name: "Budi" },
  { id: "2", name: "Sari" },
];

describe("useDataTable", () => {
  it("uses internal pagination state by default", () => {
    const { result } = renderHook(() =>
      useDataTable<Row>({ data, columns }),
    );

    expect(result.current.table.getState().pagination).toEqual({
      pageIndex: 0,
      pageSize: 5,
    });
    expect(result.current.table.options.manualPagination).toBe(false);
    expect(result.current.table.getRowModel().rows).toHaveLength(2);

    act(() => {
      result.current.table.setPageIndex(1);
    });

    expect(result.current.table.getState().pagination.pageIndex).toBe(1);
  });

  it("delegates pagination when controlled pagination is provided", () => {
    const onPaginationChange = vi.fn() as React.Dispatch<
      React.SetStateAction<PaginationState>
    >;

    const { result } = renderHook(() =>
      useDataTable<Row>({
        data,
        columns,
        pagination: {
          state: { pageIndex: 2, pageSize: 10 },
          pageCount: 4,
          onPaginationChange,
        },
      }),
    );

    expect(result.current.table.options.manualPagination).toBe(true);
    expect(result.current.table.options.pageCount).toBe(4);

    act(() => {
      result.current.table.setPageSize(20);
    });

    expect(onPaginationChange).toHaveBeenCalled();
  });
});