"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
    title: string;
    description: string;
    href: string;
    icon?: React.ReactNode;
}

export function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
    return (
        <Link href={href} className="block group h-full">
            <motion.div
                whileHover={{ 
                    y: -12,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="glass-card p-8 h-full flex flex-col justify-between group/service hover:shadow-primary-500/10 border-white/40 dark:border-white/5"
            >
                <div>
                    <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="h-14 w-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-8 group-hover/service:bg-primary-500 group-hover/service:text-white transition-all duration-300 shadow-sm"
                    >
                        {icon ? icon : <div className="w-6 h-6 bg-current rounded-full" />}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover/service:text-primary-600 dark:group-hover/service:text-primary-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                        {description}
                    </p>
                </div>

                <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover/service:translate-x-3 transition-transform duration-300">
                    <span className="relative">
                        Learn more
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover/service:w-full" />
                    </span>
                    <ArrowRight className="ml-3 w-5 h-5" />
                </div>
            </motion.div>
        </Link>
    );
}
