"use client";

import { ChangeEvent, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { contactFormSchema } from "../forms/contact-form.schema";
import { ContactFormValues } from "../forms/contact-form.types";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Textarea } from "@/src/shared/components/ui/textarea";

type Props = {
  initialValues?: Partial<ContactFormValues>;
  onSubmit: (values: ContactFormValues) => Promise<void>;
  loading?: boolean;
  submitLabel?: string;
};

export const ContactForm = ({
  initialValues,
  onSubmit,
  loading,
  submitLabel = "Save",
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      image: "",
      notes: "",
      ...initialValues,
    },
  });

  const imageValue = useWatch({ control, name: "image" });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setValue("image", "", { shouldValidate: true, shouldDirty: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setValue(
        "image",
        typeof reader.result === "string" ? reader.result : "",
        { shouldValidate: true, shouldDirty: true },
      );
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    reset({
      name: initialValues?.name ?? "",
      phone: initialValues?.phone ?? "",
      email: initialValues?.email ?? "",
      image: initialValues?.image ?? "",
      notes: initialValues?.notes ?? "",
    });
  }, [initialValues, reset]);

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          placeholder="Budi Santoso"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-phone">Phone</Label>
        <Input
          id="contact-phone"
          placeholder="0812 3456 7890"
          aria-invalid={errors.phone ? "true" : "false"}
          {...register("phone")}
        />
        {errors.phone ? (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="budi@example.com"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="contact-image">Photo</Label>
          <Input
            id="contact-image"
            type="file"
            accept="image/*"
            aria-invalid={errors.image ? "true" : "false"}
            onChange={handleImageChange}
          />
          {errors.image ? (
            <p className="text-sm text-destructive">{errors.image.message}</p>
          ) : null}
        </div>

        {imageValue ? (
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/30 p-3">
            <Image
              src={imageValue}
              alt="Photo preview"
              width={56}
              height={56}
              unoptimized
              className="size-14 rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">Preview</p>
              <p className="text-xs text-muted-foreground">
                The selected image will be saved with the contact.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-notes">Notes</Label>
        <Textarea
          id="contact-notes"
          placeholder="Add a reminder or relationship context"
          {...register("notes")}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};
