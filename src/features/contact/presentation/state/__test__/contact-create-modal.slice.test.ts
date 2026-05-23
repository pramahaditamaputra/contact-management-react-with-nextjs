import { describe, expect, it } from "vitest";
import reducer, {
  closeContactCreateModal,
  openContactCreateModal,
} from "../contact-create-modal.slice";

describe("contactCreateModalSlice", () => {
  it("opens and closes the modal", () => {
    const opened = reducer(undefined, openContactCreateModal());
    expect(opened).toEqual({ isOpen: true });

    const closed = reducer(opened, closeContactCreateModal());
    expect(closed).toEqual({ isOpen: false });
  });
});
