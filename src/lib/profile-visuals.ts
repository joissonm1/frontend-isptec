type MockRole = "student" | "professor" | "company" | "university";

type ProfileVisual = {
  displayName?: string;
  headline: string;
  avatarUrl: string;
  coverUrl: string;
};

const visualsBySlug: Record<string, ProfileVisual> = {
  "joisson-miguel": {
    displayName: "Joisson Miguel",
    headline: "Estudante de Engenharia Informatica",
    avatarUrl:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=80",
  },
  "paulo-carvalho": {
    displayName: "Paulo Carvalho",
    headline: "Professor de Engenharia de Software",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  },
  enapp: {
    displayName: "Enapp",
    headline: "Empresa parceira de estagios",
    avatarUrl:
      "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  isptec: {
    displayName: "ISPTEC",
    headline: "Universidade parceira",
    avatarUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  },
};

const fallbackByRole: Record<MockRole, ProfileVisual> = {
  student: {
    headline: "Estudante",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=80",
  },
  professor: {
    headline: "Professor",
    avatarUrl:
      "https://images.unsplash.com/photo-1603415526960-f8f0a92f9892?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  },
  company: {
    headline: "Empresa parceira",
    avatarUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  university: {
    headline: "Universidade",
    avatarUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  },
};

export function getProfileVisual(slug?: string, role: MockRole = "student") {
  if (slug && visualsBySlug[slug]) {
    return visualsBySlug[slug];
  }
  return fallbackByRole[role];
}
