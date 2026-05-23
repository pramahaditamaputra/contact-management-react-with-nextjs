import { Separator } from "@/src/shared/components/ui/separator";
import { ThemeSwitcherButton } from "./theme-switcher-button";
import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader({ title }: { title?: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-9"
        />
        <h1 className="text-base font-medium">{title || "Documents"}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcherButton />
        </div>
      </div>
    </header>
  );
}
