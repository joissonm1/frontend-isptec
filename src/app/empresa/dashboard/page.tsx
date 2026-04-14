import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/dashboard/PostCard";
import { feedPosts, suggestedStudentProfiles } from "@/lib/mock-data";

export default function EmpresaDashboardPage() {
  const studentFeed = feedPosts.filter((post) => post.authorType === "student");

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Perfil da Empresa
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Área principal da empresa com feed de talentos, sugestões de perfis e
          publicação de vagas.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/empresa/dashboard"
            className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-bold text-white"
          >
            Feed
          </Link>
          <Link
            href="/empresa/perfis"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Perfis sugeridos
          </Link>
          <Link
            href="/empresa/ofertas/nova"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Publicar vaga
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">
            Feed de estudantes
          </h2>
          <Link
            href="/empresa/perfis"
            className="text-sm font-bold text-cyan-700 hover:underline"
          >
            Ver todos os perfis
          </Link>
        </div>
        <div className="space-y-4">
          {studentFeed.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-black text-slate-900">
          Talentos em destaque
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {suggestedStudentProfiles.slice(0, 2).map((student) => (
            <article
              key={student.slug}
              className="rounded-xl border border-slate-200 p-4"
            >
              <h3 className="font-bold text-slate-900">{student.name}</h3>
              <p className="text-sm text-slate-600">{student.course}</p>
              <Link
                href={`/perfil/${student.slug}`}
                className="mt-2 inline-block text-sm font-semibold text-cyan-700 hover:underline"
              >
                Ver perfil e progresso
              </Link>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
