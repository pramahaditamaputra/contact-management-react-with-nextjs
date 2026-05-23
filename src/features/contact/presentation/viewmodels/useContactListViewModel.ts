import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setKeyword } from "../state/contact-filter.slice";
import { useContactsQuery } from "../queries/useContactsQuery";
import { type PaginationState } from "@tanstack/react-table";
import {
  closeContactCreateModal,
  openContactCreateModal,
} from "../state/contact-create-modal.slice";
import {
  closeContactEditModal,
  openContactEditModal,
} from "../state/contact-edit-modal.slice";
import { Contact } from "../../domain/entities/contact";
import { useCreateContactMutation } from "../queries/useCreateContactMutation";
import { useUpdateContactMutation } from "../queries/useUpdateContactMutation";
import { useDeleteContactMutation } from "../queries/useDeleteContactMutation";
import { ContactFormValues } from "../forms/contact-form.types";

export const useContactListViewModel = () => {
  const dispatch = useAppDispatch();
  const keyword = useAppSelector((state) => state.contactFilter.keyword);
  const createIsOpen = useAppSelector(
    (state) => state.contactCreateModal.isOpen,
  );
  const editContact = useAppSelector((state) => state.contactEditModal.contact);
  const editIsOpen = useAppSelector((state) => state.contactEditModal.isOpen);
  const createMutation = useCreateContactMutation();
  const updateMutation = useUpdateContactMutation();
  const deleteMutation = useDeleteContactMutation();
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [contactToDelete, setContactToDelete] = React.useState<Contact | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
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

  const onCreateContactDialogOpenChange = (nextOpen: boolean) => {
    dispatch(nextOpen ? openContactCreateModal() : closeContactCreateModal());
  };

  const onCreateContactSubmit = async (values: ContactFormValues) => {
    await createMutation.mutateAsync(values);
    dispatch(closeContactCreateModal());
  };

  const onEditContact = (contact: Contact) => {
    dispatch(openContactEditModal(contact));
  };

  const onEditContactSheetOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      dispatch(closeContactEditModal());
    }
  };

  const onEditContactSubmit = async (values: ContactFormValues) => {
    if (!editContact) return;

    await updateMutation.mutateAsync({ id: editContact.id, payload: values });
    dispatch(closeContactEditModal());
  };

  const editInitialValues = editContact
    ? {
        name: editContact.name,
        phone: editContact.phone,
        email: editContact.email,
        image: editContact.image,
        notes: editContact.notes,
      }
    : null;

  const onDeleteContactRequest = (contact: Contact) => {
    setContactToDelete(contact);
    setIsDeleteDialogOpen(true);
  };

  const onDeleteContactDialogOpenChange = (nextOpen: boolean) => {
    setIsDeleteDialogOpen(nextOpen);

    if (!nextOpen) {
      setContactToDelete(null);
    }
  };

  const onDeleteContactConfirm = async () => {
    if (!contactToDelete) return;

    await deleteMutation.mutateAsync(contactToDelete.id);
    setIsDeleteDialogOpen(false);
    setContactToDelete(null);
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
    createDialog: {
      isOpen: createIsOpen,
      loading: createMutation.isPending,
      error: createMutation.error,
      onOpenChange: onCreateContactDialogOpenChange,
      onSubmit: onCreateContactSubmit,
    },
    editSheet: {
      contact: editContact,
      isOpen: editIsOpen,
      initialValues: editInitialValues,
      loading: updateMutation.isPending,
      error: updateMutation.error,
      onOpenChange: onEditContactSheetOpenChange,
      onSubmit: onEditContactSubmit,
    },
    deleteDialog: {
      contact: contactToDelete,
      open: isDeleteDialogOpen,
      loading: deleteMutation.isPending,
      onOpenChange: onDeleteContactDialogOpenChange,
      onConfirm: onDeleteContactConfirm,
    },
    actions: {
      onCreateContact,
      onEditContact,
      onDeleteContactRequest,
    },
  };
};
