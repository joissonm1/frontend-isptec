# Frontend MD - Estrutura completa (Next.js + Tailwind)

## 1) Objetivo do frontend

Construir uma plataforma que liga universidade e mercado de trabalho com:

- Landing page forte, explicativa e com animações
- Área autenticada no estilo dashboard/rede social
- Página de ofertas de estágio com filtros e detalhe
- Autenticação completa (login e registro)

Base visual inspirada nas imagens anexadas:

- Dashboard com layout em 3 colunas
- Página de ofertas com filtros no topo e cards de vaga
- Detalhe de oferta com seções descritivas

## 2) Stack e bibliotecas

- Next.js 15+ (App Router) + React + TypeScript
- Tailwind CSS
- Framer Motion (animações da landing e transições)
- React Hook Form + Zod (validação)
- TanStack Query (dados remotos)
- Zustand (estado local leve para UI)
- Lucide Icons

## 3) Estrutura de pastas recomendada

```txt
src/
  app/
    (marketing)/
      page.tsx                    # landing
      impacto-social/page.tsx     # impacto e viabilidade
      como-funciona/page.tsx      # explicação da plataforma
    (auth)/
      login/page.tsx
      registro/page.tsx
    (app)/
      dashboard/page.tsx
      feed/page.tsx
      ofertas/page.tsx
      ofertas/[id]/page.tsx
      candidaturas/page.tsx
      perfil/[slug]/page.tsx
      empresa/
        dashboard/page.tsx
        ofertas/page.tsx
        ofertas/nova/page.tsx
        ofertas/[id]/editar/page.tsx
      professor/
        dashboard/page.tsx
        recomendacoes/page.tsx
    api/
      auth/
      upload/
    layout.tsx
    globals.css

  components/
    layout/
      TopNav.tsx
      Sidebar.tsx
      RightPanel.tsx
      AppShell.tsx
    landing/
      Hero.tsx
      ProblemSolution.tsx
      ImpactStats.tsx
      ViabilitySection.tsx
      CTASection.tsx
    auth/
      LoginForm.tsx
      RegisterForm.tsx
    dashboard/
      ProfileCard.tsx
      ComposerCard.tsx
      PostCard.tsx
      TrendsCard.tsx
    offers/
      OffersFilters.tsx
      OfferCard.tsx
      OfferDetails.tsx
      OfferApplyDrawer.tsx

  features/
    auth/
      services.ts
      schema.ts
      store.ts
    offers/
      services.ts
      schema.ts
      hooks.ts
    dashboard/
      services.ts
    profile/
      services.ts

  lib/
    api-client.ts
    auth-guards.ts
    query-client.ts
    constants.ts

  types/
    auth.ts
    offers.ts
    post.ts
    user.ts
```

## 4) Rotas detalhadas

### 4.1 Públicas (marketing)

| Rota              | Objetivo                                                                          | Componentes chave                                                |
| ----------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `/`               | Landing principal com narrativa e animações                                       | Hero, ProblemSolution, ImpactStats, ViabilitySection, CTASection |
| `/impacto-social` | Métricas de impacto (empregabilidade, adesão de empresas, evolução de estudantes) | ImpactStats, gráficos, depoimentos                               |
| `/como-funciona`  | Explicar os 3 pilares (rede social, ofertas, recomendações)                       | Steps, FAQ, fluxo visual                                         |

### 4.2 Autenticação

| Rota        | Objetivo             | Requisitos                                     |
| ----------- | -------------------- | ---------------------------------------------- |
| `/login`    | Entrar na plataforma | Email, senha, lembrar sessão, recuperar senha  |
| `/registro` | Criar conta          | Tipo de conta: estudante, professor ou empresa |

### 4.3 Privadas (app)

| Rota                           | Perfil                        | Objetivo                                |
| ------------------------------ | ----------------------------- | --------------------------------------- |
| `/dashboard`                   | Todos autenticados            | Visão geral personalizada               |
| `/feed`                        | Estudante, professor, empresa | Publicações e conquistas acadêmicas     |
| `/ofertas`                     | Todos autenticados            | Lista de ofertas com filtros avançados  |
| `/ofertas/[id]`                | Todos autenticados            | Detalhe da oferta e candidatura         |
| `/candidaturas`                | Estudante                     | Histórico e status das candidaturas     |
| `/perfil/[slug]`               | Todos autenticados            | Perfil de estudante/professor/empresa   |
| `/empresa/dashboard`           | Empresa                       | Pipeline e estatísticas de candidaturas |
| `/empresa/ofertas`             | Empresa                       | Gestão das ofertas publicadas           |
| `/empresa/ofertas/nova`        | Empresa                       | Criar oferta                            |
| `/empresa/ofertas/[id]/editar` | Empresa                       | Editar oferta                           |
| `/professor/dashboard`         | Professor                     | Turmas e recomendações emitidas         |
| `/professor/recomendacoes`     | Professor                     | Criar e gerir recomendações             |

## 5) Página a página (escopo funcional)

## 5.1 Landing page (/)

Seções mínimas:

1. Hero com headline forte: aproximar universidade ao mercado
2. Problema e solução (cartões lado a lado)
3. Como funciona em 3 pilares
4. Impacto social (estatísticas e histórias reais)
5. Viabilidade (modelo de adoção por universidades e empresas)
6. CTA duplo: criar conta estudante e criar conta empresa

Animações sugeridas:

- Entrada em cascata no carregamento inicial
- Números animados na seção de impacto
- Cards com scroll reveal
- Transição suave entre blocos com parallax leve

## 5.2 Dashboard (/dashboard e /feed)

Inspirado na imagem 1:

- Coluna esquerda: perfil resumido, atalhos, progresso
- Coluna central: criar publicação + feed
- Coluna direita: notícias, tendências, vagas em destaque

Blocos chave:

- Composer para publicar conquista
- Feed com reações e comentários
- Card de progresso acadêmico

## 5.3 Ofertas (/ofertas)

Inspirado nas imagens 2 e 3:

- Filtros no topo: contrato, área, skills, país, ordenação, busca
- Resultado em lista de cards
- Cada card com: título, empresa, tipo, local, resumo, tags

Funcionalidades:

- Filtros combinados
- Paginação ou infinite scroll
- Guardar oferta nos favoritos

## 5.4 Detalhe de oferta (/ofertas/[id])

Seções:

- Título da vaga
- Empresa + link institucional
- Descrição curta
- Descrição completa
- Requisitos e responsabilidades
- Botão candidatar

## 5.5 Login e registro

Login:

- Email + senha
- Feedback de erro claro
- Redirecionamento por role

Registro:

- Seleção de tipo de conta
- Campos dinâmicos por perfil
- Aceite de termos

## 6) Design system mínimo

## 6.1 Cores (proposta)

- Primária: `#0E7490` (teal)
- Secundária: `#1E293B` (slate escuro)
- Destaque: `#F59E0B` (amber)
- Fundo: `#F8FAFC`
- Sucesso: `#16A34A`
- Erro: `#DC2626`

## 6.2 Tipografia

- Títulos: Poppins
- Texto: Source Sans 3

## 6.3 Componentes base

- Button, Input, Select, Badge, Card, Modal, Drawer, Tabs, Table, Pagination

## 7) Segurança e acesso no frontend

- Middleware para rotas protegidas
- Controle de acesso por role
- Guardas de rota para áreas empresa/professor
- Persistência de sessão com refresh token

## 8) Contratos de API usados no frontend

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`
- `GET /posts`
- `POST /posts`
- `GET /jobs`
- `GET /jobs/:id`
- `POST /jobs/:id/applications`
- `GET /applications/me`
- `GET /recommendations`
- `POST /recommendations`

## 9) Roadmap de implementação

1. Setup base (Next + Tailwind + layout + design tokens)
2. Landing com animações e páginas institucionais
3. Login e registro com validação
4. Dashboard + feed
5. Módulo de ofertas (lista + detalhe + candidatura)
6. Ajustes de responsividade e performance

## 10) Critérios de pronto (MVP)

- Landing completa com narrativa de impacto e viabilidade
- Login e registro funcionais
- Dashboard com feed e bloco de progresso
- Lista de ofertas com filtros e pesquisa
- Detalhe da oferta com candidatura
- Experiência mobile e desktop estável
