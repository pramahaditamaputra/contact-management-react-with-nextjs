import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactRepositoryImpl } from "../../data/repositories/contact.repository.impl";
import { CreateContactPayload } from "../../domain/repositories/contact.repository";
import { CreateContactUseCase } from "../../domain/usecases/create-contact.usecase";
import { contactQueryKeys } from "./contact.querykeys";

export const useCreateContactMutation = () => {
  const queryClient = useQueryClient();
  const repository = new ContactRepositoryImpl();
  const useCase = new CreateContactUseCase(repository);

  return useMutation({
    mutationFn: (payload: CreateContactPayload) => useCase.execute(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: contactQueryKeys.all });
    },
  });
};
