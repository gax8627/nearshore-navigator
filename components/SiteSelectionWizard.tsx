"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Factory, 
    Zap, 
    Navigation, 
    Users, 
    ChevronRight, 
    RotateCcw,
    CheckCircle2,
    ShieldCheck
} from "lucide-react";
import { INDUSTRY_MATRIX } from "@/app/constants/city-industry-matrix";
import { INDUSTRY_VERTICALS } from "@/app/constants/industry-taxonomy";

type Step = "industry" | "priority" | "scale" | "result";

export function SiteSelectionWizard() {
    const [step, setStep] = useState<Step>("industry");
    const [selections, setSelections] = useState({
        industry: "",
        priority: "technology", // technology, cost, logistics
        scale: "medium" // small, medium, large
    });

    const industries = INDUSTRY_VERTICALS.slice(0, 5); // Main 5

    const priorities = [
        { id: "technology", label: "Advanced Tech & R&D", icon: Zap, desc: "Focus on proximity to engineering hubs." },
        { id: "cost", label: "Operational Cost Efficiency", icon: Users, desc: "Minimize labor and energy overhead." },
        { id: "logistics", label: "Last-Mile Logistics", icon: Navigation, desc: "Immediate access to the US border." }
    ];

    const handleSelectIndustry = (id: string) => {
        setSelections({ ...selections, industry: id });
        setStep("priority");
    };

    const handleSelectPriority = (id: string) => {
        setSelections({ ...selections, priority: id });
        setStep("scale");
    };

    const handleSelectScale = (id: string) => {
        setSelections({ ...selections, scale: id });
        setStep("result");
    };

    const reset = () => setStep("industry");

    // Simple Recommendation Logic
    const getRecommendations = () => {
        const matches = INDUSTRY_MATRIX.filter(m => m.industrySlug === selections.industry);
        if (selections.priority === "technology") {
            return matches.sort((a, b) => ((b as any).logisticsScore || 0) - ((a as any).logisticsScore || 0)).slice(0, 2);
        }
        if (selections.priority === "cost") {
            return matches.sort((a, b) => ((a as any).energyCostKwh || 0) - ((b as any).energyCostKwh || 0)).slice(0, 2);
        }
        return matches.slice(0, 2); // Default
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto p-8 rounded-2xl bg-white/5 dark:bg-gray-900/50 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
                {step === "industry" && (
                    <motion.div 
                        key="industry"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full">Step 1 of 3</span>
                            <h2 className="text-3xl font-bold mt-4 text-white">Select Your Industry</h2>
                            <p className="text-gray-400 mt-2">Which sector are you expanding into Mexico?</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {industries.map((ind) => (
                                <button
                                    key={ind.slug}
                                    onClick={() => handleSelectIndustry(ind.slug)}
                                    className="p-6 text-left rounded-xl bg-white/5 border border-white/10 hover:border-primary-500 hover:bg-primary-500/10 transition-all group"
                                >
                                    <div className="text-primary-400 group-hover:scale-110 transition-transform">
                                        <Factory className="w-8 h-8 mb-4" />
                                    </div>
                                    <h3 className="font-bold text-white uppercase text-sm tracking-tight">{ind.slug.replace('-', ' ')}</h3>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "priority" && (
                    <motion.div 
                        key="priority"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full">Step 2 of 3</span>
                            <h2 className="text-3xl font-bold mt-4 text-white">Define Your Priority</h2>
                            <p className="text-gray-400 mt-2">What is the most critical factor for your operation?</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {priorities.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => handleSelectPriority(p.id)}
                                    className="flex items-center p-6 text-left rounded-xl bg-white/5 border border-white/10 hover:border-primary-500 hover:bg-primary-500/10 transition-all group"
                                >
                                    <div className="p-4 bg-primary-500/20 rounded-lg text-primary-400 mr-6">
                                        <p.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{p.label}</h3>
                                        <p className="text-sm text-gray-400">{p.desc}</p>
                                    </div>
                                    <ChevronRight className="ml-auto w-5 h-5 text-gray-600 group-hover:text-primary-500" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "scale" && (
                    <motion.div 
                        key="scale"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full">Step 3 of 3</span>
                            <h2 className="text-3xl font-bold mt-4 text-white">Operational Scale</h2>
                            <p className="text-gray-400 mt-2">Estimated headcount for the first 12 months?</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { id: "small", label: "10 - 50", desc: "Small/Pilot" },
                                { id: "medium", label: "50 - 200", desc: "Mid-Market" },
                                { id: "large", label: "200+", desc: "Enterprise" }
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => handleSelectScale(s.id)}
                                    className="p-8 text-center rounded-xl bg-white/5 border border-white/10 hover:border-primary-500 hover:bg-primary-500/10 transition-all"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-1">{s.label}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{s.desc}</p>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "result" && (
                    <motion.div 
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <CheckCircle2 className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-white">Recommended Hubs</h2>
                            <p className="text-gray-400">Based on your {selections.priority} focus for {selections.industry}.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {getRecommendations().map((rec) => (
                                <div key={rec.citySlug} className="p-6 rounded-xl bg-white/10 border border-white/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 bg-primary-500/20 rounded-bl-xl border-b border-l border-white/10">
                                        <ShieldCheck className="w-4 h-4 text-primary-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white capitalize mb-4">{rec.citySlug}</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Logistics Score</span>
                                            <span className="text-primary-400 font-mono">{((rec as any).logisticsScore || 0) / 5 * 100}%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Vacancy Rate</span>
                                            <span className="text-white font-mono">{(rec as any).vacancyRate}%</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wider">
                                        View Hub Blueprint
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-4">
                            <button 
                                onClick={reset}
                                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset Wizard
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
