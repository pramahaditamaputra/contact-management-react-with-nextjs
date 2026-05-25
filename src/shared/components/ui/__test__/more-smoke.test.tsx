import { describe, it, expect } from "vitest";

import * as Chart from "../chart";
import * as Dialog from "../dialog";
import * as Drawer from "../drawer";
import * as DropdownMenu from "../dropdown-menu";
import * as Select from "../select";
import * as Sheet from "../sheet";
import * as Sonner from "../sonner";
import * as Tooltip from "../tooltip";

describe("ui more smoke", () => {
  it("imports remaining UI modules without rendering", () => {
    expect(Chart).toBeDefined();
    expect(Dialog).toBeDefined();
    expect(Drawer).toBeDefined();
    expect(DropdownMenu).toBeDefined();
    expect(Select).toBeDefined();
    expect(Sheet).toBeDefined();
    expect(Sonner).toBeDefined();
    expect(Tooltip).toBeDefined();
  });
});
