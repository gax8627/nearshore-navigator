import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';

export async function POST(req: Request) {
  try {
    const { leads, listId } = await req.json();

    if (!leads || !Array.isArray(leads)) {
      return NextResponse.json(
        { error: 'Invalid leads data' },
        { status: 400 }
      );
    }

    // Trigger the prospecting agent
    await inngest.send({
      name: 'prospecting/start-campaign',
      data: {
        leads,
        listId,
      },
    });

    return NextResponse.json({ success: true, count: leads.length });
  } catch (error) {
    console.error('Error starting prospecting campaign:', error);
    return NextResponse.json(
      { error: 'Failed to start campaign' },
      { status: 500 }
    );
  }
}
