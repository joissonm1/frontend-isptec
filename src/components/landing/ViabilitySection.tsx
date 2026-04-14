export function ViabilitySection() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {/* Card 1 - Neumorphism standard */}
      <article
  className="
    bg-cyan-700
    rounded-2xl
    p-6
    text-white
    shadow-[10px_10px_22px_rgba(0,0,0,0.25),-10px_-10px_22px_rgba(255,255,255,0.08)]
    hover:shadow-[12px_12px_26px_rgba(0,0,0,0.3),-12px_-12px_26px_rgba(255,255,255,0.1)]
    transition-all
  "
>
  <h3 className="text-2xl font-black">
    Viabilidade
  </h3>

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

      <article className="ui-card p-6">
        <h3 className="text-2xl font-black ui-text-title">
          Porque funciona
        </h3>

        <p className="mt-3 ui-text-muted">
          Resolve dor real de 3 atores ao mesmo tempo: estudante precisa de
          oportunidade, empresa precisa de talento e universidade precisa de
          evidência de empregabilidade.
        </p>
      </article>
    </section>
  );
}