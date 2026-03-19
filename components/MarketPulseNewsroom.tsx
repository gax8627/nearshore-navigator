"use client";

import React from "react";
import { MARKET_ALERTS } from "@/app/constants/market-pulse-news";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Factory, Calendar, ExternalLink } from "lucide-react";

export function MarketPulseNewsroom() {
    return (
        <div className="space-y-6">
            {MARKET_ALERTS.map((alert, index) => (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={alert.id}
                    className="group relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-500 transition-all shadow-sm overflow-hidden"
                >
                    {/* Urgency Badge */}
                    <div className="absolute top-0 right-0 px-4 py-2 bg-primary-500/10 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-l border-gray-100 dark:border-gray-800">
                        {alert.impactLevel} Impact Pulse
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {alert.date}
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span className="text-primary-500 font-semibold uppercase tracking-tighter">Verified Intelligence</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {alert.topic}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                {alert.summary}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Affected Sectors</span>
                                    <div className="flex gap-2">
                                        {alert.affectedSectors.map(s => (
                                            <span key={s} className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-gray-50 dark:bg-white/5 rounded border border-gray-100 dark:border-white/10 uppercase">
                                                <Factory className="w-2.5 h-2.5" /> {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Regional Impact</span>
                                    <div className="flex gap-2">
                                        {alert.affectedCities.map(c => (
                                            <span key={c} className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 rounded border border-primary-100 dark:border-primary-800/50 uppercase">
                                                <MapPin className="w-2.5 h-2.5" /> {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col gap-3 w-48 pt-8">
                            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
                                Mitigation Strategy <ExternalLink className="w-3 h-3" />
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-primary-500 text-white rounded-lg text-xs font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20">
                                Contact Response Team
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}

            <div className="text-center py-12 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-3xl">
                <AlertTriangle className="w-8 h-8 text-gray-300 mx-auto mb-4" />
                <h4 className="text-gray-500 dark:text-gray-400 font-medium">End of Pulse Stream</h4>
                <p className="text-xs text-gray-400 mt-2">Next autonomous scan scheduled in 4 hours.</p>
            </div>
        </div>
    );
}
