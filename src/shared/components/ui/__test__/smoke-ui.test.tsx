import { describe, it, expect } from "vitest";

import * as Chart from "../chart";
import * as Dialog from "../dialog";
import * as Drawer from "../drawer";
import * as DropdownMenu from "../dropdown-menu";
import * as Select from "../select";
import * as Sheet from "../sheet";

import * as DataTableColumnHeader from "../../data-table/data-table-column-header";
import * as DataTableContent from "../../data-table/data-table-content";
import * as DataTablePagination from "../../data-table/data-table-pagination";
import * as DataTableToolbar from "../../data-table/data-table-toolbar";
import * as DataTableViewOptions from "../../data-table/data-table-view-options";
import * as DataTable from "../../data-table/data-table";

describe("UI smoke imports", () => {
  it("imports UI modules without rendering", () => {
    expect(Chart).toBeDefined();
    expect(Dialog).toBeDefined();
    expect(Drawer).toBeDefined();
    expect(DropdownMenu).toBeDefined();
    expect(Select).toBeDefined();
    expect(Sheet).toBeDefined();

    expect(DataTableColumnHeader).toBeDefined();
    expect(DataTableContent).toBeDefined();
    expect(DataTablePagination).toBeDefined();
    expect(DataTableToolbar).toBeDefined();
    expect(DataTableViewOptions).toBeDefined();
    expect(DataTable).toBeDefined();
  });
});
