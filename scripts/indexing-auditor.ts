import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * INDEXING AUDITOR AGENT
 * 
 * Target: Google Search Console (GSC) API
 * Goal: Proactively detect sitemap errors, schema warnings, or indexing blocks.
 */

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GSC_SITE = 'sc-domain:nearshorenavigator.com';
const SITEMAP_URL = 'https://nearshorenavigator.com/sitemap.xml';

async function getAuth() {
  const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');
  let tokens: any = null;

  if (process.env.GOOGLE_TOKEN_JSON) {
    tokens = JSON.parse(process.env.GOOGLE_TOKEN_JSON);
  } else if (fs.existsSync(TOKEN_PATH)) {
    tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  }

  if (tokens) {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://localhost:3000');
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
  }
  throw new Error('No valid Google tokens found for Indexing Auditor.');
}

async function auditIndexing() {
  console.log('\n🛡️  Starting Indexing Auditor Agent...');
  console.log('───────────────────────────────────────');

  try {
    const auth = await getAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // 1. Fetch Sitemap Status
    console.log(`[Diagnostic] Checking Sitemap: ${SITEMAP_URL}`);
    const res = await searchconsole.sitemaps.get({
      siteUrl: GSC_SITE,
      feedpath: SITEMAP_URL,
    });

    const data = res.data;
    const report = {
      timestamp: new Date().toISOString(),
      path: data.path,
      lastSubmitted: data.lastSubmitted,
      lastDownloaded: data.lastDownloaded,
      errors: parseInt(data.errors || '0', 10),
      warnings: parseInt(data.warnings || '0', 10),
      isHealthy: (data.errors || '0') === '0' && !!data.lastDownloaded 
    };

    // 2. Analyze Health
    console.log('\n📊 HEALTH REPORT:');
    console.log(` - URL: ${report.path}`);
    console.log(` - Errors: ${report.errors}`);
    console.log(` - Warnings: ${report.warnings}`);
    
    if (report.lastDownloaded) {
        console.log(` - Last Seen: ${new Date(report.lastDownloaded).toLocaleString()}`);
    } else {
        console.log(` - Status: PENDING (Google is currently processing the sitemap)`);
    }

    if (!report.isHealthy) {
       if (!report.lastDownloaded) {
           console.log('\n⏳ Google is still parsing the fresh submission. Check again in 60 minutes.');
       } else {
           console.log('\n⚠️  WARNING: Indexing issues detected!');
           if (report.errors > 0) console.log(`   🚨 Critical: ${report.errors} sitemap-level errors.`);
           if (report.warnings > 0) console.log(`   💡 Note: ${report.warnings} warnings.`);
       }
    } else {
       console.log('\n✅ Site Health: OK. Google has parsed the sitemap successfully.');
    }

    // 3. Save Persistence Report
    const REPORT_PATH = path.join(process.cwd(), 'scripts/indexing_audit_report.json');
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    console.log(`\n💾 Detailed report saved to: scripts/indexing_audit_report.json`);

  } catch (e: any) {
    console.error('\n❌ Auditor Error:', e.message);
    if (e.message.includes('404')) {
        console.log('   (Suggestion: Verify that SITEMAP_URL and GSC_SITE are correct in scripts/indexing-auditor.ts)');
    }
  }

  console.log('───────────────────────────────────────\n');
}

auditIndexing();
