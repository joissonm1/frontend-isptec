"use client";

import { motion } from "framer-motion";

type TeamMember = {
  name: string;
  role: string;
  focus: string;
};

type SocialBenefit = {
  title: string;
  detail: string;
  score: number;
};

const team: TeamMember[] = [
  {
    name: "Joisson Miguel",
    role: "Product & Frontend",
    focus: "Experiência da plataforma e integração entre módulos",
  },
  {
    name: "Ana Gomes",
    role: "Acadêmico & Qualidade",
    focus: "Validação pedagógica e recomendações baseadas em progresso",
  },
  {
    name: "NexaTech RH",
    role: "Mercado & Recrutamento",
    focus: "Definição de critérios para estágios e perfis ideais",
  },
];

const socialBenefits: SocialBenefit[] = [
  {
    title: "Empregabilidade jovem",
    detail: "Mais estudantes com acesso a vagas compatíveis com o curso.",
    score: 78,
  },
  {
    title: "Inclusão digital",
    detail: "Visibilidade para talentos fora dos grandes centros urbanos.",
    score: 64,
  },
  {
    title: "Retenção acadêmica",
    detail: "Motivação por trilhas práticas e feedback de professores.",
    score: 71,
  },
];

const impactChart = [
  { label: "Q1", students: 40, placements: 22 },
  { label: "Q2", students: 65, placements: 35 },
  { label: "Q3", students: 82, placements: 48 },
  { label: "Q4", students: 100, placements: 61 },
];

const maxValue = Math.max(...impactChart.map((d) => d.students));

export function TeamSocialImpact() {
  return (
    <section className="ui-card p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <h3 className="text-lg font-semibold text-slate-900">
            Equipa que desenvolveu
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Time multidisciplinar entre tecnologia, academia e mercado.
          </p>
          <ul className="mt-4 space-y-3">
            {team.map((member) => (
              <li key={member.name} className="rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">
                  {member.name}
                </p>
                <p className="text-xs text-cyan-700">{member.role}</p>
                <p className="mt-1 text-xs text-slate-600">{member.focus}</p>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <h3 className="text-lg font-semibold text-slate-900">
            Benefícios sociais
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Indicadores mockados para validar o valor público da solução.
          </p>
          <div className="mt-4 space-y-3">
            {socialBenefits.map((benefit) => (
              <div key={benefit.title}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">
                    {benefit.title}
                  </span>
                  <span className="text-xs font-semibold text-cyan-700">
                    {benefit.score}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-cyan-700"
                    style={{ width: `${benefit.score}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-600">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <h3 className="text-lg font-semibold text-slate-900">
            Impacto com gráficos
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Evolução simulada de estudantes ativos e colocações em estágio.
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-3">
            <div className="flex items-end gap-2">
              {impactChart.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <div className="flex h-28 items-end gap-1">
                    <div
                      className="w-3 rounded-t bg-cyan-700"
                      style={{ height: `${(item.students / maxValue) * 100}%` }}
                      title={`Estudantes: ${item.students}`}
                    />
                    <div
                      className="w-3 rounded-t bg-slate-500"
                      style={{
                        height: `${(item.placements / maxValue) * 100}%`,
                      }}
                      title={`Colocações: ${item.placements}`}
                    />
                  </div>
                  <span className="text-[11px] text-slate-600">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-600">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-cyan-700" /> Estudantes
                ativos
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-500" />{" "}
                Colocações
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
