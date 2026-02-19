import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
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

async function check() {
  const result = await db.select().from(campaigns);
  console.log(`Total Campaigns: ${result.length}`);
  result.forEach(c => console.log(` - ${c.name} (${c.status})`));
  process.exit(0);
}

check().catch(console.error);
