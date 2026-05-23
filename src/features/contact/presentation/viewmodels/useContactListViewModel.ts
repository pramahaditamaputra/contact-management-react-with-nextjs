import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setKeyword } from "../state/contact-filter.slice";
import { useContactsQuery } from "../queries/useContactsQuery";
import { type PaginationState } from "@tanstack/react-table";
import { openContactCreateModal } from "../state/contact-create-modal.slice";
import { openContactEditModal } from "../state/contact-edit-modal.slice";
import { Contact } from "../../domain/entities/contact";

export const useContactListViewModel = () => {
  const dispatch = useAppDispatch();
  const keyword = useAppSelector((state) => state.contactFilter.keyword);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const contactsQuery = useContactsQuery(
    keyword,
    pagination.pageIndex,
    pagination.pageSize,
  );
  const loading = contactsQuery.isLoading || contactsQuery.isFetching;
  const totalCount = contactsQuery.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalCount / pagination.pageSize));

  const updateKeyword = (nextKeyword: string) => {
    dispatch(setKeyword(nextKeyword));
    setPagination((currentPagination) =>
      currentPagination.pageIndex === 0
        ? currentPagination
        : { ...currentPagination, pageIndex: 0 },
    );
  };

  const onCreateContact = () => {
    dispatch(openContactCreateModal());
  };

  const onEditContact = (contact: Contact) => {
    dispatch(openContactEditModal(contact));
  };

  return {
    filter: {
      keyword,
      onKeywordChange: updateKeyword,
    },
    pagination: {
      state: pagination,
      pageCount,
      onPaginationChange: setPagination,
    },
    contacts: {
      items: contactsQuery.data?.items ?? [],
      totalCount,
      loading,
      error: contactsQuery.error,
      refetch: contactsQuery.refetch,
    },
    actions: {
      onCreateContact,
      onEditContact,
    },
  };
};
