"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { OfferCard } from "@/components/offers/OfferCard";
import { OffersFilters } from "@/components/offers/OffersFilters";
import type { Offer } from "@/lib/mock-data";
import { api, apiMappers } from "@/lib/api";

export default function OfertasPage() {
  const [search, setSearch] = useState("");
  const [contract, setContract] = useState("all");
  const [items, setItems] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await api.jobs.list();
        const payload = response.data as any;
        const data = Array.isArray(payload) ? payload : (payload?.data ?? []);
        const normalized = data.map(apiMappers.normalizeOffer);
        if (isMounted) {
          setItems(normalized);
        }
      } catch (error) {
        if (isMounted) {
          setItems([]);
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
  }, []);

  const filtered = useMemo(() => {
    return items.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(search.toLowerCase()) ||
        offer.company.toLowerCase().includes(search.toLowerCase()) ||
        offer.skills.join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesContract = contract === "all" || offer.contract === contract;
      return matchesSearch && matchesContract;
    });
  }, [search, contract, items]);

  return (
    <AppShell>
      <OffersFilters
        search={search}
        onSearchChange={setSearch}
        contract={contract}
        onContractChange={setContract}
      />
      <section className="space-y-4">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            A carregar ofertas...
          </div>
        ) : null}
        {!loading &&
          filtered.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
        {!loading && filtered.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            Nenhuma oferta encontrada para os filtros atuais.
          </div>
        )}
      </section>
    </AppShell>
  );
}
