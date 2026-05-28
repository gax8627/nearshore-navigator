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
  console.log(`Total steps/lines in transcript: ${lines.length}`);
  
  // Find any messages sent to parent or last few steps
  const lastSteps = lines.slice(-5);
  lastSteps.forEach((line, idx) => {
    try {
      const parsed = JSON.parse(line);
      console.log(`\nStep ${parsed.step_index} [Source: ${parsed.source}, Type: ${parsed.type}, Status: ${parsed.status}]`);
      if (parsed.content) {
        // Output a snippet
        const length = parsed.content.length;
        if (length > 1000) {
          console.log(parsed.content.substring(0, 500) + '\n... [TRUNCATED] ...\n' + parsed.content.substring(length - 500));
        } else {
          console.log(parsed.content);
        }
      }
      if (parsed.tool_calls) {
        console.log(`Tool Calls:`, JSON.stringify(parsed.tool_calls, null, 2));
      }
    } catch (e: any) {
      console.log(`Error parsing line ${idx}: ${e.message}`);
    }
  });
});
