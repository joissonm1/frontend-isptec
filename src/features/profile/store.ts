"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EditableProfile = {
  displayName: string;
  headline: string;
  about: string;
  location: string;
  institution: string;
  skills: string[];
  avatarUrl: string;
  coverUrl: string;
};

type ProfileState = {
  profiles: Record<string, EditableProfile>;
  upsertProfile: (slug: string, data: EditableProfile) => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profiles: {},
      upsertProfile: (slug, data) =>
        set((state) => ({
          profiles: {
            ...state.profiles,
            [slug]: data,
          },
        })),
    }),
    {
      name: "unibridge-profile",
    },
  ),
);
