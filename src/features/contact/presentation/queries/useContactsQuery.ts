import { useQuery } from "@tanstack/react-query";
import { ContactRepositoryImpl } from "../../data/repositories/contact.repository.impl";
import { GetContactsUseCase } from "../../domain/usecases/get-contacts.usecase";
import { contactQueryKeys } from "./contact.querykeys";
import { useDebounce } from "@/src/shared/hooks/useDebounce";

export const useContactsQuery = (
  keyword?: string,
  pageIndex = 0,
  pageSize = 5,
) => {
  const repository = new ContactRepositoryImpl();
  const useCase = new GetContactsUseCase(repository);
  const normalizedKeyword = keyword?.trim() || undefined;
  const debouncedKeyword = useDebounce(normalizedKeyword, 300);

  return useQuery({
    queryKey: contactQueryKeys.list(debouncedKeyword, pageIndex, pageSize),
    queryFn: () => useCase.execute(debouncedKeyword, pageIndex, pageSize),
  });
};
