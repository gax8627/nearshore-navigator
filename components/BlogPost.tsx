"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost as BlogPostType } from "@/app/constants/blog-data";
import { useLanguage } from "@/app/context/LanguageContext";
import { ChevronLeft, Calendar, Clock, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";

export function BlogPost({ post }: { post: BlogPostType }) {
  const { language, t } = useLanguage();

  // Handle localization
  const currentTitle = post.locales?.[language]?.title || post.title;
  const currentContent = post.locales?.[language]?.content || post.content || "";
  const currentExcerpt = post.locales?.[language]?.excerpt || post.excerpt;
  const currentTags = post.locales?.[language]?.tags || post.tags;

  // Calculate read time based on word count
  const wordCount = currentContent.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200); // Average 200 wpm

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900/40">
      
      {/* Premium Full-Bleed Hero Banner */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        <Image
            src={post.imageUrl}
            alt={`${currentTitle} - Nearshore Navigator Industrial Insight`}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105 premium-image-filter"
            priority
        />
        {/* Deep Gradient Overlays for High-Legibility Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-primary-900/20 mix-blend-multiply" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <Link 
              href={`/${language}/insights`}
              className="inline-flex items-center text-primary-300 hover:text-white mb-6 uppercase tracking-widest text-xs font-bold transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
              {t('nav.insights') || "Back to Insights"}
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
                {currentTags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight max-w-4xl drop-shadow-lg">
              {currentTitle}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-300 font-medium">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-400" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-400" /> {readTime} Min Read</span>
              <span className="text-gray-400">|</span>
              <span className="text-white">By Denisse Martinez</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Main Content Area */}
            <div className="lg:w-2/3">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-12 border-l-4 border-primary-500 pl-6 italic">
                        {currentExcerpt}
                    </p>

                    <div 
                      className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg prose-hr:border-gray-200 dark:prose-hr:border-gray-800"
                      dangerouslySetInnerHTML={{ __html: currentContent }}
                    />
                </div>
            </div>

            {/* Floating Sidebar */}
            <div className="lg:w-1/3">
                <div className="sticky top-32 space-y-8">
                    
                    {/* Share Widget */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <Share2 className="w-4 h-4" /> Share Insight
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">LinkedIn</button>
                            <button className="flex-1 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">Copy Link</button>
                        </div>
                    </div>

                    {/* Integrated Lead Interception CTA (Book Call) */}
                    <div className="bg-gradient-to-br from-primary-900 to-gray-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center border border-primary-500/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-[60px] opacity-30 pointer-events-none -mr-16 -mt-16" />
                        
                        <div className="relative z-10">
                            <h3 className="text-white text-2xl font-bold mb-3 tracking-tight">Evaluate Your Landed Cost</h3>
                            <p className="text-primary-100 text-sm mb-6 leading-relaxed opacity-90">
                                Stop guessing. Speak directly with Denisse Martinez to model your nearshore footprint in Baja California and bypass 6 months of traditional research.
                            </p>
                            <a href="https://calendly.com/denisse-nearshorenavigator/30min" target="_blank" rel="noopener noreferrer" className="block w-full">
                                <Button className="w-full bg-white text-primary-900 hover:bg-gray-100 font-bold py-3 shadow-lg flex items-center justify-center gap-2 group">
                                    Talk to Denisse
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
      </div>
    </article>
  );
}
