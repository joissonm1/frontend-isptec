import { AppShell } from "@/components/layout/AppShell";

type EditarOfertaPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditarOfertaPage({
  params,
}: EditarOfertaPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Editar oferta #{id}
        </h1>
        <p className="mt-2 text-slate-600">
          Aqui podes atualizar título, requisitos, localização e status da vaga.
        </p>
      </section>
    </AppShell>
  );
}
