export const contactQueryKeys = {
  all: ["contacts"] as const,
  lists: () => [...contactQueryKeys.all, "list"] as const,
  list: (seed?: string, pageIndex?: number, pageSize?: number) =>
    [...contactQueryKeys.lists(), { seed, pageIndex, pageSize }] as const,
};
