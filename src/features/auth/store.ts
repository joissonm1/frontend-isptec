"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthRole = "student" | "professor" | "company" | "university";

export type AuthSession = {
  name: string;
  email: string;
  role: AuthRole;
  profileSlug: string;
};

type AuthState = {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  logout: () => void;
};

export const mockUsers: Array<AuthSession & { password: string }> = [
  {
    name: "Joisson Miguel",
    email: "aluno@unibridge.ao",
    password: "123456",
    role: "student",
    profileSlug: "joisson-miguel",
  },
  {
    name: "Paulo Carvalho",
    email: "professor@unibridge.ao",
    password: "123456",
    role: "professor",
    profileSlug: "paulo-carvalho",
  },
  {
    name: "Enapp",
    email: "empresa@unibridge.ao",
    password: "123456",
    role: "company",
    profileSlug: "enapp",
  },
  {
    name: "ISPTEC",
    email: "universidade@unibridge.ao",
    password: "123456",
    role: "university",
    profileSlug: "isptec",
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: mockUsers[0],
      setSession: (session) => set({ session }),
      logout: () => set({ session: null }),
    }),
    {
      name: "unibridge-auth",
    },
  ),
);
