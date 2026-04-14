import Link from "next/link";
import { trendItems } from "@/lib/mock-data";

export function RightPanel() {
  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-xl font-bold text-slate-900">UniBridge Notícias</h3>
        <p className="mt-1 text-sm text-slate-500">Assuntos em alta</p>
        <ul className="mt-3 space-y-3">
          {trendItems.map((item) => (
            <li key={item} className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">•</span> {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h4 className="text-sm font-semibold text-slate-700">Ação rápida</h4>
        <div className="mt-3 space-y-2">
          <Link
            href="/registro"
            className="block rounded-lg bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Criar conta empresa
          </Link>
          <Link
            href="/ofertas"
            className="block rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Ver vagas
          </Link>
        </div>
      </section>
    </aside>
  );
}
