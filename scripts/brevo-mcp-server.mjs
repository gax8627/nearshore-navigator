#!/usr/bin/env node
/**
 * Brevo MCP Server for Nearshore Navigator
 * Gives Claude direct access to Brevo email data — campaigns, lists, stats, scheduling
 *
 * INSTALL (one-time):
 *   cd ~/nearshore-navigator
 *   npm install @modelcontextprotocol/sdk dotenv
 *
 * ADD TO COWORK (one-time):
 *   Cowork Settings → MCP Servers → Add server:
 *   Name: nearshore-navigator-brevo
 *   Command: node /Users/gax8627/nearshore-navigator/scripts/brevo-mcp-server.mjs
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load env from project root
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BASE_URL = 'https://api.brevo.com/v3';

async function brevoFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'api-key': BREVO_API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Brevo API error ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

function fmt(obj) {
  return JSON.stringify(obj, null, 2);
}

// ── Server Definition ────────────────────────────────────────────────────────

const server = new Server(
  { name: 'nearshore-navigator-brevo', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'brevo_account',
      description: 'Get Brevo account info: plan, email credits remaining, sender reputation',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'brevo_campaigns',
      description: 'List email campaigns with status, scheduled time, and stats. Filter by status: draft, queued, sent, archive',
      inputSchema: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['draft', 'queued', 'sent', 'archive', 'all'], default: 'all' },
          limit: { type: 'number', default: 20 },
        },
      },
    },
    {
      name: 'brevo_campaign_stats',
      description: 'Get detailed stats for a specific campaign: delivered, opens, clicks, bounces, unsubscribes',
      inputSchema: {
        type: 'object',
        properties: {
          campaign_id: { type: 'number', description: 'Campaign ID from brevo_campaigns' },
        },
        required: ['campaign_id'],
      },
    },
    {
      name: 'brevo_lists',
      description: 'List all contact lists with subscriber counts',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', default: 30 },
        },
      },
    },
    {
      name: 'brevo_hot_leads',
      description: 'Get confirmed human hot leads from local engagement data (click:open ratio ≤3, ≥2 clicks)',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', default: 30 },
          min_clicks: { type: 'number', default: 2 },
        },
      },
    },
    {
      name: 'brevo_bounces',
      description: 'Get all hard bounced emails from engagement data for suppression list cleanup',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'brevo_engagement_summary',
      description: 'Get full engagement summary: open rates, click rates, bounce rates, bot vs human analysis',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'brevo_create_campaign',
      description: 'Create and schedule a new email campaign in Brevo. Returns campaign ID. Schedules for specified datetime.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Internal campaign name' },
          subject: { type: 'string', description: 'Email subject line (can use {{contact.COMPANY}} etc)' },
          html_content: { type: 'string', description: 'Full HTML email body' },
          list_ids: { type: 'array', items: { type: 'number' }, description: 'Brevo list IDs to send to' },
          scheduled_at: { type: 'string', description: 'ISO datetime to schedule send e.g. 2026-06-15T08:00:00-07:00' },
          sender_name: { type: 'string', default: 'Denisse Martinez' },
          sender_email: { type: 'string', default: 'denisse@nearshorenavigator.com' },
        },
        required: ['name', 'subject', 'html_content', 'list_ids'],
      },
    },
    {
      name: 'brevo_create_list',
      description: 'Create a new contact list in Brevo',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'List name' },
          folder_id: { type: 'number', default: 1 },
        },
        required: ['name'],
      },
    },
    {
      name: 'brevo_add_contacts_to_list',
      description: 'Add contacts (with attributes) to a Brevo list. Takes array of {email, firstName, company, industry}',
      inputSchema: {
        type: 'object',
        properties: {
          list_id: { type: 'number' },
          contacts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                firstName: { type: 'string' },
                company: { type: 'string' },
                industry: { type: 'string' },
              },
              required: ['email'],
            },
          },
        },
        required: ['list_id', 'contacts'],
      },
    },
    {
      name: 'brevo_suppressions',
      description: 'List email addresses on Brevo suppression list (hard bounces, unsubscribes)',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', default: 50 },
        },
      },
    },
    {
      name: 'brevo_upcoming_campaigns',
      description: 'Show queued/scheduled campaigns and their send times',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  try {
    switch (name) {

      case 'brevo_account': {
        const data = await brevoFetch('/account');
        const plan = data.plan?.[0];
        return { content: [{ type: 'text', text: `Account: ${data.companyName || data.email}
Email: ${data.email}
Plan: ${plan?.type || 'Unknown'} — Credits remaining: ${plan?.credits ?? 'N/A'}
Credits per month: ${plan?.creditsType === 'unlimited' ? 'Unlimited' : plan?.credits}
Marketing automation: ${data.marketingAutomation ? 'Enabled' : 'Disabled'}` }] };
      }

      case 'brevo_campaigns': {
        const status = args.status === 'all' ? '' : `&status=${args.status}`;
        const limit = args.limit || 20;
        const data = await brevoFetch(`/emailCampaigns?limit=${limit}&offset=0&sort=desc${status}`);
        const campaigns = data.campaigns || [];
        if (!campaigns.length) return { content: [{ type: 'text', text: 'No campaigns found.' }] };

        const rows = campaigns.map(c => {
          const stats = c.statistics?.globalStats || {};
          const delivered = stats.delivered || 0;
          const opens = stats.uniqueOpens || stats.opens || 0;
          const clicks = stats.uniqueClicks || stats.clicks || 0;
          const openRate = delivered ? `${((opens/delivered)*100).toFixed(1)}%` : 'N/A';
          const clickRate = delivered ? `${((clicks/delivered)*100).toFixed(1)}%` : 'N/A';
          return `[${c.id}] ${c.name}
  Status: ${c.status} | Scheduled: ${c.scheduledAt || 'N/A'} | Sent: ${c.sentDate || 'N/A'}
  Subject: ${c.subject}
  Delivered: ${delivered} | Opens: ${opens} (${openRate}) | Clicks: ${clicks} (${clickRate})`;
        }).join('\n\n');
        return { content: [{ type: 'text', text: rows }] };
      }

      case 'brevo_campaign_stats': {
        const data = await brevoFetch(`/emailCampaigns/${args.campaign_id}`);
        const s = data.statistics?.globalStats || {};
        const d = data.statistics?.campaignStats || [];
        return { content: [{ type: 'text', text: `Campaign: ${data.name} (ID: ${data.id})
Subject: ${data.subject}
Status: ${data.status}
Scheduled: ${data.scheduledAt || 'N/A'} | Sent: ${data.sentDate || 'N/A'}

Stats:
  Requests:     ${s.requests || 0}
  Delivered:    ${s.delivered || 0}
  Opens:        ${s.uniqueOpens || 0} unique / ${s.opens || 0} total
  Clicks:       ${s.uniqueClicks || 0} unique / ${s.clicks || 0} total
  Hard Bounces: ${s.hardBounces || 0}
  Soft Bounces: ${s.softBounces || 0}
  Unsubscribes: ${s.unsubscriptions || 0}
  Spam Reports: ${s.spamReports || 0}

Open Rate:  ${s.delivered ? ((s.uniqueOpens||0)/s.delivered*100).toFixed(1) : 'N/A'}%
Click Rate: ${s.delivered ? ((s.uniqueClicks||0)/s.delivered*100).toFixed(1) : 'N/A'}%` }] };
      }

      case 'brevo_lists': {
        const data = await brevoFetch(`/contacts/lists?limit=${args.limit || 30}&offset=0`);
        const lists = data.lists || [];
        if (!lists.length) return { content: [{ type: 'text', text: 'No lists found.' }] };
        const rows = lists.map(l => `[${l.id}] ${l.name} — ${l.uniqueSubscribers || 0} subscribers (total: ${l.totalSubscribers || 0})`).join('\n');
        return { content: [{ type: 'text', text: rows }] };
      }

      case 'brevo_hot_leads': {
        const engPath = path.join(__dirname, '..', 'scripts', 'engagement_data.json');
        if (!fs.existsSync(engPath)) return { content: [{ type: 'text', text: 'engagement_data.json not found.' }] };
        const eng = JSON.parse(fs.readFileSync(engPath, 'utf-8'));
        const minClicks = args.min_clicks || 2;
        const limit = args.limit || 30;

        const leads = [];
        for (const [email, info] of Object.entries(eng)) {
          const events = info.history || [];
          const clicks = events.filter(e => ['clicked','clicks'].includes(e.type)).length;
          const opens = events.filter(e => e.type === 'opened').length;
          if (clicks < minClicks || opens === 0) continue;
          const ratio = clicks / opens;
          if (ratio > 3) continue; // filter bots
          const last = events.map(e => e.date || '').filter(Boolean).sort().pop()?.slice(0, 10) || '';
          leads.push({ email, clicks, opens, ratio: ratio.toFixed(2), last });
        }

        leads.sort((a, b) => (b.clicks + b.opens) - (a.clicks + a.opens));
        const top = leads.slice(0, limit);
        const rows = top.map(l => `${l.clicks}c/${l.opens}o (${l.ratio}x) | ${l.last} | ${l.email}`).join('\n');
        return { content: [{ type: 'text', text: `Confirmed human hot leads (click:open ≤3, ≥${minClicks} clicks):\n${rows}\n\nTotal: ${leads.length}` }] };
      }

      case 'brevo_bounces': {
        const engPath = path.join(__dirname, '..', 'scripts', 'engagement_data.json');
        if (!fs.existsSync(engPath)) return { content: [{ type: 'text', text: 'engagement_data.json not found.' }] };
        const eng = JSON.parse(fs.readFileSync(engPath, 'utf-8'));
        const hardBounced = new Set();
        for (const [email, info] of Object.entries(eng)) {
          for (const ev of (info.history || [])) {
            if (ev.type === 'hardBounces') hardBounced.add(email);
          }
        }
        return { content: [{ type: 'text', text: `Hard bounced emails (${hardBounced.size}):\n${[...hardBounced].sort().join('\n')}\n\nUpload these to Brevo → Contacts → Blacklist to suppress.` }] };
      }

      case 'brevo_engagement_summary': {
        const engPath = path.join(__dirname, '..', 'scripts', 'engagement_data.json');
        if (!fs.existsSync(engPath)) return { content: [{ type: 'text', text: 'engagement_data.json not found.' }] };
        const eng = JSON.parse(fs.readFileSync(engPath, 'utf-8'));
        const total = Object.keys(eng).length;
        const counts = {};
        let humanClickers = 0, suspiciousClickers = 0, botClickers = 0;

        for (const [email, info] of Object.entries(eng)) {
          const events = info.history || [];
          for (const ev of events) counts[ev.type] = (counts[ev.type] || 0) + 1;
          const clicks = events.filter(e => ['clicked','clicks'].includes(e.type)).length;
          const opens = events.filter(e => e.type === 'opened').length;
          if (clicks === 0) continue;
          const ratio = clicks / Math.max(opens, 1);
          if (opens === 0 && clicks >= 3 || ratio > 5 && clicks >= 10) botClickers++;
          else if (opens === 0 || ratio > 3) suspiciousClickers++;
          else humanClickers++;
        }

        const delivered = counts.delivered || 0;
        return { content: [{ type: 'text', text: `Engagement Summary (${total} contacts tracked)

Event counts:
  Delivered:     ${counts.delivered || 0}
  Opens:         ${counts.opened || 0}
  Clicks:        ${(counts.clicked||0) + (counts.clicks||0)}
  Hard Bounces:  ${counts.hardBounces || 0} (${delivered ? ((counts.hardBounces||0)/delivered*100).toFixed(1) : 'N/A'}%)
  Soft Bounces:  ${counts.softBounces || 0}
  Unsubscribes:  ${counts.unsubscribed || 0}
  Apple Proxy:   ${counts.loadedByProxy || 0}

Click authenticity:
  ✅ Likely human:  ${humanClickers}
  ⚠️  Suspicious:    ${suspiciousClickers}
  🤖 Bot likely:    ${botClickers}` }] };
      }

      case 'brevo_create_campaign': {
        const body = {
          name: args.name,
          subject: args.subject,
          sender: { name: args.sender_name || 'Denisse Martinez', email: args.sender_email || 'denisse@nearshorenavigator.com' },
          type: 'classic',
          htmlContent: args.html_content,
          recipients: { listIds: args.list_ids },
        };
        if (args.scheduled_at) body.scheduledAt = args.scheduled_at;

        const data = await brevoFetch('/emailCampaigns', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        return { content: [{ type: 'text', text: `Campaign created successfully!\nID: ${data.id}\nName: ${args.name}\nScheduled: ${args.scheduled_at || 'Draft'}` }] };
      }

      case 'brevo_create_list': {
        const data = await brevoFetch('/contacts/lists', {
          method: 'POST',
          body: JSON.stringify({ name: args.name, folderId: args.folder_id || 1 }),
        });
        return { content: [{ type: 'text', text: `List created: "${args.name}" (ID: ${data.id})` }] };
      }

      case 'brevo_add_contacts_to_list': {
        const contacts = args.contacts;
        const listId = args.list_id;
        let added = 0, errors = 0;
        for (let i = 0; i < contacts.length; i += 50) {
          const batch = contacts.slice(i, i + 50);
          await Promise.all(batch.map(async c => {
            try {
              await brevoFetch('/contacts', {
                method: 'POST',
                body: JSON.stringify({
                  email: c.email,
                  attributes: { FIRSTNAME: c.firstName || '', COMPANY: c.company || '', INDUSTRY: c.industry || '' },
                  listIds: [listId],
                  updateEnabled: true,
                }),
              });
              added++;
            } catch { errors++; }
          }));
        }
        return { content: [{ type: 'text', text: `Added ${added} contacts to list ${listId}. Errors: ${errors}.` }] };
      }

      case 'brevo_suppressions': {
        const data = await brevoFetch(`/contacts/blacklist?limit=${args.limit || 50}&offset=0`);
        const emails = (data.emails || []).join('\n');
        return { content: [{ type: 'text', text: `Suppressed emails (${data.count || 0} total):\n${emails}` }] };
      }

      case 'brevo_upcoming_campaigns': {
        const data = await brevoFetch('/emailCampaigns?limit=50&offset=0&status=queued&sort=desc');
        const campaigns = data.campaigns || [];
        if (!campaigns.length) return { content: [{ type: 'text', text: 'No scheduled campaigns.' }] };
        const rows = campaigns.map(c => `[${c.id}] ${c.name}\n  Subject: ${c.subject}\n  Scheduled: ${c.scheduledAt}`).join('\n\n');
        return { content: [{ type: 'text', text: rows }] };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
