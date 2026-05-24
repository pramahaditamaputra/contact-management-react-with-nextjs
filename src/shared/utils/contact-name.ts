export const splitFullName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() ?? "";
  const lastName = parts.join(" ");

  return {
    firstName,
    lastName,
  };
};