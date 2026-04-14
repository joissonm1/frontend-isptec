import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center px-4 py-10 sm:px-6">
      <div className="grid w-full gap-8 md:grid-cols-2">
        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <h1 className="text-4xl font-black">Bem-vindo de volta</h1>
          <p className="mt-3 text-slate-200">
            Acede ao teu dashboard e acompanha oportunidades em tempo real.
          </p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="mb-4 text-2xl font-black text-slate-900">Entrar</h2>
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
