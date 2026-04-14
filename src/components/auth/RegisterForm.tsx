"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, apiMappers } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

const registerSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  role: z.enum(["student", "professor", "company", "university"]),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  terms: z.boolean().refine((value) => value, "Aceita os termos"),
});

type RegisterInput = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const setSession = useAuthStore((state) => state.setSession);
  const setToken = useAuthStore((state) => state.setToken);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    const payload = {
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
    };

    const response = await api.auth.register(payload);
    const { session, token } = apiMappers.normalizeAuthSession(response.data);
    setSession(session);
    setToken(token ?? null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Nome
        </label>
        <input
          {...register("name")}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600"
          placeholder="Nome completo"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600"
          placeholder="email@dominio.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Tipo de conta
        </label>
        <select
          {...register("role")}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600"
          defaultValue="student"
        >
          <option value="student">Estudante</option>
          <option value="professor">Professor</option>
          <option value="company">Empresa</option>
          <option value="university">Universidade</option>
        </select>
      </div>

      <div className="rounded-xl bg-cyan-50 p-3 text-xs text-cyan-800">
        Estudante publica progresso e competências; professor recomenda; empresa
        publica vagas; universidade gere comunidade académica.
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

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" {...register("terms")} />
        Aceito os termos de uso
      </label>
      {errors.terms && (
        <p className="text-xs text-red-600">{errors.terms.message}</p>
      )}

      <button
        disabled={isSubmitting}
        className="w-full rounded-xl bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "A criar..." : "Criar conta"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Já tens conta?{" "}
        <Link
          href="/login"
          className="font-semibold text-cyan-700 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
