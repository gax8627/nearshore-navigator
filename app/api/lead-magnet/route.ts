import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, pdfRequested, honeypot, cfToken } = body;

    // Reject silently if honeypot is filled
    if (honeypot) {
        console.warn('[Lead Magnet] Honeypot triggered');
        return NextResponse.json({ success: true, message: 'Your guide is on its way!' });
    }

    // Turnstile CAPTCHA verification — hard-fail if key is missing so the
    // endpoint can't be abused in environments where the key wasn't set.
    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.error('[Lead Magnet] TURNSTILE_SECRET_KEY is not configured. Rejecting request.');
      return NextResponse.json(
        { error: 'Security configuration error. Please try again later.' },
        { status: 503 }
      );
    } else if (!cfToken) {
      return NextResponse.json(
        { error: 'Security token missing. Please try again.' },
        { status: 400 }
      );
    } else {
      const formData = new URLSearchParams();
      formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
      formData.append('response', cfToken);
      const cfResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });
      const cfData = await cfResponse.json();
      if (!cfData.success) {
        console.warn('[Lead Magnet] CAPTCHA verification failed:', cfData);
        return NextResponse.json(
          { error: 'Security check failed. Please refresh and try again.' },
          { status: 400 }
        );
      }
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
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
