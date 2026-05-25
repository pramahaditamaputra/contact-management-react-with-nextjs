import { Contact } from "../entities/contact";

export interface ContactRepository {
  getContacts({
    seed,
    pageSize,
    pageIndex,
  }: {
    seed?: string;
    pageSize: number;
    pageIndex: number;
  }): Promise<Contact[]>;
}
