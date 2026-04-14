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
      <div className="py-4 pr-4 lg:pr-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-h-[calc(100vh-96px)] overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Sidebar />
            <main className="flex-1 space-y-4 bg-slate-100 p-4">
              {children}
            </main>
          </div>
          <div className="hidden lg:block">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
