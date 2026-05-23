export const contactQueryKeys = {
  all: ["contacts"] as const,
  lists: () => [...contactQueryKeys.all, "list"] as const,
  list: (keyword?: string) =>
    [...contactQueryKeys.lists(), { keyword }] as const,
  details: () => [...contactQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...contactQueryKeys.details(), id] as const,
};
