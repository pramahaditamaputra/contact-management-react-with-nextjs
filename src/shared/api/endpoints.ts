export const endpoints = {
  contacts: "/users",
  contactSearch: "/users/search",
  contactAdd: "/users/add",
  contactById: (id: string) => `/users/${id}`,
};
