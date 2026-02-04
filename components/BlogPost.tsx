"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost as BlogPostType } from "@/app/constants/blog-data";
import { useLanguage } from "@/app/context/LanguageContext";

export function BlogPost({ post }: { post: BlogPostType }) {
  const { language } = useLanguage();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        href={`/${language}/insights`}
        className="text-primary-600 hover:underline mb-8 inline-block"
      >
        ← Back to Insights
      </Link>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex gap-4 text-sm text-gray-500 mb-6">
          <span>{post.date}</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
            />
        </div>
      </header>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </article>
  );
}
