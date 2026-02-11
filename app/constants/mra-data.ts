export type MRAHighlight = {
  id: string;
  category: 'Sentiment' | 'Investment' | 'Constraint' | 'HotTopic';
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  description: string;
};

export const MRA_DATA = {
  lastUpdated: 'Feb 2026',
  auditSource: 'Industrial X, r/Tijuana, USMCA 2026 Reports',
  pulse: {
    sentiment: 85, // 0-100
    investmentYTD: '$6.2B',
    growthRate: '+12%',
    primaryConstraint: 'Energy Capacity',
  },
  highlights: [
    {
      id: 'sentiment-1',
      category: 'Sentiment',
      label: 'Market Confidence',
      value: '85% Positive',
      trend: 'up',
      description: 'High confidence in USMCA 2026 stability and nearshoring continuity.'
    },
    {
      id: 'investment-1',
      category: 'Investment',
      label: 'FDI Inflow',
      value: '$6.2B YTD',
      change: '↑ 12%',
      trend: 'up',
      description: 'Concentrated heavily in Class A industrial parks in Tijuana and Mexicali.'
    },
    {
      id: 'constraint-1',
      category: 'Constraint',
      label: 'Infrastructure',
      value: 'Energy Cap',
      change: 'Tightening',
      trend: 'down',
      description: 'Power substation capacity remains the primary bottleneck for large-scale ops.'
    },
    {
      id: 'hot-topic-1',
      category: 'HotTopic',
      label: 'E-commerce',
      value: 'Section 321',
      description: 'Massive surge in duty-free fulfillment inquiries targeting US west coast.'
    }
  ] as MRAHighlight[]
};
