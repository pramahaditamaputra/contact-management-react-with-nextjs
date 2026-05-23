import { useQuery } from "@tanstack/react-query";
import { ContactRepositoryImpl } from "../../data/repositories/contact.repository.impl";
import { GetContactsUseCase } from "../../domain/usecases/get-contacts.usecase";
import { contactQueryKeys } from "./contact.querykeys";

export const useContactsQuery = (keyword?: string) => {
  const repository = new ContactRepositoryImpl();
  const useCase = new GetContactsUseCase(repository);

  return useQuery({
    queryKey: contactQueryKeys.list(keyword),
    queryFn: () => useCase.execute(keyword),
  });
};
