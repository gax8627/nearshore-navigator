
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));
  const today = new Date().toISOString().split('T')[0];
  const res = await brevo.getEmailEvents({ limit: 10 });
  console.log(JSON.stringify(res, null, 2));
}

main();
