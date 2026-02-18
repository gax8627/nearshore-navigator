import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const domain = email.split('@')[1];
    
    // Skip common providers
    if (['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'].includes(domain)) {
         return NextResponse.json({ result: { industry: 'Unknown (Personal Email)', size: 'Unknown', summary: 'This appears to be a personal email address.' } });
    }

    const prompt = `
      Analyze the company associated with the domain "${domain}".
      Return a JSON object with:
      - industry: (e.g., Medical Devices, SaaS, Manufacturing)
      - size: (e.g., 10-50, 100-500, 1000+)
      - summary: One sentence description of what they do.
      
      If you don't know, make a best guess based on the name or return "Unknown".
    `;

    const { text } = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt: prompt,
    });

    // Clean markdown manually if AI wraps in ```json ... ```
    const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
    const result = JSON.parse(jsonString);

    return NextResponse.json({ result });

  } catch (error) {
    console.error('Research Lead Error:', error);
    return NextResponse.json({ error: 'Research failed' }, { status: 500 });
  }
}
