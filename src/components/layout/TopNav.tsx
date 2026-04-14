import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  House,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Início", icon: House },
  { href: "/feed", label: "Rede", icon: Users },
  { href: "/ofertas", label: "Vagas", icon: BriefcaseBusiness },
  { href: "/candidaturas", label: "Mensagens", icon: MessageCircle },
  { href: "/impacto-social", label: "Impacto", icon: Bell },
];

export function TopNav() {
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
        </nav>
      </div>
    </header>
  );
}
