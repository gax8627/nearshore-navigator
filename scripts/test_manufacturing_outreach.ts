import { brevo } from '../lib/brevo';

const primaryGreen = '#10B981';
const darkBg = '#020617';
const cardBg = '#0F172A';
const border = '#1E293B';
const textMuted = '#94A3B8';

const firstName = "Gax";
const company = "Test Manufacturing Corp";
const city = "San Diego";

const subject = `${company} — Mexico manufacturing shortlist?`;

function wrapHtml(content: string) {
  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const glassBg = "#0F172A";
  const glassBorder = "#1E293B";
  const textMuted = "#94A3B8";
  
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";
  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%; animation: scan 3s linear infinite;">
                <div style="height: 12px; width: 100%; background-color: ${primaryGreen}; opacity: 0; display: none;">&nbsp;</div>
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
                    <td style="padding-left: 16px; font-family: 'Space Grotesk', Helvetica, sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -1px; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>
                <div style="font-family: 'Inter', Helvetica, sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${formattedContent}
                </div>
                <!-- 2025 High-Intensity CTA -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px; box-shadow: 0 15px 40px ${primaryGreen}40;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Mexico%20partner%20shortlist%20for%20our%20review" style="display: block; padding: 22px 48px; font-family: Helvetica, sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        Reply "Yes" To Receive The PDF Shortlist
                      </a>
                    </td>
                  </tr>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 24px; overflow: hidden;">
                  <tr>
                    <td>
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Martinez - Marketing Director & Advisor" />
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 48px; text-align: center; font-family: Helvetica, sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                  Industrial Expansion &bull; 2026 Strategic Hub
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

const bodyText = `
  <p>Hi ${firstName},</p>
  <p>I work with mid-market manufacturers in **${city}** who are evaluating Mexico to offset the new tariff exposure — specifically the 2025 25–145% rates on Chinese components and sub-assemblies.</p>
  <p>Baja California is worth a look: **20 minutes from San Diego**, USMCA duty-free, and machine shops / CM partners with AS9100 and ISO 13485 already certified. We've helped companies go from evaluation to live production in 90 days using a shelter arrangement.</p>
  <p>Would it be useful if I put together a **shortlist of 3 vetted Baja partners** specific to what **${company}** manufactures? No call needed — I can send it over as a PDF so you have something concrete to compare against your current setup.</p>
  <p>Just reply "yes" to this email and I'll put it together this week.</p>
`;

const html = wrapHtml(bodyText);

async function main() {
  console.log('Sending test email...');
  try {
    await brevo.sendEmail({
      to: [{ email: "gax8627@gmail.com", name: "Gax" }],
      subject,
      htmlContent: html,
    });
    console.log("✅ Test email sent to gax8627@gmail.com");
  } catch (e: any) {
    console.error("❌ Failed to send:", e);
  }
}

main();
