"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ComposerCard } from "@/components/dashboard/ComposerCard";
import { PostCard } from "@/components/dashboard/PostCard";
import type { FeedPost } from "@/lib/mock-data";
import { api, apiMappers } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

export default function FeedPage() {
  const [scope, setScope] = useState<"all" | "friends" | "suggested">("all");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await api.feed.global(session?.token ?? null);
        const payload = response.data as any;
        const data = Array.isArray(payload) ? payload : (payload?.data ?? []);
        const normalized = data.map(apiMappers.normalizeFeedPost);
        if (isMounted) {
          setPosts(normalized);
        }
      } catch (error) {
        if (isMounted) {
          setPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();
    const handler = () => load();
    window.addEventListener("feed:refresh", handler);
    return () => {
      window.removeEventListener("feed:refresh", handler);
      isMounted = false;
    };
  }, [session?.token]);

  const visiblePosts = useMemo(() => {
    if (scope === "all") {
      return posts;
    }
    return posts.filter((post) => post.audience === scope);
  }, [scope, posts]);

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
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          A carregar feed...
        </div>
      ) : visiblePosts.length > 0 ? (
        visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Nenhuma publicacao encontrada.
        </div>
      )}
    </AppShell>
  );
}
