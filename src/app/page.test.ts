import { describe, expect, it, vi } from "vitest";
import Home from "./page";
import { redirect } from "next/navigation";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("Home page", () => {
  it("redirects to contacts", () => {
    Home();

    expect(vi.mocked(redirect)).toHaveBeenCalledWith("/contacts");
  });
});
