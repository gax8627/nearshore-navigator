import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

// Manually load .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
    }
  });
}

const BATCH_SIZE = 50;

async function main() {
  console.log(`🚀 Triggering AI Agents for next batch (${BATCH_SIZE} leads)...`);

  // 1. Fetch Candidates (Status = 'new', Source = 'migration_script' or Tagged 'feb17_campaign')
  // We'll prioritize 'tier1' tags if possible, but let's just grab 'new'.
  const candidates = await db.select()
    .from(leads)
    .where(and(
      eq(leads.status, 'new'),
      // sql`tags::jsonb ? 'feb17_campaign'` // Optional: restrict to specific campaign
    ))
    .limit(BATCH_SIZE);

  if (candidates.length === 0) {
    console.log('⚠️ No new leads found.');
    process.exit(0);
  }

  console.log(`found ${candidates.length} leads.`);

  // 2. Map to API format
  const payload = candidates.map(l => ({
    name: l.name,
    company: l.company,
    email: l.email,
    website: '' // We might need website from DB if available, or let Agent research it
  }));

  // 3. Call API
  console.log('📡 Sending to Agent API (http://localhost:3000/api/agents/prospecting)...');
  try {
    const response = await fetch('http://localhost:3000/api/agents/prospecting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leads: payload })
    });

    if (response.ok) {
        console.log('✅ Agent triggered successfully.');
        
        // 4. Update Status in DB
        console.log('📝 Updating Lead Status to "queued"...');
        const ids = candidates.map(c => c.id);
        
        await db.update(leads)
            .set({ status: 'queued' })
            .where(sql`id IN ${ids}`);
            
        console.log('🎉 Done.');
    } else {
        console.error('❌ API Error:', await response.text());
    }

  } catch (e: any) {
    console.error('❌ Network/Script Error:', e.message);
  }
  
  process.exit(0);
}

main().catch(console.error);
