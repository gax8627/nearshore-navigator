import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { hasEmailBudget, getEmailBudget } from '../lib/email-usage-tracker';

async function triggerCampaign() {
  if (!hasEmailBudget()) {
    const budget = getEmailBudget();
    console.error(`❌ BUDGET ALARM: Monthly Limit Reached (${budget.current}/${budget.limit}). Campaign suspended.`);
    return;
  }

  const filePath = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_1.csv');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Robust CSV parsing to handle commas in quotes
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  const BATCH_SIZE = 50;
  const leads = records.slice(0, BATCH_SIZE).map((r: any) => ({
    id: r['Lead Id'],
    name: `${r['First Name']} ${r['Last Name']}`,
    company: r['Company'],
    email: r['Email']
  })).filter((l: any) => l.name && l.company);

  console.log(`Prepared ${leads.length} leads for the prospecting agent.`);

  try {
    const response = await fetch('http://localhost:3000/api/agents/prospecting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leads })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Campaign triggered successfully:', result);
    } else {
      console.error('Failed to trigger campaign:', await response.text());
    }
  } catch (error) {
    console.error('Error triggering campaign. Is the server running on http://localhost:3000?', error);
  }
}

triggerCampaign();
