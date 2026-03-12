export type IndustryMatrixEntry = {
  citySlug: string;
  industrySlug: string;
  localDynamics: string;
  stats: {
    plants: string;
    workforce: string;
    exportValue?: string;
  };
  featuredParks: string[];
  topLocalEmployers: string[];
};

export const INDUSTRY_MATRIX: IndustryMatrixEntry[] = [
  // --- MEDICAL DEVICES ---
  {
    citySlug: "tijuana",
    industrySlug: "medical-devices",
    localDynamics: "The world's second-largest medical device cluster. Tijuana specializes in Class II and III implantable devices and high-precision sterile assembly. Its proximity to San Diego's biotech hub allows for daily engineering exchange.",
    stats: {
      plants: "75+",
      workforce: "74,000+",
      exportValue: "$3B+ Annual"
    },
    featuredParks: ["Parque Industrial Pacifico", "Finsa Tijuana"],
    topLocalEmployers: ["Medtronic", "Becton Dickinson", "CareFusion", "Stryker"]
  },
  {
    citySlug: "mexicali",
    industrySlug: "medical-devices",
    localDynamics: "Mexicali offers a lower-cost alternative to Tijuana for med-tech, with a focus on high-volume disposables and diagnostic equipment assembly. It benefits from shorter border wait times at Calexico East.",
    stats: {
      plants: "20+",
      workforce: "15,000+",
    },
    featuredParks: ["Parque Industrial Calafia", "PIMSA"],
    topLocalEmployers: ["Intuitive Surgical", "Masimo", "Teleflex"]
  },

  // --- AEROSPACE ---
  {
    citySlug: "mexicali",
    industrySlug: "aerospace",
    localDynamics: "Mexico's aerospace capital. Mexicali handles 70% of Gulfstream's jet assembly and is a global center for avionics testing and thermal management systems (Honeywell).",
    stats: {
      plants: "28+",
      workforce: "8,000+",
      exportValue: "$1.2B+"
    },
    featuredParks: ["Parque Industrial Calafia", "Cachanilla Industrial Park"],
    topLocalEmployers: ["Gulfstream", "Honeywell", "Collins Aerospace", "GKN Aerospace"]
  },
  {
    citySlug: "tijuana",
    industrySlug: "aerospace",
    localDynamics: "Tijuana's aerospace sector is deeply integrated with the Southern California defense corridor. Specializes in interior components, secondary structures, and precision machining.",
    stats: {
      plants: "35+",
      workforce: "12,000+",
    },
    featuredParks: ["Otay Mesa Industrial Zone", "Parque Industrial Nordika"],
    topLocalEmployers: ["Safran", "Eaton", "Vestas"]
  },

  // --- AUTOMOTIVE ---
  {
    citySlug: "juarez",
    industrySlug: "automotive",
    localDynamics: "The global epicenter of wire harness manufacturing. Juárez is rapidly transitioning to EV architecture, producing complex high-voltage harnesses and electronic control units for the Big Three.",
    stats: {
      plants: "150+",
      workforce: "300,000+",
      exportValue: "$15B+"
    },
    featuredParks: ["Parque Industrial Omega", "PIMSA Juárez"],
    topLocalEmployers: ["Lear Corp", "Aptiv", "Robert Bosch", "Continental"]
  },
  {
    citySlug: "monterrey",
    industrySlug: "automotive",
    localDynamics: "The future EV capital of Latin America. Monterrey captures 72% of Mexico's nearshoring investment, driven by the Tesla Gigafactory ecosystem and a massive Tier 1 supplier base.",
    stats: {
      plants: "200+",
      workforce: "100,000+",
      exportValue: "$20B+"
    },
    featuredParks: ["Santa Catarina Industrial Corridor", "Interpuerto Monterrey"],
    topLocalEmployers: ["Tesla Suppliers (Quanta)", "Kia Motors", "General Motors", "Nemak"]
  },

  // --- ELECTRONICS ---
  {
    citySlug: "reynosa",
    industrySlug: "electronics",
    localDynamics: "The 'Television Capital' of the world. Reynosa specializes in high-volume consumer electronics (LG, Panasonic) and industrial automation controls (Emerson).",
    stats: {
      plants: "100+",
      workforce: "120,000+",
      exportValue: "$5B+"
    },
    featuredParks: ["Parque Industrial Reynosa", "Finsa Reynosa"],
    topLocalEmployers: ["LG Electronics", "Panasonic", "Emerson", "3M"]
  },
  {
    citySlug: "tijuana",
    industrySlug: "electronics",
    localDynamics: "Tijuana's electronics sector focuses on high-mix, low-volume (HMLV) production and advanced PCBA for medical and aerospace applications.",
    stats: {
      plants: "120+",
      workforce: "80,000+",
    },
    featuredParks: ["Parque Industrial Pacifico", "Otay Mesa"],
    topLocalEmployers: ["Samsung", "Sony", "Foxconn", "Plantronics"]
  },

  // --- DISTRIBUTION / 3PL ---
  {
    citySlug: "nuevo-laredo",
    industrySlug: "distribution-3pl",
    localDynamics: "The 'World Trade' gateway. Nuevo Laredo handles 40% of all US-Mexico rail and truck freight. Ideal for large-scale cross-docking and multi-modal distribution into the US Midwest.",
    stats: {
      plants: "50+ Distribution Centers",
      workforce: "40,000+ Logistics specialists",
      exportValue: "$300B+ Bilateral Trade"
    },
    featuredParks: ["Parque Industrial Del Norte", "Finsa Nuevo Laredo"],
    topLocalEmployers: ["FedEx", "Kuehne + Nagel", "Werner Enterprises"]
  }
];
