
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; // Emerald-500
  const darkDeep = "#020617"; // Slate-950
  const glassBg = "#0F172A"; // Slate-900 
  const glassBorder = "#1E293B"; // Slate-800
  const textMuted = "#94A3B8"; // Slate-400
  
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-martinez.jpg?v=2026";

  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%;">
                <div style="height: 12px; width: 100%; background-color: ${primaryGreen}; opacity: 0; display: none;">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 56px 48px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                  <tr>
                    <td width="42" valign="middle">
                      <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius: 12px; width: 42px; height: 42px;">
                        <tr>
                          <td align="center" style="color: #000; font-family: sans-serif; font-weight: 900; font-size: 24px; line-height: 42px;">N</td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding-left: 16px; font-family: sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -1px; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>
                <div style="font-family: sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${formattedContent}
                </div>
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="${ctaUrl}" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 24px; overflow: hidden;">
                  <tr>
                    <td>
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Gastelum - Lead Advisor" />
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 48px; text-align: center; font-family: sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                  Industrial Expansion &bull; 2025 Strategic Hub
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

async function launchCampaign11() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = 5;

    console.log(`🚀 LAUNCHING PREMIUM CAMPAIGN ID 11...`);

    try {
        const bodyContent = `
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>The signals from Washington are now absolute: the **July 2026 USMCA review** is pivoting toward a "100% Rules of Origin" mandate for critical components.</p>
            <p>If your supply chain isn't audited by June, you risk being locked into the 10% Section 122 tariffs permanently.</p>
            <p>We’ve prepared a 5-point **USMCA Compliance Audit** specific to the {{contact.INDUSTRY}} sector. Should I send the PDF over?</p>
        `;

        const premiumHtml = wrapHtml(
            bodyContent, 
            "Request Compliance Audit", 
            "https://nearshorenavigator.com/en/insights/usmca-audit-2026"
        );

        // 1. Create Campaign
        const createRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                name: `July Rescue Sequence - PREMIUM FINAL`,
                subject: `{{contact.COMPANY}} — July USMCA Rules of Origin Shift?`,
                sender: { email: 'nearshore.navigator@gmail.com', name: 'Denisse Martinez' },
                type: 'classic',
                recipients: { listIds: [LIST_ID] },
                htmlContent: premiumHtml,
            })
        });

        const newC = await createRes.json();
        if (!createRes.ok) throw new Error(`Failed to create campaign: ${JSON.stringify(newC)}`);

        console.log(`✅ Campaign created with ID: ${newC.id}`);

        // 2. Send Now
        const sendRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${newC.id}/sendNow`, {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Accept': 'application/json' 
            }
        });

        if (sendRes.ok) {
            console.log(`🚀 Campaign ${newC.id} successfully triggered for immediate delivery to 583 contacts.`);
        } else {
            console.error(`❌ Failed to trigger campaign:`, await sendRes.text());
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

launchCampaign11();
