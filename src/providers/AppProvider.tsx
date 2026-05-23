"use client";

import { ReduxProvider } from "./ReduxProvider";
import { QueryProvider } from "./QueryProvider";
import { TooltipProvider } from "../shared/components/ui/tooltip";
import { ThemeProvider } from "./ThemeProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};
