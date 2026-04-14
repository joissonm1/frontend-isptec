import { AppShell } from "@/components/layout/AppShell";

export default function ProfessorRecomendacoesPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">Recomendações</h1>
        <p className="mt-2 text-slate-600">
          Página para criação e gestão de recomendações para estudantes.
        </p>
      </section>
    </AppShell>
  );
}
