"use client";

import Image from "next/image";
import { useState } from "react";
import { FeedPost } from "@/lib/mock-data";
import { api } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

type PostCardProps = {
  post: FeedPost;
};

export function PostCard({ post }: PostCardProps) {
  const session = useAuthStore((state) => state.session);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const roleLabel = {
    student: "Aluno",
    professor: "Professor",
    company: "Empresa",
    university: "Universidade",
  }[post.authorType];

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
        <span>{comments} comentários</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm font-semibold text-slate-600">
        <button
          className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100"
          onClick={async () => {
            if (!session?.token) {
              alert("Faz login para curtir.");
              return;
            }
            try {
              await api.feed.likePost(post.id, session.token);
              setLikes((prev) => prev + 1);
            } catch (error) {
              alert("Nao foi possivel curtir agora.");
            }
          }}
        >
          Curtir
        </button>
        <button
          className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100"
          onClick={() => setShowComment((prev) => !prev)}
        >
          Comentar
        </button>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Partilhar
        </button>
      </div>
      {showComment && (
        <form
          className="mt-3 flex gap-2"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!comment.trim()) return;
            if (!session?.token) {
              alert("Faz login para comentar.");
              return;
            }
            setSubmitting(true);
            try {
              await api.feed.addComment(
                post.id,
                { content: comment.trim() },
                session.token,
              );
              setComment("");
              setComments((prev) => prev + 1);
            } catch (error) {
              alert("Nao foi possivel comentar agora.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-600"
            placeholder="Escreve um comentário..."
          />
          <button
            disabled={submitting}
            className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "A enviar..." : "Enviar"}
          </button>
        </form>
      )}
    </article>
  );
}
