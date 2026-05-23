import { describe, it, expect } from "vitest";
import { contactDtoToEntity } from "../contact.mapper";

describe("contactDtoToEntity", () => {
  it("maps dto to entity", () => {
    const dto = {
      id: "1",
      name: "Budi",
      phone: "0812",
      email: "[email protected]",
      notes: "Friend",
    };

    expect(contactDtoToEntity(dto)).toEqual({
      id: "1",
      name: "Budi",
      phone: "0812",
      email: "[email protected]",
      notes: "Friend",
    });
  });
});
