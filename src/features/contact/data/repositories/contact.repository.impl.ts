import { Contact } from "../../domain/entities/contact";
import { ContactRepository } from "../../domain/repositories/contact.repository";
import { contactApi } from "../api/contact.api";
import { contactsDtoToEntity } from "../mappers/contact.mapper";

export class ContactRepositoryImpl implements ContactRepository {
  async getContacts({
    seed,
    pageSize,
    pageIndex,
  }: {
    seed?: string;
    pageSize: number;
    pageIndex: number;
  }): Promise<Contact[]> {
    const data = await contactApi.getContacts({
      seed,
      pageSize,
      pageIndex,
    });
    return contactsDtoToEntity(data);
  }
}
