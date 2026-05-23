import { Contact } from "../../domain/entities/contact";
import { ContactResponseDto } from "../api/contact.api";

export const contactsDtoToEntity = (dto: ContactResponseDto): Contact[] => {
  return dto.users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    phone: user.phone || "N/A", // Placeholder, as phone is not provided in the API response
    email: user.email || "N/A", // Placeholder, as email is not provided in the API response
    image: user.image || "https://via.placeholder.com/150", // Placeholder image URL
  }));
};

export const contactDtoToEntity = (dto: ContactResponseDto): Contact => {
  const user = dto.users[0]; // Assuming the API returns a single user for getContact
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    phone: user.phone || "N/A", // Placeholder, as phone is not provided in the API response
    email: user.email || "N/A", // Placeholder, as email is not provided in the API response
    image: user.image || "https://via.placeholder.com/150", // Placeholder image URL
  };
};
