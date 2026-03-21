#!/usr/bin/env node
/**
 * GA4 MCP Server for Nearshore Navigator
 * Runs locally on your Mac — gives Claude direct GA4 analytics access
 *
 * INSTALL (one-time):
 *   cd ~/nearshore-navigator
 *   npm install @modelcontextprotocol/sdk
 *
 * ADD TO COWORK (one-time):
 *   In Cowork settings → MCP Servers → Add server:
 *   Name: nearshore-navigator-ga4
 *   Command: node /Users/gax8627/nearshore-navigator/scripts/ga4-mcp-server.mjs
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { google } from 'googleapis';

const PROPERTY_ID = '528048108';
const PROPERTY = `properties/${PROPERTY_ID}`;

// Auth via gcloud ADC (runs on Mac, no IP restrictions)
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });

async function runReport(dateRange, dimensions, metrics, orderBys, limit = 20) {
  const res = await analyticsdata.properties.runReport({
    property: PROPERTY,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: dimensions.map(n => ({ name: n })),
      metrics: metrics.map(n => ({ name: n })),
      orderBys: orderBys || [],
      limit,
    },
  });
  return res.data;
}

function formatReport(data) {
  if (!data.rows || data.rows.length === 0) return 'No data found for this period.';
  const headers = [
    ...(data.dimensionHeaders || []).map(h => h.name),
    ...(data.metricHeaders || []).map(h => h.name),
  ];
  const rows = data.rows.map(row => [
    ...(row.dimensionValues || []).map(v => v.value),
    ...(row.metricValues || []).map(v => v.value),
  ]);
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => (r[i] || '').length))
  );
  const sep = colWidths.map(w => '-'.repeat(w)).join('-+-');
  const fmt = row => row.map((v, i) => (v || '').padEnd(colWidths[i])).join(' | ');
  return [fmt(headers), sep, ...rows.map(fmt)].join('\n');
}

const server = new Server(
  { name: 'nearshore-navigator-ga4', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'ga4_overview',
      description: 'Get overall GA4 traffic metrics (sessions, users, bounce rate, conversions) for a date range',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', description: 'Number of days to look back (default: 28)', default: 28 },
        },
      },
    },
    {
      name: 'ga4_top_pages',
      description: 'Get top performing pages by sessions and engagement',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', default: 28 },
          limit: { type: 'number', description: 'Number of pages to return (default: 20)', default: 20 },
        },
      },
    },
    {
      name: 'ga4_traffic_sources',
      description: 'Get traffic breakdown by channel/source/medium',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', default: 28 },
        },
      },
    },
    {
      name: 'ga4_countries',
      description: 'Get sessions and users by country',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', default: 28 },
          limit: { type: 'number', default: 15 },
        },
      },
    },
    {
      name: 'ga4_quick_wins',
      description: 'Find high-traffic pages with poor engagement (high bounce rate or low avg session duration) — conversion opportunities',
      inputSchema: {
        type: 'object',
        properties: {
          days: { type: 'number', default: 28 },
          min_sessions: { type: 'number', description: 'Min sessions to include a page (default: 10)', default: 10 },
        },
      },
    },
    {
      name: 'ga4_landing_pages',
      description: 'Get top landing pages (first page users see) with bounce rates',
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
  const dateRange = { startDate: `${days}daysAgo`, endDate: 'today' };

  try {
    let result = '';

    if (name === 'ga4_overview') {
      const data = await runReport(
        dateRange,
        [],
        ['sessions', 'totalUsers', 'newUsers', 'bounceRate', 'averageSessionDuration', 'screenPageViews'],
        [],
        1
      );
      const m = data.rows?.[0]?.metricValues || [];
      const [sessions, totalUsers, newUsers, bounceRate, avgDuration, pageviews] = m.map(v => v.value);
      const dur = Math.round(parseFloat(avgDuration || 0));
      result = `📊 GA4 Overview — last ${days} days\n\n` +
        `Sessions:          ${parseInt(sessions || 0).toLocaleString()}\n` +
        `Total Users:       ${parseInt(totalUsers || 0).toLocaleString()}\n` +
        `New Users:         ${parseInt(newUsers || 0).toLocaleString()}\n` +
        `Pageviews:         ${parseInt(pageviews || 0).toLocaleString()}\n` +
        `Bounce Rate:       ${(parseFloat(bounceRate || 0) * 100).toFixed(1)}%\n` +
        `Avg Session:       ${Math.floor(dur / 60)}m ${dur % 60}s`;
    }

    else if (name === 'ga4_top_pages') {
      const data = await runReport(
        dateRange,
        ['pagePath'],
        ['sessions', 'totalUsers', 'screenPageViews', 'averageSessionDuration'],
        [{ metric: { metricName: 'sessions' }, desc: true }],
        limit
      );
      result = `📄 Top Pages — last ${days} days\n\n${formatReport(data)}`;
    }

    else if (name === 'ga4_traffic_sources') {
      const data = await runReport(
        dateRange,
        ['sessionDefaultChannelGroup'],
        ['sessions', 'totalUsers', 'bounceRate', 'averageSessionDuration'],
        [{ metric: { metricName: 'sessions' }, desc: true }],
        15
      );
      result = `🚦 Traffic Sources — last ${days} days\n\n${formatReport(data)}`;
    }

    else if (name === 'ga4_countries') {
      const data = await runReport(
        dateRange,
        ['country'],
        ['sessions', 'totalUsers'],
        [{ metric: { metricName: 'sessions' }, desc: true }],
        limit
      );
      result = `🌍 Countries — last ${days} days\n\n${formatReport(data)}`;
    }

    else if (name === 'ga4_quick_wins') {
      const minSessions = args?.min_sessions || 10;
      const data = await runReport(
        dateRange,
        ['pagePath'],
        ['sessions', 'bounceRate', 'averageSessionDuration', 'screenPageViews'],
        [{ metric: { metricName: 'sessions' }, desc: true }],
        100
      );
      const rows = (data.rows || []).filter(row => {
        const sessions = parseInt(row.metricValues[0].value);
        const bounce = parseFloat(row.metricValues[1].value);
        return sessions >= minSessions && bounce > 0.6;
      }).sort((a, b) => {
        return parseFloat(b.metricValues[1].value) - parseFloat(a.metricValues[1].value);
      }).slice(0, 20);

      if (rows.length === 0) {
        result = `✅ No quick wins found — all high-traffic pages have bounce rate < 60%`;
      } else {
        const lines = rows.map(row => {
          const path = row.dimensionValues[0].value;
          const sessions = parseInt(row.metricValues[0].value);
          const bounce = (parseFloat(row.metricValues[1].value) * 100).toFixed(0);
          const dur = Math.round(parseFloat(row.metricValues[2].value));
          return `${path.padEnd(55)} ${String(sessions).padStart(6)} sessions  ${bounce}% bounce  ${Math.floor(dur/60)}m${dur%60}s avg`;
        });
        result = `⚡ Quick Wins — High traffic, high bounce (last ${days} days)\n\n` +
          `${'Page'.padEnd(55)} Sessions  Bounce  Avg Time\n` +
          `${'-'.repeat(90)}\n` +
          lines.join('\n');
      }
    }

    else if (name === 'ga4_landing_pages') {
      const data = await runReport(
        dateRange,
        ['landingPage'],
        ['sessions', 'bounceRate', 'newUsers', 'averageSessionDuration'],
        [{ metric: { metricName: 'sessions' }, desc: true }],
        limit
      );
      result = `🛬 Landing Pages — last ${days} days\n\n${formatReport(data)}`;
    }

    return { content: [{ type: 'text', text: result }] };

  } catch (err) {
    const msg = err.message || String(err);
    return {
      content: [{
        type: 'text',
        text: `❌ GA4 Error: ${msg}\n\nMake sure gcloud ADC is set up:\n  gcloud auth application-default login --scopes="https://www.googleapis.com/auth/analytics.readonly,..."`
      }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
