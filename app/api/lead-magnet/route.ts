import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;      // max requests
const WINDOW_MS = 60_000;  // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: Request) {
  // Rate limiting by IP
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

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
