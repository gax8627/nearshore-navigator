"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { BlogPost } from "@/app/constants/blog-data";

export function BlogCard({ post }: { post: BlogPost }) {
    const { language, t } = useLanguage();
    const href = post.slug.startsWith('/') ? post.slug : `/${language}/insights/${post.slug}`;

    // Get localized content if available
    const localized = post.locales?.[language];
    const title = localized?.title || post.title;
    const excerpt = localized?.excerpt || post.excerpt;
    const tags = localized?.tags || post.tags;

    return (
        <Link href={href} className="group block h-full">
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
                className="glass-card overflow-hidden h-full flex flex-col group/card hover:shadow-primary-500/10 transition-all duration-500"
            >
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-500" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/40 px-3 py-1.5 rounded-full border border-primary-100/50 dark:border-primary-800/30">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400 transition-colors line-clamp-2 leading-tight">
                        {title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-base mb-8 line-clamp-3 leading-relaxed">
                        {excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/50 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-2 font-medium">
                             {post.date}
                        </span>
                        <span className="font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1 group-hover/card:gap-3 transition-all">
                            {t('resources.ctaReadInsights') || "Read Article"}
                            <motion.span
                                className="inline-block"
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
