import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SplitLoginCard from "@/components/ui/split-login-card";

export default function LoginPage() {
  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        aria-label="Voltar"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      <div className="ui-surface w-full rounded-3xl p-4 md:p-6">
        <SplitLoginCard />
      </div>
    </div>
  );
}
