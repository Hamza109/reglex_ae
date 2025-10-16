"use client";

import { useMemo } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { useBlogsQuery, useDeleteBlog } from "@/hooks/useBlogs";
import { useRouter } from "next/navigation";

export default function BlogViewPage() {
  const { data: blogs, isLoading, error } = useBlogsQuery();
  const deleteBlog = useDeleteBlog();
  const router = useRouter();

  const headers = useMemo(
    () => ["Title", "Status", "Author", "Created", "Actions"],
    []
  );

  async function onDelete(id: number) {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog.mutateAsync(id);
      } catch (error) {
        console.error("❌ Failed to delete blog:", error);
        alert("Failed to delete blog");
      }
    }
  }

  function onEdit(id: number) {
    router.push(`/admin/blogs/edit/${id}`);
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-primary'>View Blogs</h1>

      <AdminCard title='All Blogs' description='Manage posts'>
        <div className='overflow-x-auto'>
          {isLoading ? (
            <div className='py-8 text-center text-gray-500'>
              Loading blogs...
            </div>
          ) : error ? (
            <div className='py-8 text-center text-red-500'>
              Failed to load blogs. Please try again.
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
                {!blogs || blogs.length === 0 ? (
                  <tr>
                    <td
                      className='py-3 px-3 text-foreground/70'
                      colSpan={headers.length}
                    >
                      No blogs yet.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className='border-b last:border-0'>
                      <td className='py-2 px-3'>{blog.title}</td>
                      <td className='py-2 px-3'>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            blog.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td className='py-2 px-3'>
                        {blog.author?.name || "Unknown Author"}
                      </td>
                      <td className='py-2 px-3'>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className='py-2 px-3'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => onEdit(blog.id)}
                            className='px-2 py-1 rounded border text-sm hover:bg-gray-50'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(blog.id)}
                            disabled={deleteBlog.isPending}
                            className='px-2 py-1 rounded bg-red-600 text-white text-sm disabled:opacity-60 hover:bg-red-700'
                          >
                            {deleteBlog.isPending ? "Deleting..." : "Delete"}
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
