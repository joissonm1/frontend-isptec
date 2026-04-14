"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { getProfileVisual } from "@/lib/profile-visuals";
import { useAuthStore } from "@/features/auth/store";

export function ComposerCard() {
  const session = useAuthStore((state) => state.session);
  const safeRole =
    session?.role === "student" ||
    session?.role === "professor" ||
    session?.role === "company" ||
    session?.role === "university"
      ? session.role
      : "student";
  const visual =
    getProfileVisual(session?.profileSlug, safeRole) ??
    getProfileVisual(undefined, "student");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!content.trim()) {
      alert("Escreve algo para publicar.");
      return;
    }

    setSubmitting(true);
    try {
      await api.feed.createPost(
        {
          content: content.trim(),
          mediaUrl: mediaUrl.trim() || undefined,
          visibility,
        },
        session?.token ?? null,
      );
      setContent("");
      setMediaUrl("");
      setVisibility("PUBLIC");
      window.dispatchEvent(new CustomEvent("feed:refresh"));
    } catch (error) {
      alert("Nao foi possivel publicar agora.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <form className="space-y-3" onSubmit={submit}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            <Image
              src={visual.avatarUrl}
              alt={`Avatar de ${session?.name ?? "utilizador"}`}
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-cyan-600"
            placeholder="Publica teu progresso, notas, concursos ou conquistas"
            rows={2}
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-[1fr_140px_120px]">
          <input
            value={mediaUrl}
            onChange={(event) => setMediaUrl(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="URL da imagem (opcional)"
          />
          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
          <button
            disabled={submitting}
            className="rounded-lg bg-cyan-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "A publicar..." : "Publicar"}
          </button>
        </div>
      </form>
      <div className="mt-2 text-xs text-slate-500">
        Dica: podes publicar apenas texto ou texto com foto.
      </div>
    </section>
  );
}
