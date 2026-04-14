import { AppShell } from "@/components/layout/AppShell";

export default function EmpresaDashboardPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Dashboard da Empresa
        </h1>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Ofertas ativas</p>
            <p className="text-3xl font-black text-cyan-700">12</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Candidaturas</p>
            <p className="text-3xl font-black text-cyan-700">147</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Entrevistas agendadas</p>
            <p className="text-3xl font-black text-cyan-700">18</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
