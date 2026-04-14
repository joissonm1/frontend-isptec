import { trendItems } from "@/lib/mock-data";

export function TrendsCard() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-lg font-black text-slate-900">
        Tendências da semana
      </h3>
      <ul className="mt-3 space-y-2">
        {trendItems.map((item) => (
          <li key={item} className="text-sm text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
