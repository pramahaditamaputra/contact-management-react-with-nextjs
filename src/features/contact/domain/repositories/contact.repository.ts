import { Contact } from "../entities/contact";

export type CreateContactPayload = {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
};

export type UpdateContactPayload = Partial<CreateContactPayload>;

export interface ContactRepository {
  getContacts(keyword?: string): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | null>;
  createContact(payload: CreateContactPayload): Promise<Contact>;
  updateContact(id: string, payload: UpdateContactPayload): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
}
