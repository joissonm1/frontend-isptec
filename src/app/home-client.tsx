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
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";
import Image from "next/image";

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

        <section className="ui-card rounded-3xl p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-xl font-black text-foreground">Features das nossas plataformas</h3>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Um ecossistema para estudantes, professores e empresas colaborarem: vagas, recomendações,
                progressos e dashboards.
              </p>
            </div>

            <CircularRevealHeading
              size="md"
              className="mx-auto"
              centerText={
                <div className="text-center">
                  <div className="text-sm font-semibold text-muted">UniBridge</div>
                  <div className="mt-1 text-lg font-black text-foreground">Tudo num só lugar</div>
                  <div className="mt-1 text-xs text-muted">Passe o mouse nas features</div>
                </div>
              }
              items={[
                {
                  text: "Vagas e estágios",
                  image:
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
                },
                {
                  text: "Candidaturas",
                  image:
                    "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80",
                },
                {
                  text: "Perfis evolutivos",
                  image:
                    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
                },
                {
                  text: "Recomendações",
                  image:
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
                },
                {
                  text: "Dashboards",
                  image:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                },
                {
                  text: "Match inteligente",
                  image:
                    "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=800&q=80",
                },
                {
                  text: "Feed de progresso",
                  image:
                    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
                },
                {
                  text: "Mensagens",
                  image:
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
                },
              ]}
            />
          </div>
        </section>

        <ProblemSolution />
        <ImpactStats />
        <TeamSocialImpact />
        <ViabilitySection />
        <CTASection />
        <Footer />
        <section className="flex items-center justify-center">
          <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-xs text-slate-500 shadow-sm">
            <div className="text-right">
              <p className="font-semibold text-slate-600">Acede rapido</p>
              <p>Le o QR para conhecer a plataforma.</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3">
              <Image
                src="/unibridge_qr_centro.png"
                alt="QR code UniBridge"
                width={176}
                height={176}
                className="h-36 w-36 object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
