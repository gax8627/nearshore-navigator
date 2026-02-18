"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

// Types
interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published: boolean;
  createdAt: string;
}

export default function PostsListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts on mount
  useState(() => {
    fetch("/api/admin/posts")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const togglePublish = async (id: number, published: boolean) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !published } : p))
        );
      }
    } catch (err) {
      alert("Failed to toggle publish status");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">Manage your content</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading posts...</div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-yellow-400 text-sm mb-2">⚠️ Database not connected</p>
            <p className="text-gray-500 text-sm">Connect Vercel Postgres to manage posts.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No posts yet.</p>
            <Link
              href="/admin/posts/new"
              className="text-primary-400 text-sm hover:underline mt-2 inline-block"
            >
              Create your first post →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{post.excerpt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(post.id, post.published)}
                      className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full transition-colors ${
                        post.published
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      }`}
                    >
                      {post.published ? (
                        <><Eye className="w-3 h-3" /> Published</>
                      ) : (
                        <><EyeOff className="w-3 h-3" /> Draft</>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="p-1.5 text-gray-500 hover:text-white rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
