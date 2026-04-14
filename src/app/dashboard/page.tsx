import { AppShell } from "@/components/layout/AppShell";
import { ComposerCard } from "@/components/dashboard/ComposerCard";
import { PostCard } from "@/components/dashboard/PostCard";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { TrendsCard } from "@/components/dashboard/TrendsCard";
import { feedPosts } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[260px_1fr]">
        <div className="space-y-4">
          <ProfileCard />
          <TrendsCard />
        </div>
        <div className="space-y-4">
          <ComposerCard />
          {feedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
