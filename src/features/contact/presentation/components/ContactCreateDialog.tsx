"use client";

import { ContactForm } from "./ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { useContactCreateDialogViewModel } from "../viewmodels/useContactCreateDialogViewModel";

export const ContactCreateDialog = () => {
  const { isOpen, onOpenChange, onSubmit, loading } =
    useContactCreateDialogViewModel();

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
