"use client";

import { useState } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { useCreateTestimonial } from "@/hooks/useTestimonials";
import { useRouter } from "next/navigation";

export default function TestimonialAddPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const createTestimonial = useCreateTestimonial();
  const router = useRouter();

  async function saveTestimonial() {
    if (!name.trim() || !company.trim() || !message.trim()) {
      setError("All fields are required");
      return;
    }

    setError("");

    try {
      const result = await createTestimonial.mutateAsync({
        name,
        company,
        message,
      });

      console.log("💬 Testimonial created successfully:", result);
      alert("Testimonial created successfully!");
      router.push("/admin/testimonials/view");
    } catch (error: any) {
      console.error("❌ Failed to create testimonial:", error);
      setError(error.message || "Failed to create testimonial");
    }
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-primary'>Add Testimonial</h1>
      <AdminCard title='Details' description='Create a new testimonial'>
        <form className='grid gap-3' onSubmit={(e) => e.preventDefault()}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Testimonial message'
            className='border rounded p-2 min-h-[100px]'
            required
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              className='border rounded p-2'
              required
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder='Company'
              className='border rounded p-2'
              required
            />
          </div>

          {error && (
            <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
              {error}
            </div>
          )}

          <div className='flex gap-2'>
            <button
              type='button'
              onClick={saveTestimonial}
              disabled={createTestimonial.isPending}
              className='rounded bg-primary text-primary-foreground px-3 py-2 text-sm disabled:opacity-60'
            >
              {createTestimonial.isPending
                ? "Creating..."
                : "Create Testimonial"}
            </button>
            <button
              type='button'
              onClick={() => router.push("/admin/testimonials/view")}
              className='rounded border px-3 py-2 text-sm'
            >
              Cancel
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
