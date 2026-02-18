
import * as xlsx from 'xlsx';
import path from 'path';

const FILE_PATH = "/Users/gax8627/Downloads/leads/Leads_2026_02_17.xlsx";

function analyze() {
  try {
    console.log(`Reading file: ${FILE_PATH}`);
    const workbook = xlsx.readFile(FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Get JSON data
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    
    if (data.length === 0) {
      console.log("File is empty.");
      return;
    }

    const headers = data[0] as string[];
    const rowCount = data.length - 1; // Subtract header

    console.log(`\n✅ File Loaded Successfully`);
    console.log(`Total Rows: ${rowCount}`);
    console.log(`\nColumns detected:`);
    // Print all headers, one per line to avoid truncation
    headers.forEach((h, i) => console.log(`${i}: ${h}`));
    
    // Only check for key columns
    const keyColumns = ["Email", "First Name", "Company", "Industry", "State", "Country", "Lead Status"];
    console.log("\nKey Column Index Check:");
    keyColumns.forEach(key => {
        const index = headers.indexOf(key);
        console.log(` - ${key}: ${index !== -1 ? index : "NOT FOUND"}`);
    });

  } catch (error) {
    console.error("Error reading file:", error);
  }
}

analyze();
