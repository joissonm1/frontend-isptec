"use client";

import { useState } from "react";
import Image from "next/image";
import { FeedPost } from "@/lib/mock-data";
import { useAuthStore } from "@/features/auth/store";

type PostCardProps = {
  post: FeedPost;
};

export function PostCard({ post }: PostCardProps) {
  const session = useAuthStore((state) => state.session);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.commentsList);
  const [commentOpen, setCommentOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const roleLabel = {
    student: "Aluno",
    professor: "Professor",
    company: "Empresa",
    university: "Universidade",
  }[post.authorType];

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleAddComment = () => {
    const message = draft.trim();
    if (!message) {
      return;
    }

    const nextComment = {
      id: `${post.id}-${Date.now()}`,
      author: session?.name ?? "Tu",
      time: "agora",
      message,
    };

    setComments((prev) => [nextComment, ...prev]);
    setDraft("");
    setCommentOpen(true);
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{post.author}</h3>
          <p className="text-xs text-slate-500">
            {post.role} • {post.time}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">
            {roleLabel}
          </span>
          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700">
            {post.category}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        {post.content}
      </p>
      {post.imageUrl && (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt ?? "Imagem da publicação"}
            width={1200}
            height={600}
            unoptimized
            className="h-64 w-full object-cover"
          />
        </div>
      )}
      <div className="mt-4 flex gap-2 text-xs text-slate-500">
        <span>{likes} gostos</span>
        <span>•</span>
        <span>{comments.length} comentarios</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm font-semibold text-slate-600">
        <button
          onClick={handleToggleLike}
          className={`rounded-lg py-2 transition ${liked ? "bg-cyan-100 text-cyan-800" : "bg-slate-50 hover:bg-slate-100"}`}
        >
          {liked ? "Curtido" : "Curtir"}
        </button>
        <button
          onClick={() => setCommentOpen((prev) => !prev)}
          className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100"
        >
          Comentar
        </button>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Partilhar
        </button>
      </div>

      {commentOpen && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Escreve um comentario..."
              className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-cyan-600"
            />
            <button
              onClick={handleAddComment}
              className="h-10 rounded-xl bg-cyan-700 px-4 text-xs font-bold text-white transition hover:bg-cyan-800"
            >
              Publicar
            </button>
          </div>
          <div className="space-y-2">
            {comments.slice(0, 3).map((comment) => (
              <div
                key={comment.id}
                className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">
                    {comment.author}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {comment.time}
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-slate-600">
                  {comment.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
