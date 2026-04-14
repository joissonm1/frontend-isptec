import Link from "next/link";
import { Eye } from "lucide-react";
import { Offer } from "@/lib/mock-data";

type OfferCardProps = {
  offer: Offer;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <article className="rounded-2xl border border-cyan-200 bg-white p-5">
      <span className="inline-block rounded-md bg-cyan-100 px-3 py-1 text-xs font-bold uppercase text-cyan-800">
        {offer.contract}
      </span>
      <h3 className="mt-4 text-3xl font-black text-cyan-700">{offer.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{offer.shortDescription}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {offer.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          {offer.company} • {offer.location}
        </p>
        <Link
          href={`/ofertas/${offer.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-600"
        >
          <Eye className="h-4 w-4" /> Ver oferta
        </Link>
      </div>
    </article>
  );
}
