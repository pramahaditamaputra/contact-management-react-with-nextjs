"use client";

import { useContactListViewModel } from "../viewmodels/useContactListViewModel";
import { Button } from "@/src/shared/components/ui/button";
import { useAppDispatch } from "@/src/store/hooks";
import { openContactCreateModal } from "../state/contact-create-modal.slice";
import { DataTable } from "@/src/shared/components/data-table/data-table";
import { createContactColumns } from "../components/data-table/columns-contact";
import { ContactCreateDialog } from "../components/ContactCreateDialog";
import { ContactEditSheet } from "../components/ContactEditSheet";
import { openContactEditModal } from "../state/contact-edit-modal.slice";

export const ContactListView = () => {
  const { contacts } = useContactListViewModel();
  const dispatch = useAppDispatch();
  const columns = createContactColumns({
    onEdit: (contact) => dispatch(openContactEditModal(contact)),
  });

  if (contacts.loading) return <div>Loading...</div>;
  if (contacts.error) return <div>Failed to load</div>;

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              data={contacts.items}
              columns={columns}
              searchColumnId="name"
              toolbarRight={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(openContactCreateModal())}
                >
                  Add Contact
                </Button>
              }
            />
          </div>
        </div>
      </div>
      <ContactCreateDialog />
      <ContactEditSheet />
    </div>
  );
};
