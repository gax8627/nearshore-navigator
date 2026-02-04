"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

export function StatsGrid() {
    const { t } = useLanguage();

    const stats = [
        { label: t('stats.distance'), value: "20 Minutes", sub: t('stats.borderWaiting') },
        { label: t('stats.parks'), value: "65+", sub: t('stats.classAvailable') },
        { label: t('stats.workforce'), value: "260k+", sub: t('stats.manufacturingOps') },
        { label: t('stats.exports'), value: "$50B+", sub: t('stats.annualToUSA') },
    ];

    return (
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
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
            whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative overflow-hidden p-8 text-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-glass hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 group w-full h-full flex flex-col justify-center items-center"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <dt className="relative text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-4 group-hover:tracking-[0.2em] transition-all duration-300">
                {stat.label}
            </dt>
            <dd className="relative text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                <CountUp value={stat.value} trigger={isInView} />
            </dd>
            <p className="relative text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
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
            const duration = 2000; // ms

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // click-feel easing
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
            {prefix}
            <motion.span>{current}</motion.span>
            {suffix}
        </span>
    );
}


