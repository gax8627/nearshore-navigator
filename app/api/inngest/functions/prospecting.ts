import { inngest } from '@/lib/inngest/client';
import { tavily } from '@tavily/core';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { brevo } from '@/lib/brevo';

// Initialize Tavily
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

// Define the event Schema
type ProspectingEvent = {
  name: 'prospecting/start-campaign';
  data: {
    leads: {
      name: string; // Contact Person
      company: string;
      website?: string;
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
      const leadKey = `${lead.company}-${lead.name}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().slice(0, 40);

      // Step 1: Deep Research (Company + Person)
      const researchData = await step.run(`research-${leadKey}`, async () => {
        console.log(`[ProspectingAgent] Researching ${lead.company} for ${lead.name}...`);
        const companyQuery = `Analyze ${lead.company} ${lead.website || ''}. industry, core products, technology stack, and recent news.`;
        const personQuery = `Find role, background, and professional skills for ${lead.name} at ${lead.company}.`;
        
        const [companyRes, personRes] = await Promise.all([
          tvly.search(companyQuery, { search_depth: 'advanced' }),
          tvly.search(personQuery, { search_depth: 'advanced' })
        ]);

        return { company: companyRes, person: personRes };
      });

      // Step 2: Analysis & Verification
      const verifiedLead = await step.run(`verify-${leadKey}`, async () => {
        try {
          console.log(`[ProspectingAgent] Calling Gemini for ${leadKey}...`);
          const { object } = await generateObject({
            model: google('gemini-flash-lite-latest'),
            schema: z.object({
              firstName: z.string(),
              lastName: z.string(),
              email: z.string().email().optional(),
              companyName: z.string(),
              jobTitle: z.string().optional(),
              location: z.string().describe("City, Country or Region"),
              timezone: z.string().describe("IANA Timezone ID (e.g. America/New_York)"),
              skills: z.array(z.string()).describe("Professional skills, technologies, or expertise found"),
              companySummary: z.string().describe("Brief 1-sentence summary of what the company does"),
              confidence: z.number().describe('Confidence score 0-100'),
            }),
            prompt: `
              Analyze the research data for ${lead.name} at ${lead.company}.
              
              Company Data: ${JSON.stringify(researchData.company)}
              Person Data: ${JSON.stringify(researchData.person)}
              
              1. Extract the contact details (Email is critical).
              2. Infer the timezone from location.
              3. Extract key technical or professional skills.
            `,
          });
          return object;
        } catch (error: any) {
          console.error(`[ProspectingAgent] Gemini Verification ERROR for ${lead.company}:`, error?.message || error);
          throw error; // Re-throw for Inngest retry logic
        }
      });

      // Step 3: AI Email Drafting ("Redactar")
      // User request: "use skills to humanize the email", "don't personalized email" (meaning don't be creepy, be relevant).
      if (verifiedLead.email && verifiedLead.confidence > 70) {
        const emailContent = await step.run(`draft-email-${leadKey}`, async () => {
          try {
            console.log(`[ProspectingAgent] Drafting email for ${leadKey}...`);
            const { object } = await generateObject({
              model: google('gemini-flash-lite-latest'),
              schema: z.object({
                subject: z.string(),
                htmlBody: z.string(),
              }),
              prompt: `
                Draft a cold outreach email to ${verifiedLead.firstName} from Denisse Martinez (Nearshore Navigator).
                
                Goal: Prospecting for Contract Manufacturing Services.
                Link: https://calendly.com/denisse-nearshorenavigator/30min?month=2026-02
                
                Context: 
                - Prospect: ${verifiedLead.firstName} (${verifiedLead.jobTitle}) at ${verifiedLead.companyName}.
                - Skills/Tech: ${verifiedLead.skills.join(', ')}.
                - Company: ${verifiedLead.companySummary}.
                
                Instructions:
                - "Redact" (Write) the email in a human, professional tone.
                - HUMANIZATION: Mention their specific skills or industry context to show relevance.
                - Do NOT mention their location or city (it can feel creepy).
                - Do NOT be overly "salesy". Be direct but warm.
                - Include the Calendly link for a booking.
                - Sign off as "Denisse Martinez".
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
          console.log(`[ProspectingAgent] Syncing ${verifiedLead.firstName} ${verifiedLead.lastName} to Brevo...`);
          // Add Contact
          await brevo.createContact({
            email: verifiedLead.email!,
            attributes: {
              FIRSTNAME: verifiedLead.firstName,
              LASTNAME: verifiedLead.lastName,
              COMPANY: verifiedLead.companyName,
              JOB_TITLE: verifiedLead.jobTitle || '',
              CITY: verifiedLead.location, 
              NOTES: `Skills: ${verifiedLead.skills.join(', ')}\nTimezone: ${verifiedLead.timezone}`,
            },
            listIds: listId ? [listId] : [], 
            updateEnabled: true,
          });
          
          // Schedule (8am Local Time)
          const scheduledAt = getNext8AM(verifiedLead.timezone);

          // Send
          await brevo.sendEmail({
            to: [{ email: verifiedLead.email!, name: `${verifiedLead.firstName} ${verifiedLead.lastName}` }],
            subject: 'meeting',
            scheduledAt: scheduledAt,
            htmlContent: emailContent.htmlBody,
          });
        });
      } else {
        console.log(`[ProspectingAgent] Skipping Brevo sync for ${lead.name} (Email missing or confidence too low: ${verifiedLead.confidence})`);
      }

      // Add a small delay to avoid hitting Gemini Free Tier Rate Limits (15 RPM)
      // We use a 2-minute delay to be absolutely sure we don't hit the 15 RPM limit
      await step.sleep(`delay-${leadKey}`, '2m');

      results.push(verifiedLead);
    }

    return { success: true, processed: results.length, results };
  }
);
