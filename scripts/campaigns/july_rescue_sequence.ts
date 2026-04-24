
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

/**
 * JULY RESCUE SEQUENCE (3-Step Audit Campaign)
 * Targeting: Leads in 'Tariff Panic' segment
 */

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
    console.log('🚀 Launching July Rescue Sequence...');
    
    // In a real scenario, we would fetch leads from the Segmented Leads directory or Brevo
    // For this demonstration, we'll process a hypothetical priority lead
    const priorityLeads = [
        { email: 'executive@testcompany.com', name: 'John', company: 'Test Company' }
    ];

    for (const lead of priorityLeads) {
        const body = `
            <p>Hi ${lead.name},</p>
            <p>The signals from Washington are now absolute: the <strong>July 2026 USMCA review</strong> is pivoting toward a "100% Rules of Origin" mandate for critical components.</p>
            <p>If your supply chain isn't audited by June, you risk being locked into the 10% Section 122 tariffs permanently.</p>
            <p>We’ve prepared a 5-point <strong>USMCA Compliance Audit</strong> specific to your sector. Should I send the PDF over?</p>
        `;

        try {
            await brevo.sendEmail({
                to: [{ email: lead.email, name: lead.name }],
                subject: `${lead.company} — July USMCA Rules of Origin Shift?`,
                htmlContent: wrapHtml(body, "Download Audit Checklist", "https://nearshorenavigator.com/audit-checklist"),
            });
            console.log(`✅ Sent rescue email to ${lead.email}`);
        } catch (e: any) {
            console.error(`❌ Failed: ${e.message}`);
        }
    }
}

main();
