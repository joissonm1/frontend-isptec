export function ViabilitySection() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-2xl bg-cyan-700 p-6 text-white">
        <h3 className="text-2xl font-black">Viabilidade</h3>
        <p className="mt-3 text-cyan-50">
          Modelo B2B2C: universidades e empresas aderem por assinatura
          institucional, enquanto estudantes utilizam o acesso acadêmico.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-cyan-100">
          <li>Onboarding simples por universidade</li>
          <li>Painel de recrutamento para empresas</li>
          <li>Relatórios de impacto para parceiros</li>
        </ul>
      </article>
      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-2xl font-black text-slate-900">Porque funciona</h3>
        <p className="mt-3 text-slate-600">
          Resolve dor real de 3 atores ao mesmo tempo: estudante precisa de
          oportunidade, empresa precisa de talento e universidade precisa de
          evidência de empregabilidade.
        </p>
      </article>
    </section>
  );
}
