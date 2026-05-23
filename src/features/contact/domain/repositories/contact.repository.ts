import { Contact } from "../entities/contact";

export type ContactListResult = {
  items: Contact[];
  total: number;
  skip: number;
  limit: number;
};

export type CreateContactPayload = {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
};

export type UpdateContactPayload = Partial<CreateContactPayload>;

export interface ContactRepository {
  getContacts(
    keyword?: string,
    pageIndex?: number,
    pageSize?: number,
  ): Promise<ContactListResult>;
  getContact(id: string): Promise<Contact | null>;
  createContact(payload: CreateContactPayload): Promise<Contact>;
  updateContact(id: string, payload: UpdateContactPayload): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
}
