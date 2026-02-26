import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { topic, count = 3 } = await req.json();
    const prompt = `Generate ${count} engaging blog post ideas about "${topic || 'Industrial Manufacturing in Mexico'}". 
    Focus on trends, cost savings, and logistics. 
    Format the response as a JSON array of objects with 'title' and 'excerpt' keys. 
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.`;

    const { text } = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt: prompt,
    });

    // Clean up potential markdown formatting if Gemini adds it despite prompt
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let ideas;
    try {
      ideas = JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse AI response:", text);
        return NextResponse.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 });
    }

    return NextResponse.json({ ideas });
  } catch (error: any) {
    console.error('Error generating ideas:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate ideas' }, { status: 500 });
  }
}
