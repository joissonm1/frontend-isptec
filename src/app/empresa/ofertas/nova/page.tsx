"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { api } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

export default function NovaOfertaPage() {
  const session = useAuthStore((state) => state.session);
  const [title, setTitle] = useState("");
  const [contract, setContract] = useState("Internship");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      title,
      contract,
      location,
      skills: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      responsibilities,
      description,
    };

    try {
      await api.companies.jobs.create(payload, session?.token ?? null);
      setTitle("");
      setContract("Internship");
      setLocation("");
      setSkills("");
      setResponsibilities("");
      setDescription("");
      alert("Vaga publicada com sucesso.");
    } catch (error) {
      alert("Nao foi possivel publicar a vaga agora.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Publicar vaga de emprego/estágio
        </h1>
        <p className="mt-2 text-slate-600">
          Define requisitos, responsabilidades e pontos de implementação
          esperados.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Título da vaga
            </label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ex: Frontend Intern"
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
              placeholder="Luanda / Remoto / Híbrido"
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
              placeholder="React, TypeScript, SQL..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Coisas a implementar no estágio
            </label>
            <textarea
              value={responsibilities}
              onChange={(event) => setResponsibilities(event.target.value)}
              className="h-28 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ex: implementar dashboard de métricas, melhorar fluxo de candidatura, criar testes..."
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
              placeholder="Contexto, responsabilidades e critérios de seleção."
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Guardar rascunho
            </button>
            <button
              type="submit"
              className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              disabled={submitting}
            >
              {submitting ? "A publicar..." : "Publicar vaga"}
            </button>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
