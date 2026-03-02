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

const bodyText = `
  <p>Hi ${firstName},</p>
  <p>I work with mid-market manufacturers in <strong style="color:#fff">${city}</strong> who are evaluating Mexico to offset the new tariff exposure — specifically the 2025 25–145% rates on Chinese components and sub-assemblies.</p>
  <p>Baja California is worth a look: <strong style="color:#fff">20 minutes from San Diego</strong>, USMCA duty-free, and machine shops / CM partners with AS9100 and ISO 13485 already certified. We've helped companies go from evaluation to live production in 90 days using a shelter arrangement.</p>
  <p>Would it be useful if I put together a <strong style="color:#fff">shortlist of 3 vetted Baja partners</strong> specific to what <strong style="color:#fff">${company}</strong> manufactures? No call needed — I can send it over as a PDF so you have something concrete to compare against your current setup.</p>
  <p>Just reply "yes" or "send it" and I'll put it together this week.</p>
`;

const html = `
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkBg}" style="background-color:${darkBg};table-layout:fixed;">
    <tr><td align="center" style="padding:60px 10px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;border-radius:32px;overflow:hidden;border:1px solid ${border};" bgcolor="${cardBg}">
        <tr><td height="4" bgcolor="${primaryGreen}" style="background-color:${primaryGreen};"></td></tr>
        <tr><td style="padding:48px 48px;">
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
            <tr>
              <td width="38" valign="middle">
                <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius:10px;width:38px;height:38px;">
                  <tr><td align="center" style="color:#000;font-family:sans-serif;font-weight:900;font-size:20px;line-height:38px;">N</td></tr>
                </table>
              </td>
              <td style="padding-left:14px;font-family:Helvetica,sans-serif;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;text-transform:uppercase;">
                Nearshore <span style="color:${primaryGreen};">Navigator</span>
              </td>
            </tr>
          </table>
          <div style="font-family:'Inter',Helvetica,sans-serif;font-size:16px;line-height:1.8;color:${textMuted};margin-bottom:48px;">
            ${bodyText}
          </div>
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:48px;">
            <tr>
              <td align="center" bgcolor="${primaryGreen}" style="border-radius:14px;">
                <a href="https://calendly.com/denisse-nearshorenavigator/30min" style="display:block;padding:18px 40px;font-family:Helvetica,sans-serif;text-decoration:none;color:#000;font-weight:800;font-size:15px;text-transform:uppercase;letter-spacing:1px;">
                  Or Book a 15-Min Call →
                </a>
              </td>
            </tr>
          </table>
          <div style="font-family:Helvetica,sans-serif;font-size:13px;color:#475569;border-top:1px solid ${border};padding-top:24px;">
            <strong style="color:#94a3b8;">Denisse Martinez</strong><br/>
            Marketing Director &amp; Advisor | Nearshore Navigator<br/>
            <a href="https://nearshorenavigator.com" style="color:${primaryGreen};text-decoration:none;">nearshorenavigator.com</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
`;

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
    console.error("❌ Failed to send:", e.message);
  }
}

main();
