import { NextResponse } from 'next/server';
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix';
import { COMPETITOR_MATRIX } from '@/app/constants/competitor-matrix';
import { MARKET_ALERTS } from '@/app/constants/market-pulse-news';

/**
 * AI Manufacturing Consultant - RAG Engine (Phase B)
 * Provides data-driven advice based on internal industrial datasets.
 */

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content.toLowerCase();

        // 1. Context Retrieval (RAG Lite)
        let context = "";

        // Check for city/hub mentions
        const cities = ["tijuana", "mexicali", "juarez", "monterrey", "reynosa", "nuevo-laredo"];
        const mentionedCities = cities.filter(c => lastMessage.includes(c));
        
        if (mentionedCities.length > 0) {
            mentionedCities.forEach(city => {
                const entries = INDUSTRY_MATRIX.filter(e => e.citySlug === city);
                entries.forEach(e => {
                    context += `\n- ${city.toUpperCase()} (${e.industrySlug}): ${e.stats.plants} plants, ${e.stats.workforce} workers. `;
                    if (e.stats.vacancyRate) context += `Vacancy: ${e.stats.vacancyRate}. `;
                    if (e.stats.energyCostKwh) context += `Energy: ${e.stats.energyCostKwh}. `;
                });
            });
        }

        // Check for competitor mentions
        if (lastMessage.includes("competitor") || lastMessage.includes("compare") || lastMessage.includes("ivemsa") || lastMessage.includes("naps")) {
            COMPETITOR_MATRIX.forEach(comp => {
                context += `\n- ${comp.name}: Strengths: ${comp.strengths.join(", ")}. Speed: ${comp.speedToMarket}. `;
            });
        }

        // Check for market pulse/news
        if (lastMessage.includes("news") || lastMessage.includes("tariff") || lastMessage.includes("usmca")) {
            MARKET_ALERTS.forEach(alert => {
                context += `\n- ALERT [${alert.topic}]: ${alert.summary} Affected: ${alert.affectedCities.join(", ")}. `;
            });
        }

        // 2. Response Synthesis (Agentic Logic)
        // In a real app, we'd call an LLM with 'context' here. 
        // For this agentic demo, we'll generate a high-quality deterministic response based on the context.
        
        let response = "";
        if (context) {
            response = `Based on our verified manufacturing data and real-time market pulse, here is what you need to know: \n\n${context}\n\nNearshore Navigator (Agile) offers a 15-30 day speed-to-market, which is significantly faster than legacy providers. Would you like a detailed feasibility study for your specific industry?`;
        } else {
            response = "I am the Nearshore Navigator AI Consultant. I can provide real-time data on industrial hubs (Tijuana, Monterrey, Juarez), competitor benchmarking (NAPS, IVEMSA), and USMCA trade alerts. What specific manufacturing constraints are you facing today?";
        }

        return NextResponse.json({ role: 'assistant', content: response });

    } catch (error) {
        console.error('[AI Consultant API] Error:', error);
        return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
    }
}
