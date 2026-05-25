import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppProvider } from "../AppProvider";
import { QueryProvider } from "../QueryProvider";
import { ReduxProvider } from "../ReduxProvider";
import { ThemeProvider } from "../ThemeProvider";

describe("providers", () => {
  it("renders children through each provider wrapper", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ReduxProvider>
          <QueryProvider>
            <AppProvider>
              <span>Ready</span>
            </AppProvider>
          </QueryProvider>
        </ReduxProvider>
      </ThemeProvider>,
    );

    expect(screen.getByText("Ready")).toBeInTheDocument();
  });
});
