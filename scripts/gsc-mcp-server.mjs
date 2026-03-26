#!/usr/bin/env node
/**
 * GSC MCP Server for Nearshore Navigator
 * Property: sc-domain:nearshorenavigator.com (56183744)
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { google } from 'googleapis';

const SITE_URL = 'sc-domain:nearshorenavigator.com';
const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

const server = new Server(
  { name: 'nearshore-navigator-gsc', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'gsc_overview',
      description: 'Get overall GSC performance (clicks, impressions, ctr, position) for a date range',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', description: 'Number of days to look back (default: 28)', default: 28 },
        },
      },
    },
    {
      name: 'gsc_top_queries',
      description: 'Get top search queries by clicks and impressions',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', default: 28 },
          limit: { type: 'number', default: 20 },
        },
      },
    },
    {
      name: 'gsc_top_pages',
      description: 'Get top performing pages by clicks and impressions',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', default: 28 },
          limit: { type: 'number', default: 20 },
        },
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const days = args?.days || 28;
  const limit = args?.limit || 20;

  const now = new Date();
  const endDate = now.toISOString().split('T')[0];
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  try {
    if (name === 'gsc_overview') {
      const res = await searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { startDate, endDate, rowLimit: 1 },
      });
      const rows = res.data.rows || [];
      const stats = rows[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
      
      const result = `📈 GSC Overview — last ${days} days\n\n` +
        `Clicks:      ${stats.clicks?.toLocaleString()}\n` +
        `Impressions: ${stats.impressions?.toLocaleString()}\n` +
        `CTR:         ${((stats.ctr || 0) * 100).toFixed(2)}%\n` +
        `Avg Pos:     ${stats.position?.toFixed(1)}`;
      return { content: [{ type: 'text', text: result }] };
    }

    if (name === 'gsc_top_queries' || name === 'gsc_top_pages') {
      const dimension = name === 'gsc_top_queries' ? 'query' : 'page';
      const res = await searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: [dimension],
          rowLimit: limit,
        },
      });

      const rows = res.data.rows || [];
      if (rows.length === 0) return { content: [{ type: 'text', text: 'No data found.' }] };

      const headers = [dimension.charAt(0).toUpperCase() + dimension.slice(1), 'Clicks', 'Impr', 'CTR', 'Pos'];
      const lines = rows.map(r => [
        r.keys[0],
        r.clicks.toString(),
        r.impressions.toString(),
        ((r.ctr || 0) * 100).toFixed(1) + '%',
        r.position.toFixed(1)
      ]);

      const colWidths = headers.map((h, i) => Math.max(h.length, ...lines.map(l => l[i].length)));
      const fmt = row => row.map((v, i) => v.padEnd(colWidths[i])).join(' | ');
      const sep = colWidths.map(w => '-'.repeat(w)).join('-+-');

      const result = `📊 Top ${dimension}s — last ${days} days\n\n` +
        [fmt(headers), sep, ...lines.map(fmt)].join('\n');
      return { content: [{ type: 'text', text: result }] };
    }

    throw new Error(`Tool not found: ${name}`);
  } catch (err) {
    return {
      content: [{ type: 'text', text: `❌ GSC Error: ${err.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
