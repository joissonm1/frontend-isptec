type PerfilPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PerfilPage({ params }: PerfilPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h1 className="text-4xl font-black text-slate-900">Perfil: {slug}</h1>
        <p className="mt-3 text-slate-600">
          Página pública do utilizador com conquistas, skills e recomendações.
        </p>
      </section>
    </div>
  );
}
