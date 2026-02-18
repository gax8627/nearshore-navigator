import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { db } = await import('@/lib/db');
    const { senders } = await import('@/lib/db/schema');
    
    // Fetch all senders
    const allSenders = await db.select().from(senders);
    return NextResponse.json({ senders: allSenders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch senders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, email, isDefault } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email required' }, { status: 400 });
    }

    const { db } = await import('@/lib/db');
    const { senders } = await import('@/lib/db/schema');

    // If setting as default, unset others? (Optional logic, keep simple for now)
    
    const [newSender] = await db.insert(senders).values({
      name,
      email,
      isDefault: isDefault || false,
    }).returning();

    return NextResponse.json({ sender: newSender });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sender' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { db } = await import('@/lib/db');
    const { senders } = await import('@/lib/db/schema');
    const { eq } = await import('drizzle-orm');

    await db.delete(senders).where(eq(senders.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sender' }, { status: 500 });
  }
}
