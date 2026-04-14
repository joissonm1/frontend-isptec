import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { suggestedStudentProfiles } from "@/lib/mock-data";

export default function ProfessorEstudantesPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Perfis dos estudantes
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Visualiza perfis, competências e progresso académico para apoiar
          recomendações.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {suggestedStudentProfiles.map((student) => (
            <article
              key={student.slug}
              className="rounded-xl border border-slate-200 p-4"
            >
              <h2 className="text-xl font-black text-slate-900">
                {student.name}
              </h2>
              <p className="text-sm text-slate-600">
                {student.course} - {student.university}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Progresso atual</span>
                <span>{student.progressScore}%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-cyan-600"
                  style={{ width: `${student.progressScore}%` }}
                />
              </div>
              <Link
                href={`/perfil/${student.slug}`}
                className="mt-4 inline-flex rounded-lg bg-cyan-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-cyan-800"
              >
                Ver perfil completo
              </Link>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
