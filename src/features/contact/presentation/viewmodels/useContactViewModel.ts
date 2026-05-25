import React from "react";
import { useContactsQuery } from "../queries/useContactsQuery";
import { type PaginationState } from "@tanstack/react-table";
import { createContactColumns } from "../components/data-table/columns-contact";

const useContactViewModel = () => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const contactsQuery = useContactsQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });
  const loading = contactsQuery.isLoading || contactsQuery.isFetching;
  const pageCount = Math.max(
    1,
    Math.ceil((contactsQuery.data?.length || 0) / pagination.pageSize),
  );

  const columns = createContactColumns();

  return {
    pagination: {
      state: pagination,
      pageCount,
      onPaginationChange: setPagination,
    },
    contacts: {
      items: contactsQuery.data ?? [],
      loading,
      error: contactsQuery.error,
      refetch: contactsQuery.refetch,
    },
    columns,
  };
};

export default useContactViewModel;
