import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { DataTableContent } from "../data-table-content";
import { DataTablePagination } from "../data-table-pagination";
import { DataTableToolbar } from "../data-table-toolbar";
import { DataTableColumnHeader } from "../data-table-column-header";

describe("DataTableContent (loading)", () => {
  it("renders skeleton table when loading", () => {
    const table: any = {
      getHeaderGroups: () => [
        {
          id: "hg1",
          headers: [
            {
              id: "h1",
              isPlaceholder: false,
              column: { columnDef: { header: "H" } },
              getContext: () => ({}),
              getSize: () => 100,
            },
          ],
        },
      ],
    };

    render(<DataTableContent table={table} columnsLength={3} loading />);
    expect(document.querySelector("table")).toBeTruthy();
    expect(screen.getAllByText("H").length).toBeGreaterThan(0);
  });
});

describe("DataTablePagination", () => {
  it("renders pagination controls and rows per page select", () => {
    const table: any = {
      getState: () => ({ pagination: { pageIndex: 0, pageSize: 10 } }),
      getRowModel: () => ({ rows: [] }),
      setPageIndex: vi.fn(),
      setPageSize: vi.fn(),
    };

    render(<DataTablePagination table={table} />);
    expect(screen.getByText("Rows per page")).toBeDefined();
    expect(screen.getByText("Page 1")).toBeDefined();
  });
});

describe("DataTableToolbar", () => {
  it("renders search input and view button", () => {
    const table: any = {
      getColumn: () => undefined,
      getRowCount: () => 0,
      getAllColumns: () => [],
    };

    render(<DataTableToolbar table={table} />);
    expect(screen.getByPlaceholderText("Search...")).toBeDefined();
    expect(screen.getByText("View")).toBeDefined();
  });
});

describe("DataTableColumnHeader", () => {
  it("renders title when column is not sortable", () => {
    const column: any = { getCanSort: () => false };
    render(<DataTableColumnHeader column={column} title="T" />);
    expect(screen.getByText("T")).toBeDefined();
  });

  it("renders sort button when column is sortable", () => {
    const column: any = {
      getCanSort: () => true,
      getIsSorted: () => false,
      toggleSorting: () => {},
      toggleVisibility: () => {},
    };

    render(<DataTableColumnHeader column={column} title="T2" />);
    expect(screen.getByText("T2")).toBeDefined();
  });
});
