import { ContactDetailView } from "@/src/features/contact/presentation/views/ContactDetailView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ContactDetailPage({ params }: Props) {
  const { id } = await params;
  return <ContactDetailView id={id} />;
}
