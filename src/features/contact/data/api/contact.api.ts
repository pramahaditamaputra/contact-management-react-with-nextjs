import { apiClient } from "@/src/shared/api/axios";
import { endpoints } from "@/src/shared/api/endpoints";

export type ContactResponseDto = {
  users: UserResponseDto[];
  total: number;
  skip: number;
  limit: number;
};

export type UserResponseDto = {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  email?: string;
  image?: string;
  notes?: string;
};

export type UpsertContactPayloadDto = {
  name: string;
  phone: string;
  email?: string;
  image?: string;
  notes?: string;
};

export const contactApi = {
  async getContacts(
    keyword?: string,
    pageIndex = 0,
    pageSize = 5,
  ) {
    const normalizedKeyword = keyword?.trim();
    const params = {
      limit: pageSize,
      skip: pageIndex * pageSize,
    };

    if (normalizedKeyword) {
      const res = await apiClient.get<ContactResponseDto>(
        endpoints.contactSearch,
        {
          params: { ...params, q: normalizedKeyword },
        },
      );

      return res.data;
    }

    const res = await apiClient.get<ContactResponseDto>(endpoints.contacts, {
      params,
    });
    return res.data;
  },

  async getContact(id: string) {
    const res = await apiClient.get<UserResponseDto>(endpoints.contactById(id));
    return res.data;
  },

  async createContact(payload: UpsertContactPayloadDto) {
    const res = await apiClient.post<UserResponseDto>(
      endpoints.contacts,
      payload,
    );
    return res.data;
  },

  async updateContact(id: string, payload: Partial<UpsertContactPayloadDto>) {
    const res = await apiClient.put<UserResponseDto>(
      endpoints.contactById(id),
      payload,
    );
    return res.data;
  },

  async deleteContact(id: string) {
    await apiClient.delete(endpoints.contactById(id));
  },
};
