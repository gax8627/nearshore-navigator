import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
// Using gemini-3.1-pro-preview to finish the final 14 entries
const model = genAI.getGenerativeModel({ model: 'gemini-3.1-pro-preview' });

// We load the TS file using ts-node dynamically or just parse it if we can.
// To avoid TS compile issues in a standalone script, we'll import it directly.
import { INDUSTRY_MATRIX } from '../../app/constants/city-industry-matrix';

const OUTPUT_FILE = path.join(process.cwd(), 'app', 'constants', 'local-analysis-data.json');

const TIER1_CITIES = new Set([
  'tijuana', 'mexicali', 'juarez', 'reynosa', 'nuevo-laredo',
  'nogales', 'matamoros', 'monterrey', 'guadalajara', 'queretaro',
  'san-luis-potosi', 'saltillo', 'hermosillo', 'silao', 'puebla',
  'chihuahua-city',
]);

async function generateAnalysis() {
  console.log('🚀 Starting Local Analysis Generation...');
  
  // Load existing data if any
  let existingData: Record<string, string> = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
  }

  const entriesToProcess = INDUSTRY_MATRIX.filter(entry => 
    TIER1_CITIES.has(entry.citySlug)
  );

  console.log(`Found ${entriesToProcess.length} Tier 1 entries to process.`);
  let processedCount = 0;

  for (const entry of entriesToProcess) {
    const key = `${entry.citySlug}_${entry.industrySlug}`;
    
    if (existingData[key]) {
      console.log(`⏭️ Skipping ${key} (already exists)`);
      continue;
    }

    console.log(`Generating content for ${key}...`);

    const prompt = `
      You are an expert industrial real estate and nearshoring site selection consultant.
      Write a highly professional, localized market analysis for the ${entry.industrySlug.replace('-', ' ')} industry in ${entry.citySlug.replace('-', ' ')}, Mexico.
      
      Data points to include:
      - Workforce: ${entry.stats.workforce}
      - Plants: ${entry.stats.plants}
      - Major Employers: ${entry.topLocalEmployers.join(', ')}
      - Industrial Parks: ${entry.featuredParks.join(', ')}

      Requirements:
      - Word count: 150-200 words.
      - Tone: Authoritative, B2B, analytical.
      - SEO: Naturally include semantic keywords like "nearshore manufacturing", "supply chain", and the specific city and industry names.
      - Do not use markdown headers, just return raw HTML paragraph strings (e.g., <p>...</p><p>...</p>).
      - Make it sound hyper-localized to the specific border or interior advantages of the city.
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      
      existingData[key] = text;
      
      // Save incrementally
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existingData, null, 2));
      
      processedCount++;
      
      // Sleep to avoid rate limits (longer delay for Pro/Preview models)
      await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error: any) {
      console.error(`❌ Failed to generate for ${key}:`, error.message);
    }
  }

  console.log(`✅ Generation complete! Processed ${processedCount} new entries.`);
}

generateAnalysis().catch(console.error);
