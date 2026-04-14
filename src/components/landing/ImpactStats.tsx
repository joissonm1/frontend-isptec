"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/mock-data";

export function ImpactStats() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
        Impacto social mensurável
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        A plataforma reduz a distância entre teoria e prática, aumenta
        oportunidades de estágio e acelera a entrada no mercado.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {impactStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            className="rounded-xl bg-slate-50 p-4"
          >
            <div className="text-3xl font-black text-cyan-700">
              {stat.value}
              {stat.suffix}
            </div>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
