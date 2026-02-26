import React from 'react';

export default function MarketingDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing OS Overview</h1>
            <p className="text-gray-600 mt-2">Real-time performance of your automated acquisition engine.</p>
          </div>

          {/* Top Level Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard title="Total Leads (30d)" value="42" trend="+12%" positive />
            <MetricCard title="Est. Pipeline Value" value="$1.2M" trend="+5%" positive />
            <MetricCard title="Content Drafts Pending" value="2" alert />
            <MetricCard title="Email Open Rate" value="48.5%" trend="-2%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Leads */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Inbound Leads</h3>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Jenkins', company: 'MedTech GMBH', source: 'Medical Device Campaign', time: '2 hours ago', score: 10 },
                  { name: 'David Cho', company: 'Aero Dynamics', source: 'Organic Search', time: '5 hours ago', score: 8 },
                  { name: 'Emily Thorne', company: '-', source: 'Lead Magnet: 2026 Guide', time: '1 day ago', score: 4 },
                ].map((lead, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.name} <span className="text-xs font-normal text-gray-500 ml-2">{lead.company}</span></p>
                        <p className="text-sm text-gray-500">Source: {lead.source}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-teal-700">AI Score: {lead.score}/10</p>
                      <p className="text-xs text-gray-400">{lead.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-teal-600 font-medium hover:text-teal-700">View All Leads &rarr;</button>
            </div>

            {/* AI Agent Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Status</h3>
              <div className="space-y-4">
                <AgentStatus name="Lead Enrichment Robot" status="active" lastRun="2 hours ago" />
                <AgentStatus name="LinkedIn Content Engine" status="waiting" lastRun="1 day ago" />
                <AgentStatus name="Sales Prospecting Agent" status="active" lastRun="10 mins ago" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, trend, positive, alert }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
        {alert && (
          <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
            Action Needed
          </span>
        )}
      </div>
    </div>
  );
}

function AgentStatus({ name, status, lastRun }: any) {
  const isWaiting = status === 'waiting';
  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={`w-2 h-2 rounded-full ${isWaiting ? 'bg-amber-400' : 'bg-green-500 animate-pulse'}`} />
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 capitalize">Status: {status}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400">{lastRun}</span>
    </div>
  );
}
