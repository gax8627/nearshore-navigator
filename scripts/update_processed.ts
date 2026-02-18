import fs from 'fs';
import path from 'path';

const newIds = [
  "208541000060279822",
  "208541000060252174",
  "208541000060252176",
  "208541000060282054",
  "208541000060242031",
  "208541000060279645",
  "208541000060241983",
  "208541000060273295",
  "208541000060279245",
  "208541000060279234",
  "208541000060252172",
  "208541000060279619",
  "208541000060279219",
  "208541000060272522",
  "208541000060279177", // Oliver Fetzer
  "208541000060276131", // Mary Poggi (no email, but processed in batch fetch)
  "208541000060259616",
  "208541000060239963", // Antonio Romañach (no email)
  "208541000060239957"  // Antonio Romañach (duplicate/no email)
];

const processedPath = path.join(process.cwd(), 'scripts/processed_leads.json');
let processedIds: string[] = [];

if (fs.existsSync(processedPath)) {
  processedIds = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
}

const updatedIds = [...new Set([...processedIds, ...newIds])];
fs.writeFileSync(processedPath, JSON.stringify(updatedIds, null, 2));
console.log(`Updated processed leads. Total: ${updatedIds.length}`);
