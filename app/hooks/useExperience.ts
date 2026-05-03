"use client";

import type { Experience, NewExperience } from "@/src/lib/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const EXPERIENCES_QUERY_KEY = ["experiences"] as const;

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: EXPERIENCES_QUERY_KEY,
    queryFn: () => apiFetch("/api/experiences"),
  });
}

export function useCreateExperience() {
  const qc = useQueryClient();
  return useMutation<Experience, Error, NewExperience>({
    mutationFn: (data) =>
      apiFetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY }),
  });
}

export function useUpdateExperience() {
  const qc = useQueryClient();
  return useMutation<
    Experience,
    Error,
    { id: number; data: Partial<NewExperience> }
  >({
    mutationFn: ({ id, data }) =>
      apiFetch(`/api/experiences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY });
      qc.invalidateQueries({ queryKey: [...EXPERIENCES_QUERY_KEY, id] });
    },
  });
}

export function useDeleteExperience() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      apiFetch(`/api/experiences/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY }),
  });
}
