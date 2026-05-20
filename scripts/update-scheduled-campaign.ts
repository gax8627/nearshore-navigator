
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; 
  const darkDeep = "#020617"; 
  const glassBg = "#0F172A"; 
  const glassBorder = "#1E293B"; 
  const textMuted = "#94A3B8"; 
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg?v=MAY8";

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%; animation: scan 3s linear infinite;">
                <style>
                  @keyframes scan { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
                </style>
              </td>
            </tr>
            <tr>
              <td style="padding: 56px 48px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                  <tr>
                    <td width="42" valign="middle">
                      <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius: 12px; width: 42px; height: 42px;">
                        <tr><td align="center" style="color: #000; font-family: sans-serif; font-weight: 900; font-size: 24px; line-height: 42px;">N</td></tr>
                      </table>
                    </td>
                    <td style="padding-left: 16px; font-family: sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>
                <div style="font-family: sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${content}
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 56px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="${ctaUrl}" style="display: block; padding: 22px 48px; text-decoration: none; color: #000; font-weight: 800; text-align: center; font-family: sans-serif;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border-radius: 16px; border: 0;" alt="Denisse Martinez — Lead Advisor" />
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
    const { brevo } = await import('../lib/brevo');
    const campaignId = 13;

    console.log(`🛠 Updating scheduled campaign ${campaignId} with the premium design...`);

    const htmlContent = wrapHtml(`
        <p>Hi {{contact.FIRSTNAME}},</p>
        <p>Following up on your interest in the <strong>USMCA Audit protocols</strong>.</p>
        <p>The upcoming "100% Rules of Origin" mandate is more than a compliance hurdle—it's an operational shift that will define the competitive landscape in Aerospace & Defense and related sectors for the next decade.</p>
        <p>I'd like to offer you a 15-minute <strong>Strategic Exposure Audit</strong> over Zoom. We’ll look at your current supply chain map and identify exactly where the new July thresholds create risk—or opportunity—for <strong>{{contact.COMPANY}}</strong>.</p>
        <p>Are you available for a brief session later this week?</p>
    `, "Book Strategic Audit (Zoom)", "https://calendly.com/denisse-nearshorenavigator/30min");

    try {
        await (brevo as any).updateCampaign(campaignId, { htmlContent });
        console.log(`✅ Campaign ${campaignId} updated successfully.`);
    } catch (e: any) {
        console.error(`❌ Failed to update campaign: ${e.message}`);
    }
}

main();
