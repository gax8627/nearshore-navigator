"use default";
"use client";

import { useState } from "react";
import { Settings, Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">Manage platform configuration</p>
                </div>
            </div>

            <div className="grid gap-6 max-w-2xl">
                {/* Database Connection */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <RefreshCw className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-white mb-1">Database Connection</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Status: <span className="text-green-400 font-medium">Connected</span> (Vercel Postgres)
                            </p>
                            <p className="text-xs text-gray-500">
                                Your database is automatically configured via Vercel integration.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SEO & Indexing */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-lg">
                            <RefreshCw className={`w-6 h-6 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-white mb-1">SEO & Indexing Engine</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Manually trigger indexing pings for all production URLs to Google and Bing.
                            </p>
                            <button 
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        const res = await fetch('/api/admin/seo/force-index', { method: 'POST' });
                                        const data = await res.json();
                                        if (data.success) {
                                            alert("✅ Indexing pings sent successfully!");
                                        } else {
                                            alert("❌ Error: " + data.error);
                                        }
                                    } catch (e) {
                                        alert("❌ Network error triggering indexer.");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                disabled={loading}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
                            >
                                {loading ? "Pinging Engines..." : "Force Global Re-Crawl"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* AI Configuration Placeholder */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 opacity-50">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <Settings className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-white mb-1">AI Blog Assistant</h3>
                            <p className="text-sm text-gray-400 mb-4">Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
