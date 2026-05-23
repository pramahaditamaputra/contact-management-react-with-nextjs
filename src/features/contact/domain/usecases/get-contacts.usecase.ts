import { ContactRepository } from "../repositories/contact.repository";

export class GetContactsUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute(keyword?: string, pageIndex = 0, pageSize = 5) {
    return this.repository.getContacts(keyword, pageIndex, pageSize);
  }
}
