import { describe, expect, it } from "vitest";
import reducer, {
  closeContactEditModal,
  openContactEditModal,
} from "../contact-edit-modal.slice";

describe("contactEditModalSlice", () => {
  it("opens with the selected contact and closes cleanly", () => {
    const opened = reducer(undefined, openContactEditModal("1"));

    expect(opened).toEqual({
      isOpen: true,
      contactId: "1",
    });

    const closed = reducer(opened, closeContactEditModal());
    expect(closed).toEqual({ isOpen: false, contactId: null });
  });
});
