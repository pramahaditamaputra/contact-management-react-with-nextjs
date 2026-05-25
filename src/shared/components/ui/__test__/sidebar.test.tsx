import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/src/shared/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "../sidebar";

describe("Sidebar", () => {
  it("renders the desktop shell and nested menu primitives", () => {
    render(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarHeader>Header</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton aria-label="Open">Item</SidebarMenuButton>
                <SidebarMenuAction aria-label="Action" />
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuSkeleton showIcon />
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/">Sub</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Group</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Group action" />
              <SidebarGroupContent>Content</SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
          <SidebarSeparator />
          <SidebarTrigger aria-label="Toggle sidebar" />
          <SidebarRail />
        </Sidebar>
        <SidebarInset>Inner</SidebarInset>
      </SidebarProvider>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Item")).toHaveAttribute(
      "data-slot",
      "sidebar-menu-button",
    );
    expect(screen.getByText("Sub")).toHaveAttribute(
      "data-slot",
      "sidebar-menu-sub-button",
    );
    expect(screen.getByText("Inner")).toHaveAttribute(
      "data-slot",
      "sidebar-inset",
    );
  });
});
