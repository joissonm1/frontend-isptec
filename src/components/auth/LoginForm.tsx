"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600"
          placeholder="teuemail@universidade.ao"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Senha
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="w-full rounded-xl bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "A entrar..." : "Entrar"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Ainda não tens conta?{" "}
        <Link
          href="/registro"
          className="font-semibold text-cyan-700 hover:underline"
        >
          Criar agora
        </Link>
      </p>
    </form>
  );
}
