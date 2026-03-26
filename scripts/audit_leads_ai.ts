/**
 * AI Lead Auditor — Uses Gemini as an SDR Agent
 * 
 * This script runs through the manufacturing_new_batch.csv and provides an
 * AI-driven audit of the first N leads, evaluating if they truly fit the 
 * Nearshore Navigator ICP (US Manufacturing, supply chain decision makers).
 *
 * Usage: npx tsx scripts/audit_leads_ai.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const TARGET_CSV = path.join(process.cwd(), 'segmented_leads/manufacturing_new_batch.csv');
const SAMPLE_SIZE = 25; // Audit a sample to avoid massive API costs/time

async function auditLeads() {
  console.log(`\n🤖 Starting AI Lead Audit on: ${path.basename(TARGET_CSV)}`);
  console.log(`📊 Sample Size: ${SAMPLE_SIZE} leads`);
  
  if (!fs.existsSync(TARGET_CSV)) {
    console.error('❌ CSV file not found');
    return;
  }

  const rawContent = fs.readFileSync(TARGET_CSV, 'utf-8').replace(/^\uFEFF/, '').replace(/^ï»¿/, '');
  const rows = parse(rawContent, { columns: true, skip_empty_lines: true, trim: true }) as any[];
  
  const sample = rows.slice(0, SAMPLE_SIZE);
  
  // Format the leads into a concise list for the prompt
  const leadData = sample.map((r, i) => {
      const company = r['Business'] || r['Company'] || 'Unknown';
      const title = r['Contact Title'] || r['Title'] || r['Job Title'] || r['Title/Function'] || 'Unknown';
      const employees = r['Employees'] || r['No. of Employees'] || 'Unknown';
      const city = r['City'] || r['Location'] || 'Unknown';
      
      // Some formatting fallback for various CSV column names
      const displayTitle = r['Title'] || r['Contact Title'] || r['First Name'] || 'Unknown Title';
      
      return `[Lead ${i+1}] Company: ${company} | Title: ${displayTitle} | Employees: ${employees} | City: ${city}`;
  }).join('\n');

  console.log(`\nAnalyzing...\n`);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

  const prompt = `
    You are an expert Sales Development Representative (SDR) Agent for Nearshore Navigator.
    Nearshore Navigator helps US manufacturers move production to Mexico (Baja California, Tijuana, Monterrey).
    
    Our Ideal Customer Profile (ICP) is:
    - Target Industries: Manufacturing, Machining, Medical Devices, Aerospace.
    - Target Titles: C-Level, VP of Supply Chain, Director of Operations, Director of Manufacturing.
    - Negative ICP (Bad fits): Clinics, retail stores, purely software companies, real estate brokers.
    
    I am providing you a sample of ${SAMPLE_SIZE} leads from our latest database export. 
    Audit this list and provide a structured report with:
    1. Overall List Quality Score (1-10).
    2. % of leads that are highly qualified.
    3. Common bad fits / noise observed (e.g. irrelevant titles or industries).
    4. 3 specific examples of great leads.
    5. Actionable recommendations on how to clean or filter this list further before emailing.
    
    Here is the data:
    ---
    ${leadData}
    ---
    
    Make your audit blunt, actionable, and formatted in Markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ AUDIT REPORT GENERATED:\n');
    console.log('====================================================');
    console.log(text);
    console.log('====================================================');
    
    // Save to an artifact
    const artifactPath = path.join(process.cwd(), 'audit_report_ai.md');
    fs.writeFileSync(artifactPath, text);
    console.log(`\n💾 Saved report to ${artifactPath}`);

  } catch (error: any) {
    console.error(`❌ Audit Failed: ${error.message}`);
  }
}

auditLeads().catch(console.error);
