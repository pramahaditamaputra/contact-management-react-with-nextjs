import { Contact } from "../../domain/entities/contact";
import {
  ContactRepository,
  CreateContactPayload,
  UpdateContactPayload,
} from "../../domain/repositories/contact.repository";
import { contactApi } from "../api/contact.api";
import {
  contactDtoToEntity,
  contactsDtoToEntity,
} from "../mappers/contact.mapper";

export class ContactRepositoryImpl implements ContactRepository {
  async getContacts(keyword?: string): Promise<Contact[]> {
    const data = await contactApi.getContacts(keyword);
    return contactsDtoToEntity(data);
  }

  async getContact(id: string): Promise<Contact | null> {
    const data = await contactApi.getContact(id);
    return data ? contactDtoToEntity(data) : null;
  }

  async createContact(payload: CreateContactPayload): Promise<Contact> {
    const data = await contactApi.createContact(payload);
    return contactDtoToEntity(data);
  }

  async updateContact(
    id: string,
    payload: UpdateContactPayload,
  ): Promise<Contact> {
    const data = await contactApi.updateContact(id, payload);
    return contactDtoToEntity(data);
  }

  async deleteContact(id: string): Promise<void> {
    await contactApi.deleteContact(id);
  }
}
