export type IndustryVertical = {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  insights: {
    marketOpportunity: string;
    laborProfile: string;
    logisticsEdge: string;
  };
  metrics: {
    avgLaborRate: string; // Industry specific (skilled vs general)
    talentPoolSize: string; // Regional specialized grads
    complianceScore: string; // Ease of certification in Mexico
  };
  compliance: {
    certifications: string[];
    regulatoryBodies: string[];
  };
  topPlayers: {
    brand: string;
    location: string;
  }[];
};

export const INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    slug: "medical-devices",
    name: "Medical Device Manufacturing",
    description: "Scale FDA-compliant production in Tijuana and Mexicali's world-class med-tech clusters.",
    heroImage: "https://images.unsplash.com/photo-1576091160550-217359f4bd08?auto=format&fit=crop&q=80&w=2600",
    insights: {
      marketOpportunity: "Baja California is the single largest medical device cluster in North America, with 70+ FDA-registered plants and 12,000+ operators.",
      laborProfile: "Specialized in sterile packaging, Class II/III assembly, and ISO 13485 quality systems management.",
      logisticsEdge: "90-minute cold-chain transit from Tijuana production floors to San Diego distribution hubs."
    },
    metrics: {
      avgLaborRate: "$8.50 - $11.50/hr",
      talentPoolSize: "4,000+ Annual Biomedical Grads",
      complianceScore: "95%"
    },
    compliance: {
      certifications: ["ISO 13485", "FDA Registration", "CE Mark", "COFEPRIS"],
      regulatoryBodies: ["FDA", "COFEPRIS", "EMA"]
    },
    topPlayers: [
      { brand: "Medtronic", location: "Tijuana" },
      { brand: "Becton Dickinson", location: "Tijuana" },
      { brand: "CareFusion", location: "Tijuana" }
    ]
  },
  {
    slug: "aerospace",
    name: "Aerospace & Defense",
    description: "Access the most advanced AS9100-certified manufacturing hub in Mexicali and Sonora.",
    heroImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=2600",
    insights: {
      marketOpportunity: "Mexicali is Mexico's aerospace capital, hosting the largest concentration of precision machining and avionics production.",
      laborProfile: "Highly technical workforce skilled in composite materials, CNC machining, and NADCAP processes.",
      logisticsEdge: "Direct integration with the Arizona and California aerospace 'Megaregions' (Raytheon, Boeing supply chains)."
    },
    metrics: {
      avgLaborRate: "$9.00 - $13.00/hr",
      talentPoolSize: "3,500+ Aerospace Engineers/Year",
      complianceScore: "90%"
    },
    compliance: {
      certifications: ["AS9100", "NADCAP", "ITAR-Compliant Setup", "ISO 14001"],
      regulatoryBodies: ["FAA", "AFAC (Mexico)", "DoD Standards"]
    },
    topPlayers: [
      { brand: "Honeywell", location: "Mexicali" },
      { brand: "Gulfstream", location: "Mexicali" },
      { brand: "Collins Aerospace", location: "Mexicali/Tijuana" }
    ]
  },
  {
    slug: "automotive",
    name: "Automotive & Electric Vehicles",
    description: "The backbone of the North American EV supply chain, from wire harnesses to battery assembly.",
    heroImage: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=2600",
    insights: {
      marketOpportunity: "Juárez and the North-Central corridor dominate the global automotive wire harness and lighting assembly markets.",
      laborProfile: "Stable, high-volume assembly expertise with JIT (Just-in-Time) delivery culture deeply embedded.",
      logisticsEdge: "I-35 corridor connectivity allows 24-48 hour delivery to US auto hubs in Detroit and Tennessee."
    },
    metrics: {
      avgLaborRate: "$7.50 - $9.50/hr",
      talentPoolSize: "15,000+ STEM Grads in Auto Hubs",
      complianceScore: "98%"
    },
    compliance: {
      certifications: ["IATF 16949", "VDA 6.3", "ISO 9001", "C-TPAT"],
      regulatoryBodies: ["AIAG", "VDA", "CBP"]
    },
    topPlayers: [
      { brand: "Delphi", location: "Juárez" },
      { brand: "Lear Corp", location: "Juárez/Chihuahua" },
      { brand: "Bosch", location: "Monterrey/Juárez" }
    ]
  },
  {
    slug: "electronics",
    name: "Electronics & SMT",
    description: "High-volume consumer and industrial electronics centering on Reynosa and Tijuana.",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2600",
    insights: {
      marketOpportunity: "Reynosa and Tijuana are global leaders in TV, appliance, and telecommunications hardware assembly.",
      laborProfile: "Precision SMT (Surface Mount Technology) operators and PCBA testing specialists.",
      logisticsEdge: "Direct cross-border access to Texas and California logistics distributors."
    },
    metrics: {
      avgLaborRate: "$7.00 - $8.50/hr",
      talentPoolSize: "8,000+ Electronics Technicians/Year",
      complianceScore: "92%"
    },
    compliance: {
      certifications: ["IPC-A-610", "ISO 9001", "RoHS", "REACH"],
      regulatoryBodies: ["IPC", "EPA", "CE"]
    },
    topPlayers: [
      { brand: "Samsung", location: "Tijuana" },
      { brand: "Foxconn", location: "Juárez" },
      { brand: "Panasonic", location: "Reynosa" }
    ]
  },
  {
    slug: "distribution-3pl",
    name: "Distribution & 3PL Logistics",
    description: "Leverage the Laredo-Nuevo Laredo gateway, the busiest commercial land port in the Americas.",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2600",
    insights: {
      marketOpportunity: "Nuevo Laredo handles 40% of all US-Mexico trade, making it the premier location for cross-docking and warehouse hubbing.",
      laborProfile: "Bilingual logistics coordinators, warehouse management system (WMS) specialists, and certified customs agents.",
      logisticsEdge: "Zero-wait intermodal rail access (Union Pacific/KCSM) to the US Midwest and East Coast."
    },
    metrics: {
      avgLaborRate: "$6.50 - $8.00/hr",
      talentPoolSize: "Logistics Degree Hub (Nuevo Laredo)",
      complianceScore: "100%"
    },
    compliance: {
      certifications: ["C-TPAT", "AEO", "ISO 28000", "IMMEX Certified"],
      regulatoryBodies: ["CBP", "SAT (Mexico)", "WCO"]
    },
    topPlayers: [
      { brand: "FedEx", location: "Nuevo Laredo" },
      { brand: "DHL", location: "Querétaro/Mexico City" },
      { brand: "Kuehne + Nagel", location: "Border-wide" }
    ]
  }
];
