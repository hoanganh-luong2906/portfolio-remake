"use client";

import type { NewPost, Post } from "@/src/lib/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const POSTS_QUERY_KEY = ["posts"] as const;

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: POSTS_QUERY_KEY,
    queryFn: () => apiFetch("/api/posts"),
  });
}

export function usePost(id: number) {
  return useQuery<Post>({
    queryKey: [...POSTS_QUERY_KEY, id],
    queryFn: () => apiFetch(`/api/posts/${id}`),
    enabled: id > 0,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation<Post, Error, NewPost>({
    mutationFn: (data) =>
      apiFetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: POSTS_QUERY_KEY }),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation<Post, Error, { id: number; data: Partial<NewPost> }>({
    mutationFn: ({ id, data }) =>
      apiFetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      qc.invalidateQueries({ queryKey: [...POSTS_QUERY_KEY, id] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => apiFetch(`/api/posts/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: POSTS_QUERY_KEY }),
  });
}
