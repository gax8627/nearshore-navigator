
import fs from 'fs';
import path from 'path';

async function verify() {
    const filePath = path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json');
    const leads = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const invalid = leads.filter((l: any) => !l.email || !l.email.includes('@') || l.email.includes('yourcompany.com'));
    
    console.log(`📊 Lead Verification Report:`);
    console.log(`Total Leads: ${leads.length}`);
    console.log(`Invalid/Placeholder Emails: ${invalid.length}`);
    
    if (invalid.length > 0) {
        console.log('--- Samples of Problematic Emails ---');
        invalid.slice(0, 10).forEach((l: any) => console.log(`- ${l.email} (${l.company})`));
    }
}

verify();
