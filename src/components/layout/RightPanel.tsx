import { Newspaper, TrendingUp } from "lucide-react";
import { trendItems } from "@/lib/mock-data";

export function RightPanel() {
  return (
    <aside>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-700">
              <Newspaper className="h-3.5 w-3.5" />
              Editorial
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">
              UniBridge Notícias
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Destaques para carreira, estágio e competências
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700">
            <TrendingUp className="h-3.5 w-3.5" />
            Em alta
          </span>
        </div>

        <ul className="mt-4 divide-y divide-slate-100">
          {trendItems.map((item, index) => (
            <li key={item} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-medium leading-relaxed text-slate-800">
                {item}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Tendencia #{index + 1} • Atualizado hoje
              </p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
