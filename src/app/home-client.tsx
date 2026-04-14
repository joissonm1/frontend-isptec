"use client";

import Link from "next/link";
import { CTASection } from "@/components/landing/CTASection";
import { ImpactStats } from "@/components/landing/ImpactStats";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { TeamSocialImpact } from "@/components/landing/TeamSocialImpact";
import { ViabilitySection } from "@/components/landing/ViabilitySection";
import { Footer } from "@/components/landing/Footer";
import { Boxes } from "@/components/ui/background-boxes";
import { HeroSection } from "@/components/ui/hero-section-1";

export function HomeClient() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-2xl font-black tracking-tight text-cyan-700">
            UniBridge
          </Link>
          <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/como-funciona" className="hover:text-cyan-700">
              Como funciona
            </Link>
            <Link href="/impacto-social" className="hover:text-cyan-700">
              Impacto
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-50"
            >
              Entrar
            </Link>
            <Link
              href="/registro"
              className="rounded-lg bg-cyan-700 px-3 py-1.5 text-white hover:bg-cyan-800"
            >
              Registro
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <HeroSection />

        <section className="ui-card relative overflow-hidden rounded-3xl p-6">
          <div className="pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(transparent,white)]" />
          <Boxes className="opacity-55" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-foreground">Experiência moderna e interativa</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Uma UI com micro-interações, paleta consistente e neumorfismo subtil.
            </p>
          </div>
        </section>

        <ProblemSolution />
        <ImpactStats />
        <TeamSocialImpact />
        <ViabilitySection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
