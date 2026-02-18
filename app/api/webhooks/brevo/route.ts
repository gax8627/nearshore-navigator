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

    // Fetch current stats
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
    
    if (campaign) {
        const stats = JSON.parse(campaign.stats);
        
        if (eventType === 'opened') {
            stats.opened = (stats.opened || 0) + 1;
        } else if (eventType === 'click' || eventType === 'clicked') { // Brevo uses 'click' or 'clicked' depending on version, usually 'click' in transactional? Docs say 'click'
            stats.clicked = (stats.clicked || 0) + 1;
        } else if (eventType === 'delivered') {
            // stats.delivered = (stats.delivered || 0) + 1; // We track 'sent' initially, 'delivered' confirms format
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
