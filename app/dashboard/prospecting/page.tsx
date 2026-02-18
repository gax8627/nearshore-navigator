'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';

export default function ProspectingPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleStartCampaign = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setStatus('Parsing leads...');

    try {
      // Parse leads from text (format: Name, Company, Website?)
      const leads = input.split('\n').filter(line => line.trim()).map(line => {
        // Naive parsing: "Name, Company, Website"
        const parts = line.split(',').map(p => p.trim());
        const [name, company, website] = parts;
        return { name, company, website };
      });

      if (leads.length === 0) {
        throw new Error('No valid leads found. key: Name, Company, Website');
      }

      setStatus(`Starting campaign for ${leads.length} leads...`);

      const response = await fetch('/api/agents/prospecting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leads }),
      });

      if (!response.ok) throw new Error('Failed to start campaign');

      setStatus('Campaign started! Agents are working in the background.');
      alert('Campaign started successfully');
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Prospecting Agent</h1>
      <p className="text-gray-500 mb-8">
        Enter leads below to automatically finding contact info, verify with AI, and add to Brevo.
      </p>

      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Leads List (Format: Name, Company, Website - one per line)
          </label>
          <textarea 
            className="w-full min-h-[200px] font-mono p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            placeholder={`Elon Musk, Tesla, tesla.com\nJensen Huang, Nvidia, nvidia.com`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {status && <span className={status.includes('Error') ? 'text-red-500' : 'text-green-600'}>{status}</span>}
            </div>
            <Button 
              onClick={handleStartCampaign} 
              disabled={loading || !input.trim()}
            >
              {loading ? 'Processing...' : 'Start Campaign'}
            </Button>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm text-blue-800 dark:text-blue-200">
           <strong>How it works:</strong>
           <ul className="list-disc ml-5 mt-1 space-y-1">
             <li>Agents search the web for contact info.</li>
             <li>AI verifies the data and confidence level.</li>
             <li>Verified leads (&gt;70% confidence) are added to Brevo.</li>
             <li>An introductory email is sent automatically.</li>
           </ul>
        </div>
      </div>
    </div>
  );
}
