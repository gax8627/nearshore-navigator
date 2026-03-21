import { inngest } from '@/lib/inngest/client';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const leadEnrichment = inngest.createFunction(
  { id: 'lead-enrichment', retries: 3 },
  { event: 'lead.created' },
  async ({ event, step }) => {
    const { leadId, email, name, company, source } = event.data;

    // Step 1: Analyze domain using Gemini for B2B lead enrichment
    const enrichedData = await step.run('enrich-domain', async () => {
      const domain = email.split('@')[1];

      if (['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'yahoo.com.mx'].includes(domain)) {
        return { isB2B: false, notes: 'Generic email provider — could not enrich domain.' };
      }

      try {
        const { text } = await generateText({
          model: google('gemini-2.0-flash'),
          system: `You are an expert B2B sales intelligence analyst specializing in manufacturing and nearshoring.
Based on a company domain name and lead source, provide a brief analysis (2–3 sentences max) covering:
- Likely industry and company size
- Manufacturing footprint likelihood (US domestic, offshore, or nearshore)
- Nearshoring pain points they may have (tariffs, supply chain, labor costs)
If the source is "marketing_os_page", add: "[INTERESTED IN MARKETING OS RETAINER]"
If you do not recognize the domain, say "Unknown domain — requires manual research."
Keep the response concise and actionable for a sales team.`,
          prompt: `Domain: ${domain}\nLead Source: ${source || 'Unknown'}\nCompany (if known): ${company || 'Unknown'}`,
        });

        return { isB2B: true, notes: `Domain Analysis (${domain}): ${text}` };
      } catch (error) {
        console.error('Lead enrichment Gemini call failed:', error);
        return { isB2B: true, notes: `Failed to analyze domain: ${domain}` };
      }
    });

    // Step 2: Update the lead in the database with the enriched notes
    await step.run('update-lead-database', async () => {
      const currentLead = await db.query.leads.findFirst({
        where: eq(leads.id, leadId)
      });

      if (!currentLead) return;

      const existingNotes = currentLead.message ? `Original Message: ${currentLead.message}\n\n` : '';

      await db.update(leads)
        .set({
          message: `${existingNotes}--- AI Enrichment (Gemini) ---\n${enrichedData.notes}`,
          score: enrichedData.isB2B ? 10 : 0
        })
        .where(eq(leads.id, leadId));
    });

    return { success: true, leadId, enriched: enrichedData.isB2B };
  }
);
