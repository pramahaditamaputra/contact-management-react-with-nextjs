import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/contacts",
}));

vi.mock("@/src/shared/components/app-sidebar", () => ({
  AppSidebar: () => <aside data-testid="app-sidebar" />,
}));

vi.mock("@/src/shared/components/site-header", () => ({
  SiteHeader: ({ title }: { title: string }) => <header>{title}</header>,
}));

import MainLayout from "../MainLayout";

describe("MainLayout", () => {
  it("uses the path title and renders children", () => {
    render(<MainLayout>Content</MainLayout>);

    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
  });
});
