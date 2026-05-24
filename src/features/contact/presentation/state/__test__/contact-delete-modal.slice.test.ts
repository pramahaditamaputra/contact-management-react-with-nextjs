import { describe, expect, it } from "vitest";
import reducer, {
  closeContactDeleteModal,
  openContactDeleteModal,
} from "../contact-delete-modal.slice";

describe("contactDeleteModalSlice", () => {
  it("opens with the selected contact id and closes cleanly", () => {
    const opened = reducer(undefined, openContactDeleteModal("1"));

    expect(opened).toEqual({
      isOpen: true,
      contactId: "1",
    });

    const closed = reducer(opened, closeContactDeleteModal());
    expect(closed).toEqual({ isOpen: false, contactId: null });
  });
});
