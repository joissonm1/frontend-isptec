"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

type OfferApplyDrawerProps = {
  jobId: string;
};

export function OfferApplyDrawer({ jobId }: OfferApplyDrawerProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const session = useAuthStore((state) => state.session);

  const submitApplication = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.append("message", message);
        formData.append("cv", file);
        await api.jobs.apply(jobId, formData, session?.token ?? null, true);
      } else {
        await api.jobs.apply(jobId, { message }, session?.token ?? null);
      }
      setOpen(false);
      setMessage("");
      setFile(null);
    } catch (error) {
      alert("Nao foi possivel enviar a candidatura agora.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
      >
        Candidatar-me
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-slate-900/40 md:items-stretch">
          <div className="h-[85vh] w-full rounded-t-2xl bg-white p-5 md:h-full md:w-[460px] md:rounded-none">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">
                Enviar candidatura
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-slate-500"
              >
                Fechar
              </button>
            </div>
            <form className="space-y-4" onSubmit={submitApplication}>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Mensagem
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="h-32 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600"
                  placeholder="Fala brevemente sobre o teu perfil e motivação..."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  CV
                </label>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                className="w-full rounded-xl bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={submitting}
              >
                {submitting ? "A enviar..." : "Submeter candidatura"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
