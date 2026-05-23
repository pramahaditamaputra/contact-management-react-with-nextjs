import { ContactRepository } from "../repositories/contact.repository";

export class GetContactUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute(id: string) {
    return this.repository.getContact(id);
  }
}
