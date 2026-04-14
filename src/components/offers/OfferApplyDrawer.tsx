"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { useAuthStore } from "@/features/auth/store";

type OfferApplyDrawerProps = {
  jobId: string;
  className?: string;
  label?: string;
};

export function OfferApplyDrawer({
  jobId,
  className,
  label = "Candidatar-me",
}: OfferApplyDrawerProps) {
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
        className={cn(
          "rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700",
          className,
        )}
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-slate-900/40 md:items-stretch">
          <div className="h-[85vh] w-full rounded-t-2xl bg-white p-5 md:h-full md:w-[460px] md:rounded-none md:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
                  Candidatura
                </p>
                <h3 className="text-2xl font-black text-slate-900">
                  Enviar candidatura
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Explica porque tens interesse nesta vaga e adiciona o teu CV.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
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
                  className="h-32 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-600"
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
                <p className="mt-2 text-xs text-slate-500">
                  Formatos recomendados: PDF, DOCX ou DOC.
                </p>
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
