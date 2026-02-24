import fs from 'fs';
import path from 'path';
import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { eq } from 'drizzle-orm';

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

async function main() {
  console.log(`🔄 Re-triggering AI Agents for leads in "queued" status...`);

  const candidates = await db.select()
    .from(leads)
    .where(eq(leads.status, 'queued'));

  if (candidates.length === 0) {
    console.log('⚠️ No queued leads found.');
    process.exit(0);
  }

  console.log(`Found ${candidates.length} queued leads.`);

  const payload = candidates.map(l => ({
    name: l.name,
    company: l.company,
    email: l.email,
    website: '' 
  }));

  console.log('📡 Sending to Agent API (http://localhost:3000/api/agents/prospecting)...');
  try {
    const response = await fetch('http://localhost:3000/api/agents/prospecting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leads: payload })
    });

    if (response.ok) {
        console.log('✅ Backlog re-triggered successfully.');
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
