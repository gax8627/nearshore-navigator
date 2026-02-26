import { inngest } from '@/lib/inngest/client';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import OpenAI from 'openai';

export const leadEnrichment = inngest.createFunction(
  { id: 'lead-enrichment', retries: 3 },
  { event: 'lead.created' },
  async ({ event, step }) => {
    const { leadId, email, name, company, source } = event.data;

    // Step 1: Analyze domain if company is missing or we want more context
    const enrichedData = await step.run('enrich-domain', async () => {
      const domain = email.split('@')[1];
      if (['gmail.com', 'yahoo.com', 'hotmail.com'].includes(domain)) {
        return { isB2B: false, notes: 'Generic email provider. Could not enrich domain.' };
      }

      try {
        const openai = new OpenAI();
        // Attempt basic enrichment via LLM based on domain name and lead source
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are an AI sales assistant. Based on the following domain name and lead source, guess the industry, size, and potential needs of the company. If the source is "marketing_os_page", explicitly add a highly visible tag: "[INTERESTED IN MARKETING OS RETAINER]". Keep it brief (2-3 sentences max). If you do not know the domain, just say "Unknown domain".',
            },
            {
              role: 'user',
              content: `Domain: ${domain}\nLead Source: ${source || 'Unknown'}`,
            },
          ],
          model: 'gpt-4o-mini',
        });
        
        const aiAnalysis = completion.choices[0].message.content || 'No analysis generated.';
        return { isB2B: true, notes: `Domain Analysis (${domain}): ${aiAnalysis}` };
      } catch (error) {
        console.error('Enrichment failed:', error);
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
          message: `${existingNotes}--- AI Enrichment ---\n${enrichedData.notes}`,
          score: enrichedData.isB2B ? 10 : 0 // Basic scoring
        })
        .where(eq(leads.id, leadId));
    });

    return { success: true, leadId, enriched: enrichedData.isB2B };
  }
);
