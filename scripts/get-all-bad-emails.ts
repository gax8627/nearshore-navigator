
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));

  console.log('🔍 Fetching ALL blacklisted/bounced contacts from Brevo...');

  const badEmails = new Set<string>();
  let offset = 0;
  const limit = 50;

  try {
    while (true) {
      const res = await brevo.getBlacklistedContacts({ limit, offset });

      if (res && res.contacts && res.contacts.length > 0) {
        res.contacts.forEach((c: any) => {
          if (c.email) badEmails.add(c.email.toLowerCase());
        });
        console.log(`Fetched ${offset + res.contacts.length} blacklisted contacts...`);
        offset += limit;
        if (res.contacts.length < limit) break;
      } else {
        break;
      }
    }

    // Also check engagement_data.json for any hardBounces that might not be blacklisted yet
    const engagementPath = path.join(process.cwd(), 'scripts/engagement_data.json');
    if (fs.existsSync(engagementPath)) {
      const engagement = JSON.parse(fs.readFileSync(engagementPath, 'utf-8'));
      Object.entries(engagement).forEach(([email, data]: [string, any]) => {
        const hasHardBounce = data.history.some((h: any) => h.type === 'hardBounces' || h.type === 'hardBounce');
        if (hasHardBounce) badEmails.add(email.toLowerCase());
      });
    }

    // Also check scratch/hard_bounces.json for any hard bounces fetched in the previous step
    const hardBouncesPath = path.join(process.cwd(), 'scratch/hard_bounces.json');
    if (fs.existsSync(hardBouncesPath)) {
      const hardBounces = JSON.parse(fs.readFileSync(hardBouncesPath, 'utf-8'));
      if (Array.isArray(hardBounces)) {
        hardBounces.forEach((email: string) => {
          if (email) badEmails.add(email.toLowerCase());
        });
      }
    }

    const uniqueBadEmails = Array.from(badEmails);
    console.log(`✅ Total unique "bad" emails identified: ${uniqueBadEmails.length}`);

    const outputPath = path.join(process.cwd(), 'scratch/bad_emails.json');
    fs.writeFileSync(outputPath, JSON.stringify(uniqueBadEmails, null, 2));
    console.log(`💾 Saved bad emails list to ${outputPath}`);

  } catch (error: any) {
    console.error('❌ Error identifying bad emails:', error.message);
  }
}

main();
