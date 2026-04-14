"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { OfferCard } from "@/components/offers/OfferCard";
import { OffersFilters } from "@/components/offers/OffersFilters";
import { offers } from "@/lib/mock-data";

export default function OfertasPage() {
  const [search, setSearch] = useState("");
  const [contract, setContract] = useState("all");

  const filtered = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(search.toLowerCase()) ||
        offer.company.toLowerCase().includes(search.toLowerCase()) ||
        offer.skills.join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesContract = contract === "all" || offer.contract === contract;
      return matchesSearch && matchesContract;
    });
  }, [search, contract]);

  return (
    <AppShell>
      <OffersFilters
        search={search}
        onSearchChange={setSearch}
        contract={contract}
        onContractChange={setContract}
      />
      <section className="space-y-4">
        {filtered.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            Nenhuma oferta encontrada para os filtros atuais.
          </div>
        )}
      </section>
    </AppShell>
  );
}
