import Link from "next/link";

const links = {
  produto: [
    { href: "/como-funciona", label: "Como funciona" },
    { href: "/ofertas", label: "Oportunidades" },
    { href: "/impacto-social", label: "Impacto" },
  ],
  conta: [
    { href: "/login", label: "Entrar" },
    { href: "/registro", label: "Criar conta" },
  ],
  legal: [
    { href: "#", label: "Termos" },
    { href: "#", label: "Privacidade" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="ui-card grid gap-8 rounded-3xl p-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="text-2xl font-black tracking-tight text-primary">
              UniBridge
            </Link>
            <p className="text-sm text-muted">
              Conectamos estudantes, professores e empresas a oportunidades reais.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Produto</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {links.produto.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Conta</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {links.conta.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {links.legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-primary hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {year} UniBridge. Todos os direitos reservados.</p>
          <p>
            Feito com foco em empregabilidade, estágios e impacto académico.
          </p>
        </div>
      </div>
    </footer>
  );
}
