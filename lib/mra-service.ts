import { getCFERates, CFERate } from "./cfe-service";

export interface MarketInsight {
  id: string;
  title: string;
  source: string;
  sentiment: 'positive' | 'neutral' | 'caution';
  date: string;
  impact: string;
  metadata?: {
    cfeRates?: CFERate[];
  };
}

export async function getMarketInsights(): Promise<MarketInsight[]> {
  // Simulation of MRA dynamic data fetch
  const cfeRates = await getCFERates();
  
  // Simulate live border wait times (randomized within realistic range)
  const otayStandard = Math.floor(Math.random() * (120 - 45 + 1) + 45);
  const otayFast = Math.floor(Math.random() * (45 - 15 + 1) + 15);

  return [
    {
      id: "border-wait-live",
      title: "Live Border Wait Times (Otay Mesa)",
      source: "CBP / SmartBorder",
      sentiment: otayStandard > 90 ? "caution" : "neutral",
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      impact: `Commercial Standard: ${otayStandard} min | FAST Lane: ${otayFast} min`
    },
    {
      id: "labor-index-live",
      title: "Tijuana Labor Availability Index",
      source: "Nearshore HR Analytics",
      sentiment: "positive",
      date: new Date().toISOString().split('T')[0],
      impact: "Index: 94.2 (High Stability). Technician retention up 2.4% MoM."
    },
    {
      id: "cfe-rates-live",
      title: "Real-Time Industrial Power Rates",
      source: "CFE / Industrial Intelligence",
      sentiment: "neutral",
      date: new Date().toISOString().split('T')[0],
      impact: `Current GDMTO: ${cfeRates[0].rate} ${cfeRates[0].currency}/${cfeRates[0].unit}`,
      metadata: {
        cfeRates
      }
    },
    {
      id: "s321-aug-2025",
      title: "CBP De Minimis Suspension Official",
      source: "CBP.gov / Market Intelligence",
      sentiment: "caution",
      date: "2025-08-15",
      impact: "Total shift to IMMEX models for commercial B2C."
    },
    {
      id: "mex-invest-2025",
      title: "$6B Industrial Park Boom",
      source: "Mexican Association of Industrial Parks",
      sentiment: "positive",
      date: "2025-01-20",
      impact: "Increased Class A availability in Tijuana/Mexicali."
    }
  ];
}
