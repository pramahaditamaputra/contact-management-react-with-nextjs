import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useCreateContactMutation } from "../queries/useCreateContactMutation";
import { ContactFormValues } from "../forms/contact-form.types";
import {
  closeContactCreateModal,
  openContactCreateModal,
} from "../state/contact-create-modal.slice";

export const useContactCreateDialogViewModel = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.contactCreateModal.isOpen);
  const createMutation = useCreateContactMutation();

  const onOpenChange = (nextOpen: boolean) => {
    dispatch(nextOpen ? openContactCreateModal() : closeContactCreateModal());
  };

  const onSubmit = async (values: ContactFormValues) => {
    await createMutation.mutateAsync(values);
    dispatch(closeContactCreateModal());
  };

  return {
    isOpen,
    loading: createMutation.isPending,
    error: createMutation.error,
    onOpenChange,
    onSubmit,
  };
};