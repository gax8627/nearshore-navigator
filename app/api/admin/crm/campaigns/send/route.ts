import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { brevo } from '@/lib/brevo';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { campaignId } = await req.json();
    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
    }

    const { db } = await import('@/lib/db');
    const { leads, campaigns } = await import('@/lib/db/schema');
    const { eq } = await import('drizzle-orm');

    // 1. Fetch Campaign
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status === 'sent') {
      return NextResponse.json({ error: 'Campaign already sent' }, { status: 400 });
    }

    // 2. Fetch Leads by Segment
    let targetLeads: any[] = [];
    if (campaign.segment === 'all') {
      targetLeads = await db.select().from(leads);
    } else {
      // Simple status check for now. Later: complex segmentation
      targetLeads = await db.select().from(leads).where(eq(leads.status, campaign.segment));
    }

    if (targetLeads.length === 0) {
      return NextResponse.json({ error: 'No leads found in this segment' }, { status: 400 });
    }

    // 3. Send Emails via Brevo (Batched)
    console.log(`Sending campaign "${campaign.name}" to ${targetLeads.length} leads...`);
    
    // For MVP, we'll just send 5 test emails if > 5 to avoid spamming real leads until verified.
    // Or we can respect a "test" flag. 
    // Let's implement full sending logic but maybe limit concurrency.
    
    let sentCount = 0;
    
    // Limit to 20 for safety in this initial version unless user confirms
    // const LIMIT = 20; 
    // targetLeads = targetLeads.slice(0, LIMIT);

    for (const lead of targetLeads) {
        if (!lead.email) continue;
        try {
            await brevo.sendEmail({
                to: [{ email: lead.email, name: lead.name }],
                subject: campaign.subject,
                htmlContent: campaign.content,
            });
            sentCount++;
            // Rate limit slightly
            await new Promise(r => setTimeout(r, 100)); 
        } catch (e) {
            console.error(`Failed to send to ${lead.email}`, e);
        }
    }

    // 4. Update Campaign Status
    await db.update(campaigns)
        .set({ 
            status: 'sent', 
            sentAt: new Date(),
            stats: JSON.stringify({ sent: sentCount, opened: 0, clicked: 0, total: targetLeads.length })
        })
        .where(eq(campaigns.id, campaignId));

    return NextResponse.json({ success: true, sent: sentCount });

  } catch (error: any) {
    console.error('Send Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send campaign' }, { status: 500 });
  }
}
