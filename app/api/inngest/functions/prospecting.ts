import { inngest } from '@/lib/inngest/client';
import { tavily } from '@tavily/core';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { brevo } from '@/lib/brevo';
import { wrapHtml } from '@/lib/email-templates/outreach';
import { db } from '@/lib/db';
import { leads as leadsTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Lazy-initialize Tavily to avoid build-time errors when API key is not set
let _tvly: ReturnType<typeof tavily> | null = null;
function getTavily() {
  if (!_tvly) {
    _tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });
  }
  return _tvly;
}

// Define the event Schema
type ProspectingEvent = {
  name: 'prospecting/start-campaign';
  data: {
    campaignType?: 'marketing' | 'manufacturing';
    leads: {
      name: string; // Contact Person
      company: string;
      website?: string;
      email?: string;
    }[];
    listId?: number; // Optional Brevo List ID
  };
};

/**
 * Calculates the next 8:00 AM ISO string for a given timezone.
 */
function getNext8AM(timezone: string): string {
  try {
    // Get current time in target timezone
    const now = new Date();
    const localNowString = now.toLocaleString('en-US', { timeZone: timezone });
    const localNow = new Date(localNowString);

    // Create target date (today at 8am)
    const target = new Date(localNow);
    target.setHours(8, 0, 0, 0);

    // If 8am has passed today, move to tomorrow
    if (target <= localNow) {
      target.setDate(target.getDate() + 1);
    }

    // Now we have the *local* time component for the target.
    // We need to convert this "local 8am" back to a UTC timestamp or an offset-aware string for Brevo.
    // A robust way without heavy libraries:
    // 1. Construct a string "YYYY-MM-DDTHH:mm:ss" from the target components
    // 2. Append the target timezone offset? Actually, Brevo expects an ISO string in UTC usually, or with offset.
    // Let's rely on finding the UTC equivalent of "Target Local Time".
    
    // Simplest approach:
    // We know 'target' date object currently holds the Local wall-clock time as if it were local system time (because we parsed toLocaleString).
    // We need to find the real UTC instant that corresponds to "Target Wall Clock" in "Target Zone".
    // We can iterate or use a library, but let's try to trust the offset simple math if possible or just use UTC for now if complex.
    // Actually, Brevo scheduledAt supports UTC: "YYYY-MM-DDTHH:mm:ss.SSSZ".
    
    // Let's use a simpler heuristic for MVP:
    // 1. Get offset of the timezone.
    // No, standard JS Intl doesn't give offset easily.
    
    // Let's try to ask the LLM to give us the UTC offset or just the scheduled time in UTC?
    // No, code is safer.
    
    // Hacky but works: formatted string in English "MM/DD/YYYY, 08:00:00 AM" -> feed back to Date constructor? No, that uses local env.
    
    // Better: Helper function to get UTC string for a specific Wall Time in a Zone.
    // Since we are adding logic, let's just schedule it for "Tomorrow 16:00 UTC" if we assume PST (UTC-8) -> 8am = 16:00 UTC. 
    // But we need dynamic.
    
    // Let's just return a calculated UTC string.
    // For now, let's default to "Tomorrow at 14:00 UTC" (9am EST / 6am PST) if parsing fails, but try to be smart.
    // The user really wants 8am THEIR time.
    
    // Let's use the 'date-fns-tz' pattern conceptually:
    // We want 8am in `timezone`.
    // Let's calculate the delay and add it to `now`.
    
    // Alternative: Let Brevo handle it? No, Brevo just takes a time string.
    
    // Let's try to construct it:
    // 1. Get current UTC time.
    // 2. Adjust it until `.toLocaleString(..., {timeZone})` says "8:00 AM".
    
    // Let's use a simple approximation for the prompt to keep it robust:
    // "Calculate the next 8am in UTC for this timezone" -> LLM can do it? No, side effects.
    
    // Let's stick to standard ISO strings and hope for the best, or defaulting to a fixed time (e.g. 15:00 UTC) which covers US/Europe mornings broadly.
    // user said "our time zone is pacific... prospects... should receive emails at 8am [their time]".
    
    // Let's try to use the `Intl` API to find the offset.
    const typef = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'shortOffset' });
    const parts = typef.formatToParts(new Date());
    const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value; // "GMT-5"
    
    if (offsetPart) {
      // Parse GMT-5 or GMT+10:30
      const match = offsetPart.match(/GMT([+-]\d+)(?::(\d+))?/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2] || '0');
        const totalMinutes = (hours * 60) + (hours < 0 ? -minutes : minutes);
        
        // Target is 08:00 local.
        // UTC = Local - Offset
        // UTC_Hour = 8 - (OffsetHours)
        
        // Example: NY (GMT-5). 8am Local.
        // UTC = 8 - (-5) = 13:00 UTC. Correct.
        
        const nowUTC = new Date();
        const targetUTC = new Date(nowUTC);
        targetUTC.setUTCHours(8 - hours, -minutes || 0, 0, 0); // Set to 8am relative to offset
        
        // If this time has passed, add 1 day
        if (targetUTC <= nowUTC) {
             targetUTC.setDate(targetUTC.getDate() + 1);
        }
        
        return targetUTC.toISOString();
      }
    }
  } catch (e) {
    console.error('Timezone calc error', e);
  }
  
  // Fallback: 8am PST tomorrow = 16:00 UTC tomorrow
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setUTCHours(16, 0, 0, 0);
  return d.toISOString();
}


export const prospectingAgent = inngest.createFunction(
  { id: 'prospecting-agent' },
  { event: 'prospecting/start-campaign' },
  async ({ event, step }) => {
    const { leads, listId } = event.data;
    console.log(`[ProspectingAgent] Starting campaign for ${leads.length} leads. ListId: ${listId}`);
    console.log(`[ProspectingAgent] Google Key present: ${!!process.env.GOOGLE_GENERATIVE_AI_API_KEY}`);
    const results = [];

    for (const lead of leads) {
      console.log(`[ProspectingAgent] Processing lead: ${lead.name} (${lead.company})`);
      if (!lead.email) {
        console.log(`[ProspectingAgent] Skipping ${lead.name} - No email provided in CSV.`);
        continue;
      }

      const leadKey = `${lead.company}-${lead.name}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().slice(0, 40);

      // Check DB to prevent double-emailing
      const alreadyContacted = await step.run(`check-idempotency-${leadKey}`, async () => {
         const record = await db.query.leads.findFirst({
           where: eq(leadsTable.email, lead.email!)
         });
         return record?.status === 'contacted';
      });

      if (alreadyContacted) {
         console.log(`[ProspectingAgent] Skipping ${lead.name} - Already marked 'contacted' in DB.`);
         continue;
      }

      // Step 1: Deep Research (Company + Person)
      const researchData = await step.run(`research-${leadKey}`, async () => {
        console.log(`[ProspectingAgent] Researching ${lead.company} for ${lead.name}...`);
        const companyQuery = `Analyze ${lead.company} ${lead.website || ''}. industry, core products, technology stack, and recent news.`;
        const personQuery = `Find role, background, and professional skills for ${lead.name} at ${lead.company}.`;
        
        const [companyRes, personRes] = await Promise.all([
          getTavily().search(companyQuery, { search_depth: 'basic' }),
          getTavily().search(personQuery, { search_depth: 'basic' })
        ]);

        // Severely truncate the results so the Inngest local state doesn't bloat and crash Next.js API routes!
        const companyStr = companyRes.results?.map(r => r.content).join('\\n').slice(0, 3000) || 'No company data found.';
        const personStr = personRes.results?.map(r => r.content).join('\\n').slice(0, 1500) || 'No person data found.';

        return { company: companyStr, person: personStr };
      });

      // Step 2 & 3: United AI Analysis & Email Drafting
      // Bypasses the 20/day limit by doing the analysis and drafting in ONE single AI call
      const emailContent = await step.run(`draft-email-${leadKey}`, async () => {
        try {
          const isMarketing = event.data.campaignType !== 'manufacturing';
          
          const promptGoal = isMarketing
            ? 'Prospecting for Denisse Martinez, a Fractional Marketing Consultant who helps manufacturers and industrial companies grow through targeted, à la carte marketing services — like LinkedIn outreach campaigns, CRM setup, SEO audits, or industry-specific content creation. She works alongside their existing team as a part-time marketing director.'
            : 'Prospecting for Contract Manufacturing Services (offering high-quality, cost-effective manufacturing solutions in Mexico).';

          const promptInstructions = isMarketing
            ? `- Write the email in a warm, casual, consultant-to-peer tone. You are Denisse Martinez, a marketing consultant — NOT a vendor or agency. Do NOT lie and claim we have spoken before. Jump straight into the value.
                - Use very simple, easy-to-understand words.
                - Based on the research, pick ONE specific à la carte service that would be most relevant to their business and pitch it concretely. Choose from: LinkedIn outreach campaigns, CRM audit & setup, industry blog content, email campaigns, SEO optimization, or social media management.
                - Frame it as "I work alongside your team" — emphasize that you embed with them as their part-time marketing director, not that you replace their people.
                - HUMANIZATION: Reference their specific industry, products, or tech stack from the research to show you understand their world.
                - Do NOT mention their location or city.
                - End by asking if they're open to a quick 15-minute call to discuss. DO NOT include any HTML links or Calendly URLs in your text. The template already provides a button below your text.
                - Sign off as "Denisse Martinez, Fractional Marketing Consultant".`
            : `- "Redact" (Write) the email content in a human, professional tone. Only write the body paragraphs, do NOT write the subject here.
                - HUMANIZATION: Mention their specific skills or industry context from the provided research to show relevance.
                - Do NOT mention their location or city (it can feel creepy).
                - Do NOT be overly "salesy". Be direct but warm.
                - End by asking if they are open to a strategy call. DO NOT include any HTML links or Calendly URLs in your text. The template already provides a button below your text.
                - Sign off as "Denisse Martinez".`;

            console.log(`[ProspectingAgent] Drafting email & analyzing ${leadKey}...`);
            const { object } = await generateObject({
              model: google('gemini-2.5-flash'),
              schema: z.object({
                firstName: z.string(),
                lastName: z.string(),
                skills: z.array(z.string()).describe("Professional skills or technologies discovered in the research"),
                subject: z.string(),
                htmlBody: z.string(),
              }),
              prompt: `
                Analyze the research data and draft a cold outreach email to ${lead.name} from Denisse Martinez (Nearshore Navigator).
                
                Product/Goal: ${promptGoal}
                
                Context: 
                - Prospect: ${lead.name} at ${lead.company}.
                - Research on Company: ${JSON.stringify(researchData.company)}
                - Research on Person: ${JSON.stringify(researchData.person)}
                
                Instructions:
                1. Extract the person's first and last name from '${lead.name}'.
                2. Identify their professional skills from the research text to populate the 'skills' array.
                3. Follow exactly these tone instructions for the email draft:
                ${promptInstructions}
              `
            });
            return object;
          } catch (error: any) {
            console.error(`[ProspectingAgent] Gemini Drafting ERROR for ${lead.company}:`, error?.message || error);
            throw error;
          }
      });

      // Step 4: Sync to Brevo & Schedule
        await step.run(`sync-brevo-${leadKey}`, async () => {
          console.log(`[ProspectingAgent] Syncing ${emailContent.firstName} ${emailContent.lastName} to Brevo...`);
          // Add Contact
          await brevo.createContact({
            email: lead.email!,
            attributes: {
              FIRSTNAME: emailContent.firstName,
              LASTNAME: emailContent.lastName,
              COMPANY: lead.company,
              NOTES: `Skills: ${emailContent.skills.join(', ')}`,
            },
            listIds: listId ? [listId] : [], 
            updateEnabled: true,
          });
          
          // Schedule (8am Local Time)
          // Default to America/Chicago since timezone inference was removed
          const scheduledAt = getNext8AM('America/Chicago');

          // Send
          const finalHtml = wrapHtml(
            emailContent.htmlBody,
            "Book Strategy Call Now",
            "https://calendly.com/denisse-nearshorenavigator/30min?month=2026-02"
          );

          await brevo.sendEmail({
            to: [{ email: lead.email!, name: `${emailContent.firstName} ${emailContent.lastName}` }],
            subject: emailContent.subject,
            // scheduledAt: scheduledAt, // Commented out to blast immediately
            htmlContent: finalHtml,
            tags: [event.data.campaignType || 'marketing'], // Added required tags parameter to prevent Brevo API crash
          });
        });

        // Step 5: Update Database Status
        await step.run(`update-db-${leadKey}`, async () => {
          console.log(`[ProspectingAgent] Updating status for ${lead.email} to "contacted"...`);
          await db.update(leadsTable)
            .set({ status: 'contacted' })
            .where(eq(leadsTable.email, lead.email!));
        });

      // Add a small delay to avoid hitting Gemini Free Tier Rate Limits (15 RPM)
      // Reduced to 15s to launch campaign immediately as requested by the user
      await step.sleep(`delay-${leadKey}`, '15s');

      results.push(emailContent);
    }

    return { success: true, processed: results.length, results };
  }
);
