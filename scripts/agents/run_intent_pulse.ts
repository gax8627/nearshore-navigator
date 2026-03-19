/**
 * run_intent_pulse.ts
 * 
 * PHASE 1: Deep Loop Integration
 * This script scans the last 48 hours of email engagement, fetches lead profiles from Brevo,
 * and runs the UserIntentAgent to identify critical "TARIFF_PANIC" prospects.
 * 
 * Run: npx tsx scripts/agents/run_intent_pulse.ts
 */

import dotenv from 'dotenv';
import path from 'path';
const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

import { brevo } from '../../lib/brevo';
import { UserIntentAgent } from './user_intent_agent';

async function main() {
    console.log('\n📡 [AGENT] Initializing Live Intent Pulse...');
    const agent = new UserIntentAgent();
    
    // 1. Fetch events from the last 48 hours
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - (48 * 60 * 60 * 1000));
    const startDate = twoDaysAgo.toISOString().split('T')[0];
    
    console.log(`🔍 Scanning engagement since ${startDate}...`);
    
    try {
        const eventsData = await brevo.getEmailEvents({
            limit: 500,
            startDate,
            event: 'opened',
            sort: 'desc'
        });

        const events = eventsData.events || [];
        if (events.length === 0) {
            console.log('✅ No recent engagement events found.');
            return;
        }

        // 2. Deduplicate emails to analyze unique leads
        const uniqueEmails = Array.from(new Set(events.map((e: any) => e.email)));
        console.log(`👥 Found ${uniqueEmails.length} unique active leads. Fetching profiles...`);

        const priorityLeads: any[] = [];

        for (const email of uniqueEmails) {
            const contact = await brevo.getContact(email);
            if (!contact || !contact.attributes) continue;

            const attrs = contact.attributes;
            
            // Map Brevo attributes to Agent behavior interface
            // If attributes don't exist yet in Brevo, we use defaults or infer from message
            const behavior = {
                headcount: Number(attrs.HEADCOUNT || 0),
                usRate: Number(attrs.US_RATE || 0),
                sqft: Number(attrs.SQFT || 0),
                pageViews: [attrs.LAST_PAGE || ''],
                formComments: attrs.MESSAGE || '',
                sessionDurationSeconds: 300, // placeholder
                role: attrs.ROLE || 'Unknown'
            };

            const analysis = agent.analyze(behavior);

            if (analysis.urgency === 'CRITICAL' || analysis.urgency === 'HIGH') {
                priorityLeads.push({
                    email,
                    company: attrs.COMPANY || 'N/A',
                    name: `${attrs.FIRSTNAME || ''} ${attrs.LASTNAME || ''}`,
                    category: analysis.category,
                    urgency: analysis.urgency,
                    action: analysis.suggestedAction,
                    score: analysis.score
                });
            }
        }

        // 3. Generate CEO Report
        console.log('\n' + '='.repeat(50));
        console.log('🔥 CEO PRIORITY PIPELINE REPORT (Live Pulse)');
        console.log('='.repeat(50));

        if (priorityLeads.length === 0) {
            console.log('   No critical "Tariff Panic" leads detected in this window.');
        } else {
            priorityLeads
                .sort((a, b) => b.score - a.score)
                .forEach((lead, i) => {
                    console.log(`\n[${i + 1}] ${lead.urgency}: ${lead.name} (${lead.company})`);
                    console.log(`    Email:    ${lead.email}`);
                    console.log(`    Category: ${lead.category}`);
                    console.log(`    Playbook: ${lead.action}`);
                    console.log(`    Score:    ${lead.score}/100`);
                });
        }
        console.log('='.repeat(50) + '\n');

    } catch (error) {
        console.error('❌ Intent Pulse Error:', error);
    }
}

main();
