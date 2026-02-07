export type Location = {
  slug: string;
  name: string; // Display name e.g. "Tijuana"
  state: string; // e.g. "Baja California"
  country: string; // e.g. "Mexico"
  description: string; // Short intro for this city
  image: string; // Hero image URL
  stats: {
    population: string;
    laborForce: string;
    proximity: string; // e.g. "Border with San Diego, CA"
  };
  advantages: string[]; // Key benefits of this location
};

export type Service = {
  slug: string;
  title: string; // e.g. "Industrial Real Estate"
  description: string; // Generic description to be customized
  icon: "Warehouse" | "Globe2" | "Cog" | "Truck" | "Headset";
};

export const LOCATIONS: Location[] = [
  // --- BORDER REGION ---
  {
    slug: "tijuana",
    name: "Tijuana",
    state: "Baja California",
    country: "Mexico",
    description: "The most established manufacturing hub bordering San Diego, California. Ideal for time-sensitive supply chains.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2600",
    stats: {
      population: "2.2 Million",
      laborForce: "900,000+",
      proximity: "Border with San Diego, CA",
    },
    advantages: [
      "Wait times as low as 2 hours at Otay Mesa Application",
      "Largest concentration of medical device manufacturing",
      "Access to California's logistics infrastructure",
      "Highly skilled bilingual workforce"
    ]
  },
  {
    slug: "mexicali",
    name: "Mexicali",
    state: "Baja California",
    country: "Mexico",
    description: "A highly educated capital city with deep ties to the aerospace and semiconductor industries.",
    image: "https://images.unsplash.com/photo-1518659223-28681e8eb95b?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "1.1 Million",
      laborForce: "450,000+",
      proximity: "Border with Calexico, CA",
    },
    advantages: [
      "Known as the aerospace capital of Northwest Mexico",
      "Abundant water and power supply compared to other border cities",
      "Stable labor environment with low turnover",
      "Direct access to Imperial Valley agriculture and logistics"
    ]
  },
  {
    slug: "juarez",
    name: "Cd. Juárez",
    state: "Chihuahua",
    country: "Mexico",
    description: "The historic heart of the maquiladora industry, bordering El Paso, Texas. Unmatched volume capacity.",
    image: "https://images.unsplash.com/photo-1548625361-9878201eb946?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "1.6 Million",
      laborForce: "700,000+",
      proximity: "Border with El Paso, TX",
    },
    advantages: [
      "Center of the automotive wire harness industry",
      "Seamless integration with El Paso logistics",
      "Home to some of the world's largest industrial parks",
      "Massive pool of experienced manufacturing labor"
    ]
  },
  {
    slug: "reynosa",
    name: "Reynosa",
    state: "Tamaulipas",
    country: "Mexico",
    description: "A rapid-growth hub bordering McAllen, Texas. specializing in electronics and auto parts.",
    image: "https://images.unsplash.com/photo-1517431393693-da9c96123a10?auto=format&fit=crop&q=80&w=2574",
    stats: {
      population: "800,000+",
      laborForce: "350,000+",
      proximity: "Border with McAllen, TX",
    },
    advantages: [
      "Fastest growing industrial city on the border",
      "Strong electrical and electronics manufacturing base",
      "Strategic location for Texas distribution",
      "Modern infrastructure due to recent foreign investment"
    ]
  },
  {
    slug: "nuevo-laredo",
    name: "Nuevo Laredo",
    state: "Tamaulipas",
    country: "Mexico",
    description: "The #1 land port in the Americas. The absolute center of gravity for logistics and land freight.",
    image: "https://images.unsplash.com/photo-1588612130768-be70ae9f1d0c?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "450,000+",
      laborForce: "180,000+",
      proximity: "Border with Laredo, TX",
    },
    advantages: [
      "Handles 40% of all US-Mexico trade",
      "World's densest concentration of customs brokers",
      "Ideal for distribution centers and cross-docking",
      "Direct access to I-35 corridor into the US Midwest"
    ]
  },
  {
    slug: "nogales",
    name: "Nogales",
    state: "Sonora",
    country: "Mexico",
    description: "Arizona's manufacturing partner. A specialized hub for aerospace, medical, and produce.",
    image: "https://images.unsplash.com/photo-1533235775330-9db43d421711?auto=format&fit=crop&q=80&w=2664",
    stats: {
      population: "270,000+",
      laborForce: "110,000+",
      proximity: "Border with Nogales, AZ",
    },
    advantages: [
      "Deep integration with Arizona's 'Megaregion'",
      "Major hub for seasonal produce and food processing",
      "Established aerospace supply chain (Bombardier, Honeywell)",
      "Dedicated rail crossing for freight"
    ]
  },
  {
    slug: "matamoros",
    name: "Matamoros",
    state: "Tamaulipas",
    country: "Mexico",
    description: "A port city bordering Brownsville, Texas. Expanding rapidly due to SpaceX and automotive growth.",
    image: "https://images.unsplash.com/photo-1563608778411-13ac70669255?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "550,000+",
      laborForce: "220,000+",
      proximity: "Border with Brownsville, TX",
    },
    advantages: [
      "Access to the Port of Brownsville",
      "Proximity to SpaceX Starbase facility",
      "Strong metal mechanics and automotive sectors",
      "Competitive labor costs compared to other border cities"
    ]
  },

  // --- INTERIOR HUBS ---
  {
    slug: "monterrey",
    name: "Monterrey",
    state: "Nuevo León",
    country: "Mexico",
    description: "The industrial capital of Mexico, often called the 'Tesla hub'. Known for heavy industry and automotive excellence.",
    image: "https://images.unsplash.com/photo-1588414734732-660207328aaa?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "5.3 Million",
      laborForce: "2.1 Million+",
      proximity: "2 hours from Laredo, TX",
    },
    advantages: [
      "Home to Tesla, Kia, and major automotive OEMs",
      "Highest density of engineering graduates in Mexico",
      "World-class industrial parks like Hofusan and Interpuerto",
      "Direct rail links to the US Midwest"
    ]
  },
  {
    slug: "guadalajara",
    name: "Guadalajara",
    state: "Jalisco",
    country: "Mexico",
    description: "Known as the 'Silicon Valley of Mexico'. The premier destination for electronics and high-tech manufacturing.",
    image: "https://images.unsplash.com/photo-1596131460598-c1b79eda3e11?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "5.2 Million",
      laborForce: "1.9 Million+",
      proximity: "International Airport (GDL)",
    },
    advantages: [
      "Top destination for Oracle, Intel, and HP",
      "Robust ecosystem for electronics supply chain",
      "Excellent quality of life for expats",
      "Strategic location for Pacific port access (Manzanillo)"
    ]
  },
  {
    slug: "queretaro",
    name: "Querétaro",
    state: "Querétaro",
    country: "Mexico",
    description: "The aerospace capital of Mexico. A safe, modern, and high-tech city in the center of the country.",
    image: "https://images.unsplash.com/photo-1569420078235-51d07c2957b4?auto=format&fit=crop&q=80&w=2669",
    stats: {
      population: "2.4 Million",
      laborForce: "950,000+",
      proximity: "Central Mexico (Bajío)",
    },
    advantages: [
      "Home to Bombardier, Airbus, and GE Aviation",
      "Safest state in Mexico for expats and industry",
      "Specialized Aerospace University (UNAQ)",
      "High density of data centers and R&D facilities"
    ]
  },
  {
    slug: "san-luis-potosi",
    name: "San Luis Potosí",
    state: "San Luis Potosí",
    country: "Mexico",
    description: "The logistical crossroads of Mexico. Located within the 'Golden Triangle' of major cities.",
    image: "https://images.unsplash.com/photo-1619546952912-535e9ec25806?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "1.4 Million",
      laborForce: "600,000+",
      proximity: "Center of Mexico",
    },
    advantages: [
      "Central access to Mexico City, Monterrey, and Guadalajara",
      "Major BMW and GM assembly plants",
      "Strong logistics hub for domestic distribution",
      "Excellent highway and rail connectivity"
    ]
  },
  {
    slug: "saltillo",
    name: "Saltillo",
    state: "Coahuila",
    country: "Mexico",
    description: "The 'Detroit of Mexico'. A powerhouse of automotive assembly and parts manufacturing near Monterrey.",
    image: "https://images.unsplash.com/photo-1591823908865-f9a0c64b58e6?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "1 Million",
      laborForce: "400,000+",
      proximity: "45 mins from Monterrey",
    },
    advantages: [
      "Cluster of GM, Stellantis, and Daimler Truck plants",
      "Highly unionized but stable automotive workforce",
      "Cooler climate and high quality of life",
      "Synergy with Monterrey's industrial supply chain"
    ]
  },
  {
    slug: "hermosillo",
    name: "Hermosillo",
    state: "Sonora",
    country: "Mexico",
    description: "A strategic industrial hub supporting Ford's massive stamping and assembly operations.",
    image: "https://images.unsplash.com/photo-1610662656910-ecb0ff21cf29?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "950,000+",
      laborForce: "380,000+",
      proximity: "4 hours from Nogales, AZ",
    },
    advantages: [
      "Home to Ford's critical stamping plant",
      "Strong mining and metallurgy support services",
      "Reliable solar energy potential",
      "Access to the deep-water port of Guaymas"
    ]
  },
  {
    slug: "silao",
    name: "Silao / Guanajuato",
    state: "Guanajuato",
    country: "Mexico",
    description: "The heart of the Bajío automotive cluster. Incredible density of Japanese and European suppliers.",
    image: "https://images.unsplash.com/photo-1548545814-740523fbdbb5?auto=format&fit=crop&q=80&w=2000",
    stats: {
      population: "200,000 (City) / 6M (State)",
      laborForce: "Local + Commuter",
      proximity: "Bajío Regional Hub",
    },
    advantages: [
      "Anchored by GM, Honda, Toyota, and Mazda nearby",
      "Highest density of Tier 2 automotive suppliers",
      "Excellent inland port (Guanajuato Inland Port)",
      "Strong rail connectivity to both coasts"
    ]
  },
  {
    slug: "puebla",
    name: "Puebla",
    state: "Puebla",
    country: "Mexico",
    description: "A historic industrial giant. Home to Volkswagen for over 50 years and Audi's Q5 plant.",
    image: "https://images.unsplash.com/photo-1594917573673-9a3b8cd2c423?auto=format&fit=crop&q=80&w=2574",
    stats: {
      population: "3.2 Million",
      laborForce: "1.3 Million+",
      proximity: "2 hours from Mexico City",
    },
    advantages: [
      "Home to the massive Volkswagen and Audi plants",
      "Deeply established German engineering culture",
      "Huge pool of university graduates",
      "Gateway to Southern Mexico logistics"
    ]
  }
];

export const SERVICES: Service[] = [
  {
    slug: "industrial-real-estate",
    title: "Industrial Real Estate",
    description: "Find Class A industrial space, built-to-suit options, and warehouse leasing.",
    icon: "Warehouse"
  },

  {
    slug: "contract-manufacturing",
    title: "Contract Manufacturing",
    description: "Outsource production to established factories with proven quality control.",
    icon: "Cog"
  },
  {
    slug: "distribution-centers",
    title: "Distribution Centers",
    description: "Optimize logistics with strategically located fulfillment and distribution hubs.",
    icon: "Truck"
  },
  {
    slug: "soft-landing-services",
    title: "Soft Landing Services",
    description: "Legal, HR, and accounting support to incorporate your business in Mexico smoothly.",
    icon: "Headset"
  },
  {
    slug: "supply-chain-management",
    title: "Supply Chain",
    description: "Sourcing, vendor management, and logistics optimization for cross-border trade.",
    icon: "Truck"
  }
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find(l => l.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug);
}
