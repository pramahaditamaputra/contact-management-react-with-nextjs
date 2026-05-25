import { Contact } from "../../../domain/entities/contact";

export type ContactUi = {
  id: string;
  name: string;
  phone: string;
  cell: string;
  location: string;
  email: string;
  dob: string;
  picture: string;
};

export const contactsEntityToUi = (entity: Contact[]) => {
  return entity.map((contact) => ({
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    cell: contact.cell,
    location: contact.location,
    email: contact.email,
    dob: new Date(contact.dob).toLocaleDateString(),
    picture: contact.picture,
  }));
};
