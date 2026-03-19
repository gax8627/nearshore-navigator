import { NextResponse } from 'next/server';
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix';
import { MARKET_ALERTS } from '@/app/constants/market-pulse-news';

/**
 * Master Stats Engine for CEO Command Center
 * Aggregates SEO, Lead, and Agent performance metrics.
 */
export async function GET() {
    try {
        // Simulated SEO Velocity Data
        const seoVelocity = {
            totalDoors: 120, // Based on current matrix expansion
            indexedPages: 98,
            top3Rankings: 42,
            averagePosition: 4.8
        };

        // Lead Intent Heatmap Data (Simulated aggregates)
        const intentHeatmap = [
            { region: 'Midwest US', score: 85, industry: 'Automotive', count: 12 },
            { region: 'California', score: 70, industry: 'Medical Devices', count: 24 },
            { region: 'Texas', score: 65, industry: 'Electronics', count: 18 },
            { region: 'Germany', score: 92, industry: 'Aerospace', count: 5 }
        ];

        // Agent Performance
        const agentStatus = {
            marketPulse: {
                active: true,
                alertsProcessed: MARKET_ALERTS.length,
                lastPulse: MARKET_ALERTS[0]?.date || 'N/A'
            },
            aiConsultant: {
                active: true,
                liveSessions: 3,
                conversionLift: '14%'
            }
        };

        // Distribution from Matrix
        const matrixStats = INDUSTRY_MATRIX.reduce((acc: any, curr) => {
            acc[curr.industrySlug] = (acc[curr.industrySlug] || 0) + 1;
            return acc;
        }, {});

        return NextResponse.json({
            seoVelocity,
            intentHeatmap,
            agentStatus,
            matrixStats,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('[Admin Stats API] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch admin metrics' }, { status: 500 });
    }
}
