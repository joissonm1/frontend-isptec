import { Offer } from "@/lib/mock-data";

type OfferDetailsProps = {
  offer: Offer;
};

export function OfferDetails({ offer }: OfferDetailsProps) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-5xl font-black text-slate-900">{offer.title}</h1>

      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <p className="border-t-2 border-cyan-500 pt-2 text-2xl font-black text-cyan-700">
          COMPANY
        </p>
        <p className="border-t border-slate-300 pt-2 text-xl font-bold text-cyan-700">
          {offer.company}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <p className="border-t-2 border-cyan-500 pt-2 text-2xl font-black text-cyan-700">
          SHORT DESCRIPTION
        </p>
        <p className="border-t border-slate-300 pt-2 text-lg text-slate-800">
          {offer.shortDescription}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <p className="border-t-2 border-cyan-500 pt-2 text-2xl font-black text-cyan-700">
          FULL DESCRIPTION
        </p>
        <div className="border-t border-slate-300 pt-2">
          <h2 className="text-4xl font-black text-slate-900">About Us</h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">
            {offer.fullDescription}
          </p>
          <h3 className="mt-6 text-3xl font-black text-slate-900">
            Opportunity
          </h3>
          <p className="mt-2 text-lg text-slate-700">
            Procuramos {offer.target.toLowerCase()} para colaborar com equipas
            multidisciplinares.
          </p>
        </div>
      </div>
    </section>
  );
}
