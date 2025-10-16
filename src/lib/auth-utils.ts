"use client";

import Cookies from "js-cookie";

const TOKEN_COOKIE = "authToken";
const USER_COOKIE = "user";

export function getAuthToken(): string | null {
  return Cookies.get(TOKEN_COOKIE) || null;
}

export function getUser(): any | null {
  const user = Cookies.get(USER_COOKIE);
  return user ? JSON.parse(user) : null;
}

export function setAuthToken(token: string): void {
  // Set secure, httpOnly-like cookie (client-side)
  Cookies.set(TOKEN_COOKIE, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

export function setUser(user: any): void {
  Cookies.set(USER_COOKIE, JSON.stringify(user), {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function logout(): void {
  Cookies.remove(TOKEN_COOKIE);
  Cookies.remove(USER_COOKIE);
  window.location.href = "/login";
}

export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
