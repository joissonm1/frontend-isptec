import { AppShell } from "@/components/layout/AppShell";

const rows = [
  {
    id: "1",
    vaga: "Frontend Intern",
    empresa: "BlueOrbit Labs",
    status: "Em análise",
  },
  {
    id: "2",
    vaga: "Social Media Intern",
    empresa: "XRPL Commons",
    status: "Entrevista",
  },
];

export default function CandidaturasPage() {
  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Minhas candidaturas
        </h1>
        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2">Vaga</th>
                <th>Empresa</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="py-3 font-semibold text-slate-900">
                    {row.vaga}
                  </td>
                  <td className="text-slate-600">{row.empresa}</td>
                  <td>
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
