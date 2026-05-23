"use client";

import { useContactListViewModel } from "../viewmodels/useContactListViewModel";
import DataTable from "../components/DataTable/DataTable";
import { columns } from "../components/DataTable/Columns";

export const ContactListView = () => {
  const { filter, contacts } = useContactListViewModel();
  console.log("ContactListView render", { filter, contacts });

  if (contacts.loading) return <div>Loading...</div>;
  if (contacts.error) return <div>Failed to load</div>;

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable data={contacts.items} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};
