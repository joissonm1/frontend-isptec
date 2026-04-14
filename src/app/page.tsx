import Link from "next/link";
import { CTASection } from "@/components/landing/CTASection";
import { Hero } from "@/components/landing/Hero";
import { ImpactStats } from "@/components/landing/ImpactStats";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { ViabilitySection } from "@/components/landing/ViabilitySection";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-nav dark:bg-dark backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-foreground"
          >
            UniBridge
          </Link>
          <nav className="flex items-center gap-4 text-sm font-semibold text-muted">
            <Link href="/como-funciona" className="hover:text-(--color-interactive-2)">
              Como funciona
            </Link>
            <Link href="/impacto-social" className="hover:text-(--color-interactive-2)">
              Impacto
            </Link>
            <Link
              href="/login"
              className="ui-btn px-3 py-1.5 text-sm"
            >
              Entrar
            </Link>
            <Link
              href="/registro"
              className="ui-btn ui-btn-primary px-3 py-1.5 text-sm"
            >
              Registro
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <Hero />
        <ProblemSolution />
        <ImpactStats />
        <ViabilitySection />
        <CTASection />
      </main>
    </div>
  );
}