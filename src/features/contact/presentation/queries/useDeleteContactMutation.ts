import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactRepositoryImpl } from "../../data/repositories/contact.repository.impl";
import { DeleteContactUseCase } from "../../domain/usecases/delete-contact.usecase";
import { contactQueryKeys } from "./contact.querykeys";

export const useDeleteContactMutation = () => {
  const queryClient = useQueryClient();
  const repository = new ContactRepositoryImpl();
  const useCase = new DeleteContactUseCase(repository);

  return useMutation({
    mutationFn: (id: string) => useCase.execute(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: contactQueryKeys.all });
    },
  });
};
