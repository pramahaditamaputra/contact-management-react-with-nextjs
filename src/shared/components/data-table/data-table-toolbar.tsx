"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/shared/components/ui/input-group";
import { DataTableViewOptions } from "@/src/shared/components/data-table/data-table-view-options";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon } from "@hugeicons/core-free-icons";
import { RowData, Table } from "@tanstack/react-table";

type DataTableToolbarProps<TData extends RowData> = {
  table: Table<TData>;
  searchColumnId?: keyof TData;
  toolbarRight?: React.ReactNode;
};

export function DataTableToolbar<TData extends RowData>({
  table,
  searchColumnId,
  toolbarRight,
}: DataTableToolbarProps<TData>) {
  const columnId = searchColumnId ? String(searchColumnId) : "";
  const searchColumn = columnId ? table.getColumn(columnId) : undefined;
  const filterValue = (searchColumn?.getFilterValue() as string) ?? "";

  return (
    <div className="flex items-center justify-between gap-10 px-4 py-4 lg:px-6 lg:py-6">
      <InputGroup className="max-w-sm">
        <InputGroupInput
          placeholder="Search..."
          value={filterValue}
          onChange={(event) => searchColumn?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <InputGroupAddon>
          <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {table.getRowCount()}{" "}
          {table.getRowCount() === 1 || table.getRowCount() === 0
            ? "result"
            : "results"}
        </InputGroupAddon>
      </InputGroup>

      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        {toolbarRight}
      </div>
    </div>
  );
}
