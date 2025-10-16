"use client";

import { useMutation } from "@tanstack/react-query";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  token: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio?: string | null;
    avatar?: string | null;
  };
};

async function fetchJSON<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      fetchJSON<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
  });
}
