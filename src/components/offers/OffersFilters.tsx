"use client";

import { Search } from "lucide-react";

type OffersFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  contract: string;
  onContractChange: (value: string) => void;
};

export function OffersFilters({
  search,
  onSearchChange,
  contract,
  onContractChange,
}: OffersFiltersProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h2 className="text-3xl font-black text-slate-900">MY OFFERS</h2>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Filter by
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={contract}
          onChange={(e) => onContractChange(e.target.value)}
        >
          <option value="all">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>Target</option>
          <option>Engenharia Informática</option>
          <option>Comunicação</option>
          <option>Marketing</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>Skills</option>
          <option>React</option>
          <option>SQL</option>
          <option>Social Media</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>Offer country</option>
          <option>Angola</option>
          <option>Portugal</option>
          <option>Espanha</option>
        </select>
      </div>
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:w-40">
          <option>Sort by</option>
          <option>Mais recente</option>
          <option>Mais relevante</option>
        </select>
        <div className="flex w-full items-center gap-2 rounded-full border border-slate-300 px-3 py-2">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search"
          />
        </div>
      </div>
    </section>
  );
}
