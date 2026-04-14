export function ProfileCard() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="h-20 rounded-xl bg-gradient-to-r from-cyan-600 to-slate-900" />
      <div className="-mt-8 h-16 w-16 rounded-full border-4 border-white bg-slate-300" />
      <h2 className="mt-3 text-xl font-black text-slate-900">Joisson Miguel</h2>
      <p className="text-sm text-slate-600">
        Estudante de Engenharia Informática
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="font-bold text-cyan-700">99</p>
          <p className="text-slate-600">Visualizações</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="font-bold text-cyan-700">1316</p>
          <p className="text-slate-600">Impressões</p>
        </div>
      </div>
    </section>
  );
}
