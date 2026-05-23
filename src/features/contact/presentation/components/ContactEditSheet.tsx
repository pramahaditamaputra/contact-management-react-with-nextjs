"use client";

import { ContactForm } from "./ContactForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/shared/components/ui/sheet";
import { Contact } from "../../domain/entities/contact";
import { ContactFormValues } from "../forms/contact-form.types";

type ContactEditSheetProps = {
  contact: Contact | null;
  isOpen: boolean;
  initialValues: ContactFormValues | null;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContactFormValues) => Promise<void>;
};

export const ContactEditSheet = ({
  contact,
  isOpen,
  initialValues,
  loading,
  onOpenChange,
  onSubmit,
}: ContactEditSheetProps) => {
  if (!contact || !initialValues) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
              initialValues={initialValues}
              onSubmit={onSubmit}
              loading={loading}
              submitLabel="Update contact"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
