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
    console.log(`❌ Log file not found at ${logPath}`);
    return;
  }
  
  const content = fs.readFileSync(logPath, 'utf-8');
  const lines = content.trim().split('\n');
  
  // Let's traverse backwards to find the last step where the source is MODEL and type is PLANNER_RESPONSE
  let found = false;
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const parsed = JSON.parse(lines[i]);
      if (parsed.source === 'MODEL' && parsed.type === 'PLANNER_RESPONSE' && parsed.content) {
        console.log(parsed.content);
        found = true;
        break;
      }
    } catch (e: any) {
      // ignore parsing errors
    }
  }
  
  if (!found) {
    // If no PLANNER_RESPONSE with content found, print the last 2 lines
    console.log('No planner response content found. Last 2 lines of log:');
    const lastLines = lines.slice(-2);
    lastLines.forEach(l => console.log(l));
  }
});
