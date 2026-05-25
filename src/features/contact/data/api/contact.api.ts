import { apiClient } from "@/src/shared/api/axios";
import { endpoints } from "@/src/shared/api/endpoints";
import { ContactResponseDto } from "./contact.dto";

export const contactApi = {
  async getContacts({
    seed = "abc",
    pageSize = 5,
    pageIndex = 0,
  }: {
    seed?: string;
    pageSize: number;
    pageIndex: number;
  }) {
    const params = {
      results: pageSize,
      page: pageIndex + 1,
      seed,
    };

    const res = await apiClient.get<ContactResponseDto>(endpoints.contacts, {
      params,
    });
    return res.data;
  },
};
