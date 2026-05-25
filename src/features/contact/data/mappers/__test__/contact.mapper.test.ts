/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect } from "vitest";
import { contactsDtoToEntity } from "../contact.mapper";

describe("contactsDtoToEntity", () => {
  it("maps dto to entity", () => {
    const dto = {
      results: [
        {
          login: { uuid: "1" },
          name: { first: "Budi", last: "Santoso" },
          email: "a@b.com",
          phone: "0812",
          picture: { large: "img.jpg" },
          dob: { date: new Date("2020-01-01"), age: 1 },
        },
      ],
      info: { seed: "s", results: 1, page: 1, version: "v" },
    } as any;

    const res = contactsDtoToEntity(dto);

    expect(res[0].id).toBe("1");
    expect(res[0].name).toBe("Budi Santoso");
    expect(res[0].phone).toBe("0812");
  });
});
