"use client";

import Link from "next/link";
import { useContactDetailViewModel } from "../viewmodels/useContactDetailViewModel";

type Props = {
  id: string;
};

export const ContactDetailView = ({ id }: Props) => {
  const { contact, onDelete, loading } = useContactDetailViewModel(id);

  if (!contact) return <div>Loading...</div>;

  return (
    <div>
      <h1>{contact.name}</h1>
      <p>{contact.phone}</p>
      {contact.email && <p>{contact.email}</p>}
      {contact.notes && <p>{contact.notes}</p>}

      <Link href={`/contacts/edit/${contact.id}`}>Edit</Link>
      <button onClick={onDelete} disabled={loading}>
        Delete
      </button>
    </div>
  );
};
