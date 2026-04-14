import { AppShell } from "@/components/layout/AppShell";
import { ComposerCard } from "@/components/dashboard/ComposerCard";
import { PostCard } from "@/components/dashboard/PostCard";
import { feedPosts } from "@/lib/mock-data";

export default function FeedPage() {
  return (
    <AppShell>
      <ComposerCard />
      {feedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppShell>
  );
}
