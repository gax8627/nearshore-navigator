
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

/**
 * QUEUE JULY RESCUE SEQUENCE
 * Targets 500 high-value leads for USMCA 2026 Audit campaign.
 */

async function main() {
    console.log('📋 Preparing the 500-Lead Rescue Queue...');

    // Load full lead list
    const allLeads = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json'), 'utf-8'));

    // Filter for high-intent industries and MQL status
    // Ranking criteria: 1. Aerospace & Defense, 2. Manufacturing, 3. MQL status
    const highValueLeads = allLeads
        .filter((l: any) => l.email && l.firstName)
        .sort((a: any, b: any) => {
            const priority = ['Aerospace & Defense', 'Manufacturing'];
            const aIndex = priority.indexOf(a.industry);
            const bIndex = priority.indexOf(b.industry);
            if (aIndex !== bIndex) return (aIndex === -1 ? 1 : aIndex) - (bIndex === -1 ? 1 : bIndex);
            
            // Further sort by status (MQL first)
            const statusPriority = ['Marketing Qualified Lead', 'Lead'];
            const aStatus = statusPriority.indexOf(a.status);
            const bStatus = statusPriority.indexOf(b.status);
            return (aStatus === -1 ? 1 : aStatus) - (bStatus === -1 ? 1 : bStatus);
        })
        .slice(0, 500);

    console.log(`✅ Selected ${highValueLeads.length} high-value leads for dispatch.`);

    // In a production environment, we would use Brevo Campaigns (Bulk) instead of Transactional loops
    // But for this project's "Strike" style, we'll use a scheduled transactional approach or create a Campaign
    
    // Let's create a NEW Brevo List for this specific campaign to track opens/clicks effectively
    try {
        console.log('📁 Creating tracking list in Brevo...');
        const listName = `July Rescue Sequence - ${new Date().toLocaleDateString()}`;
        const listResult = await brevo.createList(listName, 1); // Folder 1 is typically 'General'
        const listId = listResult.id;
        console.log(`✅ List created with ID: ${listId}`);

        console.log('👤 Syncing 500 leads to Brevo list...');
        for (const lead of highValueLeads) {
            await brevo.createContact({
                email: lead.email,
                attributes: {
                    FIRSTNAME: lead.firstName,
                    COMPANY: lead.company,
                    INDUSTRY: lead.industry
                },
                listIds: [listId]
            });
        }
        console.log('✅ Sync complete.');

        console.log('📧 Scheduling 500-lead campaign for 8:00 AM dispatch...');
        // Format content
        const htmlContent = `
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>The signals from Washington are now absolute: the <strong>July 2026 USMCA review</strong> is pivoting toward a "100% Rules of Origin" mandate for critical components.</p>
            <p>If your supply chain isn't audited by June, you risk being locked into the 10% Section 122 tariffs permanently.</p>
            <p>We’ve prepared a 5-point <strong>USMCA Compliance Audit</strong> specific to the {{contact.INDUSTRY}} sector. Should I send the PDF over?</p>
        `;

        // Schedule for 8:00 AM (tomorrow)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(8, 0, 0, 0);
        const scheduledAt = tomorrow.toISOString().replace('T', ' ').substring(0, 19);

        await brevo.createCampaign({
            name: listName,
            subject: '{{contact.COMPANY}} — July USMCA Rules of Origin Shift?',
            htmlContent,
            listIds: [listId],
            scheduledAt
        });

        console.log(`🚀 Campaign SCHEDULED for ${scheduledAt}`);
        console.log('--- MISSION STATUS: ACTIVE ---');
    } catch (e: any) {
        console.error(`❌ Queueing failed: ${e.message}`);
    }
}

main();
