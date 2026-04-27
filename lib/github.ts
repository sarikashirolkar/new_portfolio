import { CURATED_PROJECTS, type CuratedProject } from "./projects";

export type EnrichedProject = CuratedProject & {
  url: string;
  language: string | null;
  pushedAt: string | null;
  fork: boolean;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string | null;
  fork: boolean;
};

const GITHUB_USER = "sarikashirolkar";

export async function loadEnrichedProjects(): Promise<EnrichedProject[]> {
  let repos: GitHubRepo[] = [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );
    if (res.ok) {
      repos = (await res.json()) as GitHubRepo[];
    }
  } catch {
    repos = [];
  }

  const bySlug = new Map<string, GitHubRepo>();
  for (const r of repos) bySlug.set(r.name, r);

  return CURATED_PROJECTS.map((p) => {
    const r = bySlug.get(p.slug);
    return {
      ...p,
      url: r?.html_url ?? `https://github.com/${GITHUB_USER}/${p.slug}`,
      language: r?.language ?? null,
      pushedAt: r?.pushed_at ?? null,
      fork: r?.fork ?? false,
    };
  });
}
