"use client";

import { Button } from "@/src/shared/components/ui/button";
import { RowData, Table } from "@tanstack/react-table";

type Props<TData extends RowData> = {
  table: Table<TData>;
};

export function DataTablePagination<TData extends RowData>({
  table,
}: Props<TData>) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <div className="text-sm text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
