"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { suggestedStudentProfiles } from "@/lib/mock-data";
import { api, apiMappers } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

export default function EmpresaPerfisPage() {
  const [students, setStudents] = useState(suggestedStudentProfiles);
  const [loading, setLoading] = useState(true);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await api.students.list(session?.token ?? null);
        const data = Array.isArray(response.data)
          ? response.data
          : (response.data?.data ?? []);
        const normalized = data.map(apiMappers.normalizeStudentProfile);
        if (active) {
          setStudents(
            normalized.length ? normalized : suggestedStudentProfiles,
          );
        }
      } catch (error) {
        if (active) {
          setStudents(suggestedStudentProfiles);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [session?.token]);

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Perfis sugeridos para empresa
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Talentos recomendados com base em competências, progresso e atividade
          no feed.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {loading ? (
            <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              A carregar perfis...
            </div>
          ) : (
            students.map((student) => (
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
                <p className="mt-2 text-xs text-slate-500">
                  {student.lastUpdate}
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

                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Progresso estimado</span>
                    <span>{student.progressScore}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-cyan-600"
                      style={{ width: `${student.progressScore}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={`/perfil/${student.slug}`}
                  className="mt-4 inline-flex rounded-lg bg-cyan-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-cyan-800"
                >
                  Ver perfil completo e progresso
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </AppShell>
  );
}
