import { useRouter } from "next/navigation";
import { useCreateContactMutation } from "../queries/useCreateContactMutation";
import { ContactFormValues } from "../forms/contact-form.types";

export const useContactCreateViewModel = () => {
  const router = useRouter();
  const createMutation = useCreateContactMutation();

  const onSubmit = async (values: ContactFormValues) => {
    await createMutation.mutateAsync(values);
    router.push("/contacts");
  };

  return {
    loading: createMutation.isPending,
    error: createMutation.error,
    onSubmit,
  };
};
