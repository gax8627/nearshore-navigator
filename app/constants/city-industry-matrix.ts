export type IndustryMatrixEntry = {
  citySlug: string;
  industrySlug: string;
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
    stats: {
      plants: "75+",
      workforce: "74,000+",
      exportValue: "$3B+"
    },
    featuredParks: ["Parque Industrial Pacifico", "Finsa Tijuana"],
    topLocalEmployers: ["Medtronic", "Becton Dickinson", "CareFusion", "Stryker"]
  },
  {
    citySlug: "mexicali",
    industrySlug: "medical-devices",
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
    stats: {
      plants: "50+",
      workforce: "40,000+",
      exportValue: "$300B+"
    },
    featuredParks: ["Parque Industrial Del Norte", "Finsa Nuevo Laredo"],
    topLocalEmployers: ["FedEx", "Kuehne + Nagel", "Werner Enterprises"]
  }
];
