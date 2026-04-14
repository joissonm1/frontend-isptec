import { AppShell } from "@/components/layout/AppShell";

export default function NovaOfertaPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">Nova oferta</h1>
        <p className="mt-2 text-slate-600">
          Formulário para criação de oferta de estágio.
        </p>
      </section>
    </AppShell>
  );
}
