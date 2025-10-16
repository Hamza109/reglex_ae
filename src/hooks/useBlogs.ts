"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth-utils";

export type BlogStatus = "DRAFT" | "PUBLISHED";

export type Blog = {
  id: number;
  title: string;
  slug: string;
  content_json: unknown; // TipTap JSON
  content_html: string;
  thumbnail?: string | null;
  status: BlogStatus;
  authorId?: number | null;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
  } | null;
};

async function fetchJSON<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export function useBlogsQuery() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchJSON<Blog[]>("/api/blogs"),
  });
}

export function useBlogQuery(id: number) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchJSON<Blog>(`/api/blogs/${id}`),
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      payload: Omit<Blog, "id" | "createdAt" | "updatedAt" | "slug">
    ) =>
      fetchJSON<Blog>("/api/blogs", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<Blog> & { id: number }) =>
      fetchJSON<Blog>(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", data.id] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetchJSON<void>(`/api/blogs/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
}
