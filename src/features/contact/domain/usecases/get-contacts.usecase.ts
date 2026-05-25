import { ContactRepository } from "../repositories/contact.repository";

export class GetContactsUseCase {
  constructor(private readonly repository: ContactRepository) {}

  execute({
    seed,
    page,
    results,
  }: {
    seed?: string;
    page: number;
    results: number;
  }) {
    return this.repository.getContacts({
      seed,
      pageSize: results,
      pageIndex: page,
    });
  }
}
