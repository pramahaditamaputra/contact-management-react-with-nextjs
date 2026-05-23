import { useRouter } from "next/navigation";
import { useContactQuery } from "../queries/useContactQuery";
import { useUpdateContactMutation } from "../queries/useUpdateContactMutation";
import { ContactFormValues } from "../forms/contact-form.types";

export const useContactEditViewModel = (id: string) => {
  const router = useRouter();
  const detailQuery = useContactQuery(id);
  const updateMutation = useUpdateContactMutation();

  const onSubmit = async (values: ContactFormValues) => {
    await updateMutation.mutateAsync({ id, payload: values });
    router.push(`/contacts/${id}`);
  };

  return {
    contact: detailQuery.data ?? null,
    loading: detailQuery.isLoading || updateMutation.isPending,
    error: detailQuery.error ?? updateMutation.error,
    onSubmit,
  };
};
