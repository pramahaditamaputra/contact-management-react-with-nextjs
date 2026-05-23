import { Contact } from "../../domain/entities/contact";
import {
  ContactRepository,
  CreateContactPayload,
  UpdateContactPayload,
} from "../../domain/repositories/contact.repository";
import { ContactListResult } from "../../domain/repositories/contact.repository";
import { contactApi } from "../api/contact.api";
import {
  contactDtoToEntity,
  contactsDtoToEntity,
} from "../mappers/contact.mapper";

export class ContactRepositoryImpl implements ContactRepository {
  async getContacts(
    keyword?: string,
    pageIndex = 0,
    pageSize = 5,
  ): Promise<ContactListResult> {
    const data = await contactApi.getContacts(keyword, pageIndex, pageSize);
    return {
      items: contactsDtoToEntity(data),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
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
