"use client";

import { useMemo } from "react";
import { mockUsers, useAuthStore } from "@/features/auth/store";

type StudentProgressSectionProps = {
  profileSlug: string;
};

const progressData = [
  { label: "Média acadêmica", value: 86 },
  { label: "Projetos concluídos", value: 72 },
  { label: "Participação em concursos", value: 58 },
  { label: "Prontidão para estágio", value: 79 },
];

export function StudentProgressSection({
  profileSlug,
}: StudentProgressSectionProps) {
  const session = useAuthStore((state) => state.session);

  const viewedRole = useMemo(() => {
    const found = mockUsers.find((user) => user.profileSlug === profileSlug);
    return found?.role ?? "student";
  }, [profileSlug]);

  const canSeeProgress = useMemo(() => {
    if (!session) {
      return false;
    }

    if (viewedRole !== "student") {
      return false;
    }

    if (session.role === "professor" || session.role === "company") {
      return true;
    }

    if (session.role === "student" && session.profileSlug === profileSlug) {
      return true;
    }

    return false;
  }, [session, viewedRole, profileSlug]);

  if (viewedRole !== "student") {
    return null;
  }

  if (!canSeeProgress) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-xl font-black text-slate-900">
          Progresso do estudante
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Este progresso é privado. Apenas o próprio estudante, professores e
          empresas podem visualizar.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-xl font-black text-slate-900">
        Progresso do estudante
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Métricas de evolução académica e preparação profissional.
      </p>
      <div className="mt-4 space-y-3">
        {progressData.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-cyan-600"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
