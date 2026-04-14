"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { AppShell } from "@/components/layout/AppShell";
import { StudentProgressSection } from "@/components/profile/StudentProgressSection";
import { mockUsers, type AuthRole, useAuthStore } from "@/features/auth/store";
import {
  type EditableProfile,
  useProfileStore,
} from "@/features/profile/store";
import { getProfileVisual } from "@/lib/profile-visuals";

type ProfilePageClientProps = {
  slug: string;
};

const experiences = [
  {
    title: "Frontend Intern",
    company: "BlueOrbit Labs",
    period: "2025 - Atual",
    description:
      "Desenvolvimento de interfaces em Next.js e Tailwind, melhoria de performance e colaboração com equipa de produto.",
  },
  {
    title: "Monitor Académico",
    company: "ISPTEC",
    period: "2024 - 2025",
    description:
      "Apoio em disciplinas de programação e orientação prática para projetos de estudantes iniciantes.",
  },
];

const defaultAbout =
  "Construo soluções digitais com foco em impacto real para estudantes e empresas. Tenho interesse em engenharia de software, análise de dados e desenvolvimento de produtos com experiência do utilizador bem definida.";

const roleHeadline: Record<AuthRole, string> = {
  student: "Estudante",
  professor: "Professor",
  company: "Empresa parceira",
  university: "Universidade parceira",
};

function displayNameFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function defaultInstitution(role: AuthRole) {
  if (role === "university") return "ISPTEC";
  if (role === "company") return "Enapp";
  return "ISPTEC";
}

function defaultSkills(role: AuthRole) {
  if (role === "company") {
    return ["Recrutamento", "Employer Branding", "Gestão de Talento"];
  }
  if (role === "professor") {
    return ["Mentoria", "Didática", "Engenharia de Software"];
  }
  if (role === "university") {
    return ["Parcerias", "Inovação", "Gestão Académica"];
  }
  return ["React", "Next.js", "TypeScript", "NestJS", "SQL", "Comunicação"];
}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Falha ao carregar imagem"));
    reader.readAsDataURL(file);
  });
}

export function ProfilePageClient({ slug }: ProfilePageClientProps) {
  const session = useAuthStore((state) => state.session);
  const savedProfile = useProfileStore((state) => state.profiles[slug]);
  const upsertProfile = useProfileStore((state) => state.upsertProfile);

  const matchedUser = useMemo(
    () => mockUsers.find((user) => user.profileSlug === slug),
    [slug],
  );

  const role = matchedUser?.role ?? "student";
  const visual = getProfileVisual(slug, role);

  const defaultProfile = useMemo<EditableProfile>(
    () => ({
      displayName: visual.displayName ?? displayNameFromSlug(slug),
      headline: visual.headline || roleHeadline[role],
      about: defaultAbout,
      location: "Luanda, Angola",
      institution: defaultInstitution(role),
      skills: defaultSkills(role),
      avatarUrl: visual.avatarUrl,
      coverUrl: visual.coverUrl,
    }),
    [slug, visual, role],
  );

  const profile = savedProfile ?? defaultProfile;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditableProfile>(profile);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const canEdit = session?.profileSlug === slug;

  const saveChanges = () => {
    const normalizedSkills = draft.skills
      .map((skill) => skill.trim())
      .filter(Boolean);

    upsertProfile(slug, {
      ...draft,
      skills: normalizedSkills,
    });
    setIsEditing(false);
  };

  const resetToDefault = () => {
    setDraft(defaultProfile);
  };

  const onAvatarChange = async (file?: File) => {
    if (!file) return;
    const dataUrl = await readAsDataUrl(file);
    setDraft((prev) => ({ ...prev, avatarUrl: dataUrl }));
  };

  const onCoverChange = async (file?: File) => {
    if (!file) return;
    const dataUrl = await readAsDataUrl(file);
    setDraft((prev) => ({ ...prev, coverUrl: dataUrl }));
  };

  return (
    <AppShell>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div
          className="h-56 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(8,145,178,0.62), rgba(15,23,42,0.62)), url('${profile.coverUrl}')`,
          }}
        />
        <div className="px-6 pb-6">
          <div className="-mt-16 h-32 w-32 overflow-hidden rounded-3xl border-4 border-white bg-slate-100">
            <Image
              src={profile.avatarUrl}
              alt={`Foto de perfil de ${profile.displayName}`}
              width={128}
              height={128}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-900">
                {profile.displayName}
              </h1>
              <p className="mt-1 text-lg font-semibold text-slate-700">
                {profile.headline}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {profile.institution}
                </span>
                <span className="inline-flex items-center gap-1 text-cyan-700">
                  <LinkIcon className="h-4 w-4" />
                  323 conexões
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {canEdit ? (
                <button
                  type="button"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800"
                >
                  {isEditing ? "Fechar edição" : "Editar perfil"}
                </button>
              ) : (
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  Mensagem
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {canEdit && isEditing && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black text-slate-900">Editar perfil</h2>
          <p className="mt-1 text-sm text-slate-600">
            As alterações ficam guardadas localmente no teu navegador.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">
              Nome
              <input
                value={draft.displayName}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    displayName: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Headline
              <input
                value={draft.headline}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    headline: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Localização
              <input
                value={draft.location}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Instituição/Empresa
              <input
                value={draft.institution}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    institution: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Competências (separa por vírgula)
              <textarea
                value={draft.skills.join(", ")}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    skills: event.target.value.split(","),
                  }))
                }
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Sobre
              <textarea
                value={draft.about}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, about: event.target.value }))
                }
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Foto de perfil
              <input
                type="file"
                accept="image/*"
                onChange={(event) => onAvatarChange(event.target.files?.[0])}
                className="mt-1 block w-full text-xs"
              />
            </label>
            <label className="text-sm text-slate-700">
              Foto de capa
              <input
                type="file"
                accept="image/*"
                onChange={(event) => onCoverChange(event.target.files?.[0])}
                className="mt-1 block w-full text-xs"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={saveChanges}
              className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800"
            >
              Guardar alterações
            </button>
            <button
              type="button"
              onClick={resetToDefault}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Repor padrão
            </button>
          </div>
        </section>
      )}

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Publicações</h2>
            <p className="mt-2 text-sm text-slate-600">
              Atualizações públicas do perfil para networking académico e
              visualização por recrutadores e parceiros.
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
              {profile.about}
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-900">Experiência</h2>
            <div className="mt-4 space-y-4">
              {experiences.map((exp) => (
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
        </div>

        <div className="space-y-4">
          <StudentProgressSection profileSlug={slug} />

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-900">Competências</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
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
        </div>
      </div>
    </AppShell>
  );
}
