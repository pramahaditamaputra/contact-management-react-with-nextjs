"use client";

import { ContactForm } from "../components/ContactForm";
import { useContactEditViewModel } from "../viewmodels/useContactEditViewModel";

type Props = {
  id: string;
};

export const ContactEditView = ({ id }: Props) => {
  const { contact, onSubmit, loading } = useContactEditViewModel(id);

  if (!contact) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Contact</h1>
      <ContactForm
        initialValues={{
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          notes: contact.notes,
        }}
        onSubmit={onSubmit}
        loading={loading}
      />
    </div>
  );
};
