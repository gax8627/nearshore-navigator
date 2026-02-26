"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Save, Eye, EyeOff } from "lucide-react";
import { SeoSidebar } from "@/components/admin/SeoSidebar";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [post, setPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "General",
    tags: "",
    imageUrl: "",
    readTime: "5 min read",
    published: false,
  });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/posts/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to fetch post");
        return r.json();
      })
      .then((data) => {
        if (data.post) {
          setPost({
            ...data.post,
            tags: Array.isArray(data.post.tags) ? data.post.tags.join(", ") : (typeof data.post.tags === 'string' ? JSON.parse(data.post.tags).join(", ") : "")
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    if (!post.title || !post.slug) {
      alert("Title and Slug are required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...post,
            tags: post.tags ? post.tags.split(",").map(t => t.trim()).filter(Boolean) : []
        }),
      });

      if (!res.ok) throw new Error("Failed to update post");

      router.push("/admin/posts");
    } catch (error) {
      alert("Error saving post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Loading post...</div>;
  if (error) return <div className="p-12 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex gap-8 items-start">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
            <div>
                <button 
                  onClick={() => router.push('/admin/posts')}
                  className="flex items-center text-sm text-slate-400 hover:text-white mb-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Posts
                </button>
                <h1 className="text-3xl font-bold text-white mb-2">Edit Post</h1>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => router.push("/admin/posts")}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/20 font-medium flex items-center gap-2"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4"/> Update Post</>}
                </button>
            </div>
        </div>

        <div className="glass-card p-8 space-y-8">
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-600 text-lg"
                    placeholder="Enter a catchy title..."
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Slug</label>
                    <input
                        type="text"
                        value={post.slug}
                        onChange={(e) => setPost({ ...post, slug: e.target.value })}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none font-mono text-sm"
                        placeholder="url-slug"
                    />
                </div>
                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                    <select
                        value={post.category}
                        onChange={(e) => setPost({ ...post, category: e.target.value })}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                    >
                        <option>General</option>
                        <option>Manufacturing</option>
                        <option>Logistics</option>
                        <option>Technology</option>
                    </select>
                </div>
            </div>

            {/* Excerpt */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt (Meta Description)</label>
                <textarea
                    value={post.excerpt}
                    onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all resize-none h-24"
                    placeholder="Brief summary..."
                />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Content (Markdown)</label>
                <textarea
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all font-mono leading-relaxed"
                    rows={20}
                    placeholder="# Hello World..."
                />
            </div>
            
            {/* Options */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-4">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={post.published}
                  onChange={(e) => setPost({ ...post, published: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-gray-900"
                />
                <span className="text-sm font-medium">Publish Post Immediately</span>
              </label>
            </div>
        </div>
      </div>

      {/* SEO Sidebar */}
      <div className="w-80 shrink-0">
         <SeoSidebar title={post.title} excerpt={post.excerpt} content={post.content} slug={post.slug} />
      </div>
    </div>
  );
}
