import { AppShell } from "@/components/layout/AppShell";

export default function ProfessorDashboardPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Dashboard do Professor
        </h1>
        <p className="mt-2 text-slate-600">
          Acompanha evolução dos estudantes e recomendações emitidas.
        </p>
      </section>
    </AppShell>
  );
}
