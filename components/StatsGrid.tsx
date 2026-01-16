"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export function StatsGrid() {
    const { t } = useLanguage();

    const stats = [
        { label: t('stats.distance'), value: "20 Minutes", sub: "border-waiting" }, // Need to make value dynamic if we translate it, but user only asked for static text translation in plan for now
        { label: t('stats.parks'), value: "65+", sub: "Class A Available" },
        { label: t('stats.workforce'), value: "260k+", sub: "Manufacturing Ops" },
        { label: t('stats.exports'), value: "$50B+", sub: "Annual to USA" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-card p-6 text-center hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300 group"
                >
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                        {stat.label}
                    </dt>
                    <dd className="mt-2 text-3xl font-extrabold text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300 inline-block">
                        {stat.value}
                    </dd>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                        {stat.sub}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
