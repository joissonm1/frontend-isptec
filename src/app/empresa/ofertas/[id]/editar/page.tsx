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
    return () => {
      active = false;
    };
  }, [params]);

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
    </AppShell>
  );
}
