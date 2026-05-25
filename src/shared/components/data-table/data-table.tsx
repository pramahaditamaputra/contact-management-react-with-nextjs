"use client";

import React from "react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import useDataTable from "@/src/shared/hooks/useDataTable";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableContent } from "./data-table-content";
import { type PaginationState } from "@tanstack/react-table";

export type DataTableProps<TData extends RowData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  loading?: boolean;
  pagination?: {
    state: PaginationState;
    pageCount: number;
    onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>;
  };
};

export function DataTable<TData extends RowData>({
  data,
  columns,
  loading,
  pagination,
}: DataTableProps<TData>) {
  const { table } = useDataTable<TData>({ data, columns, pagination });

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <DataTableContent
          table={table}
          columnsLength={columns.length}
          loading={loading}
        />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
