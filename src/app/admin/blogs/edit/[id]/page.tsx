"use client";

import { useState, useEffect, useRef, use } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useBlogQuery, useUpdateBlog } from "@/hooks/useBlogs";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const [title, setTitle] = useState("");
  const [contentJSON, setContentJSON] = useState<JSONContent | null>(null);
  const [error, setError] = useState("");
  const editorRef = useRef<Editor | null>(null);

  const resolvedParams = use(params);
  const blogId = parseInt(resolvedParams.id);
  const { data: blog, isLoading, error: fetchError } = useBlogQuery(blogId);
  const updateBlog = useUpdateBlog();
  const router = useRouter();

  useEffect(() => {
    if (blog) {
      console.log("📝 Loading blog content:", blog);
      console.log("📝 Blog title:", blog.title);
      console.log("📝 Blog content_json:", blog.content_json);
      setTitle(blog.title);
      setContentJSON(blog.content_json as JSONContent);
    }
  }, [blog]);

  async function saveDraft() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    try {
      const result = await updateBlog.mutateAsync({
        id: blogId,
        title,
        content_json: contentJSON || { type: "doc", content: [] },
        content_html: "", // Will be generated from JSON
        thumbnail: null,
        status: "DRAFT",
      });

      console.log("📝 Draft updated successfully:", result);
      alert("Draft updated successfully!");
    } catch (error: any) {
      console.error("❌ Failed to update draft:", error);
      setError(error.message || "Failed to update draft");
    }
  }

  async function publishBlog() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    if (!editorRef.current) {
      setError("Editor not ready");
      return;
    }

    try {
      // Get both HTML and JSON content from editor
      const htmlContent = editorRef.current.getHTML();
      const jsonContent = editorRef.current.getJSON();

      console.log("📝 HTML Content:", htmlContent);
      console.log("📝 JSON Content:", jsonContent);

      const result = await updateBlog.mutateAsync({
        id: blogId,
        title,
        content_json: jsonContent,
        content_html: htmlContent,
        thumbnail: null,
        status: "PUBLISHED",
      });

      console.log("🚀 Blog updated successfully:", result);
      alert("Blog updated successfully!");
      router.push("/admin/blogs/view");
    } catch (error: any) {
      console.error("❌ Failed to update blog:", error);
      setError(error.message || "Failed to update blog");
    }
  }

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold text-primary'>Edit Blog</h1>
        <div className='py-8 text-center text-gray-500'>Loading blog...</div>
      </div>
    );
  }

  if (fetchError || !blog) {
    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold text-primary'>Edit Blog</h1>
        <div className='py-8 text-center text-red-500'>
          Failed to load blog. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-primary'>Edit Blog</h1>
      <AdminCard title='Edit Blog Post' description='Update your blog post'>
        <div className='grid gap-3'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            className='border rounded p-2'
            required
          />
          <SimpleEditor
            key={blogId} // Force re-render when blog changes
            onChange={(json) => setContentJSON(json)}
            initialContent={contentJSON || undefined}
            ref={editorRef}
          />

          {error && (
            <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>
              {error}
            </div>
          )}

          <div className='flex gap-2'>
            <button
              onClick={saveDraft}
              disabled={updateBlog.isPending}
              className='rounded bg-gray-600 text-white px-3 py-2 text-sm disabled:opacity-60'
            >
              {updateBlog.isPending ? "Saving..." : "Save draft"}
            </button>
            <button
              onClick={publishBlog}
              disabled={updateBlog.isPending}
              className='rounded bg-primary text-primary-foreground px-3 py-2 text-sm disabled:opacity-60'
            >
              {updateBlog.isPending ? "Updating..." : "Update"}
            </button>
            <button
              onClick={() => router.push("/admin/blogs/view")}
              className='rounded border px-3 py-2 text-sm'
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
