import { ReactNode } from "react";
import { RightPanel } from "@/components/layout/RightPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <TopNav />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_300px] lg:px-6">
        <Sidebar />
        <main className="space-y-4">{children}</main>
        <div className="hidden lg:block">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
