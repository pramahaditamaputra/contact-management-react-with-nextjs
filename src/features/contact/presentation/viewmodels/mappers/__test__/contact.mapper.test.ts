/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { contactsEntityToUi } from "../contact.mapper";

describe("contactsEntityToUi", () => {
  it("converts entity to UI model", () => {
    const entity = [
      {
        id: "1",
        name: "A B",
        phone: "0812",
        cell: "0813",
        location: "City",
        email: "a@b.com",
        dob: new Date("2020-01-01").toISOString(),
        picture: "img.jpg",
      },
    ];

    const res = contactsEntityToUi(entity as any);
    expect(res[0].id).toBe("1");
    expect(typeof res[0].dob).toBe("string");
  });
});
