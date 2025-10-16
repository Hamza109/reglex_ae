import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export function getServerAuthUser(request: Request | NextRequest) {
  const token = (request as any).cookies?.get?.("authToken")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function requireAuth(request: Request | NextRequest) {
  const user = getServerAuthUser(request);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
