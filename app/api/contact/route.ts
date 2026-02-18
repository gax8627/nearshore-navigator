import { NextResponse } from 'next/server';

// Helper: Check if DB is configured
function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, message, honeypot } = body;

    // Honeypot bot protection
    if (honeypot) {
      console.warn('Bot detected via honeypot field');
      return NextResponse.json({ success: true }, { status: 200 }); // Silent fail for bots
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Lead Scoring
    const { scoreLead } = await import('@/lib/lead-scoring');
    const leadScore = scoreLead({ name, company, email, message });

    console.log(`New Lead Scored: ${leadScore.category} (${leadScore.score} pts) - ${company}`);
    console.log(`Tags: ${leadScore.tags.join(', ')}`);

    // ─── Save Lead to Database ─────────────────────────────
    if (isDbConfigured()) {
      try {
        const { db } = await import('@/lib/db');
        const { leads } = await import('@/lib/db/schema');

        await db.insert(leads).values({
          name: name || 'Anonymous',
          email,
          company: company || 'N/A',
          phone: phone || '',
          message: message || '',
          status: 'new',
          score: leadScore.score,
          category: leadScore.category,
          tags: JSON.stringify(leadScore.tags),
        });

        console.log('✅ Lead saved to database');
      } catch (dbError) {
        console.error('⚠️ Failed to save lead to DB (continuing):', dbError);
        // Don't block the response if DB save fails
      }
    } else {
      console.log('ℹ️ Database not configured — lead not persisted');
    }

    // Lead Intelligence & Real-time Notifications
    const { notifyLead } = await import('@/lib/notifications');
    
    const isHighPriority = leadScore.category === 'High';
    
    if (isHighPriority) {
        console.log('🚨 HIGH PRIORITY LEAD DETECTED - SENT TO EXECUTIVE CHANNEL');
    } else {
        console.log('ℹ️ Standard Lead - Logged to Database');
    }

    await notifyLead({
      name: name || 'Anonymous',
      email,
      company: company || 'N/A',
      score: leadScore.score,
      category: leadScore.category,
      tags: leadScore.tags
    });

    return NextResponse.json({ 
      success: true, 
      leadInfo: {
        category: leadScore.category,
        score: leadScore.score,
        tags: leadScore.tags,
        routing: isHighPriority ? 'VIP_EXECUTIVE_PASS' : 'STANDARD_NURTURE'
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
