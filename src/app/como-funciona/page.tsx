export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h1 className="text-4xl font-black text-slate-900">Como funciona</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-slate-50 p-4">
            <h2 className="text-xl font-black text-cyan-700">
              1. Perfil evolutivo
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Estudantes publicam conquistas, projetos e progresso acadêmico.
            </p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4">
            <h2 className="text-xl font-black text-cyan-700">
              2. Ofertas alinhadas
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Empresas publicam estágios com filtros por área, skills e
              localização.
            </p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4">
            <h2 className="text-xl font-black text-cyan-700">
              3. Recomendação docente
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Professores reforçam a credibilidade do perfil com recomendações.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
