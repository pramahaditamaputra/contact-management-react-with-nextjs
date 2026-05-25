"use client";

import useContactViewModel from "../viewmodels/useContactViewModel";
import { DataTable } from "@/src/shared/components/data-table/data-table";

const ContactsView = () => {
  const { contacts, pagination, columns } = useContactViewModel();

  if (contacts.error) return <div>Failed to load</div>;

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              data={contacts.items}
              columns={columns}
              loading={contacts.loading}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsView;
