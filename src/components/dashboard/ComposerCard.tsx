export function ComposerCard() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-300" />
        <button className="w-full rounded-full border border-slate-300 px-4 py-2 text-left text-sm text-slate-500 transition hover:bg-slate-50">
          Comece uma publicação
        </button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm font-semibold text-slate-600">
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Vídeo
        </button>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Foto
        </button>
        <button className="rounded-lg bg-slate-50 py-2 transition hover:bg-slate-100">
          Artigo
        </button>
      </div>
    </section>
  );
}
