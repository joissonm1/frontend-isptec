"use client";

import Link from "next/link";
import Image from "next/image";
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

const roleLabel: Record<(typeof mockUsers)[number]["role"], string> = {
  student: "Estudante",
  professor: "Professor",
  company: "Empresa",
  university: "Universidade",
};

export default function SplitLoginCard() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const redirectByRole = (role: (typeof mockUsers)[number]["role"]) => {
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

  const loginAsUser = (user: (typeof mockUsers)[number]) => {
    setSession(user);
    redirectByRole(user.role);
  };

  const onSubmit = async (data: LoginInput) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const found = mockUsers.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password,
    );

    if (!found) {
      alert("Credenciais inválidas. Usa uma conta de teste abaixo.");
      return;
    }

    loginAsUser(found);
  };

  return (
    <div className="ui-card mx-auto flex w-full max-w-4xl flex-col overflow-hidden border md:min-h-[640px] md:flex-row">
      {/* Left Side: Welcome + Illustration */}
      <div className="flex flex-col items-center justify-center bg-primary p-16 text-white md:w-1/2">
        <h2 className="text-3xl font-black">Bem-vindo de volta!</h2>
        <p className="mt-3 max-w-sm text-center text-white/90">
          Entra para aceder ao teu dashboard e acompanhar oportunidades em tempo
          real.
        </p>

        <div className="mt-6 grid place-items-center rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
          <Image
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=240&q=80"
            alt="Ilustração de login"
            width={96}
            height={96}
            unoptimized
            className="h-24 w-24 rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col justify-center p-10 md:w-1/2">
        <h3 className="text-2xl font-black text-foreground">Entrar</h3>
        <p className="mt-2 text-sm text-muted">
          Usa as tuas credenciais para continuar.
        </p>

        <form
          className="mt-8 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-700"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-semibold text-slate-700"
            >
              Palavra-passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              {...register("password")}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-700"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className="mt-2 w-full rounded-xl bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "A entrar..." : "Entrar"}
          </button>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Contas de teste
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {mockUsers.map((user) => (
                <button
                  key={user.email}
                  type="button"
                  onClick={() => loginAsUser(user)}
                  className="rounded-xl border border-slate-200 bg-white p-2 text-left transition hover:border-cyan-200 hover:bg-cyan-50"
                  title="Clique para entrar com esta conta"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                      {user.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-900">
                        {roleLabel[user.role]}
                      </p>
                      <p className="text-[10px] text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Clique num card para entrar direto, ou clique abaixo para
              preencher.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {mockUsers.map((user) => (
                <button
                  key={`${user.email}-fill`}
                  type="button"
                  onClick={() => {
                    setValue("email", user.email);
                    setValue("password", user.password);
                  }}
                  className="rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Preencher {roleLabel[user.role]}
                </button>
              ))}
            </div>
          </div>

          <p className="pt-2 text-center text-sm text-muted">
            Ainda não tens conta?{" "}
            <Link
              href="/registro"
              className="font-semibold text-primary hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
