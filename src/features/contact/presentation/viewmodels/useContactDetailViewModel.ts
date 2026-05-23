import { useRouter } from "next/navigation";
import { useContactQuery } from "../queries/useContactQuery";
import { useDeleteContactMutation } from "../queries/useDeleteContactMutation";

export const useContactDetailViewModel = (id: string) => {
  const router = useRouter();
  const detailQuery = useContactQuery(id);
  const deleteMutation = useDeleteContactMutation();

  const onDelete = async () => {
    await deleteMutation.mutateAsync(id);
    router.push("/contacts");
  };

  return {
    contact: detailQuery.data ?? null,
    loading: detailQuery.isLoading || deleteMutation.isPending,
    error: detailQuery.error ?? deleteMutation.error,
    onDelete,
  };
};
