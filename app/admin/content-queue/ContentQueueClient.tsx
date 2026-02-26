'use client';

import React, { useState } from 'react';

export default function ContentQueueClient({ initialDrafts }: { initialDrafts: any[] }) {
  const [drafts, setDrafts] = useState(initialDrafts);

  const pendingCount = drafts.filter(d => d.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Content Queue</h1>
            <span className="bg-teal-100 text-teal-800 py-1 px-3 rounded-full text-sm font-semibold">
              {pendingCount} Pending Approval
            </span>
          </div>

          <p className="text-gray-600 mb-8 max-w-2xl">
            Review LinkedIn drafts generated automatically by your AI agents from your latest blog posts. Approve them to schedule, or edit them before posting.
          </p>

          <div className="space-y-6">
            {drafts.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500">No social drafts generated yet. Publish a blog post to trigger the AI agent.</p>
              </div>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Source Article</span>
                      <h3 className="font-semibold text-gray-900">{draft.postTitle}</h3>
                    </div>
                    <span className="text-xs text-gray-400">{draft.generatedAt}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 whitespace-pre-wrap font-sans text-gray-800">
                    {draft.content}
                  </div>

                  <div className="flex items-center space-x-3">
                    {draft.status === 'pending' ? (
                        <>
                            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-medium transition-colors text-sm flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Approve & Schedule
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded font-medium transition-colors text-sm">
                                Edit Draft
                            </button>
                            <button className="text-red-600 hover:bg-red-50 px-4 py-2 rounded font-medium transition-colors text-sm ml-auto">
                                Discard
                            </button>
                        </>
                    ) : (
                        <span className="text-sm font-semibold text-teal-600 capitalize">Status: {draft.status}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
