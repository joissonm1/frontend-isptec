"use client";

import { motion } from "framer-motion";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

type SocialBenefit = {
  title: string;
  detail: string;
  score: number;
};

const teamGallery: GalleryItem[] = [
  {
    common: "Joisson Miguel",
    binomial: "Product & Frontend",
    photo: {
      url: "/joisson.png",
      text: "Joisson",
      pos: "50% 35%",
      by: "UniBridge",
    },
  },
  {
    common: "Jesse",
    binomial: "Backend & Integrações",
    photo: {
      url: "/jesse.png",
      text: "Jesse",
      pos: "50% 30%",
      by: "UniBridge",
    },
  },
  {
    common: "Sebas",
    binomial: "Frontend & UI",
    photo: {
      url: "/sebas.png",
      text: "Sebas",
      pos: "50% 50%",
      by: "UniBridge",
    },
  },
  {
    common: "Victor",
    binomial: "Produto & Experiência",
    photo: {
      url: "/victor.png",
      text: "Victor",
      pos: "50% 40%",
      by: "UniBridge",
    },
  },
  {
    common: "Wilfred",
    binomial: "Mentoria",
    photo: {
      url: "/wilfred.png",
      text: "Wilfred",
      pos: "50% 45%",
      by: "UniBridge",
    },
  },
  {
    common: "Paulo",
    binomial: "Coordenação",
    photo: {
      url: "/me.png",
      text: "Paulo",
      pos: "50% 50%",
      by: "UniBridge",
    },
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
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="ui-card rounded-2xl border border-border p-5"
        >
          <h3 className="text-lg font-semibold text-foreground">Benefícios sociais</h3>
          <p className="mt-1 text-sm text-muted">Indicadores mockados para validar o valor público da solução.</p>
          <div className="mt-4 space-y-3">
            {socialBenefits.map((benefit) => (
              <div key={benefit.title}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted">{benefit.title}</span>
                  <span className="text-xs font-semibold text-primary">{benefit.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-border/60">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${benefit.score}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="ui-card rounded-2xl border border-border p-5"
        >
          <h3 className="text-lg font-semibold text-foreground">Impacto com gráficos</h3>
          <p className="mt-1 text-sm text-muted">Evolução simulada de estudantes ativos e colocações em estágio.</p>

          <div className="mt-4 rounded-xl bg-background/50 p-3">
            <div className="flex items-end gap-2">
              {impactChart.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <div className="flex h-28 items-end gap-1">
                    <div
                      className="w-3 rounded-t bg-primary"
                      style={{ height: `${(item.students / maxValue) * 100}%` }}
                      title={`Estudantes: ${item.students}`}
                    />
                    <div
                      className="w-3 rounded-t bg-muted"
                      style={{
                        height: `${(item.placements / maxValue) * 100}%`,
                      }}
                      title={`Colocações: ${item.placements}`}
                    />
                  </div>
                  <span className="text-[11px] text-muted">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary" /> Estudantes ativos
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-muted" /> Colocações
              </span>
            </div>
          </div>
        </motion.article>
      </div>

      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="ui-card relative overflow-hidden rounded-2xl border border-border"
        >
          <div className="relative flex min-h-150 flex-col">
            <div className="relative z-10 p-5 sm:p-6">
              <h3 className="text-lg font-black text-foreground">Equipa de desenvolvimento</h3>
              <p className="mt-1 max-w-3xl text-sm text-muted">
                Uma galeria 3D para destacar as pessoas e parceiros por trás do UniBridge.
                Faz scroll para rodar, ou deixa em auto-rotação.
              </p>
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-0">
                <CircularGallery items={teamGallery} radius={520} autoRotateSpeed={1} />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background via-background/60 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
