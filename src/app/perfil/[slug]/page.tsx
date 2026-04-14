import { ProfilePageClient } from "@/components/profile/ProfilePageClient";

type PerfilPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PerfilPage({ params }: PerfilPageProps) {
  const { slug } = await params;
  return <ProfilePageClient slug={slug} />;
}
