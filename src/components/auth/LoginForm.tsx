"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockUsers, useAuthStore } from "@/features/auth/store";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const found = mockUsers.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password,
    );

    if (!found) {
      alert("Credenciais inválidas. Usa uma conta demo abaixo.");
      return;
    }

    setSession(found);

    if (found.role === "company") {
      router.push("/empresa/dashboard");
      return;
    }
    if (found.role === "professor") {
      router.push("/professor/dashboard");
      return;
    }

    router.push("/feed");
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

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
          Contas demo
        </p>
        <div className="mt-2 grid gap-2 text-xs">
          {mockUsers.map((user) => (
            <button
              key={user.email}
              type="button"
              onClick={() => {
                setValue("email", user.email);
                setValue("password", user.password);
              }}
              className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-left text-slate-700 hover:bg-slate-100"
            >
              <span className="font-semibold">{user.role}</span> - {user.email}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          Senha para todas: 123456
        </p>
      </div>

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
