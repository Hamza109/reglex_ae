"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { setAuthToken, setUser } from "@/lib/auth-utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useLogin();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const result = await loginMutation.mutateAsync({
        email,
        password,
      });

      // Store token and user in secure cookies
      setAuthToken(result.token);
      setUser(result.author);

      // Redirect to admin dashboard
      window.location.href = "/admin";
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      setError(error.message || "Login failed. Please check your credentials.");
    }
  }

  return (
    <div className='min-h-screen bg-primary flex flex-col items-center justify-center p-6 relative'>
      <div className='absolute top-6 left-1/2 -translate-x-1/2'>
        <img src='/BLUE_LOGO.webp' alt='Reglex' className='h-40 w-auto' />
      </div>
      <div className='w-full max-w-sm bg-white text-black rounded-xl shadow-xl p-6 space-y-5'>
        <div className='space-y-1 text-center'>
          <h1 className='text-xl font-semibold text-black'>Sign in</h1>
          <p className='text-sm text-black/70'>Access your admin dashboard</p>
        </div>
        <form onSubmit={onSubmit} className='grid gap-3'>
          <div className='grid gap-1'>
            <label htmlFor='email' className='text-sm text-black'>
              Email
            </label>
            <input
              id='email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='border rounded-md px-3 py-2 text-black placeholder:text-gray-400'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='password' className='text-sm text-black'>
              Password
            </label>
            <input
              id='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='border rounded-md px-3 py-2 text-black placeholder:text-gray-400'
            />
          </div>
          {error && (
            <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
              {error}
            </div>
          )}
          <button
            type='submit'
            className='mt-2 rounded-md bg-primary text-primary-foreground py-2 text-sm disabled:opacity-60'
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
