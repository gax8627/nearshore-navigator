
import { db } from './lib/db';
import { leads } from './lib/db/schema';
import { sql, eq } from 'drizzle-orm';

async function debugStats() {
    console.log("🔍 Debugging Stats API Logic...");
    try {
        console.log("1. Fetching Intent Distribution...");
        const intentStats = await db
          .select({ 
            category: leads.intentCategory, 
            count: sql<number>`count(*)` 
          })
          .from(leads)
          .groupBy(leads.intentCategory);
        console.log("✅ Intent Stats:", intentStats);

        console.log("2. Fetching Panic Count...");
        // Test with eq() instead of raw sql
        const [{ panicCount }] = await db
          .select({ panicCount: sql<number>`count(*)` })
          .from(leads)
          .where(eq(leads.intentCategory, 'TARIFF_PANIC'));
        console.log("✅ Panic Count:", panicCount);

        console.log("3. Fetching Recent Urgent Leads...");
        const recentUrgentLeads = await db.query.leads.findMany({
            where: (leads, { or, eq }) => or(
                eq(leads.intentCategory, 'TARIFF_PANIC'),
                eq(leads.urgency, 'CRITICAL')
            ),
            limit: 5,
        });
        console.log("✅ Recent Leads:", recentUrgentLeads.length);

    } catch (e) {
        console.error("❌ CRASH IDENTIFIED:", e);
    }
}

debugStats();
