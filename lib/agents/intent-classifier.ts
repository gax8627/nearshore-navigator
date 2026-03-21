import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export type Intent = 'YES_PDF' | 'MEETING_REQUEST' | 'UNSUBSCRIBE' | 'QUESTION' | 'OTHER';

export interface IntentResult {
  intent: Intent;
  confidence: number;
  summary: string;
}

/**
 * Rapidly classifies an inbound email reply to determine the next automation step.
 */
export async function classifyReplyIntent(text: string): Promise<IntentResult> {
  try {
    const prompt = `
      Classify the following email reply from a manufacturing lead.
      
      EMAIL TEXT:
      """
      ${text}
      """
      
      CATEGORIES:
      - YES_PDF: User said "Yes", "Send it", "I want the shortlist", "Please provide the PDF", or similar agreement to receive a lead magnet.
      - MEETING_REQUEST: User asked to talk, schedule a call, meet, or mentioned timing for a discussion.
      - UNSUBSCRIBE: User wants to be removed, says "No thanks", "Stop", or "Take me off".
      - QUESTION: User asks a specific question about Mexico, tariffs, or operations.
      - OTHER: General greeting, out of office, or unclear intent.
      
      Return a JSON object:
      {
        "intent": "CATEGORY_NAME",
        "confidence": 0.0 to 1.0,
        "summary": "One sentence explanation"
      }
    `;

    const { text: responseText } = await generateText({
      model: google('gemini-1.5-flash-latest'), // Use Flash for speed in webhooks
      prompt: prompt,
    });

    // Clean and parse
    const jsonString = responseText.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonString) as IntentResult;
    
  } catch (error) {
    console.error('Intent classification failed:', error);
    return { intent: 'OTHER', confidence: 0, summary: 'Error during classification' };
  }
}
