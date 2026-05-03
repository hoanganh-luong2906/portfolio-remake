"use client";

import type { Experience, Post, Project } from "@/src/lib/db/schema";
import { useQuery } from "@tanstack/react-query";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json() as Promise<T>;
}

export const PUBLIC_POSTS_KEY = ["public", "posts"] as const;
export const PUBLIC_PROJECTS_KEY = ["public", "projects"] as const;
export const PUBLIC_EXPERIENCES_KEY = ["public", "experiences"] as const;

export function usePublicPosts() {
  return useQuery<Post[]>({
    queryKey: PUBLIC_POSTS_KEY,
    queryFn: () =>
      fetchJson<Post[]>("/api/public/posts").then((rows) =>
        rows.map((p) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        })),
      ),
    staleTime: 60_000,
  });
}

export function usePublicProjects() {
  return useQuery<Project[]>({
    queryKey: PUBLIC_PROJECTS_KEY,
    queryFn: () =>
      fetchJson<Project[]>("/api/public/projects").then((rows) =>
        rows.map((p) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        })),
      ),
    staleTime: 60_000,
  });
}

export function usePublicExperiences() {
  return useQuery<Experience[]>({
    queryKey: PUBLIC_EXPERIENCES_KEY,
    queryFn: () =>
      fetchJson<Experience[]>("/api/public/experiences").then((rows) =>
        rows.map((e) => ({
          ...e,
          createdAt: new Date(e.createdAt),
          updatedAt: new Date(e.updatedAt),
        })),
      ),
    staleTime: 60_000,
  });
}
