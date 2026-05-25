import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

type UseDataTableProps<TData extends RowData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  pagination?: {
    state: PaginationState;
    pageCount: number;
    onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>;
  };
};

export default function useDataTable<TData extends RowData>({
  data,
  columns,
  pagination,
}: UseDataTableProps<TData>): {
  table: Table<TData>;
} {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5,
    });
  const isManualPagination = Boolean(pagination);
  const paginationState = pagination?.state ?? internalPagination;
  const onPaginationChange =
    pagination?.onPaginationChange ?? setInternalPagination;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    manualPagination: isManualPagination,
    pageCount: pagination?.pageCount,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: isManualPagination
      ? undefined
      : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { table };
}
