"use client";

import Image from "next/image";
import { useAuthStore } from "@/features/auth/store";
import { getProfileVisual } from "@/lib/profile-visuals";

export function ComposerCard() {
  const session = useAuthStore((state) => state.session);
  const visual = getProfileVisual(session?.profileSlug, session?.role);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
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
        <button className="w-full rounded-full border border-slate-300 px-4 py-2 text-left text-sm text-slate-500 transition hover:bg-slate-50">
          Publica teu progresso, notas, concursos ou conquistas
        </button>
      </div>
      <div className="mt-2 text-xs text-slate-500">
        Dica: podes publicar apenas texto ou texto com foto.
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-sm font-medium text-slate-600">
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Progresso
        </button>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Notas
        </button>
        <label className="cursor-pointer rounded-lg bg-slate-50 py-2 text-center transition hover:bg-slate-100">
          Foto
          <input type="file" accept="image/*" className="hidden" />
        </label>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Concurso
        </button>
      </div>
    </section>
  );
}
