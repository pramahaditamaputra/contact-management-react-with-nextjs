"use client";

import { useContactListViewModel } from "../viewmodels/useContactListViewModel";
import { Button } from "@/src/shared/components/ui/button";
import { useAppDispatch } from "@/src/store/hooks";
import { openContactCreateModal } from "../state/contact-create-modal.slice";
import { DataTable } from "@/src/shared/components/data-table/data-table";
import { columns } from "../components/data-table/columns-contact";

export const ContactListView = () => {
  const { contacts } = useContactListViewModel();
  const dispatch = useAppDispatch();

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
    </div>
  );
};
