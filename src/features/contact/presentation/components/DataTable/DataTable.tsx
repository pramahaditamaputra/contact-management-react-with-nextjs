"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Button } from "@/src/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, SearchIcon } from "@hugeicons/core-free-icons";
import useContactListDataTableViewModel from "../../viewmodels/useContactListDataTableViewModel";
import { Contact } from "../../../domain/entities/contact";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/shared/components/ui/input-group";

function DataTable({
  data: initialData,
  columns,
}: {
  data: Contact[];
  columns: ColumnDef<Contact>[];
}) {
  const { table } = useContactListDataTableViewModel({
    data: initialData,
    columns,
  });

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 py-4 gap-10 lg:px-6 lg:py-6">
        <InputGroup className="max-w-sm">
          <InputGroupInput
            placeholder="Search..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
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
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
            <span className="hidden lg:inline">Add Contact</span>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={2}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} colSpan={2}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default DataTable;
