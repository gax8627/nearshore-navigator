import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

// GET /api/admin/leads — List all leads
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Database not configured', leads: [] }, { status: 200 });
    }

    const { db } = await import('@/lib/db');
    const { leads } = await import('@/lib/db/schema');
    const { desc } = await import('drizzle-orm');

    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return NextResponse.json({ leads: allLeads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads', leads: [] }, { status: 500 });
  }
}

// PATCH /api/admin/leads — Update lead status
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const { db } = await import('@/lib/db');
    const { leads } = await import('@/lib/db/schema');
    const { eq } = await import('drizzle-orm');

    const [updated] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();

    return NextResponse.json({ lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
