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
                whileHover={{ y: -10 }}
                className="glass-card p-8 h-full flex flex-col justify-between transition-all duration-300 border border-white/40 hover:border-primary-300 hover:shadow-glass-hover"
            >
                <div>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300"
                    >
                        {icon ? icon : <div className="w-6 h-6 bg-current rounded-full" />}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {description}
                    </p>
                </div>

                <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </div>
            </motion.div>
        </Link>
    );
}
