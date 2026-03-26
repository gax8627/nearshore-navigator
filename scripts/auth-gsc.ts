import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';

/**
 * GOOGLE SEARCH CONSOLE ONE-TIME AUTHORIZATION
 * 
 * Target: Obtain an OAuth2 Refresh Token for Indexing & Analytics.
 */

const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');

// Your custom project-specific credentials (now loaded from env)
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('❌ ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing in .env.local');
    return;
  }

  // 2. Generate Auth URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Critical for getting a refresh_token
    prompt: 'consent',     // Force consent screen to ensure refresh token is provided
    scope: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/cloud-platform',
    ],
  });

  console.log('\n🔐 GOOGLE AUTHORIZATION REQUIRED');
  console.log('───────────────────────────────────────');
  console.log('1. Copy and paste this URL into your browser:\n');
  console.log(authUrl);
  console.log('\n2. Sign in and grant permissions.');
  console.log('3. After you click "Allow", you will be redirected to an error page (e.g. localhost:3000).');
  console.log('4. Copy the "code" parameter from the URL in the browser address bar.');
  console.log('   (Example: http://localhost:3000/?code=4/0Af...)\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const codeValue = await rl.question('Enter the authorization code here: ');
  rl.close();

  console.log('\n⚡ Exchanging code for tokens...');
  try {
    const { tokens } = await oauth2Client.getToken(codeValue);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log(`✅ SUCCESS! Tokens saved to: ${TOKEN_PATH}`);
    console.log('\nNow you can run: npm run index-now');
  } catch (e: any) {
    console.error('❌ Authentication Failed:', e.message);
  }
}

authorize();
