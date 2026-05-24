import { describe, it, expect } from "vitest";
import {
  contactDtoToEntity,
  contactsDtoToEntity,
  upsertContactPayloadToUserFields,
} from "../contact.mapper";

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
      image: "https://via.placeholder.com/150",
    });
  });

  it("maps list dtos with fallback names and explicit images", () => {
    expect(
      contactsDtoToEntity({
        users: [
          {
            id: "2",
            firstName: "Siti",
            lastName: "Aminah",
            phone: "0813",
            email: "[email protected]",
            image: "https://example.com/avatar.png",
          },
        ],
        total: 1,
        skip: 0,
        limit: 1,
      }),
    ).toEqual([
      {
        id: "2",
        name: "Siti Aminah",
        phone: "0813",
        email: "[email protected]",
        image: "https://example.com/avatar.png",
      },
    ]);
  });

  it("defaults missing phone numbers", () => {
    expect(
      contactDtoToEntity({
        id: "3",
        firstName: "No",
        lastName: "Phone",
        email: "[email protected]",
        image: "https://example.com/avatar-2.png",
      }),
    ).toEqual({
      id: "3",
      name: "No Phone",
      phone: "N/A",
      email: "[email protected]",
      image: "https://example.com/avatar-2.png",
    });
  });

  it("maps upsert payloads to DummyJSON user fields", () => {
    expect(
      upsertContactPayloadToUserFields({
        name: "Budi Santoso",
        phone: "0812",
        email: "budi@example.com",
        image: "https://example.com/avatar.png",
        notes: "Friend",
      }),
    ).toEqual({
      firstName: "Budi",
      lastName: "Santoso",
      phone: "0812",
      email: "budi@example.com",
      image: "https://example.com/avatar.png",
      notes: "Friend",
    });
  });
});
