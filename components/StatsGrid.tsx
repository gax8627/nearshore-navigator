"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export function StatsGrid() {
    const { t } = useLanguage();

    const stats = [
        { label: t('stats.distance'), value: "20 Minutes", sub: t('stats.borderWaiting') },
        { label: t('stats.parks'), value: "65+", sub: t('stats.classAvailable') },
        { label: t('stats.workforce'), value: "260k+", sub: t('stats.manufacturingOps') },
        { label: t('stats.exports'), value: "$50B+", sub: t('stats.annualToUSA') },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        transition: { type: "spring", stiffness: 400, damping: 20 }
                    }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 text-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-white/40 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 group"
                >
                    <dt className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-4 group-hover:scale-110 transition-transform">
                        {stat.label}
                    </dt>
                    <dd className="text-4xl font-black text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors inline-block mb-2">
                        {stat.value}
                    </dd>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {stat.sub}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
