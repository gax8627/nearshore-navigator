const BREVO_API_KEY = process.env.BREVO_API_KEY as string; 
// Note: Ensure BREVO_API_KEY is set in your .env file

const BREVO_API_URL = 'https://api.brevo.com/v3';

/**
 * redesignV5: The "Wow Factor" Bulletproof 2025
 * Includes passive motion (GIFs) and the premium Attachment 2 banner signature.
 */
function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; // Emerald-500
  const darkDeep = "#020617"; // Slate-950
  const glassBg = "#0F172A"; // Slate-900 
  const glassBorder = "#1E293B"; // Slate-800
  const textMuted = "#94A3B8"; // Slate-400
  
  // Public Assets - These must be hosted on the website's public images folder
  const liquidGif = "https://nearshorenavigator.com/images/liquid-top.gif"; 
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";

  // Format bold text for robust rendering
  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <!-- Main Card Shell -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <!-- Passive Motion: Liquid Accent top GIF -->
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background-color: ${primaryGreen};">
                <img src="${liquidGif}" width="640" height="12" style="display: block; width: 100%; height: 12px; border: 0;" alt="" />
              </td>
            </tr>
            
            <tr>
              <td style="padding: 56px 48px;">
                <!-- Header / Brand -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                  <tr>
                    <td width="42" valign="middle">
                      <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius: 12px; width: 42px; height: 42px;">
                        <tr>
                          <td align="center" style="color: #000; font-family: sans-serif; font-weight: 900; font-size: 24px; line-height: 42px;">N</td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding-left: 16px; font-family: 'Space Grotesk', Helvetica, sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -1px; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>

                <!-- Body Text -->
                <div style="font-family: 'Inter', Helvetica, sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${formattedContent}
                </div>

                <!-- 2025 High-Intensity CTA -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px; box-shadow: 0 15px 40px ${primaryGreen}40;">
                      <a href="${ctaUrl}" style="display: block; padding: 22px 48px; font-family: Helvetica, sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Premium Banner Signature (Attachment 2) -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 24px; overflow: hidden;">
                  <tr>
                    <td>
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Gastelum - Lead Advisor" />
                    </td>
                  </tr>
                </table>

                <!-- Bottom Footer -->
                <div style="margin-top: 48px; text-align: center; font-family: Helvetica, sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
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

async function sendTestEmail() {
  const prospectName = "Test User";
  const userEmail = "gax8627@gmail.com"; 

  const htmlContent = wrapHtml(`
    <p>Hi ${prospectName},</p>
    <p>I noticed you were researching some of our nearshore manufacturing options in Mexico recently.</p>
    <p>Rather than jumping on a call, would it be helpful if I sent over a **shortlist of 3 vetted partners** specifically for **Nearshore Navigator Test**?</p>
    <p>I can include their current CNC/assembly capacities and typical lead times so you can compare them against your current setup without any commitment.</p>
    <p>If you're interested, just click below to schedule a time or simply reply to this email.</p>
  `, "Schedule a Deep Dive", "https://calendly.com/denisse-nearshorenavigator/30min");

  const body = {
    sender: { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
    to: [{ email: userEmail, name: prospectName }],
    subject: 'Mexico partner shortlist for Test Company?',
    htmlContent: htmlContent
  };

  const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error('Failed to send test email:', await response.text());
  } else {
    console.log('✅ Test email sent successfully to:', userEmail);
    console.log('   Check your inbox at gax8627@gmail.com to preview the design.');
  }
}

sendTestEmail();
