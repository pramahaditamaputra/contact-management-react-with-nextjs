"use client";

import { ContactForm } from "./ContactForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/shared/components/ui/sheet";
import { Skeleton } from "@/src/shared/components/ui/skeleton";
import { useContactQuery } from "../queries/useContactQuery";
import { ContactFormValues } from "../forms/contact-form.types";

type ContactEditSheetProps = {
  contactId: string | null;
  isOpen: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContactFormValues) => Promise<void>;
};

export const ContactEditSheet = ({
  contactId,
  isOpen,
  loading,
  onOpenChange,
  onSubmit,
}: ContactEditSheetProps) => {
  const { data: contact, isLoading, error } = useContactQuery(contactId ?? "");

  if (!contactId) return null;

  const initialValues = contact
    ? {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        image: contact.image,
        notes: contact.notes,
      }
    : null;

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
            {error ? (
              <p className="text-sm text-destructive">
                Failed to load the latest contact details.
              </p>
            ) : isLoading || !initialValues ? (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </div>
                  <Skeleton className="h-20 w-full rounded-2xl" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            ) : (
              <ContactForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                loading={loading}
                submitLabel="Update contact"
              />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
