"use client";

import { useMemo } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import {
  useTestimonialsQuery,
  useDeleteTestimonial,
} from "@/hooks/useTestimonials";
import { useRouter } from "next/navigation";

export default function TestimonialViewPage() {
  const { data: testimonials, isLoading, error } = useTestimonialsQuery();
  const deleteTestimonial = useDeleteTestimonial();
  const router = useRouter();

  const headers = useMemo(
    () => ["Name", "Company", "Message", "Created", "Actions"],
    []
  );

  async function onDelete(id: number) {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial.mutateAsync(id);
        
      } catch (error) {
        console.error("❌ Failed to delete testimonial:", error);
        alert("Failed to delete testimonial");
      }
    }
  }

  function onEdit(id: number) {
    router.push(`/admin/testimonials/edit/${id}`);
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-primary'>View Testimonials</h1>

      <AdminCard title='All Testimonials' description='Manage testimonials'>
        <div className='overflow-x-auto'>
          {isLoading ? (
            <div className='py-8 text-center text-gray-500'>
              Loading testimonials...
            </div>
          ) : error ? (
            <div className='py-8 text-center text-red-500'>
              Failed to load testimonials. Please try again.
            </div>
          ) : (
            <table className='min-w-full text-sm'>
              <thead>
                <tr className='text-left border-b'>
                  {headers.map((h) => (
                    <th key={h} className='py-2 px-3 font-medium'>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!testimonials || testimonials.length === 0 ? (
                  <tr>
                    <td
                      className='py-3 px-3 text-foreground/70'
                      colSpan={headers.length}
                    >
                      No testimonials yet.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className='border-b last:border-0'>
                      <td className='py-2 px-3'>{testimonial.name}</td>
                      <td className='py-2 px-3'>{testimonial.company}</td>
                      <td
                        className='py-2 px-3 max-w-[420px] truncate'
                        title={testimonial.message}
                      >
                        {testimonial.message}
                      </td>
                      <td className='py-2 px-3'>
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </td>
                      <td className='py-2 px-3'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => onEdit(testimonial.id)}
                            className='px-2 py-1 rounded border text-sm hover:bg-gray-50'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(testimonial.id)}
                            disabled={deleteTestimonial.isPending}
                            className='px-2 py-1 rounded bg-red-600 text-white text-sm disabled:opacity-60 hover:bg-red-700'
                          >
                            {deleteTestimonial.isPending
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
