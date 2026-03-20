import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, socialDrafts } from '@/lib/db/schema';
import { sql, eq } from 'drizzle-orm';
import { brevo } from '@/lib/brevo'; // Adjust path if necessary
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // 1. Get Leads Data (Last 30 Days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [{ totalLeads }] = await db
      .select({ totalLeads: sql<number>`count(*)` })
      .from(leads)
      .where(sql`${leads.createdAt} >= ${thirtyDaysAgo}`);

    const [{ totalValue }] = await db
      .select({ totalValue: sql<number>`sum(intent_score * 15000)` }) // More accurate based on intent
      .from(leads);

    // 2. Intent Analysis (New for Phase 3)
    const intentDistribution = await db
      .select({ 
        category: leads.intentCategory, 
        count: sql<number>`count(*)` 
      })
      .from(leads)
      .groupBy(leads.intentCategory);

    const [{ panicCount }] = await db
      .select({ panicCount: sql<number>`count(*)` })
      .from(leads)
      .where(eq(leads.intentCategory, 'TARIFF_PANIC'));

    // 3. Get Social Drafts Output
    const [{ pendingDrafts }] = await db
      .select({ pendingDrafts: sql<number>`count(*)` })
      .from(socialDrafts)
      .where(eq(socialDrafts.status, 'pending'));

    // 4. Get Recent Leads for Feed
    const recentLeadsList = await db.query.leads.findMany({
      limit: 10,
      orderBy: (leads, { desc }) => [desc(leads.createdAt)]
    });

    // 5. Get Email Stats from Brevo
    let emailStats = { openRate: '0%' };
    try {
      const campaignStats = await brevo.getCampaigns({ limit: 5 });
      if (campaignStats.campaigns && campaignStats.campaigns.length > 0) {
          const totalSent = campaignStats.campaigns.reduce((acc: number, cur: any) => acc + (cur.statistics?.globalStats?.sent || 0), 0);
          const totalOpened = campaignStats.campaigns.reduce((acc: number, cur: any) => acc + (cur.statistics?.globalStats?.uniqueViews || 0), 0);
          if (totalSent > 0) {
              emailStats.openRate = `${Math.round((totalOpened / totalSent) * 100)}%`;
          }
      }
    } catch (e) {
      console.error("Brevo stats fetch error", e);
    }

    return NextResponse.json({
      success: true,
      data: {
        totalLeads,
        estimatedPipeline: `$${(Number(totalValue) / 1000000).toFixed(1)}M`,
        pendingDrafts,
        panicCount: Number(panicCount) || 0,
        intentDistribution,
        emailOpenRate: emailStats.openRate,
        recentLeads: recentLeadsList.map(l => ({
            name: l.name,
            company: l.company || '-',
            source: l.source || 'Organic',
            score: l.intentScore || 0,
            category: l.intentCategory,
            urgency: l.urgency,
            time: new Date(l.createdAt).toLocaleDateString()
        }))
      }
    });

  } catch (error) {
    console.error('[Admin Metrics API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marketing metrics' },
      { status: 500 }
    );
  }
}
