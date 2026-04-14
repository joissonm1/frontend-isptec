import SplitLoginCard from "@/components/ui/split-login-card";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center px-4 py-10 sm:px-6">
      <div className="ui-surface w-full rounded-3xl p-4 md:p-6">
        <SplitLoginCard />
      </div>
    </div>
  );
}
