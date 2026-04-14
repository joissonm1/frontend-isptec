import { ReactNode } from "react";
import { Offer } from "@/lib/mock-data";

type OfferDetailsProps = {
  offer: Offer;
  cta?: ReactNode;
};

export function OfferDetails({ offer, cta }: OfferDetailsProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.12),transparent_55%)]" />
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
            {offer.contract}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {offer.location} · {offer.country}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 md:text-5xl">
            {offer.title}
          </h1>
          <p className="text-sm font-semibold text-slate-700 md:text-base">
            {offer.company}
          </p>
          <p className="max-w-3xl text-base text-slate-600">
            {offer.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {offer.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
              Sobre a empresa
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              Porque esta vaga importa
            </h2>
            <p className="text-base leading-relaxed text-slate-700">
              {offer.fullDescription}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
              Oportunidade
            </p>
            <h3 className="text-xl font-black text-slate-900">
              O que vais fazer
            </h3>
            <p className="text-base text-slate-700">
              Procuramos {offer.target.toLowerCase()} para colaborar com equipas
              multidisciplinares e acelerar projetos com impacto real.
            </p>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-lg font-black text-slate-900">Resumo da vaga</h4>
          <div className="space-y-3 text-sm text-slate-600">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Empresa
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {offer.company}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Local
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {offer.location}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                País
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {offer.country}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Contrato
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {offer.contract}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Perfil desejado
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {offer.target}
              </p>
            </div>
          </div>
          {cta ? <div className="pt-3">{cta}</div> : null}
        </aside>
      </div>
    </section>
  );
}
