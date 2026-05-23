"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "../forms/contact-form.schema";
import { ContactFormValues } from "../forms/contact-form.types";

type Props = {
  initialValues?: Partial<ContactFormValues>;
  onSubmit: (values: ContactFormValues) => Promise<void>;
  loading?: boolean;
};

export const ContactForm = ({ initialValues, onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      notes: "",
      ...initialValues,
    },
  });

  useEffect(() => {
    reset({
      name: initialValues?.name ?? "",
      phone: initialValues?.phone ?? "",
      email: initialValues?.email ?? "",
      notes: initialValues?.notes ?? "",
    });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("phone")} placeholder="Phone" />
      {errors.phone && <p>{errors.phone.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <textarea {...register("notes")} placeholder="Notes" />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};
