"use client";

import { ContactForm } from "./ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { ContactFormValues } from "../forms/contact-form.types";

type ContactCreateDialogProps = {
  isOpen: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContactFormValues) => Promise<void>;
};

export const ContactCreateDialog = ({
  isOpen,
  loading,
  onOpenChange,
  onSubmit,
}: ContactCreateDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Contact</DialogTitle>
          <DialogDescription>
            Create a new contact and keep the list in sync automatically.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          onSubmit={onSubmit}
          loading={loading}
          submitLabel="Create contact"
        />
      </DialogContent>
    </Dialog>
  );
};
