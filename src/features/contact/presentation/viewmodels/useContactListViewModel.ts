import { useContactsQuery } from "../queries/useContactsQuery";

export const useContactListViewModel = () => {
  const keyword = "";
  const contactsQuery = useContactsQuery(keyword);

  return {
    contacts: {
      items: contactsQuery.data ?? [],
      loading: contactsQuery.isLoading,
      error: contactsQuery.error,
      refetch: contactsQuery.refetch,
    },
  };
};
