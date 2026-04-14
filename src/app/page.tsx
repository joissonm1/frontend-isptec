import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/landing/CTASection";
import { Hero } from "@/components/landing/Hero";
import { ImpactStats } from "@/components/landing/ImpactStats";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { TeamSocialImpact } from "@/components/landing/TeamSocialImpact";
import { ViabilitySection } from "@/components/landing/ViabilitySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-cyan-700"
          >
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
        <Hero />
        <ProblemSolution />
        <ImpactStats />
        <TeamSocialImpact />
        <ViabilitySection />
        <CTASection />
        <section className="flex items-center justify-center">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-xs text-slate-500 shadow-sm">
            <div className="text-right">
              <p className="font-semibold text-slate-600">Acede rapido</p>
              <p>Le o QR para conhecer a plataforma.</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
              <Image
                src="/unibridge_qr_centro.png"
                alt="QR code UniBridge"
                width={120}
                height={120}
                className="h-24 w-24 object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
