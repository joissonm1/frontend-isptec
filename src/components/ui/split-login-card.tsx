"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SplitLoginCard() {
  return (
  <div className="ui-card mx-auto flex w-full max-w-4xl flex-col overflow-hidden border md:min-h-150 md:flex-row">
      {/* Left Side: Welcome + Illustration */}
  <div className="flex flex-col items-center justify-center bg-primary p-16 text-white md:w-1/2">
        <h2 className="text-3xl font-black">Bem-vindo de volta!</h2>
        <p className="mt-3 max-w-sm text-center text-white/90">
          Entra para aceder ao teu dashboard e acompanhar oportunidades em tempo real.
        </p>

        <div className="mt-6 grid place-items-center rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=240&q=80"
            alt="Ilustração de login"
            className="h-24 w-24 rounded-xl object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col justify-center p-10 md:w-1/2">
        <h3 className="text-2xl font-black text-foreground">Entrar</h3>
        <p className="mt-2 text-sm text-muted">
          Usa as tuas credenciais para continuar.
        </p>

        <form className="mt-8 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Palavra-passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              className="mt-1"
            />
          </div>

          <Button className="mt-2 w-full" type="submit">
            Entrar
          </Button>

          <p className="pt-2 text-center text-sm text-muted">
            Ainda não tens conta?{" "}
            <a href="/registro" className="font-semibold text-primary hover:underline">
              Criar conta
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
