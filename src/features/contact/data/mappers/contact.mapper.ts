import { Contact } from "../../domain/entities/contact";
import type {
  ContactResponseDto,
  UpsertContactPayloadDto,
  UserResponseDto,
} from "../api/contact.api";
import { splitFullName } from "../../../../shared/utils/contact-name";

const DEFAULT_EMAIL = "N/A";
const DEFAULT_IMAGE = "https://via.placeholder.com/150";

export const upsertContactPayloadToUserFields = (
  payload: Partial<UpsertContactPayloadDto>,
) => {
  const userFields: Record<string, string | undefined> = {};

  if (payload.name !== undefined) {
    const { firstName, lastName } = splitFullName(payload.name);
    userFields.firstName = firstName;
    userFields.lastName = lastName;
  }

  if (payload.phone !== undefined) {
    userFields.phone = payload.phone;
  }

  if (payload.email !== undefined) {
    userFields.email = payload.email;
  }

  if (payload.image !== undefined) {
    userFields.image = payload.image;
  }

  if (payload.notes !== undefined) {
    userFields.notes = payload.notes;
  }

  return userFields;
};

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
