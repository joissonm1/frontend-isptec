type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

type ApiResponse<T> = {
  data: T;
  status: number;
};

const BASE_URLS = ["https://rbt6hr30-3000.uks1.devtunnels.ms"];

const DEFAULT_TIMEOUT_MS = 8000;
const DEBUG_API = true;

const buildUrl = (base: string, path: string) =>
  `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const withTimeout = (timeoutMs: number) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeout };
};

const shouldFallback = (response: Response | null, error: unknown) => {
  if (error) {
    return true;
  }
  if (!response) {
    return true;
  }
  if (response.status >= 500 || response.status === 0) {
    return true;
  }
  return false;
};

const fetchWithFallback = async (
  path: string,
  init?: RequestInit,
): Promise<Response> => {
  let lastError: unknown = null;
  let lastResponse: Response | null = null;

  for (const base of BASE_URLS) {
    const { controller, timeout } = withTimeout(DEFAULT_TIMEOUT_MS);
    try {
      if (DEBUG_API) {
        console.info("[api] request", {
          url: buildUrl(base, path),
          method: init?.method ?? "GET",
        });
      }
      const response = await fetch(buildUrl(base, path), {
        ...init,
        signal: init?.signal ?? controller.signal,
      });
      clearTimeout(timeout);
      lastResponse = response;
      if (DEBUG_API) {
        console.info("[api] response", {
          url: buildUrl(base, path),
          status: response.status,
        });
      }
      if (!shouldFallback(response, null)) {
        return response;
      }
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
      if (DEBUG_API) {
        console.error("[api] error", {
          url: buildUrl(base, path),
          error,
        });
      }
    }
  }

  if (lastResponse) {
    return lastResponse;
  }

  throw lastError ?? new Error("Falha ao contactar a API");
};

const getAuthHeaders = (token?: string | null): Record<string, string> =>
  token ? { Authorization: `Bearer ${token}` } : {};

const requestJson = async <T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> => {
  const { method = "GET", body, token, headers, signal } = options;
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  const requestHeaders: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...getAuthHeaders(token),
    ...(headers ?? {}),
  };

  const response = await fetchWithFallback(path, {
    method,
    headers: requestHeaders,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || `Erro ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return { data: (await response.json()) as T, status: response.status };
  }

  return { data: (await response.text()) as T, status: response.status };
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const normalizeAuthSession = (payload: any) => {
  const raw = payload?.data ?? payload;
  const token =
    raw?.token ?? raw?.accessToken ?? raw?.jwt ?? raw?.data?.token ?? null;
  const user = raw?.user ?? raw?.data?.user ?? raw?.profile ?? raw;
  const name = user?.name ?? user?.fullName ?? user?.username ?? "Utilizador";
  const email = user?.email ?? "";
  const role = user?.role ?? user?.type ?? "student";
  const profileSlug =
    user?.profileSlug ?? user?.slug ?? toSlug(user?.name ?? "perfil");
  const id = user?.id ?? user?._id ?? null;

  return { token, session: { id, name, email, role, profileSlug } };
};

const normalizeFeedPost = (raw: any) => {
  const authorValue = raw?.authorName ?? raw?.author ?? "";
  const authorName =
    raw?.author?.name ??
    raw?.author?.fullName ??
    raw?.author?.email ??
    authorValue;
  const authorType =
    raw?.author?.role ?? raw?.authorType ?? raw?.role ?? "student";
  const createdAt = raw?.createdAt ?? raw?.created_at ?? raw?.time ?? "agora";
  return {
    id: String(raw?.id ?? raw?._id ?? Math.random()),
    author: typeof authorName === "string" ? authorName : "Utilizador",
    authorType,
    role:
      raw?.author?.title ??
      raw?.roleTitle ??
      raw?.headline ??
      (typeof raw?.role === "string" ? raw.role : ""),
    time: typeof createdAt === "string" ? createdAt : "agora",
    category: raw?.category ?? "Progresso",
    audience: raw?.audience ?? "suggested",
    content: raw?.content ?? raw?.text ?? "",
    imageUrl: raw?.imageUrl ?? raw?.mediaUrl ?? raw?.image ?? undefined,
    imageAlt: raw?.imageAlt ?? raw?.image_alt ?? undefined,
    likes: raw?.likes ?? raw?.likesCount ?? 0,
    comments: raw?.comments ?? raw?.commentsCount ?? 0,
  };
};

const normalizeOffer = (raw: any) => {
  const skillsValue = raw?.skills ?? raw?.requirements ?? [];
  const skills = Array.isArray(skillsValue)
    ? skillsValue
    : String(skillsValue)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    title: raw?.title ?? raw?.position ?? "",
    company: raw?.company?.name ?? raw?.companyName ?? raw?.company ?? "",
    location: raw?.location ?? raw?.city ?? "",
    contract: raw?.contract ?? raw?.type ?? "Internship",
    country: raw?.country ?? "",
    skills,
    shortDescription:
      raw?.shortDescription ?? raw?.summary ?? raw?.description ?? "",
    fullDescription: raw?.fullDescription ?? raw?.description ?? "",
    target: raw?.target ?? raw?.targetAudience ?? "",
  };
};

const normalizeStudentProfile = (raw: any) => {
  const skillsValue = raw?.skills ?? raw?.competencies ?? [];
  const skills = Array.isArray(skillsValue)
    ? skillsValue
    : String(skillsValue)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
  return {
    slug: raw?.profileSlug ?? raw?.slug ?? toSlug(raw?.name ?? "perfil"),
    name: raw?.name ?? raw?.fullName ?? "",
    course: raw?.course ?? raw?.major ?? "",
    university: raw?.university ?? raw?.school ?? "",
    skills,
    progressScore: raw?.progressScore ?? raw?.progress ?? 0,
    lastUpdate: raw?.lastUpdate ?? raw?.updatedAt ?? "",
    id: raw?.id ?? raw?._id ?? null,
  };
};

export const api = {
  auth: {
    register: (body: unknown) =>
      requestJson("/auth/register", { method: "POST", body }),
    login: (body: unknown) =>
      requestJson("/auth/login", { method: "POST", body }),
    refresh: (body?: unknown) =>
      requestJson("/auth/refresh", { method: "POST", body }),
    logout: (token?: string | null) =>
      requestJson("/auth/logout", { method: "POST", token }),
    forgotPassword: (body: unknown) =>
      requestJson("/auth/forgot-password", { method: "POST", body }),
    resetPassword: (body: unknown) =>
      requestJson("/auth/reset-password", { method: "POST", body }),
  },
  students: {
    list: (token?: string | null) => requestJson("/students", { token }),
    get: (id: string, token?: string | null) =>
      requestJson(`/students/${id}`, { token }),
    getByUser: (userId: string, token?: string | null) =>
      requestJson(`/students/user/${userId}`, { token }),
    create: (body: unknown, token?: string | null) =>
      requestJson("/students", { method: "POST", body, token }),
    update: (id: string, body: unknown, token?: string | null) =>
      requestJson(`/students/${id}`, { method: "PUT", body, token }),
    remove: (id: string, token?: string | null) =>
      requestJson(`/students/${id}`, { method: "DELETE", token }),
  },
  posts: {
    list: (token?: string | null) => requestJson("/posts", { token }),
    get: (id: string, token?: string | null) =>
      requestJson(`/posts/${id}`, { token }),
    getByAuthor: (authorId: string, token?: string | null) =>
      requestJson(`/posts/author/${authorId}`, { token }),
    create: (body: unknown, token?: string | null) =>
      requestJson("/posts", { method: "POST", body, token }),
    update: (id: string, body: unknown, token?: string | null) =>
      requestJson(`/posts/${id}`, { method: "PUT", body, token }),
    remove: (id: string, token?: string | null) =>
      requestJson(`/posts/${id}`, { method: "DELETE", token }),
  },
  companies: {
    create: (body: unknown, token?: string | null) =>
      requestJson("/companies", { method: "POST", body, token }),
    me: (token?: string | null) => requestJson("/companies/me", { token }),
    update: (id: string, body: unknown, token?: string | null) =>
      requestJson(`/companies/${id}`, { method: "PUT", body, token }),
    remove: (id: string, token?: string | null) =>
      requestJson(`/companies/${id}`, { method: "DELETE", token }),
    public: (id: string) => requestJson(`/companies/${id}/public`),
    jobs: {
      create: (body: unknown, token?: string | null) =>
        requestJson("/companies/jobs", { method: "POST", body, token }),
      list: (token?: string | null) =>
        requestJson("/companies/jobs", { token }),
    },
  },
  universities: {
    create: (body: unknown, token?: string | null) =>
      requestJson("/universities", { method: "POST", body, token }),
    get: (id: string, token?: string | null) =>
      requestJson(`/universities/${id}`, { token }),
    update: (id: string, body: unknown, token?: string | null) =>
      requestJson(`/universities/${id}`, { method: "PUT", body, token }),
    remove: (id: string, token?: string | null) =>
      requestJson(`/universities/${id}`, { method: "DELETE", token }),
    public: (id: string) => requestJson(`/universities/${id}/public`),
  },
  jobs: {
    list: () => requestJson("/jobs"),
    get: (id: string) => requestJson(`/jobs/${id}`),
    create: (body: unknown, token?: string | null) =>
      requestJson("/jobs", { method: "POST", body, token }),
    update: (id: string, body: unknown, token?: string | null) =>
      requestJson(`/jobs/${id}`, { method: "PUT", body, token }),
    remove: (id: string, token?: string | null) =>
      requestJson(`/jobs/${id}`, { method: "DELETE", token }),
    apply: (
      id: string,
      body: unknown,
      token?: string | null,
      isFormData = false,
    ) =>
      requestJson(`/jobs/${id}/applications`, {
        method: "POST",
        body,
        token,
        headers: isFormData ? {} : undefined,
      }),
    applicationsMe: (token?: string | null) =>
      requestJson("/jobs/applications/me", { token }),
    applicationsByJob: (id: string, token?: string | null) =>
      requestJson(`/jobs/${id}/applications`, { token }),
    acceptApplication: (applicationId: string, token?: string | null) =>
      requestJson(`/jobs/applications/${applicationId}/accept`, {
        method: "PATCH",
        token,
      }),
    rejectApplication: (applicationId: string, token?: string | null) =>
      requestJson(`/jobs/applications/${applicationId}/reject`, {
        method: "PATCH",
        token,
      }),
  },
  reviews: {
    createForStudent: (body: unknown, token?: string | null) =>
      requestJson("/reviews/students", { method: "POST", body, token }),
    receivedMe: (token?: string | null) =>
      requestJson("/reviews/received/me", { token }),
    givenMe: (token?: string | null) =>
      requestJson("/reviews/given/me", { token }),
    byStudent: (studentId: string, token?: string | null) =>
      requestJson(`/reviews/student/${studentId}`, { token }),
  },
  profiles: {
    student: (studentId: string, token?: string | null) =>
      requestJson(`/profiles/student/${studentId}`, { token }),
    company: (companyId: string, token?: string | null) =>
      requestJson(`/profiles/company/${companyId}`, { token }),
    university: (universityId: string, token?: string | null) =>
      requestJson(`/profiles/university/${universityId}`, { token }),
  },
  feed: {
    me: (token?: string | null) => requestJson("/feed/me", { token }),
    global: (token?: string | null) => requestJson("/feed/global", { token }),
    createPost: (body: unknown, token?: string | null) =>
      requestJson("/feed/posts", { method: "POST", body, token }),
    removePost: (id: string, token?: string | null) =>
      requestJson(`/feed/posts/${id}`, { method: "DELETE", token }),
    likePost: (id: string, token?: string | null) =>
      requestJson(`/feed/posts/${id}/like`, { method: "POST", token }),
    addComment: (id: string, body: unknown, token?: string | null) =>
      requestJson(`/feed/posts/${id}/comments`, {
        method: "POST",
        body,
        token,
      }),
    comments: (id: string, token?: string | null) =>
      requestJson(`/feed/posts/${id}/comments`, { token }),
  },
  connections: {
    create: (body: unknown, token?: string | null) =>
      requestJson("/connections", { method: "POST", body, token }),
    accept: (id: string, token?: string | null) =>
      requestJson(`/connections/${id}/accept`, { method: "POST", token }),
    reject: (id: string, token?: string | null) =>
      requestJson(`/connections/${id}/reject`, { method: "POST", token }),
    me: (token?: string | null) => requestJson("/connections/me", { token }),
    remove: (id: string, token?: string | null) =>
      requestJson(`/connections/${id}`, { method: "DELETE", token }),
  },
  follows: {
    create: (body: unknown, token?: string | null) =>
      requestJson("/follows", { method: "POST", body, token }),
    remove: (id: string, token?: string | null) =>
      requestJson(`/follows/${id}`, { method: "DELETE", token }),
    me: (token?: string | null) => requestJson("/follows/me", { token }),
  },
};

export const apiMappers = {
  normalizeAuthSession,
  normalizeFeedPost,
  normalizeOffer,
  normalizeStudentProfile,
};
