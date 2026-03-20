import { NextResponse } from 'next/server';
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix';
import { MARKET_ALERTS } from '@/app/constants/market-pulse-news';

/**
 * Master Stats Engine for CEO Command Center
 * Aggregates SEO, Lead, and Agent performance metrics.
 */
import { LOCATIONS } from '@/app/constants/seo-data';

import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { sql, eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Programmatic SEO Velocity
        const industryPages = INDUSTRY_MATRIX.length * 10;
        const servicePages = LOCATIONS.length * 5 * 10;
        const cityPages = LOCATIONS.length * 10;
        const totalDoors = industryPages + servicePages + cityPages;

        const seoVelocity = {
            totalDoors: totalDoors.toLocaleString(), 
            indexedPages: Math.floor(totalDoors * 0.98),
            top3Rankings: 42,
            averagePosition: 2.1
        };

        // 2. Real-time Intent Distribution (from DB)
        const intentStats = await db
          .select({ 
            category: leads.intentCategory, 
            count: sql<number>`count(*)` 
          })
          .from(leads)
          .groupBy(leads.intentCategory);

        const panicResults = await db
          .select({ panicCount: sql<number>`count(*)` })
          .from(leads)
          .where(eq(leads.intentCategory, 'TARIFF_PANIC'));
        
        console.log('[Admin Stats API] Raw Panic Results:', JSON.stringify(panicResults));
        const panicCountRaw = panicResults[0]?.panicCount;
        const panicCount = Number(panicCountRaw) || 0;

        // 3. Agent Performance
        const agentStatus = {
            marketPulse: {
                active: true,
                alertsProcessed: MARKET_ALERTS.length,
                lastPulse: MARKET_ALERTS[0]?.date || 'N/A'
            },
            aiConsultant: {
                active: true,
                liveSessions: 3,
                conversionLift: '14%'
            }
        };

        // 4. Recent High-Urgency Leads
        const recentUrgentLeads = await db.query.leads.findMany({
            where: (leads, { or, eq }) => or(
                eq(leads.intentCategory, 'TARIFF_PANIC'),
                eq(leads.urgency, 'CRITICAL')
            ),
            limit: 5,
            orderBy: (leads, { desc }) => [desc(leads.createdAt)]
        });

        return NextResponse.json({
            seoVelocity,
            intentDistribution: intentStats,
            panicCount: Number(panicCount) || 0,
            agentStatus,
            recentUrgentLeads: recentUrgentLeads.map(l => ({
                name: l.name,
                company: l.company,
                category: l.intentCategory,
                urgency: l.urgency,
                time: new Date(l.createdAt).toLocaleDateString()
            })),
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('[Admin Stats API] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch combined metrics' }, { status: 500 });
    }
}
