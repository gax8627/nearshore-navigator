
/**
 * UserIntentAgent.ts
 * 
 * This agent analyzes lead behavior (from the Financial Calculator and Assessment Tunnel)
 * to determine the high-level intent of the prospect.
 * 
 * Categories:
 * - TARIFF_PANIC: CEO/C-Suite needs immediate rescue due to geopolitical events.
 * - COMPARATIVE_RESEARCH: Analyst/Manager comparing costs vs US/Asia.
 * - GENERAL_EXPLORATION: Casual visitor/Student researching Mexico.
 */

interface LeadBehavior {
    headcount: number;
    usRate: number;
    sqft: number;
    pageViews: string[];
    formComments?: string;
    sessionDurationSeconds: number;
    role?: string;
}

interface IntentResult {
    score: number;
    category: 'TARIFF_PANIC' | 'COMPARATIVE_RESEARCH' | 'GENERAL_EXPLORATION';
    urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    suggestedAction: string;
}

export class UserIntentAgent {
    public analyze(behavior: LeadBehavior): IntentResult {
        let score = 0;
        let urgencyScore = 0;

        // 1. Headcount Magnitude (Size of Opportunity)
        if (behavior.headcount > 100) score += 40;
        else if (behavior.headcount > 50) score += 20;

        // 2. Financial Pain (US Rate vs Mexico Savings)
        const savingsDelta = (behavior.usRate - 7.84) * behavior.headcount * 160;
        if (savingsDelta > 50000) score += 30;

        // 3. Keyword Analysis (Geopolitical Urgency)
        const panicKeywords = ['tariff', 'usmca', 'asap', 'urgent', 'trump', 'sheinbaum', 'deadline'];
        const comments = (behavior.formComments || '').toLowerCase();
        panicKeywords.forEach(kw => {
            if (comments.includes(kw)) urgencyScore += 25;
        });

        // 4. Content Focus
        const isReadingTariffs = behavior.pageViews.some(p => p.includes('tariff') || p.includes('geopolitics'));
        if (isReadingTariffs) urgencyScore += 30;

        // Determine Category
        let category: IntentResult['category'] = 'GENERAL_EXPLORATION';
        if (score > 60 && urgencyScore > 50) {
            category = 'TARIFF_PANIC';
        } else if (score > 30) {
            category = 'COMPARATIVE_RESEARCH';
        }

        // Determine Urgency
        let urgency: IntentResult['urgency'] = 'LOW';
        const totalRaw = score + urgencyScore;
        if (totalRaw > 100) urgency = 'CRITICAL';
        else if (totalRaw > 70) urgency = 'HIGH';
        else if (totalRaw > 40) urgency = 'MEDIUM';

        // Direct Suggested Action
        const actions = {
            'TARIFF_PANIC': 'DIRECT_INTERVENTION: Auto-dial prospect and trigger "Supply Chain Rescue" email sequence.',
            'COMPARATIVE_RESEARCH': 'DATA_NURTURE: Send specialized "Baja vs Asia" labor-arbitrage whitepaper.',
            'GENERAL_EXPLORATION': 'AUTOMATED_FOLLOWUP: Add to monthly "Mexico Insights" newsletter.'
        };

        return {
            score: totalRaw,
            category,
            urgency,
            suggestedAction: actions[category]
        };
    }
}

// Example usage test:
const agent = new UserIntentAgent();
const testLead: LeadBehavior = {
    headcount: 250,
    usRate: 22.50,
    sqft: 75000,
    pageViews: ['/en/tools/cost-calculator', '/en/insights/2025-tariffs-baja-california-supply-chain'],
    formComments: "WE NEED TO MOVE PRODUCTION OUT OF SHANGHAI ASAP DUE TO USMCA REVIEWS.",
    sessionDurationSeconds: 450,
    role: 'COO'
};

const result = agent.analyze(testLead);
console.log("---- USER INTENT AUDIT ----");
console.log(`Intent Category: ${result.category}`);
console.log(`Urgency Level: ${result.urgency}`);
console.log(`Suggested Playbook: ${result.suggestedAction}`);
console.log("---------------------------");
