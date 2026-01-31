"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    imageUrl: string;
    tags: string[];
}

export function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/insights/${post.slug}`} className="group block h-full">
            <motion.article
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                    rest: { y: 0 },
                    hover: { 
                        y: -10,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                    }
                }}
                className="glass-card overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
            >
                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-primary-600 dark:text-primary-300 bg-primary-50/50 dark:bg-primary-900/40 px-3 py-1 rounded-full border border-primary-100 dark:border-primary-700">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-2">
                             {post.date}
                        </span>
                        <span className="font-bold text-primary-600 dark:text-primary-400 flex items-center group-hover:gap-2 transition-all">
                            Read Article
                            <motion.span
                                className="ml-1 inline-block"
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                variants={{
                                    hover: { x: 5 }
                                }}
                            >
                                &rarr;
                            </motion.span>
                        </span>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
