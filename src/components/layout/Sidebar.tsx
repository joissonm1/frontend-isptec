import Link from "next/link";
import {
  Bookmark,
  CircleUserRound,
  Compass,
  LayoutDashboard,
  Rocket,
  School,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/feed", label: "Feed", icon: Compass },
  { href: "/ofertas", label: "Ofertas", icon: Rocket },
  { href: "/candidaturas", label: "Candidaturas", icon: Bookmark },
  { href: "/perfil/joisson", label: "Meu perfil", icon: CircleUserRound },
  { href: "/como-funciona", label: "Como funciona", icon: School },
];

export function Sidebar() {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-slate-100">
      <div className="mb-6 text-3xl font-black tracking-tight text-cyan-300">
        42
      </div>
      <div className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
