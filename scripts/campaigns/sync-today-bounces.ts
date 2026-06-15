import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

async function main() {
  console.log('🔄 Running bad email identification script...');
  try {
    execSync('npx tsx scripts/get-all-bad-emails.ts', { stdio: 'inherit' });
  } catch (err: any) {
    console.error('❌ Failed to run scripts/get-all-bad-emails.ts:', err.message);
    process.exit(1);
  }

  const badEmailsPath = path.join(process.cwd(), 'scratch/bad_emails.json');
  if (!fs.existsSync(badEmailsPath)) {
    console.error('❌ scratch/bad_emails.json not generated.');
    process.exit(1);
  }

  const badEmails = JSON.parse(fs.readFileSync(badEmailsPath, 'utf-8')) as string[];
  console.log(`🧹 Loaded ${badEmails.length} total bad/blacklisted emails from Brevo.`);

  // Load existing hard bounces
  const hardBouncePath = path.join(process.cwd(), 'data/hard_bounce_suppression.csv');
  let existingBounces = new Set<string>();
  if (fs.existsSync(hardBouncePath)) {
    const rows = parse(fs.readFileSync(hardBouncePath, 'utf-8'), { columns: true });
    rows.forEach((r: any) => existingBounces.add((r.email || '').toLowerCase().trim()));
  }

  // Load existing full suppression list
  const fullSuppressionPath = path.join(process.cwd(), 'data/full_suppression_list.csv');
  let existingFull = new Set<string>();
  if (fs.existsSync(fullSuppressionPath)) {
    const rows = parse(fs.readFileSync(fullSuppressionPath, 'utf-8'), { columns: true });
    rows.forEach((r: any) => existingFull.add((r.email || '').toLowerCase().trim()));
  }

  const addedToHard: string[] = [];
  const addedToFull: string[] = [];

  badEmails.forEach(email => {
    const cleanEmail = email.toLowerCase().trim();
    if (!existingBounces.has(cleanEmail)) {
      addedToHard.push(cleanEmail);
      existingBounces.add(cleanEmail);
    }
    if (!existingFull.has(cleanEmail)) {
      addedToFull.push(cleanEmail);
      existingFull.add(cleanEmail);
    }
  });

  console.log(`\nNew bounces to add to hard list: ${addedToHard.length}`);
  console.log(`New suppressions to add to full list: ${addedToFull.length}`);

  // Append to hard_bounce_suppression.csv
  if (addedToHard.length > 0) {
    const rows = Array.from(existingBounces).map(email => ({ email }));
    fs.writeFileSync(hardBouncePath, stringify(rows, { header: true }));
    console.log(`💾 Saved ${existingBounces.size} total bounces to data/hard_bounce_suppression.csv`);
  }

  // Append to full_suppression_list.csv
  if (addedToFull.length > 0) {
    const rows = Array.from(existingFull).map(email => ({ email }));
    fs.writeFileSync(fullSuppressionPath, stringify(rows, { header: true }));
    console.log(`💾 Saved ${existingFull.size} total suppressions to data/full_suppression_list.csv`);
  }

  console.log('\n🎉 Suppression sync complete!');
}

main().catch(console.error);
