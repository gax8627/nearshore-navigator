import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, pdfRequested, honeypot } = body;

    // Reject silently if honeypot is filled
    if (honeypot) {
        return NextResponse.json({ success: true, message: 'Your guide is on its way!' });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Dispatch an Inngest event. An Inngest function would listen to this
    // and handle adding the user to Brevo and sending the PDF email payload.
    await inngest.send({
      name: 'lead.requested.magnet',
      data: { email, name, pdfRequested }
    });

    return NextResponse.json({ success: true, message: 'Your guide is on its way!' });
  } catch (error) {
    console.error('[Lead Magnet] Error:', error);
    return NextResponse.json({ error: 'Failed to request guide' }, { status: 500 });
  }
}
