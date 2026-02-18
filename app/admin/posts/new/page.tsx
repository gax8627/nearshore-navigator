"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "General",
    imageUrl: "",
    tags: "",
    readTime: "5 min read",
    published: false,
  });

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm((prev) => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: JSON.stringify(
            form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          ),
        }),
      });

      if (res.ok) {
        router.push("/admin/posts");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save post");
      }
    } catch (err) {
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/posts"
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">New Post</h1>
          <p className="text-gray-400 mt-1">Create a new blog article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ─── Main Editor ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Your article title..."
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-lg"
              />
              <div className="mt-2">
                <span className="text-xs text-gray-500">Slug: </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                  className="text-xs text-gray-400 bg-transparent border-none outline-none"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="A brief summary for SEO and preview cards..."
                rows={2}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Content */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Content (Markdown)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write your article in Markdown..."
                rows={20}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-y font-mono text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* ─── Sidebar ─── */}
          <div className="space-y-6">
            {/* Publish */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Publish</h3>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
                  form.published
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600"
                }`}
              >
                {form.published ? (
                  <><Eye className="w-4 h-4" /> Published</>
                ) : (
                  <><EyeOff className="w-4 h-4" /> Draft</>
                )}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-full mt-3 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Post"}
              </button>
            </div>

            {/* Meta */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">Meta</h3>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-primary-500 outline-none"
                >
                  <option>General</option>
                  <option>Strategy Guide</option>
                  <option>Cost Analysis</option>
                  <option>Shelter Services</option>
                  <option>Real Estate</option>
                  <option>Industry News</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="Guide, Strategy, Nearshoring"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-600 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Read Time</label>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Image URL</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-600 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
