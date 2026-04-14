import { FeedPost } from "@/lib/mock-data";

type PostCardProps = {
  post: FeedPost;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">{post.author}</h3>
          <p className="text-xs text-slate-500">
            {post.role} • {post.time}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        {post.content}
      </p>
      <div className="mt-4 flex gap-2 text-xs text-slate-500">
        <span>{post.likes} gostos</span>
        <span>•</span>
        <span>{post.comments} comentários</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm font-semibold text-slate-600">
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Curtir
        </button>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Comentar
        </button>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Partilhar
        </button>
      </div>
    </article>
  );
}
