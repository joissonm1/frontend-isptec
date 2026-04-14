import { AppShell } from "@/components/layout/AppShell";

export default function NovaOfertaPage() {
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

        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Título da vaga
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ex: Frontend Intern"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Tipo de contrato
            </label>
            <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
              <option>Estágio</option>
              <option>Part-time</option>
              <option>Full-time</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Localização
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Luanda / Remoto / Híbrido"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Competências desejadas
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="React, TypeScript, SQL..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Coisas a implementar no estágio
            </label>
            <textarea
              className="h-28 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ex: implementar dashboard de métricas, melhorar fluxo de candidatura, criar testes..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Descrição da vaga
            </label>
            <textarea
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
              type="button"
              className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white"
            >
              Publicar vaga
            </button>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
