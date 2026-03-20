export interface LeadNotification {
  name: string;
  email: string;
  company: string;
  score: number;
  intentCategory: string;
  urgency: string;
  tags: string[];
}

export async function notifyLead(lead: LeadNotification) {
  const timestamp = new Date().toISOString();
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  // Determine Emoji
  const emoji = lead.intentCategory === 'TARIFF_PANIC' ? '🚨' : 
                lead.urgency === 'CRITICAL' ? '🔥' : '📈';

  const message = `${emoji} *NEW LEAD CAPTURED: ${lead.intentCategory}*
> *Name:* ${lead.name}
> *Company:* ${lead.company}
> *Email:* ${lead.email}
> *Urgency:* ${lead.urgency}
> *Score:* ${lead.score}
> *Tags:* ${lead.tags.join(', ')}`;

  console.log(`[${timestamp}] ${message}`);

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });
    } catch (e) {
      console.error('[Notifications] Failed to send Slack alert:', e);
    }
  }

  return { success: true, dispatchedAt: timestamp };
}
