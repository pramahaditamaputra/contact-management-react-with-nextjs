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
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string;
};

export const contactApi = {
  async getContacts(keyword?: string) {
    const res = await apiClient.get<ContactResponseDto>(endpoints.contacts, {
      params: keyword ? { keyword } : undefined,
    });
    return res.data;
  },

  async getContact(id: string) {
    const res = await apiClient.get<ContactResponseDto>(
      endpoints.contactById(id),
    );
    return res.data;
  },

  async createContact(payload: Omit<ContactResponseDto, "id">) {
    const res = await apiClient.post<ContactResponseDto>(
      endpoints.contacts,
      payload,
    );
    return res.data;
  },

  async updateContact(
    id: string,
    payload: Partial<Omit<ContactResponseDto, "id">>,
  ) {
    const res = await apiClient.put<ContactResponseDto>(
      endpoints.contactById(id),
      payload,
    );
    return res.data;
  },

  async deleteContact(id: string) {
    await apiClient.delete(endpoints.contactById(id));
  },
};
