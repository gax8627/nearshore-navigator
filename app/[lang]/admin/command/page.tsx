"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    LayoutDashboard, 
    Zap, 
    ShieldCheck, 
    Globe, 
    TrendingUp, 
    Users, 
    Activity,
    Settings,
    ChevronRight,
    Search
} from 'lucide-react';

/**
 * CEO Command Center - Phase 3
 * High-density executive dashboard for autonomous system monitoring.
 */
export default function AdminCommandCenter() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                setStats(data);
            } catch (e) {
                console.error("Failed to fetch dash stats");
            } finally {
                setIsLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (isLoading) return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            {/* Header */}
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-primary-500 mb-2">
                        <ShieldCheck size={16} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Secure Node 01</span>
                    </div>
                    <h1 className="text-4xl font-black">CEO Command Center</h1>
                    <p className="text-gray-400 mt-2">Autonomous Market Participation Engine v2.0</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-colors">
                        <Settings size={18} />
                        <span>System Config</span>
                    </button>
                    <button className="px-6 py-2 bg-primary-600 rounded-xl font-bold hover:bg-primary-500 transition-colors">
                        Run Manual Sweep
                    </button>
                </div>
            </header>

            {/* Grid Layout */}
            <div className="grid grid-cols-12 gap-6">
                
                {/* 1. SEO Velocity (Top Left) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-8 bg-gray-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <Search size={20} />
                            </div>
                            <h2 className="text-xl font-bold">SEO Velocity & Hub Dominance</h2>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">98% Indexed</span>
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">Phase 3 Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {[
                            { label: 'Total Entry Doors', value: stats?.seoVelocity.totalDoors, sub: '+12% this week', color: 'text-white' },
                            { label: 'Top 3 Rankings', value: stats?.seoVelocity.top3Rankings, sub: 'Dominating Niche', color: 'text-green-400' },
                            { label: 'Avg. Position', value: stats?.seoVelocity.averagePosition, sub: 'Across 10 Languages', color: 'text-blue-400' },
                            { label: 'Market Share', value: '28%', sub: 'Vs. Legacy Big 4', color: 'text-purple-400' },
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{item.label}</p>
                                <p className={`text-3xl font-black ${item.color}`}>{item.value}</p>
                                <p className="text-gray-500 text-[10px] mt-2">{item.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between p-4 bg-primary-600/5 border border-primary-500/10 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <Globe size={20} className="text-primary-400" />
                            <p className="text-sm text-gray-300">Targeting <span className="text-white font-bold">750+ Long-tail clusters</span> in German, Japanese, and Korean markets.</p>
                        </div>
                        <button className="text-primary-400 text-sm font-bold flex items-center gap-1 hover:underline">
                            View Blueprint <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>

                {/* 2. Agent Status (Top Right) */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-4 bg-gray-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
                >
                    <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                        <Zap size={20} className="text-yellow-400" />
                        Autonomous Agents
                    </h2>

                    <div className="space-y-6">
                        {/* MarketPulse */}
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold">MarketPulseAgent</h4>
                                    <p className="text-xs text-gray-400">Proactive News Monitoring</p>
                                </div>
                                <div className="w-10 h-6 bg-green-500/20 border border-green-500/30 rounded-full flex items-center px-1">
                                    <div className="w-4 h-4 bg-green-500 rounded-full ml-auto" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Alerts Sent</p>
                                    <p className="text-lg font-black">{stats?.agentStatus.marketPulse.alertsProcessed}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Status</p>
                                    <p className="text-lg font-black text-green-400 italic">Scanning</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Consultant */}
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold">AIConsultant</h4>
                                    <p className="text-xs text-gray-400">RAG Knowledge Engine</p>
                                </div>
                                <div className="w-10 h-6 bg-green-500/20 border border-green-500/30 rounded-full flex items-center px-1">
                                    <div className="w-4 h-4 bg-green-500 rounded-full ml-auto" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Conversion Lift</p>
                                    <p className="text-lg font-black text-primary-400">{stats?.agentStatus.aiConsultant.conversionLift}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Live Sessions</p>
                                    <p className="text-lg font-black">{stats?.agentStatus.aiConsultant.liveSessions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. Intent Heatmap (Bottom Left) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-12 bg-gray-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
                                <Users size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Global Intent Heatmap</h2>
                                <p className="text-sm text-gray-400 italic">Real-time identification of "Tariff Panic" hotspots</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {stats?.intentHeatmap.map((item: any, i: number) => (
                            <div key={i} className="relative group p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all cursor-crosshair overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-black text-gray-200">{item.region}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${item.score > 80 ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-orange-500/20 border-orange-500/30 text-orange-400'}`}>
                                        Score: {item.score}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 uppercase font-bold">Industry</span>
                                        <span className="text-gray-300">{item.industry}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 uppercase font-bold">Lead Count</span>
                                        <span className="text-white font-black">{item.count}</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full mt-4">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.score}%` }}
                                            className={`h-full rounded-full ${item.score > 80 ? 'bg-red-500' : 'bg-orange-500'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
