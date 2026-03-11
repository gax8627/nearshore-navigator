import * as fs from 'fs';
import * as path from 'path';

// Sales Automator: 4-Step China-Plus-One Outreach Sequence
// Objective: Drive US Manufacturing Executives to the Tijuana Master Guide

const BREVO_API_KEY = process.env.BREVO_API_KEY || 'dummy_api_key_for_dev';
const API_URL = 'https://api.brevo.com/v3/emailCampaigns';

// Target Segment: VP of Supply Chain, COO, Director of Manufacturing (US target states)
const targetListId = 42; // Example Brevo List ID for 'US Manufacturing Executives'

// Step 1: The Value-Led Pitch (Focus: Tariffs & Logistics Speed)
const tijuanaTouchOneHtml = `
  <p>Hi {{contact.FIRSTNAME}},</p>
  
  <p>With Section 301 tariffs continuing to apply pressure on Asian supply chains, I wanted to reach out regarding your 2026 manufacturing footprint.</p>
  
  <p>We've recently mapped the fully burdened cost differential between Southern California, Shenzhen, and Tijuana. For contract manufacturing and assembly, Tijuana is currently sitting at <strong>$7.84/hr</strong> fully burdened, with <strong>0% USMCA tariffs</strong> and 1-day trucking to Los Angeles.</p>
  
  <p>I put together a comprehensive 2026 Master Guide breaking down exactly how companies are executing the 90-day shelter setup in Tijuana to bypass these container costs.</p>
  
  <p>You can see the <a href="https://nearshorenavigator.com/en/locations/tijuana/master-guide">exact cost breakdown and industrial park map here</a>.</p>
  
  <p>Are you open to a brief conversation next week to see if a Mexico nearshoring pivot makes financial sense for your operation?</p>
  
  <p>Best,<br>
  <strong>Denisse Martinez</strong><br>
  Principal Advisor, Nearshore Navigator</p>
`;

async function scheduleTijuanaCampaign() {
  console.log('--- Sales Automator: Scheduling Tijuana Master Guide Sprint ---');
  
  const campaignPayload = {
    name: "2026 Q1 Tijuana Master Guide Push - Touch 1",
    sender: { name: "Denisse Martinez", email: "denisse@nearshorenavigator.com" },
    subject: "Tijuana vs Shenzhen manufacturing costs (2026 data)",
    htmlContent: tijuanaTouchOneHtml,
    recipients: { listIds: [targetListId] },
    // Scheduled for tomorrow morning at 9:00 AM PST
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(campaignPayload)
    });

    if (response.ok) {
        const data = await response.json();
        console.log('✅ Campaign successfully scheduled!');
        console.log(`Campaign ID: ${data.id}`);
        console.log('Targeting US Manufacturing Executives List');
        console.log('Primary CTA: https://nearshorenavigator.com/en/locations/tijuana/master-guide');
    } else {
        const errorText = await response.text();
        console.error('❌ Failed to schedule campaign. Invalid API Key or missing list in Brevo environment.');
        console.error('Error Details:', errorText);
    }
  } catch (error) {
    console.error('Error communicating with Brevo API:', error);
  }
}

scheduleTijuanaCampaign();
