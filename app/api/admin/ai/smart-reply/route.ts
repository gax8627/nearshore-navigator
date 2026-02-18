import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { leadName, leadCompany, lastMessage, intent } = await req.json();
    
    // Construct a prompt based on the intent (e.g., "book_meeting", "send_info", "not_interested")
    let goalPrompt = "";
    switch (intent) {
        case 'book_meeting':
            goalPrompt = "The goal is to schedule a 15-minute intro call. Propose 2 times next Tuesday/Wednesday.";
            break;
        case 'send_info':
            goalPrompt = "The goal is to send them our 'Nearshoring Guide 2025' PDF. Ask if they want the link.";
            break;
        case 'objection_handling':
            goalPrompt = "They have concerns about quality. Reassure them about our ISO 9001 certifications.";
            break;
        default:
            goalPrompt = "The goal is to keep the conversation going and assess their needs.";
    }

    const prompt = `
      You are Denisse Gastelum, a professional Nearshore Consultant.
      Draft a short, warm, and professional email reply to ${leadName} from ${leadCompany}.
      
      Context:
      - Last Message from them: "${lastMessage || '(Initial outreach)'}"
      - Strategy: ${goalPrompt}
      
      Keep it under 100 words. No subject line. Just the body.
    `;

    const { text } = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt: prompt,
    });

    return NextResponse.json({ reply: text.trim() });

  } catch (error) {
    console.error('Smart Reply Error:', error);
    return NextResponse.json({ error: 'Reply generation failed' }, { status: 500 });
  }
}
