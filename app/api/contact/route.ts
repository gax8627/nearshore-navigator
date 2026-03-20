import { NextResponse } from 'next/server';

import { brevo } from '@/lib/brevo';
import { inngest } from '@/lib/inngest/client';

// Sanitize user input before interpolating into HTML email bodies.
// Prevents HTML injection into Denisse's notification emails.
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, phone, message, source, honeypot, cfToken } = body;

        // Honeypot check
        if (honeypot) {
            console.log('[Contact API] Honeypot field filled. Rejecting silently.');
            // Return success to fool bots
            return NextResponse.json({ success: true });
        }

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and Email are required.' },
                { status: 400 }
            );
        }

        // CAPTCHA Verification
        if (!process.env.TURNSTILE_SECRET_KEY) {
            console.warn('[Contact API] TURNSTILE_SECRET_KEY is missing. Skipping CAPTCHA verification.');
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
                console.warn('[Contact API] CAPTCHA verification failed:', cfData);
                return NextResponse.json(
                    { error: 'Security check failed. Please refresh and try again.' },
                    { status: 400 }
                );
            }
        }

        console.log(`[Contact API] Received lead: ${email}`);

        // DP1: User Intent Analysis
        const { UserIntentAgent } = await import('@/scripts/agents/user_intent_agent');
        const intentAgent = new UserIntentAgent();
        const intentResult = intentAgent.analyze({
            formComments: message || '',
            source: source || 'website_contact_form'
        });

        // DB Insertion
        let savedLeadId: number | undefined;
        if (isDbConfigured()) {
            try {
                const { db } = await import('@/lib/db');
                const { leads } = await import('@/lib/db/schema');
                
                const [newLead] = await db.insert(leads).values({
                    name,
                    email,
                    company: company || '',
                    phone: phone || '',
                    message: message || '',
                    source: source || 'website_contact_form',
                    intentCategory: intentResult.category,
                    intentScore: intentResult.score,
                    urgency: intentResult.urgency,
                    score: Math.min(100, (intentResult.score + 20)) // Base score + intent
                }).returning({ id: leads.id });
                
                savedLeadId = newLead.id;
                console.log('[Contact API] Saved to database with Intent Category:', intentResult.category);

                // Trigger Inngest background job
                try {
                    await inngest.send({
                        name: 'lead.created',
                        data: { 
                            leadId: newLead.id, 
                            email, 
                            name, 
                            company, 
                            source,
                            intentCategory: intentResult.category,
                            intentScore: intentResult.score,
                            urgency: intentResult.urgency
                        }
                    });
                } catch (inngestError) {
                    console.error('[Contact API] Inngest Error:', inngestError);
                }
            } catch (dbError) {
                console.error('[Contact API] Database Error:', dbError);
            }
        }

        // CRM Integration (Brevo)
        try {
            await brevo.createContact({
                email,
                attributes: {
                    FIRSTNAME: name.split(' ')[0],
                    LASTNAME: name.split(' ').slice(1).join(' ') || 'Lead',
                    COMPANY: company || '',
                    SMS: phone || '',
                    SOURCE: source || 'website_contact_form',
                    INTENT_CATEGORY: intentResult.category,
                    INTENT_SCORE: intentResult.score.toString(),
                    URGENCY: intentResult.urgency
                },
                updateEnabled: true
            });
            console.log('[Contact API] Sync to Brevo successful.');
        } catch (crmError) {
            console.error('[Contact API] CRM Sync Error (Brevo):', crmError);
        }

        // Notifications (DP1: Autonomous Alert)
        try {
            const { notifyLead } = await import('@/lib/notifications');
            await notifyLead({
                name,
                email,
                company: company || 'N/A',
                score: intentResult.score,
                intentCategory: intentResult.category,
                urgency: intentResult.urgency,
                tags: [source || 'contact_form']
            });
        } catch (notifError) {
            console.error('[Contact API] Notification Error:', notifError);
        }
        try {
            await brevo.sendEmail({
                to: [{ email: 'denisse@nearshorenavigator.com', name: 'Denisse Gastelum' }],
                subject: `New Lead: ${escapeHtml(name)} (${escapeHtml(source || 'Contact Form')})`,
                htmlContent: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #2563eb;">New Lead Captured</h2>
                        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                        <p><strong>Company:</strong> ${escapeHtml(company || 'N/A')}</p>
                        <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
                        <p><strong>Source:</strong> ${escapeHtml(source || 'website_contact_form')}</p>
                        <hr />
                        <p><strong>Message:</strong></p>
                        <p>${escapeHtml(message || 'No message provided.')}</p>
                    </div>
                `
            });
            console.log('[Contact API] Notification sent.');
        } catch (notifError) {
            console.error('[Contact API] Notification Error:', notifError);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[Contact API] Error processing request:', error);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
