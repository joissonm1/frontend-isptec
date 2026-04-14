"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ComposerCard } from "@/components/dashboard/ComposerCard";
import { PostCard } from "@/components/dashboard/PostCard";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { TrendsCard } from "@/components/dashboard/TrendsCard";
import { feedPosts } from "@/lib/mock-data";
import { api, apiMappers } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

export default function DashboardPage() {
  const [posts, setPosts] = useState(feedPosts);
  const [loading, setLoading] = useState(true);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await api.feed.me(session?.token ?? null);
        const data = Array.isArray(response.data)
          ? response.data
          : (response.data?.data ?? []);
        const normalized = data.map(apiMappers.normalizeFeedPost);
        if (isMounted) {
          setPosts(normalized.length ? normalized : feedPosts);
        }
      } catch (error) {
        if (isMounted) {
          setPosts(feedPosts);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [session?.token]);

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[260px_1fr]">
        <div className="space-y-4">
          <ProfileCard />
          <TrendsCard />
        </div>
        <div className="space-y-4">
          <ComposerCard />
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              A carregar o teu feed...
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </AppShell>
  );
}
