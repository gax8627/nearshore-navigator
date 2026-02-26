import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { brevo } from '../../lib/brevo';
import { wrapHtml } from '../../lib/email-templates/outreach';

/**
 * scripts/campaigns/send_test_email.ts
 * Generates a sample marketing email using the exact Gemini prompt from our Inngest function,
 * wraps it in the premium HTML template, and sends to the user's email instantly.
 */
async function testEmail() {
  const prospect = {
    firstName: "Ramiro",
    lastName: "Gaxiola",
    jobTitle: "Director of Operations",
    companyName: "Austin Precision Machining",
    skills: ["CNC Machining", "Vendor Management", "Lean Manufacturing"],
    companySummary: "Austin Precision Machining is a high-volume CNC manufacturing facility serving the automotive and tech industries."
  };

  console.log("🧠 Generating email copy with Gemini...");
  const { object } = await generateObject({
    model: google('gemini-flash-lite-latest'),
    schema: z.object({
      subject: z.string(),
      htmlBody: z.string(),
    }),
    prompt: `
      Draft a cold outreach email to ${prospect.firstName} from Denisse Martinez (Nearshore Navigator).
      
      Goal: Prospecting for Nearshore B2B Marketing Services (offering high-quality, bilingual marketing teams based in Mexico operating seamlessly in the US timezone).
      
      Context: 
      - Prospect: ${prospect.firstName} (${prospect.jobTitle}) at ${prospect.companyName}.
      - Skills/Tech: ${prospect.skills.join(', ')}.
      - Company: ${prospect.companySummary}.
      
      Instructions:
      - "Redact" (Write) the email content in a very warm, casual, and friendly tone. Start with something simple like "Hope you're having a great week!". Do NOT lie and claim we have spoken before.
      - Use very simple, easy-to-understand words.
      - Provide exactly 2 bulleted examples of how our nearshore marketing team can help them (e.g., managing their HubSpot/CRM, running LinkedIn outreach, or creating industry content - tailor these 2 examples slightly to their industry).
      - HUMANIZATION: Mention their specific skills or industry context to show relevance.
      - Do NOT mention their location or city.
      - End by asking if they are open to a strategy call. DO NOT include any HTML links or Calendly URLs in your text. The template already provides a button below your text.
      - Sign off as "Denisse Martinez".
    `
  });

  console.log(`\n📝 Subject Generated: ${object.subject}`);
  console.log(`📝 Body Generated:\n${object.htmlBody}\n`);
  
  const finalHtml = wrapHtml(
    object.htmlBody,
    "Book Strategy Call Now",
    "https://calendly.com/denisse-nearshorenavigator/30min?month=2026-02"
  );

  console.log("📨 Sending test email to gax8627@gmail.com...");
  await brevo.sendEmail({
    to: [{ email: "gax8627@gmail.com", name: "Ramiro Gaxiola" }],
    // Add [TEST preview] prefix so the user knows this is the preview
    subject: `meeting`,
    htmlContent: finalHtml,
    tags: ['test-campaign'], // Fix missing tags parameter
  });
  console.log("✅ Test email sent successfully to gax8627@gmail.com!");
}

testEmail().catch(console.error);
