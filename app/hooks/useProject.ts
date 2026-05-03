"use client";

import type { NewProject, Project } from "@/src/lib/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PROJECTS_QUERY_KEY = ["projects"] as const;

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: () => apiFetch("/api/projects"),
  });
}

export function useProject(id: number) {
  return useQuery<Project>({
    queryKey: [...PROJECTS_QUERY_KEY, id],
    queryFn: () => apiFetch(`/api/projects/${id}`),
    enabled: id > 0,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation<Project, Error, NewProject>({
    mutationFn: (data) =>
      apiFetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation<Project, Error, { id: number; data: Partial<NewProject> }>({
    mutationFn: ({ id, data }) =>
      apiFetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      qc.invalidateQueries({ queryKey: [...PROJECTS_QUERY_KEY, id] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      apiFetch(`/api/projects/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY }),
  });
}
