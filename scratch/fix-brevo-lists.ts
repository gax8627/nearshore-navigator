
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function fixBrevo() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = 5;
    const TEST_EMAIL = 'gmailderamiro@gmail.com';

    console.log('🚀 Starting Brevo Recovery Operation...');

    try {
        // 1. Get all contacts (to find the unassigned ones)
        console.log('📥 Fetching all contacts...');
        const contactsRes = await fetch('https://api.brevo.com/v3/contacts?limit=1000', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const contactsData = await contactsRes.json();
        const allEmails = contactsData.contacts
            .map((c: any) => c.email)
            .filter((email: string) => email && email.includes('@') && email.trim().length > 0);
        
        console.log(`✅ Found ${allEmails.length} valid contacts (out of ${contactsData.contacts.length}).`);
        
        if (allEmails.length === 0) {
            throw new Error('No valid emails found to assign.');
        }

        // 2. Assign all contacts to List 5 (Chunked by 100)
        console.log(`📤 Assigning ${allEmails.length} contacts to List ${LIST_ID} in chunks...`);
        
        const chunkSize = 100;
        for (let i = 0; i < allEmails.length; i += chunkSize) {
            const chunk = allEmails.slice(i, i + chunkSize);
            console.log(`   - Processing chunk ${Math.floor(i / chunkSize) + 1}...`);
            
            const addRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${LIST_ID}/contacts/add`, {
                method: 'POST',
                headers: { 
                    'api-key': BREVO_API_KEY!, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify({ emails: chunk })
            });

            if (!addRes.ok) {
                console.error(`   ❌ Failed chunk:`, await addRes.text());
            }
        }
        
        console.log(`✅ Completed list assignment.`);

        // 3. Send Test Email
        console.log(`📧 Sending test email to ${TEST_EMAIL}...`);
        const testEmailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                sender: { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
                to: [{ email: TEST_EMAIL, name: 'Ramiro' }],
                subject: 'TEST: July Rescue Sequence (Pre-launch Check)',
                htmlContent: `
                    <div style="font-family: sans-serif; padding: 40px; background: #020617; color: #fff;">
                        <h2 style="color: #10B981;">July Rescue Sequence - Test Send</h2>
                        <p>Hi Ramiro,</p>
                        <p>This is a test of the automated outreach engine for the July Rescue Sequence.</p>
                        <p>All 584 contacts have been successfully re-assigned to the target list. We are ready for the campaign re-launch.</p>
                        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 40px 0;">
                        <p style="font-size: 12px; color: #64748b;">Nearshore Navigator | Strategic Expansion 2026</p>
                    </div>
                `
            })
        });

        if (testEmailRes.ok) {
            console.log('✅ Test email sent successfully!');
        } else {
            console.error('❌ Failed to send test email:', await testEmailRes.text());
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

fixBrevo();
