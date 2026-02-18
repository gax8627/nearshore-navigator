import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Brevo sends a JSON payload. It might be a single object or related to events.
    // Documentation: https://developers.brevo.com/docs/transactional-webhooks
    const payload = await req.json();
    
    console.log('Webhook received:', JSON.stringify(payload));

    // Handle both single event and batch events if applicable (Brevo usually sends one by one for transactional)
    const event = payload; // Assuming single event object structure: { event: 'opened', email: '...', tags: [...] }

    if (!event || !event.tags || !Array.isArray(event.tags)) {
        return NextResponse.json({ received: true, ignored: 'no tags' });
    }

    // Extract campaign tag: "campaign_123"
    const campaignTag = event.tags.find((t: string) => t.startsWith('campaign_'));
    if (!campaignTag) {
        return NextResponse.json({ received: true, ignored: 'no campaign tag' });
    }

    const campaignId = parseInt(campaignTag.split('_')[1]);
    if (isNaN(campaignId)) {
        return NextResponse.json({ received: true, ignored: 'invalid campaign id' });
    }

    const eventType = event.event; // 'opened', 'clicked', 'delivered', 'hard_bounce'

    // Update Stats in DB
    const { db } = await import('@/lib/db');
    const { campaigns } = await import('@/lib/db/schema');
    const { eq, sql } = await import('drizzle-orm');

    const { leads } = await import('@/lib/db/schema');

    // Fetch current stats
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
    
    if (campaign) {
        let stats = JSON.parse(campaign.stats);
        
        if (eventType === 'opened') {
            stats.opened = (stats.opened || 0) + 1;
        } else if (eventType === 'click' || eventType === 'clicked') {
            stats.clicked = (stats.clicked || 0) + 1;
        } else if (['hard_bounce', 'soft_bounce', 'blocked', 'spam', 'invalid_email'].includes(eventType)) {
            // Handle Bounce: Mark Lead as Bounced
            console.log(`Bounce detected for ${event.email}: ${eventType}`);
            
            // Find lead by email
            const [lead] = await db.select().from(leads).where(eq(leads.email, event.email));
            if (lead) {
                await db.update(leads)
                    .set({ status: 'bounced', tags: JSON.stringify([...JSON.parse(lead.tags || '[]'), 'bounced']) })
                    .where(eq(leads.id, lead.id));
            }
        }

        await db.update(campaigns)
            .set({ stats: JSON.stringify(stats) })
            .where(eq(campaigns.id, campaignId));
    }

    return NextResponse.json({ received: true, updated: campaignId });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
