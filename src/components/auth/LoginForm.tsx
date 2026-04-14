"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthRole, useAuthStore } from "@/features/auth/store";
import { api, apiMappers } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginInput = z.infer<typeof loginSchema>;

// const roleLabel: Record<AuthRole, string> = {
//   student: "Estudante",
//   professor: "Professor",
//   company: "Empresa",
//   university: "Universidade",
// };

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const setToken = useAuthStore((state) => state.setToken);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const redirectByRole = (role: AuthRole) => {
    if (role === "company") {
      router.push("/empresa/dashboard");
      return;
    }
    if (role === "professor") {
      router.push("/professor/dashboard");
      return;
    }

    router.push("/feed");
  };

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await api.auth.login(data);
      const { session, token } = apiMappers.normalizeAuthSession(response.data);
      setSession(session);
      setToken(token ?? null);
      redirectByRole(session.role);
    } catch (error) {
      alert("Nao foi possivel autenticar. Verifica o servidor.");
    }
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

      {/*
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
          Contas demo
        </p>
        <div className="mt-2 grid gap-2 text-xs">
          {mockUsers.map((user) => (
            <div
              key={user.email}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700"
            >
              <p className="text-xs font-semibold text-slate-900">
                {user.name}
              </p>
              <p className="text-[11px] text-cyan-700">
                {roleLabel[user.role]}
              </p>
              <p className="mt-1 text-[11px] text-slate-600">
                Email: {user.email}
              </p>
              <p className="text-[11px] text-slate-600">
                Senha: {user.password}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setValue("email", user.email);
                    setValue("password", user.password);
                  }}
                  className="rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold hover:bg-slate-100"
                >
                  Preencher
                </button>
                <button
                  type="button"
                  onClick={() => loginAsMockUser(user)}
                  className="rounded-md bg-cyan-700 px-2 py-1 text-[11px] font-semibold text-white hover:bg-cyan-800"
                >
                  Entrar com este user
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      */}

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
