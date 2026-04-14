"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound, House, MessageCircle, Search } from "lucide-react";
import { useAuthStore } from "@/features/auth/store";
import { api } from "@/lib/api";

export function TopNav() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);

  const profileHref = session ? `/perfil/${session.profileSlug}` : "/login";

  const roleLabel =
    {
      student: "Aluno",
      professor: "Professor",
      company: "Empresa",
      university: "Universidade",
    }[session?.role ?? "student"] || "Convidado";

  const items = [
    { href: "/dashboard", label: "Início", icon: House },
    { href: "/candidaturas", label: "Mensagens", icon: MessageCircle },
    { href: profileHref, label: "Meu perfil", icon: CircleUserRound },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-cyan-700"
        >
          UniBridge
        </Link>
        <div className="hidden flex-1 items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Pesquisar pessoas, empresas e vagas"
          />
        </div>
        <nav className="ml-auto hidden items-center gap-4 md:flex">
          {session && (
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700">
              {roleLabel}
            </span>
          )}
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-cyan-700"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          {session ? (
            <button
              type="button"
              onClick={() => {
                api.auth.logout(session?.token ?? null).catch(() => null);
                logout();
                router.push("/login");
              }}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
