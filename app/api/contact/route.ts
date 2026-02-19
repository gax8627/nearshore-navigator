import { NextResponse } from 'next/server';

function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, phone, message, honeypot } = body;

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
                source: 'website_contact_form'
            });
            console.log('[Contact API] Saved to database.');
        } else {
            console.warn('[Contact API] Database not configured. Lead data:', { name, email, company });
            // In dev mode without DB, we still return success to the UI
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
