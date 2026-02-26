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
      .select({ totalValue: sql<number>`sum(score * 15000)` }) // Roughly $15k pipeline value per "point" for b2b
      .from(leads);

    // 2. Get Social Drafts Output
    const [{ pendingDrafts }] = await db
      .select({ pendingDrafts: sql<number>`count(*)` })
      .from(socialDrafts)
      .where(eq(socialDrafts.status, 'pending'));

    // 3. Get Recent Leads for Feed
    const recentLeadsList = await db.query.leads.findMany({
      limit: 5,
      orderBy: (leads, { desc }) => [desc(leads.createdAt)]
    });

    // 4. Get Email Stats from Brevo
    let emailStats = { openRate: '0%' };
    try {
      // Simplistic mock pull if standard API lacks a generic account-wide stat endpoint
      // You'd ideally pull a specific campaign or aggregate account stats
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
        estimatedPipeline: `$${(Number(totalValue) / 1000000).toFixed(1)}M`, // format as millions
        pendingDrafts,
        emailOpenRate: emailStats.openRate,
        recentLeads: recentLeadsList.map(l => ({
            name: l.name,
            company: l.company || '-',
            source: l.source || 'Organic',
            score: l.score || 0,
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
