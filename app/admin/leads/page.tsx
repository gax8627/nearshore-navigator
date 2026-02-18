"use client";

import { useState, useEffect } from "react";
import { Users, Download, Search, Filter } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  status: string;
  score: number;
  category: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  contacted: "bg-yellow-500/20 text-yellow-400",
  meeting_booked: "bg-purple-500/20 text-purple-400",
  closed: "bg-green-500/20 text-green-400",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  meeting_booked: "Meeting Booked",
  closed: "Closed",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setLeads(data.leads || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/leads`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
      }
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["Name", "Email", "Company", "Phone", "Score", "Status", "Date"];
    const rows = leads.map((l) => [
      l.name, l.email, l.company, l.phone || "", 
      l.score?.toString() || "0", l.status,
      new Date(l.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Filtered leads
  const filtered = leads.filter((l) => {
    const matchesStatus = filterStatus === "all" || l.status === filterStatus;
    const matchesSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-gray-400 mt-1">{leads.length} total submissions</p>
        </div>
        <button
          onClick={exportCSV}
          disabled={leads.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-700 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-500 focus:border-primary-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {["all", "new", "contacted", "meeting_booked", "closed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                filterStatus === status
                  ? "bg-primary-500/20 text-primary-400 border-primary-500/30"
                  : "bg-gray-900 text-gray-500 border-gray-800 hover:text-gray-300"
              }`}
            >
              {status === "all" ? "All" : statusLabels[status]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading leads...</div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-yellow-400 text-sm mb-2">⚠️ Database not connected</p>
            <p className="text-gray-500 text-sm">Connect Vercel Postgres to view leads.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              {leads.length === 0 ? "No leads yet. They'll appear when someone fills out the contact form." : "No leads match your filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{lead.company}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold ${
                        lead.score >= 70 ? "text-green-400" : lead.score >= 40 ? "text-yellow-400" : "text-gray-500"
                      }`}>
                        {lead.score}/100
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-none outline-none cursor-pointer ${
                          statusColors[lead.status] || "bg-gray-800 text-gray-400"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="meeting_booked">Meeting Booked</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
