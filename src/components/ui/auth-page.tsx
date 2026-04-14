"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  AppleIcon,
  AtSignIcon,
  ChevronLeftIcon,
  Grid2x2PlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthPage() {
  const router = useRouter();

  return (
    <main className="relative lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden h-full flex-col border-r border-border/60 bg-muted/40 p-10 lg:flex">
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
  <div className="from-background absolute inset-0 z-10 bg-linear-to-t to-transparent" />
        <div className="z-10 mt-auto">
          <blockquote className="ui-card space-y-2 rounded-3xl p-6">
            <p className="text-lg leading-relaxed text-foreground">
              “Liga-te a oportunidades reais e acompanha o teu progresso num só lugar.”
            </p>
            <footer className="text-sm font-semibold text-muted">
              ~ Plataforma de Estágios
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative flex min-h-[calc(100vh-64px)] flex-col justify-center p-4">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -right-24 top-0 h-96 w-72 -translate-y-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_srgb,var(--color-interactive-2)_18%,transparent),transparent_65%)]" />
          <div className="absolute -right-16 top-16 h-96 w-56 -translate-y-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_srgb,var(--color-text)_10%,transparent),transparent_70%)]" />
        </div>

        <Button
          variant="ghost"
          className="absolute left-4 top-4 h-9 w-9 rounded-full border border-border/70"
          onClick={() => router.back()}
          aria-label="Voltar"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <div className="mx-auto w-full max-w-sm space-y-4">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="ui-card grid size-10 place-items-center rounded-2xl">
              <Grid2x2PlusIcon className="size-5" />
            </div>
            <p className="text-xl font-black tracking-wide">ISPTEC</p>
          </div>

          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-black tracking-wide">Entrar ou criar conta</h1>
            <p className="text-base text-muted">Continua com um provedor ou com o teu email.</p>
          </div>

          <div className="space-y-2">
            <Button type="button" size="lg" className="w-full">
              <GoogleIcon className="me-2 size-4" />
              Continuar com a Google
            </Button>
            <Button type="button" size="lg" className="w-full" variant="secondary">
              <LinkedInIcon className="me-2 size-4" />
              Continuar com o LinkedIn
            </Button>
            <Button type="button" size="lg" className="w-full" variant="outline">
              <GitHubIcon className="me-2 size-5" />
              Continuar com o GitHub
            </Button>
          </div>

          <AuthSeparator />

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <p className="text-start text-xs text-muted">
              Insere o teu email para entrar ou criar uma conta.
            </p>

            <div className="relative">
              <Input placeholder="teu.email@exemplo.com" className="peer ps-12" type="email" />
              <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center justify-center ps-4 text-muted peer-disabled:opacity-50">
                <AtSignIcon className="size-4" aria-hidden="true" />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Continuar com Email
            </Button>
          </form>

          <p className="mt-8 text-sm text-muted">
            Ao continuar, concordas com os nossos{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Termos
            </a>{" "}
            e{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            className={position > 0 ? "text-cyan-300/70" : "text-cyan-200/40"}
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.55, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Official Google "G" mark (multicolor)
const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.18 1.53 7.6 2.8l5.2-5.2C33.7 4.2 29.4 2 24 2 14.8 2 6.8 7.3 3 15l6.5 5C11.1 13.5 17 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24.5c0-1.6-.14-2.8-.44-4.1H24v7.8h12.7c-.26 2-1.65 5.07-4.71 7.1l7.2 5.6c4.3-4 7.31-9.9 7.31-14.4z"
    />
    <path
      fill="#FBBC05"
      d="M9.5 28.6A14.6 14.6 0 0 1 8.7 24c0-1.6.27-3.1.7-4.6L2.9 14.4A23.9 23.9 0 0 0 0 24c0 3.9.95 7.6 2.9 10.6l6.6-6z"
    />
    <path
      fill="#34A853"
      d="M24 46c6.5 0 12-2.1 16-5.7l-7.2-5.6c-1.93 1.35-4.5 2.3-8.8 2.3-7 0-12.9-4-15-10.2l-6.5 5C6.8 40.7 14.8 46 24 46z"
    />
  </svg>
);

const AuthSeparator = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="h-px w-full bg-border" />
      <span className="px-2 text-xs text-muted">OU</span>
      <div className="h-px w-full bg-border" />
    </div>
  );
};

// Official LinkedIn logo (monochrome)
const LinkedInIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.554v-5.57c0-1.329-.027-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.94v5.669H9.354V9h3.414v1.561h.048c.476-.9 1.636-1.85 3.368-1.85 3.6 0 4.266 2.37 4.266 5.455v6.284zM5.337 7.433a2.066 2.066 0 1 1 0-4.132 2.066 2.066 0 0 1 0 4.132zM7.114 20.45H3.56V9h3.554v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
);

// Official GitHub mark (monochrome)
const GitHubIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 .5C5.73.5.75 5.61.75 12.09c0 5.19 3.16 9.59 7.55 11.14.55.1.75-.25.75-.55v-2.02c-3.07.68-3.72-1.52-3.72-1.52-.5-1.33-1.24-1.68-1.24-1.68-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.2 1.71 1.2 1 .1 1.53-1.01 1.53-1.01.76-1.34 2-1.9 3.31-1.98-2.45-.29-5.03-1.27-5.03-5.66 0-1.25.43-2.27 1.14-3.07-.11-.29-.49-1.47.11-3.06 0 0 .94-.31 3.08 1.17a10.3 10.3 0 0 1 2.8-.39c.95 0 1.9.13 2.8.39 2.14-1.48 3.08-1.17 3.08-1.17.6 1.59.22 2.77.11 3.06.71.8 1.14 1.82 1.14 3.07 0 4.4-2.58 5.37-5.04 5.65 1.59.73 1.59 2.05 1.59 3.23v3.16c0 .3.2.66.76.55 4.39-1.55 7.55-5.95 7.55-11.14C23.25 5.61 18.27.5 12 .5Z"
      clipRule="evenodd"
    />
  </svg>
);
