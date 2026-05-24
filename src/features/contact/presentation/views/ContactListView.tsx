"use client";

import { useContactListViewModel } from "../viewmodels/useContactListViewModel";
import { Button } from "@/src/shared/components/ui/button";
import { DataTable } from "@/src/shared/components/data-table/data-table";
import { createContactColumns } from "../components/data-table/columns-contact";
import { ContactCreateDialog } from "../components/ContactCreateDialog";
import { ContactEditSheet } from "../components/ContactEditSheet";
import { ContactDeleteDialog } from "../components/ContactDeleteDialog";

export const ContactListView = () => {
  const {
    contacts,
    filter,
    pagination,
    actions,
    createDialog,
    editSheet,
    deleteDialog,
  } = useContactListViewModel();
  const columns = createContactColumns({
    onEdit: actions.onEditContact,
    onDelete: actions.onDeleteContactRequest,
  });

  if (contacts.error) return <div>Failed to load</div>;

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              data={contacts.items}
              columns={columns}
              searchValue={filter.keyword}
              onSearchChange={filter.onKeywordChange}
              loading={contacts.loading}
              pagination={pagination}
              toolbarRight={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={actions.onCreateContact}
                >
                  Add Contact
                </Button>
              }
            />
          </div>
        </div>
      </div>
      <ContactCreateDialog
        isOpen={createDialog.isOpen}
        loading={createDialog.loading}
        onOpenChange={createDialog.onOpenChange}
        onSubmit={createDialog.onSubmit}
      />
      <ContactEditSheet
        contactId={editSheet.contactId}
        isOpen={editSheet.isOpen}
        loading={editSheet.loading}
        onOpenChange={editSheet.onOpenChange}
        onSubmit={editSheet.onSubmit}
      />
      <ContactDeleteDialog
        contactId={deleteDialog.contactId}
        open={deleteDialog.open}
        loading={deleteDialog.loading}
        onOpenChange={deleteDialog.onOpenChange}
        onConfirm={deleteDialog.onConfirm}
      />
    </div>
  );
};
