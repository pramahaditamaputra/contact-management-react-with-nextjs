import {
  ContactRepository,
  UpdateContactPayload,
} from "../repositories/contact.repository";

export class UpdateContactUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute(id: string, payload: UpdateContactPayload) {
    return this.repository.updateContact(id, payload);
  }
}
