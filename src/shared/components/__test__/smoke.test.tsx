import { describe, it, expect } from "vitest";

import * as AppSidebar from "../app-sidebar";
import * as NavDocuments from "../nav-documents";
import * as NavMain from "../nav-main";
import * as NavSecondary from "../nav-secondary";
import * as NavUser from "../nav-user";
import * as SectionCards from "../section-cards";
import * as SiteHeader from "../site-header";
import * as ThemeSwitcher from "../theme-switcher-button";

describe("shared components smoke", () => {
  it("imports top-level shared components without rendering", () => {
    expect(AppSidebar).toBeDefined();
    expect(NavDocuments).toBeDefined();
    expect(NavMain).toBeDefined();
    expect(NavSecondary).toBeDefined();
    expect(NavUser).toBeDefined();
    expect(SectionCards).toBeDefined();
    expect(SiteHeader).toBeDefined();
    expect(ThemeSwitcher).toBeDefined();
  });
});
