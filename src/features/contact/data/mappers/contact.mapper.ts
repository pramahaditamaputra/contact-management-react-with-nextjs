import { Contact } from "../../domain/entities/contact";
import { ContactResponseDto } from "../api/contact.dto";

export const contactsDtoToEntity = (dto: ContactResponseDto): Contact[] => {
  return dto.results.map(
    (result) =>
      ({
        id: result.login.uuid,
        name: `${result.name.first} ${result.name.last}`,
        email: result.email,
        phone: result.phone,
        picture: result.picture.large,
        dob: result.dob.date,
      }) as Contact,
  );
};
