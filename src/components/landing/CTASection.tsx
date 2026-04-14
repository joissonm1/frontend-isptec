import Link from "next/link";

export function CTASection() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 p-8 text-white">
      <h2 className="text-3xl font-black">
        Pronto para aproximar formação e carreira?
      </h2>
      <p className="mt-2 max-w-2xl text-slate-200">
        Cria conta, constrói o teu perfil e candidata-te às primeiras
        oportunidades em minutos.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/registro"
          className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-300"
        >
          Sou estudante
        </Link>
        <Link
          href="/registro"
          className="rounded-xl border border-white/40 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
        >
          Sou empresa
        </Link>
      </div>
    </section>
  );
}
