import { describe, expect, it, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout, { metadata } from "../layout";

vi.mock("next/font/google", () => ({
  Inter: vi.fn(() => ({ variable: "inter" })),
  Geist: vi.fn(() => ({ variable: "geist-sans" })),
  Geist_Mono: vi.fn(() => ({ variable: "geist-mono" })),
  Figtree: vi.fn(() => ({ variable: "figtree" })),
}));

vi.mock("../providers/AppProvider", () => ({
  AppProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../shared/components/layouts/MainLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("RootLayout", () => {
  it("renders the shell and exposes metadata", () => {
    const markup = renderToStaticMarkup(
      RootLayout({ children: <main>content</main> }),
    );

    expect(markup).toContain('lang="en"');
    expect(markup).toContain(
      'class="h-full antialiased geist-sans geist-mono font-sans inter"',
    );
    expect(markup).toContain("content");
    expect(metadata.title).toBe("Contact Management App");
    expect(metadata.description).toBe(
      "A simple contact management application built with React and Next.js.",
    );
  });
});
