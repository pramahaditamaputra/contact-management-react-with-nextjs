/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "inter" }),
  Geist: () => ({ variable: "geist-sans" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
}));

vi.mock("@/src/features/contact/presentation/views/ContactView", () => ({
  __esModule: true,
  default: () => <div>Contact View</div>,
}));

vi.mock("@/src/shared/components/layouts/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="layout">{children}</main>
  ),
}));

vi.mock("@/src/providers/AppProvider", () => ({
  AppProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import Home from "../page";
import ContactsPage from "../contacts/page";
import RootLayout from "../layout";
import { redirect } from "next/navigation";

describe("app entrypoints", () => {
  it("redirects the home page to contacts", () => {
    Home();
    expect(vi.mocked(redirect)).toHaveBeenCalledWith("/contacts");
  });

  it("renders the contacts page view", () => {
    render(<ContactsPage />);

    expect(screen.getByText("Contact View")).toBeInTheDocument();
  });

  it("wraps children in the root layout markup", () => {
    const markup = renderToStaticMarkup(
      RootLayout({ children: <div>Body</div> } as any),
    );

    expect(markup).toContain('lang="en"');
    expect(markup).toContain("Body");
    expect(markup).toContain('data-testid="layout"');
  });
});
