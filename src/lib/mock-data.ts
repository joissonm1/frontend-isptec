export type Role = "student" | "professor" | "company";

export type FeedPost = {
  id: string;
  author: string;
  role: string;
  time: string;
  content: string;
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
    role: "Estudante de Engenharia Informática",
    time: "há 2 h",
    content:
      "Concluí o projeto de análise de dados da universidade e apresentei para duas empresas parceiras.",
    likes: 82,
    comments: 14,
  },
  {
    id: "2",
    author: "Marta Silva",
    role: "Talent Acquisition @ NexaTech",
    time: "há 4 h",
    content:
      "Estamos com novas vagas de estágio em Frontend e Data. Procuramos estudantes com vontade de aprender.",
    likes: 49,
    comments: 8,
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
