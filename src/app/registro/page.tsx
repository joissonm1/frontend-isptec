import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegistroPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center px-4 py-10 sm:px-6">
      <div className="grid w-full gap-8 md:grid-cols-2">
        <section className="rounded-3xl bg-cyan-700 p-8 text-white">
          <h1 className="text-4xl font-black">Cria a tua conta</h1>
          <p className="mt-3 text-cyan-50">
            Junta-te à comunidade que conecta formação académica a oportunidades
            reais.
          </p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="mb-4 text-2xl font-black text-slate-900">Registro</h2>
          <RegisterForm />
        </section>
      </div>
    </div>
  );
}
