import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ContactRepositoryImpl } from "../../data/repositories/contact.repository.impl";

import { UpdateContactPayload } from "../../domain/repositories/contact.repository";
import { UpdateContactUseCase } from "../../domain/usecases/update-contact.usecase";
import { contactQueryKeys } from "./contact.querykeys";

export const useUpdateContactMutation = () => {
  const queryClient = useQueryClient();
  const repository = new ContactRepositoryImpl();
  const useCase = new UpdateContactUseCase(repository);

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateContactPayload;
    }) => useCase.execute(id, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: contactQueryKeys.all }),
        queryClient.invalidateQueries({
          queryKey: contactQueryKeys.detail(variables.id),
        }),
      ]);
    },
  });
};
