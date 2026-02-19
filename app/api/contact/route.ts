import { NextResponse } from 'next/server';

import { brevo } from '@/lib/brevo';

function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, phone, message, source, honeypot } = body;

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

        console.log(`[Contact API] Received lead: ${email}`);

        // DB Insertion
        if (isDbConfigured()) {
            const { db } = await import('@/lib/db');
            const { leads } = await import('@/lib/db/schema');
            
            await db.insert(leads).values({
                name,
                email,
                company: company || '',
                phone: phone || '',
                message: message || '',
                source: source || 'website_contact_form'
            });
            console.log('[Contact API] Saved to database.');
        } else {
            console.warn('[Contact API] Database not configured. Lead data:', { name, email, company, source });
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
                    SOURCE: source || 'website_contact_form'
                },
                updateEnabled: true
            });
            console.log('[Contact API] Sync to Brevo successful.');
        } catch (crmError) {
            console.error('[Contact API] CRM Sync Error:', crmError);
        }

        // Notifications
        try {
            await brevo.sendEmail({
                to: [{ email: 'denisse@nearshorenavigator.com', name: 'Denisse Gastelum' }],
                subject: `New Lead: ${name} (${source || 'Contact Form'})`,
                htmlContent: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #2563eb;">New Lead Captured</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                        <p><strong>Source:</strong> ${source || 'website_contact_form'}</p>
                        <hr />
                        <p><strong>Message:</strong></p>
                        <p>${message || 'No message provided.'}</p>
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
