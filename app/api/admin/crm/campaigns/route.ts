import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// GET /api/admin/crm/campaigns - List campaigns
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { db } = await import('@/lib/db');
    const { campaigns } = await import('@/lib/db/schema');
    const { desc } = await import('drizzle-orm');

    const allCampaigns = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
    return NextResponse.json({ campaigns: allCampaigns });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

// POST /api/admin/crm/campaigns - Create campaign
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, subject, content, segment } = body;

    if (!name || !subject || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { db } = await import('@/lib/db');
    const { campaigns } = await import('@/lib/db/schema');

    const [newCampaign] = await db.insert(campaigns).values({
      name,
      subject,
      content,
      segment: segment || 'all',
      template: body.template || 'standard',
      status: 'draft',
    }).returning();

    return NextResponse.json({ campaign: newCampaign }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
