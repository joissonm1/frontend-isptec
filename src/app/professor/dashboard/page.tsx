import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { suggestedStudentProfiles } from "@/lib/mock-data";

export default function ProfessorDashboardPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Dashboard do Professor
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Acompanha estudantes, atualiza progresso e recomenda talentos para
          empresas.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/professor/dashboard"
            className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-bold text-white"
          >
            Progresso
          </Link>
          <Link
            href="/professor/recomendacoes"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
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
          Atualizar progresso dos estudantes
        </h2>
        <div className="mt-4 space-y-4">
          {suggestedStudentProfiles.map((student) => (
            <article
              key={student.slug}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-black text-slate-900">{student.name}</h3>
                  <p className="text-sm text-slate-600">{student.course}</p>
                </div>
                <Link
                  href={`/perfil/${student.slug}`}
                  className="text-sm font-bold text-cyan-700 hover:underline"
                >
                  Ver perfil
                </Link>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[120px_1fr_auto] md:items-center">
                <label className="text-sm font-semibold text-slate-700">
                  Progresso
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={student.progressScore}
                  className="w-full"
                />
                <button
                  type="button"
                  className="rounded-lg bg-cyan-700 px-3 py-2 text-xs font-bold text-white"
                >
                  Guardar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
