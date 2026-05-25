import { useContactsQuery } from "../queries/useContactsQuery";
import { type PaginationState } from "@tanstack/react-table";
import contactColumns from "../components/data-table/columns-contact";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setPagination } from "../state/contact-pagination.slice";

const useContactViewModel = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.contactPagination);
  const columns = contactColumns();
  const contactsQuery = useContactsQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const onPaginationChange: React.Dispatch<
    React.SetStateAction<PaginationState>
  > = (updater) => {
    const nextPagination =
      typeof updater === "function" ? updater(pagination) : updater;

    dispatch(setPagination(nextPagination));
  };

  return {
    pagination: {
      state: pagination,
      pageCount: undefined,
      onPaginationChange,
    },
    contacts: {
      items: contactsQuery.data ?? [],
      loading: contactsQuery.isLoading || contactsQuery.isFetching,
      error: contactsQuery.error,
      refetch: contactsQuery.refetch,
    },
    columns,
  };
};

export default useContactViewModel;
