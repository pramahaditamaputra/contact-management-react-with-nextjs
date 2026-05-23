"use client";

import { AppSidebar } from "@/src/shared/components/app-sidebar";
import { SiteHeader } from "@/src/shared/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { urlPathNameTransformer } from "../../utils/helper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={urlPathNameTransformer[pathname] || "Documents"} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
