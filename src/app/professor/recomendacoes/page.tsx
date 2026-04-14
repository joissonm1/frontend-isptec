import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { suggestedStudentProfiles } from "@/lib/mock-data";

const companies = [
  "NexaTech",
  "BlueOrbit Labs",
  "XRPL Commons",
  "Insight Bridge",
];

export default function ProfessorRecomendacoesPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">Recomendações</h1>
        <p className="mt-2 text-sm text-slate-600">
          Recomenda alunos para empresas com base em desempenho académico e
          competências.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/professor/dashboard"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Progresso
          </Link>
          <Link
            href="/professor/recomendacoes"
            className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-bold text-white"
          >
            Recomendações
          </Link>
          <Link
            href="/professor/estudantes"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Perfis de estudantes
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-black text-slate-900">
          Nova recomendação
        </h2>
        <form className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Estudante
            </label>
            <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
              {suggestedStudentProfiles.map((student) => (
                <option key={student.slug} value={student.slug}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Empresa
            </label>
            <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Motivo da recomendação
            </label>
            <textarea
              className="h-28 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Descreve competências, progresso e potencial do estudante para esta empresa..."
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="button"
              className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-bold text-white"
            >
              Enviar recomendação
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-black text-slate-900">
          Recomendações recentes
        </h2>
        <div className="mt-4 space-y-3">
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-bold text-slate-900">
              Joisson Miguel - NexaTech
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Recomendado por desempenho técnico consistente e evolução no
              progresso acadêmico.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-bold text-slate-900">
              Ana Paula Fernandes - Insight Bridge
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Recomendação baseada em competência analítica e qualidade de
              entregas em projetos de dados.
            </p>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
