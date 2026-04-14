"use client";

import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { api, apiMappers } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

type EditarOfertaPageProps = {
  params: { id: string };
};

export default function EditarOfertaPage({ params }: EditarOfertaPageProps) {
  const [jobId, setJobId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [contract, setContract] = useState("Internship");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [applications, setApplications] = useState<
    Array<{
      id: string;
      jobId: string;
      studentId?: string;
      status: string;
      createdAt?: string;
    }>
  >([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { id } = params;
      if (!active) return;
      setJobId(id);

      try {
        const response = await api.jobs.get(id);
        const normalized = apiMappers.normalizeOffer(response.data);
        if (!active) return;
        setTitle(normalized.title ?? "");
        setContract(normalized.contract ?? "Internship");
        setLocation(normalized.location ?? "");
        setSkills((normalized.skills ?? []).join(", "));
        setDescription(normalized.fullDescription ?? "");
      } catch (error) {
        // Mantem vazio se falhar.
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    const loadApplications = async () => {
      try {
        const response = await api.jobs.applicationsByJob(
          params.id,
          session?.token ?? null,
        );
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
          setLoadingApplications(false);
        }
      }
    };

    loadApplications();
    return () => {
      active = false;
    };
  }, [params, session?.token]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!jobId) return;
    setSaving(true);

    const payload = {
      title,
      contract,
      location,
      skills: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      description,
    };

    try {
      await api.jobs.update(jobId, payload, session?.token ?? null);
      alert("Oferta atualizada.");
    } catch (error) {
      alert("Nao foi possivel atualizar a oferta.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Editar oferta {jobId ? `#${jobId}` : ""}
        </h1>
        <p className="mt-2 text-slate-600">
          Aqui podes atualizar título, requisitos, localização e status da vaga.
        </p>

        {loading ? (
          <div className="mt-6 rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
            A carregar detalhes da vaga...
          </div>
        ) : (
          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={submit}>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Título da vaga
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Tipo de contrato
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                value={contract}
                onChange={(event) => setContract(event.target.value)}
              >
                <option value="Internship">Estágio</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Localização
              </label>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Competências desejadas
              </label>
              <input
                value={skills}
                onChange={(event) => setSkills(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Descrição da vaga
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="h-32 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                type="submit"
                className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                disabled={saving}
              >
                {saving ? "A guardar..." : "Guardar alterações"}
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-black text-slate-900">Candidaturas</h2>
        <p className="mt-1 text-sm text-slate-600">
          Aprovar ou rejeitar candidatos desta vaga.
        </p>
        <div className="mt-4 space-y-3">
          {loadingApplications ? (
            <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              A carregar candidaturas...
            </div>
          ) : applications.length > 0 ? (
            applications.map((application) => (
              <article
                key={application.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Candidatura #{application.id}
                    </p>
                    <p className="text-xs text-slate-600">
                      Status: {application.status}
                    </p>
                    {application.studentId && (
                      <p className="text-xs text-slate-500">
                        Estudante: {application.studentId}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={application.status === "ACCEPTED"}
                      onClick={async () => {
                        try {
                          await api.jobs.acceptApplication(
                            application.id,
                            session?.token ?? null,
                          );
                          setApplications((prev) =>
                            prev.map((item) =>
                              item.id === application.id
                                ? { ...item, status: "ACCEPTED" }
                                : item,
                            ),
                          );
                        } catch (error) {
                          alert("Nao foi possivel aceitar a candidatura.");
                        }
                      }}
                    >
                      Aceitar
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={application.status === "REJECTED"}
                      onClick={async () => {
                        try {
                          await api.jobs.rejectApplication(
                            application.id,
                            session?.token ?? null,
                          );
                          setApplications((prev) =>
                            prev.map((item) =>
                              item.id === application.id
                                ? { ...item, status: "REJECTED" }
                                : item,
                            ),
                          );
                        } catch (error) {
                          alert("Nao foi possivel rejeitar a candidatura.");
                        }
                      }}
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              Nenhuma candidatura encontrada.
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
