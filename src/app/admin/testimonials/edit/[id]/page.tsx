"use client";

import { useState, useEffect, use } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import {
  useTestimonialQuery,
  useUpdateTestimonial,
} from "@/hooks/useTestimonials";
import { useRouter } from "next/navigation";

interface TestimonialEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TestimonialEditPage({
  params,
}: TestimonialEditPageProps) {
  const resolvedParams = use(params);
  const testimonialId = parseInt(resolvedParams.id);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    data: testimonial,
    isLoading,
    error: fetchError,
  } = useTestimonialQuery(testimonialId);
  const updateTestimonial = useUpdateTestimonial();
  const router = useRouter();

  // Load testimonial data when it's fetched
  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name);
      setCompany(testimonial.company);
      setMessage(testimonial.message);
    }
  }, [testimonial]);

  async function saveTestimonial() {
    if (!name.trim() || !company.trim() || !message.trim()) {
      setError("All fields are required");
      return;
    }

    setError("");

    try {
      const result = await updateTestimonial.mutateAsync({
        id: testimonialId,
        name,
        company,
        message,
      });

      alert("Testimonial updated successfully!");
      router.push("/admin/testimonials/view");
    } catch (error: any) {
      console.error("❌ Failed to update testimonial:", error);
      setError(error.message || "Failed to update testimonial");
    }
  }

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold text-primary'>
          Edit Testimonial
        </h1>
        <AdminCard title='Details' description='Edit testimonial'>
          <div className='py-8 text-center text-gray-500'>
            Loading testimonial...
          </div>
        </AdminCard>
      </div>
    );
  }

  if (fetchError || !testimonial) {
    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold text-primary'>
          Edit Testimonial
        </h1>
        <AdminCard title='Details' description='Edit testimonial'>
          <div className='py-8 text-center text-red-500'>
            Failed to load testimonial. Please try again.
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-primary'>Edit Testimonial</h1>
      <AdminCard title='Details' description='Edit testimonial'>
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
              disabled={updateTestimonial.isPending}
              className='rounded bg-primary text-primary-foreground px-3 py-2 text-sm disabled:opacity-60'
            >
              {updateTestimonial.isPending
                ? "Updating..."
                : "Update Testimonial"}
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
