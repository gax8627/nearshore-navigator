import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { inngest } from '@/lib/inngest/client';
import { brevo } from '@/lib/brevo';
import { QuestionnairePDF } from '@/components/QuestionnairePDF';

export const deliverLeadMagnet = inngest.createFunction(
  { id: 'deliver-lead-magnet', triggers: { event: 'lead.requested.magnet' } },
  async ({ event, step }) => {
    const { email, name, company, pdfRequested, data } = event.data;
    const startTime = Date.now();

    await step.run('add-to-crm-and-send', async () => {
      // 1. Add/Update Contact in Brevo CRM
      try {
        await brevo.createContact({
          email,
          attributes: {
            FIRSTNAME: name ? name.split(' ')[0] : 'Partner',
            COMPANY: company || 'Organization',
            SOURCE: `lead_magnet_${pdfRequested || 'landed_cost_report'}`
          },
          updateEnabled: true
        });
      } catch (e) {
        console.error("[Lead Magnet] Failed to add to Brevo CRM:", e);
      }

      // 2. Generate Custom PDF Report on the Fly using @react-pdf/renderer
      let pdfBase64 = '';
      try {
        const pdfBuffer = await renderToBuffer(
          React.createElement(QuestionnairePDF, {
            contactName: name,
            companyName: company,
            email,
            pdfRequested: pdfRequested || 'Landed Cost Feasibility Report',
            data,
          }) as unknown as React.ReactElement<import('@react-pdf/renderer').DocumentProps>
        );
        pdfBase64 = pdfBuffer.toString('base64');
      } catch (pdfErr) {
        console.error("[Lead Magnet] Error generating PDF report:", pdfErr);
      }

      const reportTitle = pdfRequested || 'Nearshore Landed Cost Report';
      const sanitizeName = (company || name || 'Nearshore').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${sanitizeName}_Landed_Cost_Report.pdf`;

      // 3. Send Transactional Email via Brevo with PDF Attachment
      try {
        await brevo.sendEmail({
          to: [{ email, name: name || 'Valued Partner' }],
          subject: `Your Custom Landed Cost & Feasibility Report: ${reportTitle}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
              <h2 style="color: #2563eb; margin-bottom: 8px;">Your Custom Nearshore Analysis Is Ready</h2>
              <p style="font-size: 15px; line-height: 1.5;">Hello ${name ? name.split(' ')[0] : 'there'},</p>
              <p style="font-size: 15px; line-height: 1.5;">
                Thank you for requesting your custom landed cost assessment with <strong>Nearshore Navigator</strong>.
                Your customized PDF report has been generated and attached directly to this email for your immediate review.
              </p>
              
              <div style="margin: 24px 0; padding: 16px; background-color: #f3f4f6; border-left: 4px solid #2563eb; border-radius: 4px;">
                 <h4 style="margin: 0 0 6px 0; color: #111827;">What's Inside Your Report:</h4>
                 <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4b5563;">
                   <li>Baja California Industrial Footprint & Operational Scoping</li>
                   <li>Labor & Landed Cost Savings Analysis (35% - 52% vs. US Baseline)</li>
                   <li>IMMEX / USMCA Duty & Tariff Compliance Framework</li>
                 </ul>
              </div>

              <div style="margin: 30px 0; text-align: center;">
                 <a href="https://nearshorenavigator.com/documents/Nearshore-Navigator-Master-Project-Report.pdf" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                    View Master Project Report
                 </a>
              </div>

              <p style="font-size: 14px; color: #6b7280;">If you have any questions about site selection or capacity matches in Tijuana or Mexicali, simply reply to this email.</p>
              <br/>
              <p style="font-size: 14px; font-weight: bold; color: #111827;">The Nearshore Navigator Team<br/><span style="font-weight: normal; color: #6b7280;">Baja California Industrial Logistics</span></p>
            </div>
          `,
          attachment: pdfBase64 ? [
            {
              name: filename,
              content: pdfBase64,
            }
          ] : undefined
        });

        const elapsed = Date.now() - startTime;
        console.log(`[Lead Magnet] Custom PDF Landed Cost Report delivered to ${email} in ${elapsed}ms`);
      } catch (error) {
         console.error("[Lead Magnet] Failed to send transactional email via Brevo:", error);
         throw error;
      }
    });

    return { success: true, deliveredTo: email, durationMs: Date.now() - startTime };
  }
);

