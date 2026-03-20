"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Search,
    AlertTriangle,
    CheckCircle2,
    BarChart3,
    Terminal,
    ArrowUpRight
} from 'lucide-react';

export default function AdminCommandCenter() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAutonomous, setIsAutonomous] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
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
        const interval = setInterval(fetchStats, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    if (!hasMounted) return null;

    if (isLoading) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-primary-500 font-mono animate-pulse">BOOTING COMMAND_CENTER_V3...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
            {/* Top Critical Alert (Fixed) */}
            <AnimatePresence>
                {stats?.panicCount > 0 && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-red-600/90 backdrop-blur-md px-4 py-2 flex items-center justify-center gap-4 border-b border-red-500"
                    >
                        <AlertTriangle size={18} className="animate-bounce" />
                        <span className="font-black uppercase tracking-widest text-sm">
                            Critical Alert: {stats.panicCount} Leads identified with "TARIFF_PANIC" intent.
                        </span>
                        <button className="px-3 py-1 bg-white text-red-600 text-xs font-black rounded-lg hover:bg-gray-100 transition-colors">
                            RESCUE NOW
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-8 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <header className="mb-12 flex justify-between items-start">
                    <div className="relative">
                        <div className="flex items-center gap-2 text-primary-500 mb-2">
                            <ShieldCheck size={16} />
                            <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70">Authenticated Access: CEO NODE</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter italic">COMMAND CENTER</h1>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <Activity size={12} className="text-green-500" />
                                <span className="text-[10px] font-bold text-gray-400">UPTIME: 99.9%</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <Globe size={12} className="text-blue-500" />
                                <span className="text-[10px] font-bold text-gray-400">LOCATIONS: 10 ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl">
                            <span className={`text-xs font-bold uppercase ${isAutonomous ? 'text-primary-400' : 'text-gray-500'}`}>
                                {isAutonomous ? 'Autonomous Mode' : 'Manual Oversight'}
                            </span>
                            <button 
                                onClick={() => setIsAutonomous(!isAutonomous)}
                                className={`w-14 h-8 rounded-full transition-colors relative ${isAutonomous ? 'bg-primary-600' : 'bg-gray-700'}`}
                            >
                                <motion.div 
                                    animate={{ x: isAutonomous ? 26 : 4 }}
                                    className="w-6 h-6 bg-white rounded-full absolute top-1"
                                />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                <Settings size={20} />
                            </button>
                            <button className="px-6 py-3 bg-white text-black font-black rounded-xl text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
                                <Terminal size={18} />
                                EXPORT LOGS
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: PRIMARY STATS & INTENT */}
                    <div className="col-span-8 space-y-8">
                        
                        {/* SEO MATIX VELOCITY */}
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group">
                           <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 blur-[100px] border border-primary-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                           
                           <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-black mb-1">Matrix Dominance</h2>
                                    <p className="text-gray-500 text-sm">Real-time indexed visibility across 5,000+ Entry Doors</p>
                                </div>
                                <BarChart3 className="text-gray-600" size={24} />
                           </div>

                           <div className="grid grid-cols-3 gap-10">
                                <div>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Total Doors</p>
                                    <h3 className="text-4xl font-black">{stats?.seoVelocity.totalDoors}</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold mt-2">
                                        <ArrowUpRight size={10} /> +12% MoM
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Google Indexing</p>
                                    <h3 className="text-4xl font-black">{stats?.seoVelocity.indexedPages}</h3>
                                    <p className="text-[10px] text-gray-500 font-bold mt-2">98.4% Efficiency</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Avg. Rank Position</p>
                                    <h3 className="text-4xl font-black text-primary-500">{stats?.seoVelocity.averagePosition}</h3>
                                    <p className="text-[10px] text-gray-500 font-bold mt-2">Niche Mastery Level</p>
                                </div>
                           </div>
                        </div>

                        {/* INTENT DISTRIBUTION (Heatmap Style) */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-gray-900/40 border border-white/5 rounded-[2rem] p-8">
                                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                    <Users size={18} className="text-blue-400" />
                                    Intent Intelligence
                                </h3>
                                <div className="space-y-4">
                                    {stats?.intentDistribution.map((item: any, i: number) => (
                                        <div key={i} className="group">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-[10px] font-black uppercase text-gray-500 group-hover:text-white transition-colors">{item.category}</span>
                                                <span className="text-xs font-bold">{item.count} Leads</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(item.count / 50) * 100}%` }}
                                                    className={`h-full rounded-full ${item.category === 'TARIFF_PANIC' ? 'bg-red-500' : 'bg-primary-500'}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-primary-600/10 border border-primary-500/20 rounded-[2rem] p-8 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                                        <Zap size={18} className="text-yellow-400" />
                                        Intervention Engine
                                    </h3>
                                    <p className="text-xs text-primary-200/60 mb-6">Autonomous responders actively engaging prospects.</p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-bold">Resort Rescue Sequence</span>
                                            </div>
                                            <span className="text-[10px] font-black text-primary-400">ACTIVE</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-bold">Tariff FAQ Broadcaster</span>
                                            </div>
                                            <span className="text-[10px] font-black text-primary-400">ACTIVE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: RECENT PULSE & ALERTS */}
                    <div className="col-span-4 space-y-8">
                        
                        {/* THE PULSE (LIVE FEED) */}
                        <div className="bg-gray-900/40 border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col">
                            <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                                <Activity size={20} className="text-primary-500" />
                                Real-time Pulse
                            </h2>

                            <div className="space-y-4 flex-1">
                                {stats?.recentUrgentLeads.map((lead: any, i: number) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-sm font-black tracking-tight">{lead.company || lead.name}</h4>
                                                <p className="text-[10px] text-gray-500">{lead.time}</p>
                                            </div>
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                                                lead.category === 'TARIFF_PANIC' ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                                            }`}>
                                                {lead.category.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3">
                                            <TrendingUp size={10} className="text-primary-500" />
                                            <span className="text-[9px] font-bold text-primary-400">URGENCY: {lead.urgency}</span>
                                        </div>
                                    </motion.div>
                                ))}

                                {stats?.recentUrgentLeads.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <CheckCircle2 size={32} className="text-gray-800 mb-2" />
                                        <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Sky is Clear</p>
                                        <p className="text-[10px] text-gray-700 mt-1">No critical intervention needed.</p>
                                    </div>
                                )}
                            </div>

                            <button className="w-full py-4 mt-8 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
                                View Intelligence Board
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Status Line */}
                <footer className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 font-mono">
                    <div className="flex gap-8">
                        <span>NODE: NAVIGATOR_MAIN_01</span>
                        <span>REGION: US-WEST-2</span>
                        <span>LATENCY: 42ms</span>
                    </div>
                    <div>
                        © 2026 NEARSHORE NAVIGATOR // AUTONOMOUS OPERATING SYSTEM
                    </div>
                </footer>
            </div>
        </div>
    );
}
