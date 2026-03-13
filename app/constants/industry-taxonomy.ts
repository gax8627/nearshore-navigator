export type IndustryVertical = {
  slug: string;
  heroImage: string;
  metrics: {
    avgLaborRate: string; // Dynamic? Or just hardcoded for now?
    talentPoolSize: string;
    complianceScore: string;
  };
  compliance: {
    certifications: string[]; // These are usually universal (ISO 13485)
    regulatoryBodies: string[]; // These can be regional/national
  };
  topPlayers: {
    brand: string;
    location: string;
  }[];
};

export const INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    slug: "medical-devices",
    heroImage: "https://images.unsplash.com/photo-1576091160550-217359f4bd08?auto=format&fit=crop&q=80&w=2600",
    metrics: {
      avgLaborRate: "$8.50 - $11.50/hr",
      talentPoolSize: "4,000+",
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
    heroImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=2600",
    metrics: {
      avgLaborRate: "$9.00 - $13.00/hr",
      talentPoolSize: "3,500+",
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
    heroImage: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=2600",
    metrics: {
      avgLaborRate: "$7.50 - $9.50/hr",
      talentPoolSize: "15,000+",
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
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2600",
    metrics: {
      avgLaborRate: "$7.00 - $8.50/hr",
      talentPoolSize: "8,000+",
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
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2600",
    metrics: {
      avgLaborRate: "$6.50 - $8.00/hr",
      talentPoolSize: "Logistics Degree Hub",
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
