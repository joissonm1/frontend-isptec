"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import { use, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StudentProgressSection } from "@/components/profile/StudentProgressSection";
import { api, apiMappers } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

type PerfilPageProps = {
  params: Promise<{ slug: string }>;
};

// const skills = [
//   "React",
//   "Next.js",
//   "TypeScript",
//   "NestJS",
//   "SQL",
//   "Comunicação",
//   "Liderança",
// ];

// const experiences = [
//   {
//     title: "Frontend Intern",
//     company: "BlueOrbit Labs",
//     period: "2025 - Atual",
//     description:
//       "Desenvolvimento de interfaces em Next.js e Tailwind, melhoria de performance e colaboração com equipa de produto.",
//   },
//   {
//     title: "Monitor Académico",
//     company: "ISPTEC",
//     period: "2024 - 2025",
//     description:
//       "Apoio em disciplinas de programação e orientação prática para projetos de estudantes iniciantes.",
//   },
// ];

export default function PerfilPage({ params }: PerfilPageProps) {
  const { slug } = use(params);
  const session = useAuthStore((state) => state.session);
  const [profileName, setProfileName] = useState("");
  const [profileRole, setProfileRole] = useState<
    "student" | "professor" | "company" | "university"
  >("student");
  const [profileId, setProfileId] = useState<string | null>(null);
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [experienceList, setExperienceList] = useState<
    Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  const displayName = useMemo(() => {
    if (profileName) {
      return profileName;
    }
    return slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }, [profileName, slug]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await api.students.list(session?.token ?? null);
        const payload = response.data as any;
        const data = Array.isArray(payload) ? payload : (payload?.data ?? []);
        const normalized = data.map(
          apiMappers.normalizeStudentProfile,
        ) as Array<{
          slug: string;
          id?: string | null;
          name: string;
          skills?: string[];
        }>;
        const found = normalized.find((student) => student.slug === slug);
        if (found && active) {
          setProfileName(found.name);
          setProfileRole("student");
          setProfileId(found.id ?? null);
          setSkillsList(found.skills ?? []);
        }

        if (found?.id) {
          try {
            const profileResponse = await api.profiles.student(
              found.id,
              session?.token ?? null,
            );
            const profilePayload = profileResponse.data as any;
            const profileData = profilePayload?.data ?? profilePayload;
            if (active) {
              setExperienceList(profileData?.experiences ?? []);
            }
          } catch (error) {
            // Mantem fallback local.
          }
        }
      } catch (error) {
        // Mantem fallback local.
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [slug, session?.token]);

  return (
    <AppShell>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div
          className="h-56 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,145,178,0.7), rgba(15,23,42,0.7)), url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1500&q=80')",
          }}
        />
        <div className="px-6 pb-6">
          <div className="-mt-16 h-32 w-32 rounded-3xl border-4 border-white bg-gradient-to-br from-cyan-200 to-slate-300" />
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-900">
                {displayName}
              </h1>
              <p className="mt-1 text-lg font-semibold text-slate-700">
                Estudante de Engenharia Informática | Backend Dev | Product
                Mindset
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Luanda, Angola
                </span>
                <span className="inline-flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  ISPTEC
                </span>
                <span className="inline-flex items-center gap-1 text-cyan-700">
                  <LinkIcon className="h-4 w-4" />
                  323 conexões
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800">
                Disponível para estágio
              </button>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                Mensagem
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Publicações</h2>
            <p className="mt-2 text-sm text-slate-600">
              Atualizações públicas do estudante para networking académico e
              visualização por empregadores.
            </p>
            <div className="mt-4 space-y-3">
              <article className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase text-cyan-700">
                  Conquista
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Finalizei um dashboard de análise de notas com NestJS e React
                  para apoio de decisão pedagógica.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase text-cyan-700">
                  Concurso
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Inscrito no concurso de inovação universitária 2026 com
                  proposta de matching inteligente entre talento e estágio.
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Sobre</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Construo soluções digitais com foco em impacto real para
              estudantes e empresas. Tenho interesse em engenharia de software,
              análise de dados e desenvolvimento de produtos com experiência do
              utilizador bem definida.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Experiência</h2>
            <div className="mt-4 space-y-4">
              {experienceList.map((exp) => (
                <article
                  key={exp.title}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                    <BriefcaseBusiness className="h-4 w-4" />
                    {exp.period}
                  </p>
                  <h3 className="mt-1 text-xl font-black text-slate-900">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-600">
                    {exp.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {exp.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">
              Projetos em destaque
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <article className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">
                  Projeto acadêmico
                </p>
                <h3 className="mt-2 text-lg font-black text-slate-900">
                  Plataforma UniBridge
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Solução para aproximar universidade e mercado com feed de
                  conquistas, estágios e recomendações.
                </p>
              </article>
              <article className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">
                  Projeto pessoal
                </p>
                <h3 className="mt-2 text-lg font-black text-slate-900">
                  Dashboard de Progresso
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Painel para acompanhar evolução de competências com
                  indicadores por semestre e metas de carreira.
                </p>
              </article>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <StudentProgressSection
            profileSlug={slug}
            profileRole={profileRole}
            studentId={profileId}
          />

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-900">Competências</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-900">Recomendações</h3>
            <article className="mt-3 rounded-xl bg-slate-50 p-3">
              <p className="inline-flex items-center gap-1 text-xs font-bold uppercase text-amber-600">
                <Star className="h-3.5 w-3.5" />
                Professor
              </p>
              <p className="mt-2 text-sm text-slate-700">
                &quot;Excelente capacidade de execução técnica e comunicação.
                Demonstra maturidade para ambientes profissionais.&quot;
              </p>
            </article>
            <article className="mt-3 rounded-xl bg-slate-50 p-3">
              <p className="inline-flex items-center gap-1 text-xs font-bold uppercase text-amber-600">
                <Sparkles className="h-3.5 w-3.5" />
                Empresa
              </p>
              <p className="mt-2 text-sm text-slate-700">
                &quot;Contribuiu com melhorias visíveis na interface e mostrou
                forte colaboração com a equipa.&quot;
              </p>
            </article>
          </section>
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
              A carregar perfil...
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
