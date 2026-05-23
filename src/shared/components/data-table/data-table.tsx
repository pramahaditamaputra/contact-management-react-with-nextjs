"use client";

import React from "react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import useDataTable from "@/src/shared/hooks/useDataTable";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableContent } from "./data-table-content";

export type DataTableProps<TData extends RowData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  searchColumnId?: keyof TData;
  toolbarRight?: React.ReactNode;
};

export function DataTable<TData extends RowData>({
  data,
  columns,
  searchColumnId,
  toolbarRight,
}: DataTableProps<TData>) {
  const { table } = useDataTable<TData>({ data, columns });

  return (
    <div className="w-full flex-col justify-start gap-6">
      <DataTableToolbar
        table={table}
        searchColumnId={searchColumnId}
        toolbarRight={toolbarRight}
      />

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <DataTableContent table={table} columnsLength={columns.length} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
