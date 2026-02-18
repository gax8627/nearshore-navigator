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
