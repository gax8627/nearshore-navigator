"use client";

import { useState, useEffect } from "react";
import { Users, Loader2, Send } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [researching, setResearching] = useState<number | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const handleResearch = async (lead: any) => {
    if (!lead.email) return;
    setResearching(lead.id);
    try {
        const res = await fetch("/api/admin/ai/research-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: lead.email }),
        });
        const data = await res.json();
        if (data.result) {
            alert(`Research Complete:\nIndustry: ${data.result.industry}\nSize: ${data.result.size}\nSummary: ${data.result.summary}`);
            // In a real app, we'd update the DB and local state here
        } else {
            alert("No data found");
        }
    } catch (e) {
        alert("Research failed");
    } finally {
        setResearching(null);
    }
  };

  const handleSmartReply = async (lead: any) => {
    const intent = prompt("What is your goal? (book_meeting, send_info, objection_handling)");
    if (!intent) return;

    try {
        const res = await fetch("/api/admin/ai/smart-reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                leadName: lead.name, 
                leadCompany: lead.company,
                lastMessage: lead.message,
                intent 
            }),
        });
        const data = await res.json();
        if (data.reply) {
            navigator.clipboard.writeText(data.reply);
            alert("Draft copied to clipboard:\n\n" + data.reply);
        }
    } catch (e) {
        alert("Reply generation failed");
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-gray-500">Loading leads...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Leads Database</h1>
           <p className="text-slate-500 dark:text-gray-400 mt-1">Manage and enrich your leads</p>
        </div>
        <div className="bg-primary-50 dark:bg-slate-800 px-4 py-2 rounded-lg text-sm text-primary-700 dark:text-primary-300 font-medium">
            Total Leads: {leads.length}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
            <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-left bg-gray-50 dark:bg-gray-800/50">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Lead</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tags</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Agents</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                            <p className="text-sm font-medium text-slate-800 dark:text-white">{lead.name}</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400">{lead.company}</p>
                            <p className="text-xs text-slate-400 dark:text-gray-500">{lead.email}</p>
                        </td>
                        <td className="px-6 py-4">
                           <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-gray-700">
                               {lead.category || 'Standard'}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full border ${
                                lead.status === 'new' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                                lead.status === 'bounced' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' :
                                'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                            }`}>
                                {lead.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                                {JSON.parse(lead.tags || '[]').map((t: string, i: number) => (
                                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700">{t}</span>
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleResearch(lead)}
                                    disabled={researching === lead.id}
                                    className="p-1.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 rounded hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                                    title="Research Lead"
                                >
                                    {researching === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                                </button>
                                <button 
                                    onClick={() => handleSmartReply(lead)}
                                    className="p-1.5 bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 rounded hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
                                    title="Smart Reply"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {leads.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                            No leads found. Import some in the CRM tab.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
