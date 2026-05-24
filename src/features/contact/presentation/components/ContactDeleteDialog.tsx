"use client";

import { useContactQuery } from "../queries/useContactQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { Skeleton } from "@/src/shared/components/ui/skeleton";

type ContactDeleteDialogProps = {
  contactId: string | null;
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const ContactDeleteDialog = ({
  contactId,
  open,
  loading,
  onOpenChange,
  onConfirm,
}: ContactDeleteDialogProps) => {
  const { data: contact, isLoading, error } = useContactQuery(contactId ?? "");

  if (!contactId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Contact</DialogTitle>
          {error ? (
            <DialogDescription>
              Failed to load the latest contact details.
            </DialogDescription>
          ) : isLoading || !contact ? (
            <div className="grid gap-2">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-40" />
            </div>
          ) : (
            <DialogDescription>
              Are you sure you want to delete {contact.name}? This action cannot
              be undone.
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={loading || isLoading || !!error}
          >
            {loading ? "Deleting..." : "Yes, delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
