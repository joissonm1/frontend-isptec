"use client";

import {
  BookMarked,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  Library,
  Presentation,
  Rocket,
  Users,
  Settings,
} from "lucide-react";
import {
  MenuItem,
  SidebarWithSubmenu,
} from "@/components/ui/sidebar-with-submenu";
import { useAuthStore } from "@/features/auth/store";

const footerLinks: MenuItem[] = [
  {
    href: "/como-funciona",
    name: "Ajuda",
    icon: <CircleHelp className="h-4 w-4" />,
  },
  {
    href: "/dashboard",
    name: "Definições",
    icon: <Settings className="h-4 w-4" />,
  },
];

export function Sidebar() {
  const session = useAuthStore((state) => state.session);

  const baseLinks: MenuItem[] = [
    {
      href: "/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/ofertas",
      name: "Vagas",
      icon: <Rocket className="h-4 w-4" />,
      children: [
        { href: "/ofertas", name: "Todas" },
        { href: "/empresa/ofertas", name: "Empresa" },
        { href: "/empresa/ofertas/nova", name: "Nova vaga" },
      ],
    },
    {
      href: "/candidaturas",
      name: "Candidaturas",
      icon: <BookMarked className="h-4 w-4" />,
    },
  ];

  const companyExtraLinks: MenuItem[] =
    session?.role === "company"
      ? [
          {
            href: "/empresa/perfis",
            name: "Talentos",
            icon: <Users className="h-4 w-4" />,
          },
        ]
      : [];

  const professorExtraLinks: MenuItem[] =
    session?.role === "professor"
      ? [
          {
            href: "/professor/recomendacoes",
            name: "Recomendar",
            icon: <Users className="h-4 w-4" />,
          },
          {
            href: "/professor/estudantes",
            name: "Estudantes",
            icon: <GraduationCap className="h-4 w-4" />,
          },
        ]
      : [];

  const roleLinks: Record<string, MenuItem> = {
    student: {
      href: "/feed",
      name: "Aluno",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    professor: {
      href: "/professor/dashboard",
      name: "Professor",
      icon: <Presentation className="h-4 w-4" />,
    },
    company: {
      href: "/empresa/dashboard",
      name: "Empresa",
      icon: <Rocket className="h-4 w-4" />,
    },
    university: {
      href: "/dashboard",
      name: "Universidade",
      icon: <Library className="h-4 w-4" />,
    },
  };

  const links = session
    ? [
        roleLinks[session.role],
        ...companyExtraLinks,
        ...professorExtraLinks,
        ...baseLinks,
      ]
    : baseLinks;

  return <SidebarWithSubmenu items={links} footerItems={footerLinks} compact />;
}
