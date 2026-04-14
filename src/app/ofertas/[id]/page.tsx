import Link from "next/link";
import { notFound } from "next/navigation";
import { OfferApplyDrawer } from "@/components/offers/OfferApplyDrawer";
import { OfferDetails } from "@/components/offers/OfferDetails";
import { offers } from "@/lib/mock-data";

type OfertaDetalhePageProps = {
  params: Promise<{ id: string }>;
};

export default async function OfertaDetalhePage({
  params,
}: OfertaDetalhePageProps) {
  const { id } = await params;
  const offer = offers.find((item) => item.id === id);

  if (!offer) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-10 sm:px-6">
      <Link
        href="/ofertas"
        className="inline-block text-sm font-bold text-cyan-700 hover:underline"
      >
        ← Voltar para ofertas
      </Link>
      <OfferDetails
        offer={offer}
        cta={<OfferApplyDrawer className="w-full" />}
      />
    </div>
  );
}
