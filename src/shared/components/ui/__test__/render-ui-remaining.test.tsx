import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mocks
vi.mock("lucide-react", () => ({
  CheckIcon: (props: any) => <span {...props}>check</span>,
  ChevronRightIcon: (props: any) => <span {...props}>chev-right</span>,
  ChevronDownIcon: (props: any) => <span {...props}>chev-down</span>,
  ChevronUpIcon: (props: any) => <span {...props}>chev-up</span>,
  XIcon: (props: any) => <span {...props}>x</span>,
  CircleCheckIcon: (props: any) => <span {...props}>c</span>,
  InfoIcon: (props: any) => <span {...props}>i</span>,
  TriangleAlertIcon: (props: any) => <span {...props}>!</span>,
  OctagonXIcon: (props: any) => <span {...props}>x</span>,
  Loader2Icon: (props: any) => <span {...props}>load</span>,
}));

vi.mock("vaul", () => {
  const make = (name: string) => ({
    Root: (p: any) => <div data-slot={name} {...p} />,
    Trigger: (p: any) => <button {...p} />,
    Portal: (p: any) => <div {...p} />,
    Content: (p: any) => <div {...p} />,
    Overlay: (p: any) => <div {...p} />,
    Close: (p: any) => <button {...p} />,
    Title: (p: any) => <h3 {...p} />,
    Description: (p: any) => <div {...p} />,
  });
  return { Drawer: make("drawer") };
});

vi.mock("sonner", () => ({
  Toaster: (p: any) => {
    const { toastOptions, ...rest } = p || {};
    return <div {...rest} />;
  },
}));

vi.mock("next-themes", () => ({ useTheme: () => ({ theme: "light" }) }));

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "@/src/shared/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/src/shared/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/src/shared/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/src/shared/components/ui/sheet";
import { Toaster } from "@/src/shared/components/ui/sonner";
import { ChartStyle } from "@/src/shared/components/ui/chart";
import { TooltipProvider } from "@/src/shared/components/ui/tooltip";

describe("render remaining UI modules", () => {
  it("renders dialog, drawer, dropdown, select, sheet, toaster and chartstyle", () => {
    render(
      <TooltipProvider>
        <div>
          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogTitle>Dialog</DialogTitle>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
              <DrawerTitle>Drawer</DrawerTitle>
            </DrawerContent>
          </Drawer>

          <DropdownMenu>
            <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>One</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select>
            <SelectTrigger>Sel</SelectTrigger>
            <SelectContent>
              <SelectItem>Item</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <SheetTitle>Sheet</SheetTitle>
            </SheetContent>
          </Sheet>

          <Toaster />

          <ChartStyle id="c1" config={{ a: { color: "#123456" } }} />
        </div>
      </TooltipProvider>,
    );

    expect(screen.getAllByText("Open").length).toBeGreaterThan(0);
    // Dialog content is not mounted until opened; assert trigger exists instead
    expect(screen.getAllByText("Open").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Drawer").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Menu").length).toBeGreaterThan(0);
    // Dropdown menu and select content mount only when opened; assert triggers instead
    expect(screen.getAllByText("Sel").length).toBeGreaterThan(0);
  });
});
