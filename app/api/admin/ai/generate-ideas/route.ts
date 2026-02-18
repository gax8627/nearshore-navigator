import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Gemini API Key not configured', 
        details: 'Please add GEMINI_API_KEY to your environment variables.' 
      }, { status: 503 });
    }

    const { topic, count = 3 } = await req.json();
    const prompt = `Generate ${count} engaging blog post ideas about "${topic || 'Industrial Manufacturing in Mexico'}". 
    Focus on trends, cost savings, and logistics. 
    Format the response as a JSON array of objects with 'title' and 'excerpt' keys. 
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

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
