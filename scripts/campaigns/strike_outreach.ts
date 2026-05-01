
import path from 'path';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; // Emerald-500
  const darkDeep = "#020617"; // Slate-950
  const glassBg = "#0F172A"; // Slate-900 
  const glassBorder = "#1E293B"; // Slate-800
  const textMuted = "#94A3B8"; // Slate-400

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr><td height="12" bgcolor="${primaryGreen}"></td></tr>
            <tr>
              <td style="padding: 56px 48px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${content}
                </div>
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="${ctaUrl}" style="display: block; padding: 22px 48px; text-decoration: none; color: #000; font-weight: 800;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

async function main() {
    console.log('⚡️ Executing Strike Outreach for High-Intent Leads...');
    
    const hotLeads = [
        { 
            email: 'info@mybesthomecare.com', 
            name: 'Homecare Team', 
            company: 'My Best Homecare',
            context: 'Baja / Monterrey Industrial Space'
        },
        { 
            email: 'rphillips@phillipsind.com', 
            name: 'R. Phillips', 
            company: 'Phillips Industries',
            context: 'Baja CA supply chain shortlist'
        }
    ];

    for (const lead of hotLeads) {
        const body = `
            <p>Hi ${lead.name},</p>
            <p>I noticed you were reviewing our latest <strong>${lead.context}</strong> report earlier this week.</p>
            <p>Since that data was published, we've had 2 new Class A properties in Santa Catarina hit the market that aren't on the public portals yet. One of them perfectly matches the footprint we discussed.</p>
            <p>Would you like me to send over the confidential spec sheet, or should we jump on a 5-minute call to discuss the lease terms?</p>
        `;

        try {
            await brevo.sendEmail({
                to: [{ email: lead.email, name: lead.name }],
                subject: `Quick update: ${lead.company} x ${lead.context}`,
                htmlContent: wrapHtml(body, "View Private Spec Sheet", "https://calendly.com/denisse-nearshorenavigator/30min"),
            });
            console.log(`✅ Strike email sent to ${lead.email} (${lead.company})`);
        } catch (e: any) {
            console.error(`❌ Failed to send to ${lead.email}: ${e.message}`);
        }
    }
}

main();
