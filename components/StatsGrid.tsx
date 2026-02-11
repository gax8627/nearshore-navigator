"use client";

import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

export function StatsGrid() {
    const { t } = useLanguage();

    const stats = [
        { label: t('stats.distance'), value: "20 Minutes", sub: t('stats.borderWaiting') },
        { label: t('stats.parks'), value: "70+", sub: t('stats.classAvailable') },
        { label: t('stats.workforce'), value: "260k+", sub: t('stats.manufacturingOps') },
        { label: t('stats.exports'), value: "$52B+", sub: t('stats.annualToUSA') },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
            ))}
        </div>
    );
}

function StatCard({ stat, index }: { stat: { label: string; value: string; sub: string }; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">
                {stat.label}
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                <CountUp value={stat.value} trigger={isInView} />
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.sub}
            </p>
        </motion.div>
    );
}

function CountUp({ value, trigger }: { value: string; trigger: boolean }) {
    const numberMatch = value.match(/\d+/);
    const target = numberMatch ? parseInt(numberMatch[0]) : 0;
    const prefix = value.split(target.toString())[0] || "";
    const suffix = value.split(target.toString())[1] || "";
    
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (trigger && target > 0) {
            let startTime: number | null = null;
            const duration = 2000;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                setCurrent(Math.round(target * ease));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        }
    }, [trigger, target]);

    return (
        <span>
            {prefix}{current}{suffix}
        </span>
    );
}
