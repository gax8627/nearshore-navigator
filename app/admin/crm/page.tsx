"use client";

import { useState, useEffect } from "react";
import { Upload, Mail, Users, Plus, FileText, Send, CheckCircle, AlertCircle, Loader2, User } from "lucide-react";
import Link from "next/link";
import { SendersManager } from "@/components/admin/SendersManager";

export default function CrmPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({ leads: 0, campaigns: 0 });
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]); // Store leads
  const [senders, setSenders] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [researching, setResearching] = useState<number | null>(null); // Track researching lead ID

  // ... existing upload state ...

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
            // Copy to clipboard or show modal
            navigator.clipboard.writeText(data.reply);
            alert("Draft copied to clipboard:\n\n" + data.reply);
        }
    } catch (e) {
        alert("Reply generation failed");
    }
  };

  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  // New Campaign State
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: "", subject: "", content: "", segment: "all", template: "standard", senderId: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, campaignsRes, sendersRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/crm/campaigns"),
        fetch("/api/admin/crm/senders")
      ]);
      const leadsData = await leadsRes.json();
      const campaignsData = await campaignsRes.json();
      const sendersData = await sendersRes.json();

      setStats({
        leads: leadsData.leads?.length || 0,
        campaigns: campaignsData.campaigns?.length || 0
      });
      setLeads(leadsData.leads || []);
      setCampaigns(campaignsData.campaigns || []);
      setSenders(sendersData.senders || []);
    } catch (error) {
      console.error("Failed to load CRM data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("source", "csv_upload");

    try {
      const res = await fetch("/api/admin/crm/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadResult(`Success! Imported ${data.count} leads.`);
        setFile(null);
        fetchData(); // Refresh stats
      } else {
        setUploadResult(`Error: ${data.error}`);
      }
    } catch (err) {
      setUploadResult("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.subject) return;
    
    // Call API to create logic... for MVP just mocking the creation in UI or implementing properly
    try {
      const res = await fetch("/api/admin/crm/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      });
      if (res.ok) {
        setShowCampaignModal(false);
        setNewCampaign({ name: "", subject: "", content: "", segment: "all", template: "standard", senderId: "" });
        fetchData();
      } else {
        alert("Failed to create campaign");
      }
    } catch (err) {
      alert("Error creating campaign");
    }
  };

  const handleSendCampaign = async (campaignId: number) => {
    if (!confirm("Are you sure you want to send this campaign to all leads in the segment?")) return;
    
    try {
        const res = await fetch("/api/admin/crm/campaigns/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ campaignId }),
        });
        const data = await res.json();
        if (res.ok) {
            alert(`Campaign queued! Sent ${data.sent} emails.`);
            fetchData();
        } else {
            alert(`Failed: ${data.error}`);
        }
    } catch (err) {
        alert("Error sending campaign");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-2xl font-bold text-white">CRM & Marketing</h1>
           <p className="text-gray-400 mt-1">Manage leads and email campaigns</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "leads" ? "bg-primary-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
                <Users className="w-4 h-4 inline-block mr-2" />
                 Leads
            </button>
            <button 
                onClick={() => setActiveTab("senders")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "senders" ? "bg-primary-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
                <User className="w-4 h-4 inline-block mr-2" />
                 identities
            </button>
            <button 
                onClick={() => setActiveTab("upload")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "upload" ? "bg-primary-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
                <Upload className="w-4 h-4 inline-block mr-2" />
                Import Leads
            </button>
            <button 
                onClick={() => setShowCampaignModal(true)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
            >
                <Plus className="w-4 h-4 inline-block mr-2" />
                New Campaign
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Total Leads</p>
                    <h3 className="text-2xl font-bold text-white">{stats.leads}</h3>
                </div>
            </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Campaigns Sent</p>
                    <h3 className="text-2xl font-bold text-white">{stats.campaigns}</h3>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "upload" ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Import Leads via CSV</h2>
            
            <form onSubmit={handleUpload} className="space-y-6">
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-primary-500 transition-colors cursor-pointer relative">
                    <input 
                        type="file" 
                        accept=".csv"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    {file ? (
                        <p className="text-white font-medium">{file.name}</p>
                    ) : (
                        <div>
                            <p className="text-gray-300 font-medium">Click to upload or drag & drop</p>
                            <p className="text-sm text-gray-500 mt-2">CSV must include 'email' column</p>
                        </div>
                    )}
                </div>

                {uploadResult && (
                    <div className={`p-4 rounded-lg text-sm ${uploadResult.startsWith("Success") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                        {uploadResult}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => { setActiveTab("overview"); setUploadResult(null); }}
                        className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!file || uploading}
                        className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {uploading ? "Importing..." : "Start Import"}
                    </button>
                </div>
            </form>
        </div>
      ) : activeTab === "leads" ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Leads Database</h3>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-800 text-left">
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Lead</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tags</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Agents</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-800/50">
                            <td className="px-6 py-4">
                                <p className="text-sm font-medium text-white">{lead.name}</p>
                                <p className="text-xs text-gray-400">{lead.company}</p>
                                <p className="text-xs text-gray-500">{lead.email}</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                    lead.status === 'bounced' ? 'bg-red-500/20 text-red-400' :
                                    'bg-gray-700 text-gray-300'
                                }`}>
                                    {lead.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {JSON.parse(lead.tags || '[]').map((t: string, i: number) => (
                                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded border border-gray-700">{t}</span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleResearch(lead)}
                                        disabled={researching === lead.id}
                                        className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded hover:bg-indigo-500/20 transition-colors"
                                        title="Research Lead"
                                    >
                                        {researching === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                                    </button>
                                    <button 
                                        onClick={() => handleSmartReply(lead)}
                                        className="p-1.5 bg-purple-500/10 text-purple-400 rounded hover:bg-purple-500/20 transition-colors"
                                        title="Smart Reply"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      ) : activeTab === "senders" ? (
        <SendersManager />
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Recent Campaigns</h3>
            </div>
            {campaigns.length === 0 ? (
                <div className="p-12 text-center">
                    <Mail className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No campaigns yet.</p>
                    <button 
                        onClick={() => setShowCampaignModal(true)}
                        className="text-primary-400 text-sm hover:underline mt-2 inline-block"
                    >
                        Create your first campaign →
                    </button>
                </div>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-800 text-left">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Segment</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sent Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {campaigns.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-800/50">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-white">{c.name}</p>
                                    <p className="text-xs text-gray-500">{c.subject}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'sent' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">{c.segment}</td>
                                <td className="px-6 py-4 text-xs text-gray-500">
                                    {c.sentAt ? new Date(c.sentAt).toLocaleDateString() : (
                                        <button 
                                            onClick={() => handleSendCampaign(c.id)}
                                            className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors"
                                        >
                                            <Send className="w-3 h-3" />
                                            Send Now
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
      )}

      {/* New Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">New Email Campaign</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Campaign Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
                            value={newCampaign.name}
                            onChange={e => setNewCampaign({...newCampaign, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Subject Line</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
                            value={newCampaign.subject}
                            onChange={e => setNewCampaign({...newCampaign, subject: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">From Sender</label>
                        <select 
                            className="w-full bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
                            value={newCampaign.senderId}
                            onChange={e => setNewCampaign({...newCampaign, senderId: e.target.value})}
                        >
                            <option value="">Default (Denisse)</option>
                            {senders.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Segment</label>
                        <select 
                            className="w-full bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
                            value={newCampaign.segment}
                            onChange={e => setNewCampaign({...newCampaign, segment: e.target.value})}
                        >
                            <option value="all">All Leads</option>
                            <option value="new">New Leads</option>
                            <option value="contacted">Contacted</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email Design</label>
                        <select 
                            className="w-full bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
                            value={newCampaign.template}
                            onChange={e => setNewCampaign({...newCampaign, template: e.target.value})}
                        >
                            <option value="standard">Standard (Plain/HTML)</option>
                            <option value="liquid_glass">✨ Premium Liquid Glass</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Content (Body)</label>
                        <textarea 
                            className="w-full bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white h-32"
                            value={newCampaign.content}
                            onChange={e => setNewCampaign({...newCampaign, content: e.target.value})}
                            placeholder="<p>Hello...</p>"
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button 
                            onClick={() => setShowCampaignModal(false)}
                            className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleCreateCampaign}
                            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                        >
                            Create Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
