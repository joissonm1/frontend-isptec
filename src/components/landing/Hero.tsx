"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-white sm:px-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="mb-4 inline-flex rounded-full border border-cyan-300/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Universidade + Mercado
        </p>
        <h1 className="text-4xl font-black leading-tight sm:text-6xl">
          Conectamos talento acadêmico ao trabalho real.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-200 sm:text-lg">
          Uma plataforma para estudantes mostrarem progresso, empresas
          publicarem estágios e professores fortalecerem perfis com
          recomendações de confiança.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/registro"
            className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Começar agora
          </Link>
          <Link
            href="/como-funciona"
            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Ver como funciona
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
