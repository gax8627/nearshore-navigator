import { NextResponse } from 'next/server';

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

    // In a real production environment, you would use a service like Resend, SendGrid, or nodemailer here.
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: 'denisse@nearshorenavigator.com',
    //   subject: `New Lead: ${name} from ${company}`,
    //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nMessage: ${message}`,
    // });

    // Email would be sent here using Resend, SendGrid, or similar service
    // For production: await resend.emails.send({ ... })

    // For now, we simulate a successful send
    const { scoreLead } = await import('@/lib/lead-scoring');
    const leadScore = scoreLead({ name, company, email, message });

    console.log(`New Lead Scored: ${leadScore.category} (${leadScore.score} pts) - ${company}`);
    console.log(`Tags: ${leadScore.tags.join(', ')}`);

    // Lead Intelligence & Real-time Notifications
    const { notifyLead } = await import('@/lib/notifications');
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
        routing: leadScore.category === 'High' ? 'Executive' : 'Standard'
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
