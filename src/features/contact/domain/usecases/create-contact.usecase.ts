import {
  ContactRepository,
  CreateContactPayload,
} from "../repositories/contact.repository";

export class CreateContactUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute(payload: CreateContactPayload) {
    return this.repository.createContact(payload);
  }
}
