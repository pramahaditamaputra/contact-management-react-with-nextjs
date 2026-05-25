"use client";

import useContactViewModel from "../viewmodels/useContactViewModel";
import { DataTable } from "@/src/shared/components/data-table/data-table";

const ContactsView = () => {
  const { contacts, pagination, columns } = useContactViewModel();

  if (contacts.error) return <div>Failed to load</div>;

  return (
    <div className="@container/main flex flex-1 flex-col py-4 md:py-6 px-4 lg:px-6">
      <DataTable
        data={contacts.items}
        columns={columns}
        loading={contacts.loading}
        pagination={pagination}
      />
    </div>
  );
};

export default ContactsView;
