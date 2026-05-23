"use client";

import { useContactListViewModel } from "../viewmodels/useContactListViewModel";
import { Button } from "@/src/shared/components/ui/button";
import { DataTable } from "@/src/shared/components/data-table/data-table";
import { createContactColumns } from "../components/data-table/columns-contact";
import { ContactCreateDialog } from "../components/ContactCreateDialog";
import { ContactEditSheet } from "../components/ContactEditSheet";

export const ContactListView = () => {
  const { contacts, filter, pagination, actions } = useContactListViewModel();
  const columns = createContactColumns({
    onEdit: actions.onEditContact,
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
      <ContactCreateDialog />
      <ContactEditSheet />
    </div>
  );
};
