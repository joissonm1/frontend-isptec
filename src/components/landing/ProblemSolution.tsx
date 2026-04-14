"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Problema",
    text: "Muitos estudantes terminam fases importantes sem visibilidade para o mercado e sem experiência prática validada.",
  },
  {
    title: "Solução",
    text: "Uma rede académica-profissional com perfil evolutivo, vagas direcionadas e recomendações de professores.",
  },
  {
    title: "Resultado",
    text: "Mais empregabilidade, recrutamento mais rápido para empresas e maior integração entre ensino e indústria.",
  },
];

export function ProblemSolution() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          className="ui-card border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="ui-text-title text-lg font-extrabold leading-tight">
            {card.title}
          </h3>
          <p className="ui-text-muted mt-2 text-sm leading-relaxed text-slate-600">
            {card.text}
          </p>
        </motion.article>
      ))}
    </section>
  );
}