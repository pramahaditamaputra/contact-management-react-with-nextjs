import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Top-level mocks for environment and icon libs
vi.mock("next/navigation", () => ({
  usePathname: () => "/contacts",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@hugeicons/react", () => ({
  HugeiconsIcon: ({ children }: any) => <span>{children}</span>,
}));

vi.mock("@hugeicons/core-free-icons", () => ({
  CommandIcon: {},
  PhoneCall: {},
  MoreVerticalCircle01Icon: {},
  UserCircle02Icon: {},
  CreditCardIcon: {},
  Notification03Icon: {},
  Logout01Icon: {},
  MoreHorizontalCircle01Icon: {},
  Folder01Icon: {},
  Share01Icon: {},
  Delete02Icon: {},
  ChartUpIcon: {},
  ChartDownIcon: {},
}));

import { SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { TooltipProvider } from "@/src/shared/components/ui/tooltip";
import { SiteHeader } from "@/src/shared/components/site-header";
import { AppSidebar } from "@/src/shared/components/app-sidebar";
import { NavMain } from "@/src/shared/components/nav-main";
import { NavUser } from "@/src/shared/components/nav-user";
import { NavDocuments } from "@/src/shared/components/nav-documents";
import { NavSecondary } from "@/src/shared/components/nav-secondary";
import { SectionCards } from "@/src/shared/components/section-cards";

describe("render shared components", () => {
  it("renders SiteHeader, AppSidebar and nav components", () => {
    render(
      <TooltipProvider>
        <SidebarProvider>
          <SiteHeader title="Docs" />
          <AppSidebar />
          <NavMain
            items={[{ title: "My Contacts", url: "/contacts", icon: "X" }]}
          />
          <NavUser user={{ name: "A", email: "a@a", avatar: "/x.png" }} />
          <NavDocuments items={[{ name: "Doc1", url: "/d", icon: "I" }]} />
          <NavSecondary items={[{ title: "S", url: "/s", icon: "I" }]} />
          <SectionCards />
        </SidebarProvider>
      </TooltipProvider>,
    );

    expect(screen.getAllByText("Docs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact Apps").length).toBeGreaterThan(0);
    expect(screen.getAllByText("My Contacts").length).toBeGreaterThan(0);
    expect(screen.getAllByText("A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Doc1").length).toBeGreaterThan(0);
  });
});
