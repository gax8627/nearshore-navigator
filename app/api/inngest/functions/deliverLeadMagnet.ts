import { inngest } from '@/lib/inngest/client';
import { brevo } from '@/lib/brevo';

export const deliverLeadMagnet = inngest.createFunction(
  { id: 'deliver-lead-magnet' },
  { event: 'lead.requested.magnet' },
  async ({ event, step }) => {
    const { email, name, pdfRequested } = event.data;

    await step.run('add-to-crm-and-send', async () => {
      // 1. Add/Update Contact in Brevo
      try {
        await brevo.createContact({
          email,
          attributes: {
            FIRSTNAME: name ? name.split(' ')[0] : 'There',
            SOURCE: `lead_magnet_${pdfRequested || 'general'}`
          },
          updateEnabled: true
        });
      } catch (e) {
        console.error("Failed to add to Brevo", e);
      }

      // 2. Send the actual email
      // This uses Brevo's transactional email API.
      // In production, you would attach the PDF or link to it in a nicely formatted template.
      try {
        await brevo.sendEmail({
          to: [{ email, name }],
          subject: `Here is your guide: ${pdfRequested || 'Nearshore Manufacturing Guide'}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0d9488;">Thanks for your interest, ${name ? name.split(' ')[0] : ''}!</h2>
              <p>As requested, here is your copy of <strong>${pdfRequested || 'The Nearshore Guide'}</strong>.</p>
              
              <div style="margin: 30px 0; text-align: center;">
                 <a href="https://nearshorenavigator.com/resources/latest-guide.pdf" style="background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Download PDF Guide</a>
              </div>
              
              <p>If you have any questions about how this applies to your specific manufacturing needs, just reply to this email.</p>
              <br/>
              <p>Best regards,<br/>The Nearshore Navigator Team</p>
            </div>
          `
        });
      } catch (error) {
         console.error("Failed to send lead magnet email", error);
         throw error; // Retry via Inngest if email fails
      }
    });

    return { success: true, deliveredTo: email };
  }
);
