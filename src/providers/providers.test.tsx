import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "./AppProvider";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setKeyword } from "@/src/features/contact/presentation/state/contact-filter.slice";

const Harness = () => {
  const dispatch = useAppDispatch();
  const keyword = useAppSelector((state) => state.contactFilter.keyword);

  return (
    <button type="button" onClick={() => dispatch(setKeyword("budi"))}>
      {keyword || "empty"}
    </button>
  );
};

describe("AppProvider", () => {
  it("provides redux and query context to children", async () => {
    const user = userEvent.setup();

    render(
      <AppProvider>
        <Harness />
      </AppProvider>,
    );

    const button = screen.getByRole("button", { name: "empty" });
    await user.click(button);

    expect(screen.getByRole("button", { name: "budi" })).toBeInTheDocument();
  });
});
