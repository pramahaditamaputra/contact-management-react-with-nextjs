import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ContactRepositoryImpl } from "../../data/repositories/contact.repository.impl";
import { GetContactsUseCase } from "../../domain/usecases/get-contacts.usecase";
import { contactQueryKeys } from "./contact.querykeys";
import { contactsEntityToUi } from "../viewmodels/mappers/contact.mapper";

export const useContactsQuery = ({
  seed,
  pageIndex,
  pageSize,
}: {
  seed?: string;
  pageIndex: number;
  pageSize: number;
}) => {
  const repository = new ContactRepositoryImpl();
  const useCase = new GetContactsUseCase(repository);

  return useQuery({
    queryKey: contactQueryKeys.list(seed, pageIndex, pageSize),
    queryFn: () =>
      useCase.execute({
        seed,
        page: pageIndex + 1,
        results: pageSize,
      }),
    placeholderData: keepPreviousData,
    select: (contacts) => contactsEntityToUi(contacts),
  });
};
