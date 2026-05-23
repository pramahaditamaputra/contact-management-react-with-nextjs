export const endpoints = {
  contacts: "/users",
  contactSearch: "/users/search",
  contactById: (id: string) => `/users/${id}`,
};
