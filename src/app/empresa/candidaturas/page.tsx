import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { OfferApplicantStatus, offerApplicants } from "@/lib/mock-data";

const statusStyles: Record<OfferApplicantStatus, string> = {
  Nova: "bg-amber-100 text-amber-800",
  "Em análise": "bg-cyan-100 text-cyan-800",
  Entrevista: "bg-emerald-100 text-emerald-800",
  Rejeitada: "bg-rose-100 text-rose-800",
};

export default function EmpresaCandidaturasPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Candidaturas recebidas
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Acompanha quem se candidatou, o estado de avaliação e acede aos
              perfis rapidamente.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Total
            </p>
            <p className="text-2xl font-black text-slate-900">
              {offerApplicants.length}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {offerApplicants.map((applicant) => (
          <article
            key={applicant.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black text-slate-900">
                    {applicant.name}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[applicant.status]}`}
                  >
                    {applicant.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {applicant.course} · {applicant.university}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Vaga: <span className="font-semibold">{applicant.offerTitle}</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Candidatura enviada em {applicant.appliedAt}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/perfil/${applicant.profileSlug}`}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Ver perfil
                </Link>
                <Link
                  href={`/perfil/${applicant.profileSlug}`}
                  className="rounded-lg bg-cyan-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-cyan-800"
                >
                  Visualizar candidatura
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
