import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execPromise = promisify(exec);

export async function POST() {
  try {
    // 1. Resolve path to script
    const scriptPath = path.join(process.cwd(), "scripts/instant-index.ts");
    
    // 2. Execute the instant-index script
    console.log(`[SEO API] Triggering forced index: ${scriptPath}`);
    const { stdout, stderr } = await execPromise(`npx tsx ${scriptPath}`);
    
    if (stderr && !stdout) {
      console.error(`[SEO API] Script Error:`, stderr);
      return NextResponse.json({ error: "Indexing script failed", details: stderr }, { status: 500 });
    }

    // 3. Return success
    return NextResponse.json({ 
      success: true, 
      message: "Indexing pings sent successfully to Google and Bing.",
      output: stdout 
    });

  } catch (error: any) {
    console.error(`[SEO API] Critical Failure:`, error);
    return NextResponse.json({ 
      error: "Failed to execute indexing", 
      details: error.message 
    }, { status: 500 });
  }
}
