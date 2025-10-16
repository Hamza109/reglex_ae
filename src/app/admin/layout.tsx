import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: "Admin | Reglex",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='min-h-screen grid grid-cols-[280px_1fr]'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className='flex flex-col min-h-screen bg-white'>
        <main className='p-6 space-y-6'>{children}</main>
      </div>
    </div>
  );
}
