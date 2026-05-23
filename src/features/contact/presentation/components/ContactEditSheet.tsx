"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useUpdateContactMutation } from "../queries/useUpdateContactMutation";
import { ContactFormValues } from "../forms/contact-form.types";
import { ContactForm } from "./ContactForm";
import {
  closeContactEditModal,
  openContactEditModal,
} from "../state/contact-edit-modal.slice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/shared/components/ui/sheet";

export const ContactEditSheet = () => {
  const dispatch = useAppDispatch();
  const contact = useAppSelector((state) => state.contactEditModal.contact);
  const isOpen = useAppSelector((state) => state.contactEditModal.isOpen);
  const updateMutation = useUpdateContactMutation();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      dispatch(closeContactEditModal());
      return;
    }

    if (!contact) return;

    dispatch(openContactEditModal(contact));
  };

  const handleSubmit = async (values: ContactFormValues) => {
    if (!contact) return;

    await updateMutation.mutateAsync({ id: contact.id, payload: values });
    dispatch(closeContactEditModal());
  };

  if (!contact) return null;

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-xl">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-6 py-5 text-left">
            <SheetTitle>Edit Contact</SheetTitle>
            <SheetDescription>
              Update the contact information and save the changes from the right
              sidebar.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <ContactForm
              initialValues={{
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                image: contact.image,
                notes: contact.notes,
              }}
              onSubmit={handleSubmit}
              loading={updateMutation.isPending}
              submitLabel="Update contact"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
