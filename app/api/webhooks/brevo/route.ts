import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';
import { classifyReplyIntent } from '@/lib/agents/intent-classifier';

export async function POST(req: Request) {
  try {
    // Signature verification: Brevo signs webhook payloads with a secret.
    // Set BREVO_WEBHOOK_SECRET in your environment to enable verification.
    const webhookSecret = process.env.BREVO_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers.get('x-brevo-signature') || req.headers.get('x-sib-signature');
      if (!signature || signature !== webhookSecret) {
        console.warn('[Brevo webhook] Invalid or missing signature — rejecting request');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const payload = await req.json();
    console.log('Webhook received:', JSON.stringify(payload));

    const event = payload; 
    const eventType = event.event; // 'opened', 'clicked', 'delivered', 'reply'

    // 1. Handle Stats (Opens/Clicks)
    if (event.tags && Array.isArray(event.tags)) {
        const campaignTag = event.tags.find((t: string) => t.startsWith('campaign_'));
        if (campaignTag) {
            const campaignId = parseInt(campaignTag.split('_')[1]);
            if (!isNaN(campaignId)) {
                const { db } = await import('@/lib/db');
                const { campaigns } = await import('@/lib/db/schema');
                const { eq } = await import('drizzle-orm');

                const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
                if (campaign) {
                    let stats = JSON.parse(campaign.stats);
                    if (eventType === 'opened') stats.opened = (stats.opened || 0) + 1;
                    else if (eventType === 'click' || eventType === 'clicked') stats.clicked = (stats.clicked || 0) + 1;
                    
                    await db.update(campaigns).set({ stats: JSON.stringify(stats) }).where(eq(campaigns.id, campaignId));
                }
            }
        }
    }

    // 2. Handle Transitions (Bounces)
    if (['hard_bounce', 'soft_bounce', 'blocked', 'spam', 'invalid_email'].includes(eventType)) {
        const { db } = await import('@/lib/db');
        const { leads } = await import('@/lib/db/schema');
        const { eq } = await import('drizzle-orm');
        
        await db.update(leads)
            .set({ status: 'bounced' })
            .where(eq(leads.email, event.email));
    }

    // 3. Handle Conversions (REPLY EVENT)
    if (eventType === 'reply') {
        const replyText = event.content || event.body || "";
        const email = event.email;

        console.log(`[Reply Handler] Processing reply from ${email}: ${replyText.substring(0, 50)}...`);

        // Classify intent using Gemini
        const classification = await classifyReplyIntent(replyText);
        console.log(`[Reply Handler] Classified intent: ${classification.intent} (${classification.confidence})`);

        const { db } = await import('@/lib/db');
        const { leads } = await import('@/lib/db/schema');
        const { eq } = await import('drizzle-orm');

        if (classification.intent === 'YES_PDF') {
            // Update Lead Status
            await db.update(leads)
                .set({ status: 'contacted', tags: JSON.stringify(['YES_REPLY', 'PDF_REQUESTED']) })
                .where(eq(leads.email, email));

            // Trigger Inngest Lead Magnet Delivery
            await inngest.send({
                name: 'lead.requested.magnet',
                data: { email, pdfRequested: 'Outreach_Shortlist_PDF' }
            });
        } else if (classification.intent === 'MEETING_REQUEST') {
            await db.update(leads)
                .set({ status: 'warm_interest', urgency: 'HIGH', tags: JSON.stringify(['MEETING_REQUEST']) })
                .where(eq(leads.email, email));
                
            // Here you could trigger a "Priority Meeting" workflow
        } else if (classification.intent === 'UNSUBSCRIBE') {
            await db.update(leads)
                .set({ status: 'archived', tags: JSON.stringify(['UNSUBSCRIBE']) })
                .where(eq(leads.email, email));
        }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
