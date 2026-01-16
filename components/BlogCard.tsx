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
                    hover: { y: -8 }
                }}
                className="glass-card overflow-hidden h-full flex flex-col hover:shadow-glass-hover transition-all duration-300"
            >
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-60" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs font-medium text-primary-600 dark:text-primary-300 bg-primary-50/50 dark:bg-primary-900/40 px-2 py-1 rounded-full border border-primary-100 dark:border-primary-700">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <span className="font-medium text-primary-600 dark:text-primary-400 flex items-center">
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
