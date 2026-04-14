"use client";

import { FormEvent, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useAuthStore } from "@/features/auth/store";

type Message = {
  id: string;
  from: "me" | "other";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  participant: string;
  role: string;
  context: string;
  unread: number;
  messages: Message[];
};

const mockConversations: Conversation[] = [
  {
    id: "1",
    participant: "NexaTech RH",
    role: "Empresa",
    context: "Frontend Intern",
    unread: 2,
    messages: [
      {
        id: "m1",
        from: "other",
        text: "Olá Joisson, vimos teu perfil e gostamos do teu progresso no projeto de dashboard.",
        time: "09:12",
      },
      {
        id: "m2",
        from: "me",
        text: "Obrigado! Posso partilhar também o repositório e uma demo do projeto.",
        time: "09:16",
      },
      {
        id: "m3",
        from: "other",
        text: "Perfeito, envia por aqui e vamos agendar uma conversa.",
        time: "09:18",
      },
    ],
  },
  {
    id: "2",
    participant: "Prof. Ana Gomes",
    role: "Professor",
    context: "Recomendação para estágio",
    unread: 0,
    messages: [
      {
        id: "m4",
        from: "other",
        text: "Atualizei tua recomendação para a BlueOrbit com foco nas competências de backend.",
        time: "Ontem",
      },
      {
        id: "m5",
        from: "me",
        text: "Excelente, muito obrigado professora!",
        time: "Ontem",
      },
    ],
  },
  {
    id: "3",
    participant: "ISPTEC Carreiras",
    role: "Universidade",
    context: "Concurso de inovação 2026",
    unread: 1,
    messages: [
      {
        id: "m6",
        from: "other",
        text: "Lembramos que o prazo para submissão no concurso termina sexta-feira.",
        time: "2 dias",
      },
    ],
  },
];

export default function CandidaturasPage() {
  const session = useAuthStore((state) => state.session);
  const [conversations, setConversations] = useState(mockConversations);
  const [activeId, setActiveId] = useState(mockConversations[0].id);
  const [draft, setDraft] = useState("");

  const activeConversation = useMemo(
    () =>
      conversations.find((conv) => conv.id === activeId) ?? conversations[0],
    [conversations, activeId],
  );

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id !== activeId
          ? conv
          : {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: `m-${Date.now()}`,
                  from: "me",
                  text,
                  time: "Agora",
                },
              ],
            },
      ),
    );

    setDraft("");
  };

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h1 className="text-2xl font-semibold text-slate-900">Mensagens</h1>
        <p className="mt-1 text-sm text-slate-600">
          Simulação mockada de conversas entre {session?.name ?? "utilizador"},
          empresas, professores e universidade.
        </p>
      </section>

      <section className="grid min-h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-slate-200 p-3 lg:border-b-0 lg:border-r">
          <h2 className="mb-2 px-1 text-sm font-semibold text-slate-700">
            Conversas
          </h2>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setActiveId(conv.id)}
                className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                  conv.id === activeId
                    ? "border-cyan-300 bg-cyan-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">
                    {conv.participant}
                  </p>
                  {conv.unread > 0 && (
                    <span className="rounded-full bg-cyan-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {conv.role} - {conv.context}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex flex-col">
          <header className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-base font-semibold text-slate-900">
              {activeConversation.participant}
            </h3>
            <p className="text-xs text-slate-500">
              {activeConversation.context}
            </p>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {activeConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.from === "me"
                      ? "bg-cyan-700 text-white"
                      : "bg-white text-slate-800"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`mt-1 text-[11px] ${msg.from === "me" ? "text-cyan-100" : "text-slate-500"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={sendMessage}
            className="border-t border-slate-200 p-3"
          >
            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-600"
                placeholder="Escreve uma mensagem..."
              />
              <button
                type="submit"
                className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
