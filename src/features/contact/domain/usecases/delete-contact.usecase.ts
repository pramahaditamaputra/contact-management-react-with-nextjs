import { ContactRepository } from "../repositories/contact.repository";

export class DeleteContactUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute(id: string) {
    return this.repository.deleteContact(id);
  }
}
