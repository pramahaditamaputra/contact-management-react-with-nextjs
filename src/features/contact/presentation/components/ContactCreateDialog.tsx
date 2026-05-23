"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useCreateContactMutation } from "../queries/useCreateContactMutation";
import { ContactFormValues } from "../forms/contact-form.types";
import { ContactForm } from "./ContactForm";
import {
  closeContactCreateModal,
  openContactCreateModal,
} from "../state/contact-create-modal.slice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";

export const ContactCreateDialog = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.contactCreateModal.isOpen);
  const createMutation = useCreateContactMutation();

  const handleOpenChange = (nextOpen: boolean) => {
    dispatch(nextOpen ? openContactCreateModal() : closeContactCreateModal());
  };

  const handleSubmit = async (values: ContactFormValues) => {
    await createMutation.mutateAsync(values);
    dispatch(closeContactCreateModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Contact</DialogTitle>
          <DialogDescription>
            Create a new contact and keep the list in sync automatically.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          onSubmit={handleSubmit}
          loading={createMutation.isPending}
          submitLabel="Create contact"
        />
      </DialogContent>
    </Dialog>
  );
};
