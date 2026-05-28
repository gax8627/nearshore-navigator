import fs from 'fs';
import path from 'path';

const subagents = [
  { id: 'fc1dbe5a-6bbe-4c4e-a9fe-1dfbf60a4f5f', name: 'Brevo Email Analytics Analyst' },
  { id: '1c9e389a-c3ec-42b8-b674-5a2579209c4a', name: 'Google Search Console Analyst' },
  { id: '01b0af0e-07b7-4148-ae38-8cdc38a13b8e', name: 'Manufacturing Economy Researcher' }
];

subagents.forEach(agent => {
  const logPath = `/Users/gax8627/.gemini/antigravity/brain/${agent.id}/.system_generated/logs/transcript.jsonl`;
  console.log(`\n==================================================`);
  console.log(`AGENT: ${agent.name} (${agent.id})`);
  console.log(`==================================================`);
  if (!fs.existsSync(logPath)) {
    console.log(`❌ Log file not found`);
    return;
  }
  
  const content = fs.readFileSync(logPath, 'utf-8');
  const lines = content.trim().split('\n');
  
  lines.forEach((line, idx) => {
    try {
      const parsed = JSON.parse(line);
      const snippet = parsed.content ? parsed.content.substring(0, 150).replace(/\n/g, ' ') : '';
      console.log(`Step ${idx}: Source=${parsed.source}, Type=${parsed.type}, Status=${parsed.status} | Snippet: ${snippet}`);
    } catch (e: any) {
      console.log(`Error parsing line ${idx}: ${e.message}`);
    }
  });
});
