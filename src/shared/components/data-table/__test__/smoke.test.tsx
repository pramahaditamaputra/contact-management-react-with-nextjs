import { describe, it, expect } from "vitest";

import * as ColumnHeader from "../data-table-column-header";
import * as Content from "../data-table-content";
import * as Pagination from "../data-table-pagination";
import * as Toolbar from "../data-table-toolbar";
import * as ViewOptions from "../data-table-view-options";
import * as DataTable from "../data-table";

describe("data-table smoke", () => {
  it("imports data-table primitives without rendering", () => {
    expect(ColumnHeader).toBeDefined();
    expect(Content).toBeDefined();
    expect(Pagination).toBeDefined();
    expect(Toolbar).toBeDefined();
    expect(ViewOptions).toBeDefined();
    expect(DataTable).toBeDefined();
  });
});
