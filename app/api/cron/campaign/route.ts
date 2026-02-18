
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { brevo } from '@/lib/brevo';

// Force dynamic to ensure it runs fresh every time
export const dynamic = 'force-dynamic';

function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; // Emerald-500
  const darkDeep = "#020617"; // Slate-950
  const glassBg = "#0F172A"; // Slate-900 
  const glassBorder = "#1E293B"; // Slate-800
  const textMuted = "#94A3B8"; // Slate-400
  
  // Public Assets
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";

  // Format bold text
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
                    <td>
                      <img src="https://nearshorenavigator.com/images/nearshore-logo-brand.png" alt="Nearshore Navigator" width="200" style="display: block; width: 200px; height: auto;" />
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

export async function GET(request: Request) {
  // Security Check
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const schedulePath = path.join(process.cwd(), 'data/campaign_schedule.json');
    
    if (!fs.existsSync(schedulePath)) {
      return NextResponse.json({ error: 'Schedule file not found' }, { status: 404 });
    }

    const schedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
    const todaysBatch = schedule[today] || [];
    
    if (todaysBatch.length === 0) {
      return NextResponse.json({ message: `No emails scheduled for ${today}` });
    }

    // Process Batch
    const results = { success: 0, failed: 0 };
    
    // Concurrency Limit: 5 at a time
    const batchSize = 5;
    for (let i = 0; i < todaysBatch.length; i += batchSize) {
      const chunk = todaysBatch.slice(i, i + batchSize);
      await Promise.all(chunk.map(async (lead: any) => {
        try {
          const isClicker = lead.type === 'clicker';
          const subject = isClicker 
            ? `Did you find the specs for ${lead.company}?`
            : `Manufacturing capacity in Baja?`;
            
          const content = isClicker
            ? `<p>Hi ${lead.firstName},</p><p>I noticed you were checking out our facility specs earlier.</p><p>Did you find what you needed considering **${lead.company}**?</p><p>I can send over a more detailed technical packet if you're evaluating specific projected costs.</p>`
            : `<p>Hi ${lead.firstName || 'there'},</p><p>Is **${lead.company}** currently exploring nearshore manufacturing options?</p><p>We recently helped a similar US firm reduce logistics costs by 20% by moving assembly to Tijuana.</p><p>Worth a 5-minute chat to see if the math works for you?</p>`;

          const ctaText = isClicker ? "Yes, send info" : "See Case Study";
          const body = wrapHtml(content, ctaText, "https://calendly.com/denisse-nearshorenavigator/30min");

          await brevo.sendEmail({
            to: [{ email: lead.email, name: lead.firstName ? `${lead.firstName} ${lead.lastName}` : lead.company }],
            subject: subject,
            htmlContent: body
          });
          results.success++;
        } catch (e) {
          console.error(`Failed to send to ${lead.email}:`, e);
          results.failed++;
        }
      }));
    }

    return NextResponse.json({ 
      message: `Processed ${todaysBatch.length} leads for ${today}`,
      results 
    });

  } catch (error: any) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
