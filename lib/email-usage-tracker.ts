import fs from 'fs';
import path from 'path';

const USAGE_FILE = path.join(process.cwd(), 'scripts/email_usage.json');
const HARD_LIMIT = 4800; // Leave buffer for system emails

export function getEmailBudget() {
  if (!fs.existsSync(USAGE_FILE)) {
    return { current: 0, limit: HARD_LIMIT, remaining: HARD_LIMIT };
  }

  const data = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf-8'));
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const record = data.usage.find((u: any) => u.month === currentMonth);
  
  const currentCount = record ? record.count : 0;
  return {
    current: currentCount,
    limit: HARD_LIMIT,
    remaining: Math.max(0, HARD_LIMIT - currentCount)
  };
}

export function incrementEmailUsage(count: number = 1) {
  if (!fs.existsSync(USAGE_FILE)) return;

  const data = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf-8'));
  const currentMonth = new Date().toISOString().slice(0, 7);
  let record = data.usage.find((u: any) => u.month === currentMonth);

  if (!record) {
    record = { month: currentMonth, count: 0 };
    data.usage.push(record);
  }

  record.count += count;
  fs.writeFileSync(USAGE_FILE, JSON.stringify(data, null, 2));
}

export function hasEmailBudget() {
  const budget = getEmailBudget();
  return budget.remaining > 0;
}
