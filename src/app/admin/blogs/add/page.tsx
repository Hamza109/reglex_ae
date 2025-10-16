"use client";

import { useState, useRef } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useCreateBlog } from "@/hooks/useBlogs";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

export default function BlogAddPage() {
  const [title, setTitle] = useState("");
  const [contentJSON, setContentJSON] = useState<JSONContent | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef<Editor | null>(null);

  const createBlog = useCreateBlog();
  const router = useRouter();

  async function saveDraft() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsDraft(true);
    setError("");

    try {
      const result = await createBlog.mutateAsync({
        title,
        content_json: contentJSON || { type: "doc", content: [] },
        content_html: "", // Will be generated from JSON
        thumbnail: null,
        status: "DRAFT",
        authorId: null, // Will be set by backend from JWT
      });

      console.log("📝 Draft saved successfully:", result);
      alert("Draft saved successfully!");
    } catch (error: any) {
      console.error("❌ Failed to save draft:", error);
      setError(error.message || "Failed to save draft");
    } finally {
      setIsDraft(false);
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

      const result = await createBlog.mutateAsync({
        title,
        content_json: jsonContent,
        content_html: htmlContent,
        thumbnail: null,
        status: "PUBLISHED",
        authorId: null, // Will be set by backend from JWT
      });

      console.log("🚀 Blog published successfully:", result);
      alert("Blog published successfully!");
      router.push("/admin/blogs/view");
    } catch (error: any) {
      console.error("❌ Failed to publish blog:", error);
      setError(error.message || "Failed to publish blog");
    }
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-primary'>Add Blog</h1>
      <AdminCard title='Compose' description='Create a new blog post'>
        <div className='grid gap-3'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            className='border rounded p-2'
            required
          />
          <SimpleEditor
            onChange={(json) => setContentJSON(json)}
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
              disabled={isDraft || createBlog.isPending}
              className='rounded bg-gray-600 text-white px-3 py-2 text-sm disabled:opacity-60'
            >
              {isDraft ? "Saving draft..." : "Save draft"}
            </button>
            <button
              onClick={publishBlog}
              disabled={createBlog.isPending}
              className='rounded bg-primary text-primary-foreground px-3 py-2 text-sm disabled:opacity-60'
            >
              {createBlog.isPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
