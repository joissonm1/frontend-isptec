"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { api } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

type Application = {
  id: string;
  jobId: string;
  status: string;
  createdAt?: string;
};

export default function CandidaturasPage() {
  const session = useAuthStore((state) => state.session);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await api.jobs.applicationsMe(session?.token ?? null);
        const payload = response.data as any;
        const data = Array.isArray(payload) ? payload : (payload?.data ?? []);
        if (active) {
          setApplications(data);
        }
      } catch (error) {
        if (active) {
          setApplications([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (session?.role === "student") {
      load();
    } else {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [session?.role, session?.token]);

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h1 className="text-2xl font-semibold text-slate-900">Candidaturas</h1>
        <p className="mt-1 text-sm text-slate-600">
          Acompanha o estado das tuas candidaturas.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        {session?.role !== "student" ? (
          <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
            Esta area esta disponivel apenas para estudantes.
          </div>
        ) : loading ? (
          <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
            A carregar candidaturas...
          </div>
        ) : applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map((application) => (
              <article
                key={application.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-sm font-semibold text-slate-900">
                  Candidatura #{application.id}
                </p>
                <p className="text-xs text-slate-600">
                  Vaga: {application.jobId}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Status: {application.status}
                </p>
                {application.createdAt && (
                  <p className="mt-1 text-xs text-slate-500">
                    Criada em: {application.createdAt}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
            Nenhuma candidatura encontrada.
          </div>
        )}
      </section>
    </AppShell>
  );
}
