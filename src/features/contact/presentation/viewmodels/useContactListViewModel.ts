import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setKeyword } from "../state/contact-filter.slice";
import { useContactsQuery } from "../queries/useContactsQuery";

export const useContactListViewModel = () => {
  const dispatch = useAppDispatch();
  const keyword = useAppSelector((state) => state.contactFilter.keyword);
  const contactsQuery = useContactsQuery(keyword);

  return {
    filter: {
      keyword,
      onKeywordChange: (nextKeyword: string) =>
        dispatch(setKeyword(nextKeyword)),
    },
    contacts: {
      items: contactsQuery.data ?? [],
      loading: contactsQuery.isLoading,
      error: contactsQuery.error,
      refetch: contactsQuery.refetch,
    },
  };
};
