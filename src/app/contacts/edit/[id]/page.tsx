import { ContactEditView } from "@/src/features/contact/presentation/views/ContactEditView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ContactEditPage({ params }: Props) {
  const { id } = await params;
  return <ContactEditView id={id} />;
}
