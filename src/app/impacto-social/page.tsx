import { CTASection } from "@/components/landing/CTASection";
import { ImpactStats } from "@/components/landing/ImpactStats";

export default function ImpactoSocialPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <section className="rounded-3xl bg-white p-8">
        <h1 className="text-4xl font-black text-slate-900">Impacto Social</h1>
        <p className="mt-3 text-slate-600">
          Medimos a transformação da jornada do estudante com indicadores de
          contratação, evolução de competências e integração com empresas.
        </p>
      </section>
      <ImpactStats />
      <CTASection />
    </div>
  );
}
