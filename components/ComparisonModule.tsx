import React, { useState } from "react";
import { Shield, Clock, TrendingUp, DollarSign, PlusCircle, Scale } from "lucide-react";
import { OPERATING_MODEL_MATRIX, COMPETITOR_DISCLAIMER } from "@/app/constants/competitor-matrix";
import { INDUSTRY_MATRIX } from "@/app/constants/city-industry-matrix";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface ComparisonModuleProps {
    type: "competitor" | "hub";
    selection?: string[]; // IDs of competitors or citySlugs
}

export const ComparisonModule = ({ type, selection }: ComparisonModuleProps) => {
    const { t } = useLanguage();
    const [activeHubs, setActiveHubs] = useState<string[]>(selection || ["tijuana", "monterrey"]);

    const toggleHub = (slug: string) => {
        if (activeHubs.includes(slug)) {
            if (activeHubs.length > 1) setActiveHubs(activeHubs.filter(h => h !== slug));
        } else {
            if (activeHubs.length < 3) setActiveHubs([...activeHubs, slug]);
        }
    };

    if (type === "competitor") {
        const rows: { label: string; icon: React.ReactNode; key: "typicalStartup" | "pricingStructure" | "bestFor" | "tradeOffs" }[] = [
            { label: "Typical Startup", icon: <Clock className="w-4 h-4 text-primary-500" />, key: "typicalStartup" },
            { label: "Pricing Structure", icon: <DollarSign className="w-4 h-4 text-primary-500" />, key: "pricingStructure" },
            { label: "Best For", icon: <Shield className="w-4 h-4 text-primary-500" />, key: "bestFor" },
            { label: "Trade-offs", icon: <Scale className="w-4 h-4 text-primary-500" />, key: "tradeOffs" },
        ];
        return (
            <div className="w-full space-y-8">
                <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <table className="w-full text-left border-collapse bg-white dark:bg-gray-900">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/50">
                                <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">Operating Model</th>
                                {OPERATING_MODEL_MATRIX.map((m) => (
                                    <th key={m.name} className="p-6 text-center border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white">
                                        <div className="font-bold">{m.name}</div>
                                        <div className="text-xs font-normal opacity-60 mt-1">{m.model}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {rows.map((r) => (
                                <tr key={r.key}>
                                    <td className="p-6 font-medium text-gray-900 dark:text-white flex items-center gap-2">{r.icon} {r.label}</td>
                                    {OPERATING_MODEL_MATRIX.map((m) => (
                                        <td key={m.name} className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">{m[r.key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4 text-primary-500 shrink-0" />
                    <span>{COMPETITOR_DISCLAIMER}</span>
                </div>
            </div>
        );
    }

    if (type === "hub") {
        const availableHubs = Array.from(new Set(INDUSTRY_MATRIX.map(m => m.citySlug)));
        const hubs = INDUSTRY_MATRIX.filter(m => activeHubs.includes(m.citySlug))
            .filter((v, i, a) => a.findIndex(t => t.citySlug === v.citySlug) === i) // Unique city entries
            .slice(0, 3);

        return (
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Benchmarking:</span>
                    {availableHubs.map(slug => (
                        <button
                            key={slug}
                            onClick={() => toggleHub(slug)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${activeHubs.includes(slug) ? "bg-primary-500 text-white border-primary-400 shadow-lg shadow-primary-500/20" : "bg-gray-50 dark:bg-white/5 text-gray-500 border-gray-100 dark:border-white/10 hover:border-primary-500/50"}`}
                        >
                            {slug.charAt(0).toUpperCase() + slug.slice(1)}
                        </button>
                    ))}
                    <div className="ml-auto flex items-center gap-1 text-[10px] text-gray-400">
                        <PlusCircle className="w-3 h-3" />
                        Select up to 3
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {hubs.map((hub) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={hub.citySlug} 
                                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary-500 transition-all group"
                            >
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight flex items-center justify-between">
                                    {hub.citySlug}
                                    <span className="text-xs font-normal text-primary-500">Hub Analysis</span>
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Industrial Vacancy</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{(hub.stats as any).vacancyRate || "N/A"}%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Logistics Score</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{(hub.stats as any).logisticsScore ? `${(hub.stats as any).logisticsScore}/5.0` : "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Energy (per kWh)</span>
                                        <span className="font-bold text-gray-900 dark:text-white">${(hub.stats as any).energyCostKwh || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Logistics Score</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(v => (
                                                <div key={v} className={`w-3 h-1.5 rounded-full ${v <= ((hub.stats as any).logisticsScore || 0) ? "bg-primary-500" : "bg-gray-200 dark:bg-gray-800"}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                     <div className="text-xs text-gray-400 mb-2 font-medium uppercase">Top Employers</div>
                                     <div className="flex flex-wrap gap-2 text-[10px]">
                                        {hub.topLocalEmployers.slice(0, 3).map(e => (<span key={e} className="px-2 py-1 bg-gray-50 dark:bg-white/5 rounded border border-gray-100 dark:border-white/10">{e}</span>))}
                                     </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    return null;
};
