"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth-utils";

export type Testimonial = {
  id: number;
  name: string;
  company: string;
  message: string;
  createdAt: Date;
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

export function useTestimonialsQuery() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchJSON<Testimonial[]>("/api/testimonials"),
  });
}

export function useTestimonialQuery(id: number) {
  return useQuery({
    queryKey: ["testimonial", id],
    queryFn: () => fetchJSON<Testimonial>(`/api/testimonials/${id}`),
    enabled: !!id,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Testimonial, "id" | "createdAt">) =>
      fetchJSON<Testimonial>("/api/testimonials", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<Testimonial> & { id: number }) =>
      fetchJSON<Testimonial>(`/api/testimonials/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonial", data.id] });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetchJSON<void>(`/api/testimonials/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}
