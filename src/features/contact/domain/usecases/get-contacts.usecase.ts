import { ContactRepository } from "../repositories/contact.repository";

export class GetContactsUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute(keyword?: string) {
    return this.repository.getContacts(keyword);
  }
}
