import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix';
import { COMPETITOR_MATRIX } from '@/app/constants/competitor-matrix';
import { MARKET_ALERTS } from '@/app/constants/market-pulse-news';

/**
 * AI Manufacturing Consultant — Real Gemini RAG Engine
 * Uses Gemini 2.5 Flash with internal industrial datasets as RAG context.
 * Falls back gracefully when the API key is unavailable.
 */

// Build a compact RAG context string from internal datasets
function buildRagContext(lastMessage: string): string {
  const lower = lastMessage.toLowerCase();
  const chunks: string[] = [];

  // City/hub data
  const cities = ['tijuana', 'mexicali', 'juarez', 'monterrey', 'reynosa', 'hermosillo', 'matamoros', 'saltillo', 'puebla', 'queretaro', 'guadalajara', 'silao', 'san-luis-potosi', 'nuevo-laredo'];
  const mentionedCities = cities.filter(c => lower.includes(c.replace('-', ' ')) || lower.includes(c));

  if (mentionedCities.length > 0) {
    mentionedCities.slice(0, 3).forEach(city => {
      const entries = INDUSTRY_MATRIX.filter(e => e.citySlug === city).slice(0, 3);
      entries.forEach(e => {
        const stats = e.stats as Record<string, string | number>;
        chunks.push(
          `[HUB: ${city.toUpperCase()} / ${e.industrySlug}] Plants: ${e.stats.plants}, Workforce: ${e.stats.workforce}` +
          (stats.vacancyRate ? `, Vacancy: ${stats.vacancyRate}` : '') +
          (stats.energyCostKwh ? `, Energy: ${stats.energyCostKwh}/kWh` : '') +
          (stats.fullyBurdenedLaborRate ? `, Labor: ${stats.fullyBurdenedLaborRate}` : '')
        );
      });
    });
  } else {
    // Default: include top 5 hubs summary
    const topHubs = ['tijuana', 'monterrey', 'juarez', 'hermosillo', 'saltillo'];
    topHubs.forEach(city => {
      const first = INDUSTRY_MATRIX.find(e => e.citySlug === city);
      if (first) {
        chunks.push(`[HUB: ${city.toUpperCase()}] Plants: ${first.stats.plants}, Workforce: ${first.stats.workforce}`);
      }
    });
  }

  // Competitor data
  if (lower.includes('competitor') || lower.includes('compare') || lower.includes('ivemsa') || lower.includes('naps') || lower.includes('tecma') || lower.includes('offshore group')) {
    COMPETITOR_MATRIX.forEach(comp => {
      chunks.push(`[COMPETITOR: ${comp.name}] Strengths: ${comp.strengths.join(', ')}. Speed-to-market: ${comp.speedToMarket}.`);
    });
  }

  // Market alerts
  if (lower.includes('tariff') || lower.includes('usmca') || lower.includes('news') || lower.includes('alert') || lower.includes('trade')) {
    MARKET_ALERTS.forEach(alert => {
      chunks.push(`[MARKET ALERT – ${alert.impactLevel} – ${alert.topic}]: ${alert.summary} Affected cities: ${alert.affectedCities.join(', ')}.`);
    });
  }

  return chunks.join('\n');
}

const SYSTEM_PROMPT = `You are an expert AI Manufacturing Consultant for Nearshore Navigator, a strategic advisory firm that helps US companies expand manufacturing operations to Mexico — specifically Baja California (Tijuana, Mexicali), Monterrey, Hermosillo, and other Mexican industrial hubs.

Your role:
- Provide accurate, data-driven advice about nearshoring, shelter services, contract manufacturing, industrial real estate, and USMCA/IMMEX trade structures in Mexico.
- Use the provided RAG context (real industrial data) to back up your answers with specific facts: labor rates, plant counts, vacancy rates, etc.
- Be concise, professional, and direct. You are speaking to C-suite executives and supply chain managers evaluating a major business decision.
- When relevant, recommend a free 30-minute strategy call: https://calendly.com/denisse-nearshorenavigator/30min
- Nearshore Navigator's key differentiator: objective broker model (no conflict of interest), 15-30 day speed-to-market, bilingual team on both sides of the border.
- Do NOT fabricate data. If you don't have information, say so and offer to connect the user with Denisse Martinez directly.
- Keep responses under 200 words unless the user asks for a detailed breakdown.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || '';

    // Build RAG context from internal datasets
    const ragContext = buildRagContext(lastMessage);

    // Check if Gemini API key is available
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.warn('[Chat API] GOOGLE_GENERATIVE_AI_API_KEY not set — returning fallback response.');
      return NextResponse.json({
        role: 'assistant',
        content: 'Our AI consultant is temporarily offline. Please reach out directly to Denisse Martinez at denisse@nearshorenavigator.com or book a call at calendly.com/denisse-nearshorenavigator/30min for immediate assistance.',
      });
    }

    // Build the prompt with RAG context injected
    const userPrompt = ragContext
      ? `INTERNAL DATA CONTEXT (use this to answer accurately):\n${ragContext}\n\nUSER QUESTION: ${lastMessage}`
      : lastMessage;

    // Format conversation history (last 6 messages to keep context manageable)
    const history = messages.slice(-7, -1).map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    const historyText = history.length > 0
      ? history.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n') + '\n\n'
      : '';

    const { text } = await generateText({
      model: google('gemini-2.0-flash'),
      system: SYSTEM_PROMPT,
      prompt: `${historyText}User: ${userPrompt}`,
    });

    return NextResponse.json({ role: 'assistant', content: text });

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return NextResponse.json({
      role: 'assistant',
      content: 'I encountered a temporary issue. Please try again, or reach out to Denisse at denisse@nearshorenavigator.com for immediate help.',
    });
  }
}
