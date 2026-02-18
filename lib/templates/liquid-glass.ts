/**
 * Premium "Green & Glass" Email Template
 * Ported from automation scripts for Admin CRM use.
 */

export function wrapLiquidGlass(content: string, ctaText: string = "View Details", ctaUrl: string = "https://nearshorenavigator.com") {
    const primaryGreen = "#10B981"; // Emerald-500
    const darkDeep = "#020617"; // Slate-950
    const glassBg = "#0F172A"; // Slate-900 
    const glassBorder = "#1E293B"; // Slate-800
    const textMuted = "#94A3B8"; // Slate-400
    
    // Public Assets
    const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg"; // Ensure this exists or use a placeholder
  
    // Format bold text for robust rendering
    // Matches **text** to styled bold
    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);
  
    return `
      <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 60px 10px;">
            <!-- Main Card Shell -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
              <!-- Passive Motion: Liquid Accent top (CSS Gradient) -->
              <tr>
                <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%; animation: scan 3s linear infinite;">
                  <!-- Fallback for clients stripping CSS -->
                  <div style="height: 12px; width: 100%; background-color: ${primaryGreen}; opacity: 0; display: none;">&nbsp;</div>
                  <style>
                    @keyframes scan {
                      0% { background-position: 200% 0; }
                      100% { background-position: -200% 0; }
                    }
                  </style>
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
  
                  <!-- CTA Button -->
                  <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                    <tr>
                      <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px; box-shadow: 0 15px 40px ${primaryGreen}40;">
                        <a href="${ctaUrl}" style="display: block; padding: 22px 48px; font-family: Helvetica, sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                          ${ctaText}
                        </a>
                      </td>
                    </tr>
                  </table>
  
                  <!-- Signature (Optional - uncomment if signature image is ready) -->
                  <!--
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 24px; overflow: hidden;">
                    <tr>
                      <td>
                        <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Signature" />
                      </td>
                    </tr>
                  </table>
                  -->
  
                  <!-- Bottom Footer -->
                  <div style="margin-top: 48px; text-align: center; font-family: Helvetica, sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                    <a href="https://nearshorenavigator.com" style="color: ${primaryGreen}; text-decoration: none; font-size: 14px; font-weight: 900;">NEARSHORENAVIGATOR.COM</a> <br><br> Industrial Expansion &bull; Unsubscribe
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;
  }
