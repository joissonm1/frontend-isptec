"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ComposerCard } from "@/components/dashboard/ComposerCard";
import { PostCard } from "@/components/dashboard/PostCard";
import { feedPosts } from "@/lib/mock-data";

export default function FeedPage() {
  const [scope, setScope] = useState<"all" | "friends" | "suggested">("all");

  const visiblePosts = useMemo(() => {
    if (scope === "all") {
      return feedPosts;
    }
    return feedPosts.filter((post) => post.audience === scope);
  }, [scope]);

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h1 className="text-2xl font-black text-slate-900">Feed UniBridge</h1>
        <p className="mt-1 text-sm text-slate-600">
          Espaço profissional para alunos, universidades, professores e empresas
          partilharem progresso, notas e oportunidades.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
          <button
            onClick={() => setScope("all")}
            className={`rounded-full px-4 py-2 transition ${scope === "all" ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            Todos
          </button>
          <button
            onClick={() => setScope("friends")}
            className={`rounded-full px-4 py-2 transition ${scope === "friends" ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            Amigos
          </button>
          <button
            onClick={() => setScope("suggested")}
            className={`rounded-full px-4 py-2 transition ${scope === "suggested" ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            Sugestões
          </button>
        </div>
      </section>
      <ComposerCard />
      {visiblePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppShell>
  );
}
