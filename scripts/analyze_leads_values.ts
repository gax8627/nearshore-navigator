
import * as xlsx from 'xlsx';

const FILE_PATH = "/Users/gax8627/Downloads/leads/Leads_2026_02_17.xlsx";

function analyzeValues() {
  try {
    console.log(`Reading file: ${FILE_PATH}`);
    const workbook = xlsx.readFile(FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Get JSON data
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
    
    if (data.length === 0) return;

    // Indices
    const IDX_STATUS = 30;
    const IDX_INDUSTRY = 13;
    const IDX_COUNTRY = 26;

    const statusCounts: Record<string, number> = {};
    const industryCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};

    // Start from row 1 (skip header)
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        
        const status = (row[IDX_STATUS] || "Unknown").trim();
        statusCounts[status] = (statusCounts[status] || 0) + 1;

        const industry = (row[IDX_INDUSTRY] || "Unknown").trim();
        industryCounts[industry] = (industryCounts[industry] || 0) + 1;

        const country = (row[IDX_COUNTRY] || "Unknown").trim();
        countryCounts[country] = (countryCounts[country] || 0) + 1;
    }

    console.log("\n--- Top 20 Statuses ---");
    Object.entries(statusCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .forEach(([k, v]) => console.log(`${k}: ${v}`));

    console.log("\n--- Top 20 Industries ---");
    Object.entries(industryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .forEach(([k, v]) => console.log(`${k}: ${v}`));

    console.log("\n--- Top 20 Countries ---");
    Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .forEach(([k, v]) => console.log(`${k}: ${v}`));

  } catch (error) {
    console.error("Error reading file:", error);
  }
}

analyzeValues();
