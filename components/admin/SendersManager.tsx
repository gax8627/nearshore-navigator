"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, User, Check } from "lucide-react";

export function SendersManager() {
  const [senders, setSenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSender, setNewSender] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchSenders();
  }, []);

  const fetchSenders = async () => {
    try {
      const res = await fetch("/api/admin/crm/senders");
      const data = await res.json();
      setSenders(data.senders || []);
      setLoading(false);
    } catch (e) {
      console.error("Failed to fetch senders");
    }
  };

  const handleCreate = async () => {
    if (!newSender.name || !newSender.email) return;
    const res = await fetch("/api/admin/crm/senders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSender),
    });
    if (res.ok) {
      setNewSender({ name: "", email: "" });
      fetchSenders();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this sender identity?")) return;
    await fetch(`/api/admin/crm/senders?id=${id}`, { method: "DELETE" });
    fetchSenders();
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">Sender Identities</h2>
      
      {/* List */}
      <div className="space-y-4 mb-8">
        {senders.map((sender) => (
          <div key={sender.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-700 rounded-full">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="font-medium text-white">{sender.name}</p>
                <p className="text-sm text-gray-400">{sender.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               {sender.isDefault && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Default</span>}
               <button onClick={() => handleDelete(sender.id)} className="text-red-400 hover:text-red-300">
                 <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
        {senders.length === 0 && !loading && (
            <p className="text-center text-gray-500 py-4">No senders configured. (Default: denisse@nearshorenavigator.com)</p>
        )}
      </div>

      {/* Add New */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Add New Sender</h3>
        <div className="flex gap-4">
            <input 
                type="text" 
                placeholder="Name (e.g. Sales Team)" 
                className="flex-1 bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
                value={newSender.name}
                onChange={e => setNewSender({...newSender, name: e.target.value})}
            />
            <input 
                type="email" 
                placeholder="Email (Must be verified in Brevo)" 
                className="flex-1 bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
                value={newSender.email}
                onChange={e => setNewSender({...newSender, email: e.target.value})}
            />
            <button 
                onClick={handleCreate}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2"
            >
                <Plus className="w-4 h-4" /> Add
            </button>
        </div>
        <p className="text-xs text-yellow-500/80 mt-2">⚠️ Important: You must verify this email address in your Brevo dashboard before sending.</p>
      </div>
    </div>
  );
}
