"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="ui-card relative overflow-hidden px-6 py-16 sm:px-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(38,43,104,0.18)] blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-[rgba(71,73,115,0.16)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl"
      >
    <p className="mb-4 inline-flex rounded-full border border-[rgba(22,27,51,0.16)] bg-[rgba(241,218,196,0.55)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(22,27,51,0.8)]">
          Universidade + Mercado
        </p>
        <h1 className="text-4xl font-black leading-tight sm:text-6xl">
          Conectamos talento acadêmico ao trabalho real.
        </h1>
    <p className="ui-text-muted mt-5 max-w-2xl text-base sm:text-lg">
          Uma plataforma para estudantes mostrarem progresso, empresas
          publicarem estágios e professores fortalecerem perfis com
          recomendações de confiança.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/registro"
      className="ui-btn ui-btn-primary px-6 py-3 text-sm font-bold"
          >
            Começar agora
          </Link>
        </div>
      </motion.div>
    </section>
  );
}