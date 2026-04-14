export type Role = "student" | "professor" | "company" | "university";

export type FeedAudience = "friends" | "suggested";

export type FeedPost = {
  id: string;
  author: string;
  authorType: Role;
  role: string;
  time: string;
  category: "Progresso" | "Notas" | "Concurso" | "Conquista";
  audience: FeedAudience;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  likes: number;
  comments: number;
};

export type Offer = {
  id: string;
  title: string;
  company: string;
  location: string;
  contract: string;
  country: string;
  skills: string[];
  shortDescription: string;
  fullDescription: string;
  target: string;
};

export type SuggestedStudentProfile = {
  slug: string;
  name: string;
  course: string;
  university: string;
  skills: string[];
  progressScore: number;
  lastUpdate: string;
};

export type OfferApplicantStatus =
  | "Nova"
  | "Em análise"
  | "Entrevista"
  | "Rejeitada";

export type OfferApplicant = {
  id: string;
  name: string;
  course: string;
  university: string;
  offerTitle: string;
  appliedAt: string;
  status: OfferApplicantStatus;
  profileSlug: string;
};

export const impactStats = [
  { label: "Estudantes conectados", value: 4200, suffix: "+" },
  { label: "Empresas parceiras", value: 180, suffix: "+" },
  { label: "Taxa de contratação", value: 68, suffix: "%" },
  { label: "Recomendações emitidas", value: 1500, suffix: "+" },
];

export const feedPosts: FeedPost[] = [
  {
    id: "1",
    author: "Joisson Miguel",
    authorType: "student",
    role: "Estudante de Engenharia Informática",
    time: "há 2 h",
    category: "Conquista",
    audience: "friends",
    content:
      "Concluí o projeto de análise de dados da universidade e apresentei para duas empresas parceiras.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Estudantes apresentando projeto em laboratório",
    likes: 82,
    comments: 14,
  },
  {
    id: "2",
    author: "Marta Silva",
    authorType: "company",
    role: "Talent Acquisition @ NexaTech",
    time: "há 4 h",
    category: "Concurso",
    audience: "suggested",
    content:
      "Estamos com novas vagas de estágio em Frontend e Data. Procuramos estudantes com vontade de aprender.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Equipa profissional em reunião",
    likes: 49,
    comments: 8,
  },
  {
    id: "3",
    author: "ISPTEC",
    authorType: "university",
    role: "Universidade parceira",
    time: "há 6 h",
    category: "Notas",
    audience: "suggested",
    content:
      "Resultados da 1a fase de avaliações já disponíveis no portal. Consulta o calendário de revisões e apoio pedagógico.",
    likes: 31,
    comments: 5,
  },
  {
    id: "4",
    author: "Prof. Ana Gomes",
    authorType: "professor",
    role: "Docente de Engenharia de Software",
    time: "há 8 h",
    category: "Progresso",
    audience: "friends",
    content:
      "Parabéns aos estudantes que apresentaram protótipos com excelente qualidade técnica. Continuem a publicar as evoluções no vosso perfil UniBridge.",
    likes: 64,
    comments: 12,
  },
];

export const offers: Offer[] = [
  {
    id: "1",
    title: "Social Media Intern",
    company: "XRPL Commons",
    location: "Remoto",
    contract: "Internship",
    country: "Espanha",
    skills: ["Comunicação", "Marketing", "Redes Sociais"],
    shortDescription:
      "Estágio para estudantes de comunicação e social media com foco em comunidade tech.",
    fullDescription:
      "A XRPL Commons procura um Social Media Intern para apoiar a criação de conteúdo, gestão de calendário editorial e engagement com a comunidade. Vais colaborar com equipas de produto e educação para tornar conteúdos técnicos mais acessíveis.",
    target: "Estudantes de Comunicação, Jornalismo e Marketing",
  },
  {
    id: "2",
    title: "Frontend Intern",
    company: "BlueOrbit Labs",
    location: "Luanda",
    contract: "Internship",
    country: "Angola",
    skills: ["React", "TypeScript", "Tailwind"],
    shortDescription:
      "Vaga para desenvolvimento de interfaces web com acompanhamento de mentores.",
    fullDescription:
      "Apoio no desenvolvimento de interfaces em React/Next.js, criação de componentes reutilizáveis e participação em revisões de código. Ideal para quem deseja experiência prática de produto digital.",
    target: "Estudantes de Engenharia Informática",
  },
  {
    id: "3",
    title: "Data Analyst Intern",
    company: "Insight Bridge",
    location: "Híbrido",
    contract: "Part-time",
    country: "Portugal",
    skills: ["SQL", "Python", "Power BI"],
    shortDescription:
      "Apoiar análises de negócio e criação de dashboards para equipas comerciais.",
    fullDescription:
      "Recolha e limpeza de dados, construção de relatórios e apoio na análise de KPIs. Trabalho próximo com equipas de negócio para transformar dados em decisões.",
    target: "Estudantes de Dados, Estatística e Informática",
  },
];

export const trendItems = [
  "IA aplicada ao recrutamento jovem",
  "Empresas a procurar estágios remotos",
  "Portfólios práticos com projetos reais",
  "Soft skills mais valorizadas em 2026",
];

export const suggestedStudentProfiles: SuggestedStudentProfile[] = [
  {
    slug: "joisson-miguel",
    name: "Joisson Miguel",
    course: "Engenharia Informática",
    university: "ISPTEC",
    skills: ["NestJS", "React", "SQL"],
    progressScore: 79,
    lastUpdate: "Atualizou projeto de dashboard acadêmico",
  },
  {
    slug: "ana-paula-fernandes",
    name: "Ana Paula Fernandes",
    course: "Ciência de Dados",
    university: "Universidade Agostinho Neto",
    skills: ["Python", "Power BI", "Estatística"],
    progressScore: 83,
    lastUpdate: "Publicou análise de competição de dados",
  },
  {
    slug: "carlos-mateus",
    name: "Carlos Mateus",
    course: "Engenharia de Telecomunicações",
    university: "ISPTEC",
    skills: ["Redes", "Linux", "Cloud"],
    progressScore: 74,
    lastUpdate: "Partilhou certificação de redes",
  },
];

export const offerApplicants: OfferApplicant[] = [
  {
    id: "cand-1",
    name: "Joisson Miguel",
    course: "Engenharia Informática",
    university: "ISPTEC",
    offerTitle: "Frontend Intern",
    appliedAt: "12 Abr, 2026",
    status: "Em análise",
    profileSlug: "joisson-miguel",
  },
  {
    id: "cand-2",
    name: "Ana Paula Fernandes",
    course: "Ciência de Dados",
    university: "Universidade Agostinho Neto",
    offerTitle: "Data Analyst Intern",
    appliedAt: "11 Abr, 2026",
    status: "Nova",
    profileSlug: "ana-paula-fernandes",
  },
  {
    id: "cand-3",
    name: "Carlos Mateus",
    course: "Engenharia de Telecomunicações",
    university: "ISPTEC",
    offerTitle: "Social Media Intern",
    appliedAt: "10 Abr, 2026",
    status: "Entrevista",
    profileSlug: "carlos-mateus",
  },
  {
    id: "cand-4",
    name: "Marta Silva",
    course: "Marketing Digital",
    university: "Universidade de Luanda",
    offerTitle: "Social Media Intern",
    appliedAt: "08 Abr, 2026",
    status: "Rejeitada",
    profileSlug: "ana-paula-fernandes",
  },
];
