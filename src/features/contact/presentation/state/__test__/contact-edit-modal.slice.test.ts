import { describe, expect, it } from "vitest";
import reducer, {
  closeContactEditModal,
  openContactEditModal,
} from "../contact-edit-modal.slice";

describe("contactEditModalSlice", () => {
  it("opens with the selected contact and closes cleanly", () => {
    const opened = reducer(
      undefined,
      openContactEditModal({
        id: "1",
        name: "Budi",
        phone: "0812",
      }),
    );

    expect(opened).toEqual({
      isOpen: true,
      contact: {
        id: "1",
        name: "Budi",
        phone: "0812",
      },
    });

    const closed = reducer(opened, closeContactEditModal());
    expect(closed).toEqual({ isOpen: false, contact: null });
  });
});