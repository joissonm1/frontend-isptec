"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { offers } from "@/lib/mock-data";
import { api, apiMappers } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store";

export default function EmpresaOfertasPage() {
  const [items, setItems] = useState(offers);
  const [loading, setLoading] = useState(true);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await api.companies.jobs.list(session?.token ?? null);
        const data = Array.isArray(response.data)
          ? response.data
          : (response.data?.data ?? []);
        const normalized = data.map(apiMappers.normalizeOffer);
        if (isMounted) {
          setItems(normalized.length ? normalized : offers);
        }
      } catch (error) {
        if (isMounted) {
          setItems(offers);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [session?.token]);

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-900">
            Gestão de ofertas
          </h1>
          <Link
            href="/empresa/ofertas/nova"
            className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white"
          >
            Nova oferta
          </Link>
        </div>
        <div className="space-y-3">
          {loading ? (
            <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              A carregar vagas da empresa...
            </div>
          ) : (
            items.map((offer) => (
              <article
                key={offer.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <h2 className="font-bold text-slate-900">{offer.title}</h2>
                <p className="text-sm text-slate-600">{offer.company}</p>
                <Link
                  href={`/empresa/ofertas/${offer.id}/editar`}
                  className="mt-2 inline-block text-sm font-semibold text-cyan-700 hover:underline"
                >
                  Editar oferta
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </AppShell>
  );
}
