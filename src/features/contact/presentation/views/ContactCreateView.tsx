"use client";

import { ContactForm } from "../components/ContactForm";
import { useContactCreateViewModel } from "../viewmodels/useContactCreateViewModel";

export const ContactCreateView = () => {
  const { onSubmit, loading } = useContactCreateViewModel();

  return (
    <div>
      <h1>Create Contact</h1>
      <ContactForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};
