import { useQuery } from "@tanstack/react-query";
import { ContactRepositoryImpl } from "../../data/repositories/contact.repository.impl";
import { GetContactUseCase } from "../../domain/usecases/get-contact.usecase";
import { contactQueryKeys } from "./contact.querykeys";

export const useContactQuery = (id: string) => {
  const repository = new ContactRepositoryImpl();
  const useCase = new GetContactUseCase(repository);

  return useQuery({
    queryKey: contactQueryKeys.detail(id),
    queryFn: () => useCase.execute(id),
    enabled: !!id,
  });
};
