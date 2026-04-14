"use client";

import Image from "next/image";
import { useAuthStore } from "@/features/auth/store";
import { useProfileStore } from "@/features/profile/store";
import { getProfileVisual } from "@/lib/profile-visuals";

export function ProfileCard() {
  const session = useAuthStore((state) => state.session);
  const customProfile = useProfileStore(
    (state) => state.profiles[session?.profileSlug ?? ""],
  );
  const visual = getProfileVisual(
    session?.profileSlug,
    session?.role ?? "student",
  );

  const roleDescription =
    {
      student: "Estudante",
      professor: "Professor",
      company: "Empresa parceira",
      university: "Universidade",
    }[session?.role ?? "student"] || "Utilizador";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className="h-20 rounded-xl bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(8,145,178,0.45), rgba(15,23,42,0.4)), url('${customProfile?.coverUrl ?? visual.coverUrl}')`,
        }}
      />
      <div className="-mt-8 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-slate-300">
        <Image
          src={customProfile?.avatarUrl ?? visual.avatarUrl}
          alt={`Avatar de ${session?.name ?? "utilizador"}`}
          width={64}
          height={64}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="mt-3 text-xl font-semibold text-slate-900">
        {customProfile?.displayName ?? session?.name ?? "Utilizador"}
      </h2>
      <p className="text-sm text-slate-600">
        {customProfile?.headline ?? roleDescription}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="font-semibold text-cyan-700">99</p>
          <p className="text-slate-600">Visualizações</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="font-semibold text-cyan-700">1316</p>
          <p className="text-slate-600">Impressões</p>
        </div>
      </div>
    </section>
  );
}
