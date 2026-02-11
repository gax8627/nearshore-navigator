export interface LeadNotification {
  name: string;
  email: string;
  company: string;
  score: number;
  category: 'High' | 'Medium' | 'Low';
  tags: string[];
}

export async function notifyLead(lead: LeadNotification) {
  // Simulation of Slack/Webhook/Email notifications
  // In production, this would use fetch() to a Slack Webhook or Resend API
  
  const timestamp = new Date().toISOString();
  
  if (lead.category === 'High') {
    console.log(`[${timestamp}] 🚨 PRIORITY ALERT: High-value lead from ${lead.company} (${lead.name})`);
    console.log(`[${timestamp}] 📈 Score: ${lead.score} | Tags: ${lead.tags.join(', ')}`);
    // Example: await fetch(process.env.SLACK_WEBHOOK_URL!, { method: 'POST', body: JSON.stringify({...}) });
  } else {
    console.log(`[${timestamp}] Lead Captured: ${lead.name} (${lead.company}) - Category: ${lead.category}`);
  }

  return { success: true, dispatchedAt: timestamp };
}
