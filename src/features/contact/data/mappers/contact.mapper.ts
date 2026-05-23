import { Contact } from "../../domain/entities/contact";
import { ContactResponseDto, UserResponseDto } from "../api/contact.api";

const DEFAULT_EMAIL = "N/A";
const DEFAULT_IMAGE = "https://via.placeholder.com/150";

const mapUserToContact = (user: UserResponseDto): Contact => {
  const fallbackName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const contact: Contact = {
    id: user.id,
    name: user.name ?? fallbackName,
    phone: user.phone || "N/A",
    email: user.email || DEFAULT_EMAIL,
    image: user.image || DEFAULT_IMAGE,
  };

  if (user.notes) {
    contact.notes = user.notes;
  }

  return contact;
};

export const contactsDtoToEntity = (dto: ContactResponseDto): Contact[] => {
  return dto.users.map((user) => mapUserToContact(user));
};

export const contactDtoToEntity = (dto: UserResponseDto): Contact => {
  return mapUserToContact(dto);
};
