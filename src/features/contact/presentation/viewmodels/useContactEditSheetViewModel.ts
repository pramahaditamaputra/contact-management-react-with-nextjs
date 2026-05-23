import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useUpdateContactMutation } from "../queries/useUpdateContactMutation";
import { ContactFormValues } from "../forms/contact-form.types";
import { closeContactEditModal } from "../state/contact-edit-modal.slice";

export const useContactEditSheetViewModel = () => {
  const dispatch = useAppDispatch();
  const contact = useAppSelector((state) => state.contactEditModal.contact);
  const isOpen = useAppSelector((state) => state.contactEditModal.isOpen);
  const updateMutation = useUpdateContactMutation();

  const onOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      dispatch(closeContactEditModal());
    }
  };

  const onSubmit = async (values: ContactFormValues) => {
    if (!contact) return;

    await updateMutation.mutateAsync({ id: contact.id, payload: values });
    dispatch(closeContactEditModal());
  };

  const initialValues = contact
    ? {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        image: contact.image,
        notes: contact.notes,
      }
    : null;

  return {
    contact,
    isOpen,
    initialValues,
    loading: updateMutation.isPending,
    error: updateMutation.error,
    onOpenChange,
    onSubmit,
  };
};