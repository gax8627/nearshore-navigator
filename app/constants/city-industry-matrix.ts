export type IndustryMatrixEntry = {
  citySlug: string;
  industrySlug: string;
  stats: {
    plants: string;
    workforce: string;
  };
  featuredParks: string[];
  topLocalEmployers: string[];
  localAnalysis?: string; // Programmatic SEO unique content module
};
export const INDUSTRY_MATRIX: IndustryMatrixEntry[] = [
  // ── TIJUANA ── Real data from seo-data.ts (verified Tier 1)
  {
    citySlug: "tijuana",
    industrySlug: "medical-devices",
    stats: {
      plants: "70+",
      workforce: "65,000+"
    },
    featuredParks: ["Pacifico Industrial Park", "El Florido Industrial Park", "Nordika Industrial Park"],
    topLocalEmployers: ["Medtronic", "Becton Dickinson", "DJO Global", "CareFusion"]
  },
  {
    citySlug: "tijuana",
    industrySlug: "aerospace",
    stats: {
      plants: "25+",
      workforce: "8,000+"
    },
    featuredParks: ["Pacifico Industrial Park", "Otay Mesa Industrial Corridor", "El Florido Industrial Park"],
    topLocalEmployers: ["Collins Aerospace", "Eaton Aerospace", "Honeywell Baja"]
  },
  {
    citySlug: "tijuana",
    industrySlug: "automotive",
    stats: {
      plants: "150+",
      workforce: "45,000+"
    },
    featuredParks: ["El Florido Industrial Park", "Finsa Tijuana", "Nordika Industrial Park"],
    topLocalEmployers: ["Hyundai Translead", "Toyota Baja", "Kenworth Mexicana"]
  },
  {
    citySlug: "tijuana",
    industrySlug: "electronics",
    stats: {
      plants: "200+",
      workforce: "80,000+"
    },
    featuredParks: ["Pacifico Industrial Park", "El Florido Industrial Park", "Otay Mesa Industrial Corridor"],
    topLocalEmployers: ["Samsung SDI", "Panasonic", "Plantronics (Poly)"]
  },
  {
    citySlug: "tijuana",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "100+",
      workforce: "30,000+"
    },
    featuredParks: ["Otay Mesa Industrial Corridor", "Alamar Industrial Park", "Pacific Industrial Park"],
    topLocalEmployers: ["FedEx Cross-Border", "DHL Baja", "Kuehne + Nagel"]
  },

  // ── MEXICALI ── Real data (verified Tier 1)
  {
    citySlug: "mexicali",
    industrySlug: "medical-devices",
    stats: {
      plants: "35+",
      workforce: "22,000+"
    },
    featuredParks: ["PIMSA Industrial Park", "Parque Industrial Mexicali", "Finsa Mexicali"],
    topLocalEmployers: ["Intuitive Surgical", "Medtronic", "Cardinal Health"]
  },
  {
    citySlug: "mexicali",
    industrySlug: "aerospace",
    stats: {
      plants: "30+",
      workforce: "15,000+"
    },
    featuredParks: ["PIMSA Industrial Park", "Parque Industrial Mexicali", "IXP Industrial Park"],
    topLocalEmployers: ["Gulfstream", "Honeywell Aerospace", "Collins Aerospace", "GKN Aerospace"]
  },
  {
    citySlug: "mexicali",
    industrySlug: "automotive",
    stats: {
      plants: "60+",
      workforce: "28,000+"
    },
    featuredParks: ["Parque Industrial Mexicali", "Nicoya Industrial Park", "PIMSA"],
    topLocalEmployers: ["Kenworth Mexicana", "Collins Aerospace (Interior Systems)", "Lear Corporation"]
  },
  {
    citySlug: "mexicali",
    industrySlug: "electronics",
    stats: {
      plants: "45+",
      workforce: "25,000+"
    },
    featuredParks: ["PIMSA Industrial Park", "Parque Industrial Mexicali", "Finsa Mexicali"],
    topLocalEmployers: ["Skyworks Solutions", "Emerson Electric", "Schneider Electric"]
  },
  {
    citySlug: "mexicali",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "40+",
      workforce: "12,000+"
    },
    featuredParks: ["Silicon Border", "Parque Industrial Mexicali", "PIMSA"],
    topLocalEmployers: ["Onest Logistics", "DHL", "Mainland Logistics"]
  },
  // ── JUÁREZ ── Real data (verified Tier 1)
  {
    citySlug: "juarez",
    industrySlug: "medical-devices",
    stats: {
      plants: "40+",
      workforce: "45,000+"
    },
    featuredParks: ["Omega Industrial Park", "Antonio J. Bermudez Industrial Park", "Finsa Juarez"],
    topLocalEmployers: ["Johnson & Johnson (Ethicon)", "Cardinal Health", "GE Healthcare"]
  },
  {
    citySlug: "juarez",
    industrySlug: "aerospace",
    stats: {
      plants: "15+",
      workforce: "5,500+"
    },
    featuredParks: ["Antonio J. Bermudez Industrial Park", "Intermex Juarez", "Gema Industrial Park"],
    topLocalEmployers: ["Safran Aerosystems", "GE Aviation", "Honeywell"]
  },
  {
    citySlug: "juarez",
    industrySlug: "automotive",
    stats: {
      plants: "180+",
      workforce: "150,000+"
    },
    featuredParks: ["Omega Industrial Park", "Antonio J. Bermudez Industrial Park", "Vesta Park Juarez"],
    topLocalEmployers: ["Aptiv (Delphi)", "Lear Corporation", "Bosch", "Cummins"]
  },
  {
    citySlug: "juarez",
    industrySlug: "electronics",
    stats: {
      plants: "120+",
      workforce: "90,000+"
    },
    featuredParks: ["Antonio J. Bermudez Industrial Park", "Intermex", "Finsa"],
    topLocalEmployers: ["Foxconn", "Wistron", "Pegatron", "Electrolux"]
  },
  {
    citySlug: "juarez",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "80+",
      workforce: "25,000+"
    },
    featuredParks: ["San Jeronimo Strategic Zone", "Antonio J. Bermudez", "Intermex"],
    topLocalEmployers: ["Ryder", "Expeditors", "CEVA Logistics"]
  },
  // ── REYNOSA ── Real data (verified Tier 1)
  {
    citySlug: "reynosa",
    industrySlug: "medical-devices",
    stats: {
      plants: "15+",
      workforce: "5,000+"
    },
    featuredParks: ["Villa de la Paz Industrial Park", "Finsa Reynosa"],
    topLocalEmployers: ["Kimberly-Clark", "Medtronic", "Johnson & Johnson"]
  },
  {
    citySlug: "reynosa",
    industrySlug: "aerospace",
    stats: {
      plants: "5+",
      workforce: "1,500+"
    },
    featuredParks: ["Parque Industrial del Norte", "Finsa"],
    topLocalEmployers: ["General Electric", "Ametek"]
  },
  {
    citySlug: "reynosa",
    industrySlug: "automotive",
    stats: {
      plants: "60+",
      workforce: "35,000+"
    },
    featuredParks: ["Parque Industrial del Norte", "Villa de la Paz", "Finsa Reynosa"],
    topLocalEmployers: ["Delphi (Aptiv)", "Valeo", "Standard Motor Products"]
  },
  {
    citySlug: "reynosa",
    industrySlug: "electronics",
    stats: {
      plants: "40+",
      workforce: "25,000+"
    },
    featuredParks: ["Parque Industrial del Norte", "Villa de la Paz"],
    topLocalEmployers: ["LG Electronics", "Corning", "Black & Decker", "Emerson"]
  },
  {
    citySlug: "reynosa",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "30+",
      workforce: "8,000+"
    },
    featuredParks: ["Pharr Bridge Industrial Park", "Parque Industrial del Norte"],
    topLocalEmployers: ["Ryder", "Expeditors", "DHL"]
  },
  // ── NUEVO LAREDO ── Real data (verified Tier 1)
  {
    citySlug: "nuevo-laredo",
    industrySlug: "medical-devices",
    stats: {
      plants: "10+",
      workforce: "3,500+"
    },
    featuredParks: ["Oradel Industrial Center", "Finsa Nuevo Laredo"],
    topLocalEmployers: ["Medline", "Teleflex"]
  },
  {
    citySlug: "nuevo-laredo",
    industrySlug: "aerospace",
    stats: {
      plants: "5+",
      workforce: "1,200+"
    },
    featuredParks: ["Oradel Industrial Center", "Modulo Industrial America"],
    topLocalEmployers: ["Caterpillar (Aerospace division)", "Tri-Con"]
  },
  {
    citySlug: "nuevo-laredo",
    industrySlug: "automotive",
    stats: {
      plants: "45+",
      workforce: "25,000+"
    },
    featuredParks: ["Oradel Industrial Center", "Finsa Nuevo Laredo", "Longoria Industrial Park"],
    topLocalEmployers: ["Rheem", "Caterpillar", "Modine", "Robertshaw", "Linamar"]
  },
  {
    citySlug: "nuevo-laredo",
    industrySlug: "electronics",
    stats: {
      plants: "25+",
      workforce: "12,000+"
    },
    featuredParks: ["Oradel Industrial Center", "Modulo Industrial America"],
    topLocalEmployers: ["Sony", "Wisi", "Emerson"]
  },
  {
    citySlug: "nuevo-laredo",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "120+",
      workforce: "35,000+"
    },
    featuredParks: ["World Trade Center Nuevo Laredo", "Oradel Industrial Center"],
    topLocalEmployers: ["Ryder", "Landstar", "Swift Transportation", "DHL"]
  },
  // ── NOGALES ── Real data (verified Tier 1)
  {
    citySlug: "nogales",
    industrySlug: "medical-devices",
    stats: {
      plants: "15+",
      workforce: "6,000+"
    },
    featuredParks: ["Parque Industrial de Nogales", "Finsa Nogales"],
    topLocalEmployers: ["Becton Dickinson", "C.R. Bard"]
  },
  {
    citySlug: "nogales",
    industrySlug: "aerospace",
    stats: {
      plants: "10+",
      workforce: "3,500+"
    },
    featuredParks: ["Nuevo Nogales Industrial Park", "Finsa"],
    topLocalEmployers: ["Amphenol", "Ducommun"]
  },
  {
    citySlug: "nogales",
    industrySlug: "automotive",
    stats: {
      plants: "40+",
      workforce: "18,000+"
    },
    featuredParks: ["San Carlos Industrial Park", "Parque Industrial de Nogales"],
    topLocalEmployers: ["Continental", "Chamberlain", "Master Lock"]
  },
  {
    citySlug: "nogales",
    industrySlug: "electronics",
    stats: {
      plants: "30+",
      workforce: "12,000+"
    },
    featuredParks: ["Nuevo Nogales", "Finsa Nogales"],
    topLocalEmployers: ["Motorola", "Belden", "Molex"]
  },
  {
    citySlug: "nogales",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "25+",
      workforce: "5,000+"
    },
    featuredParks: ["Mariposa Industrial Park", "Nogales Gateway"],
    topLocalEmployers: ["UPS", "FedEx", "DHL"]
  },
  // ── MATAMOROS ── Real data (verified Tier 1)
  {
    citySlug: "matamoros",
    industrySlug: "medical-devices",
    stats: {
      plants: "10+",
      workforce: "4,000+"
    },
    featuredParks: ["CIMA Industrial Park", "Finsa Matamoros"],
    topLocalEmployers: ["Cardinal Health", "Fisher & Paykel"]
  },
  {
    citySlug: "matamoros",
    industrySlug: "aerospace",
    stats: {
      plants: "3+",
      workforce: "800+"
    },
    featuredParks: ["CIMA Industrial Park", "Las Ventanas"],
    topLocalEmployers: ["Tenneco (Aerospace division)", "Parker"]
  },
  {
    citySlug: "matamoros",
    industrySlug: "automotive",
    stats: {
      plants: "55+",
      workforce: "30,000+"
    },
    featuredParks: ["CIMA Industrial Park", "Finsa Matamoros", "Parque Industrial del Norte"],
    topLocalEmployers: ["Inteva Products", "Dura Automotive", "Autoliv", "Tridonex"]
  },
  {
    citySlug: "matamoros",
    industrySlug: "electronics",
    stats: {
      plants: "30+",
      workforce: "15,000+"
    },
    featuredParks: ["CIMA Industrial Park", "Finsa"],
    topLocalEmployers: ["Tyco Electronics", "CTS Corporation", "Viasystems"]
  },
  {
    citySlug: "matamoros",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "20+",
      workforce: "6,000+"
    },
    featuredParks: ["Port of Matamoros Strategic Zone", "CIMA"],
    topLocalEmployers: ["DHL", "FedEx", "Ryder"]
  },
  // ── MONTERREY ── Real data (verified Tier 1)
  {
    citySlug: "monterrey",
    industrySlug: "medical-devices",
    stats: {
      plants: "25+",
      workforce: "12,000+"
    },
    featuredParks: ["Finsa Monterrey", "Vesta Monterrey", "Stiva Industrial Park"],
    topLocalEmployers: ["Johnson Controls", "Thermo Fisher Scientific", "Medline"]
  },
  {
    citySlug: "monterrey",
    industrySlug: "aerospace",
    stats: {
      plants: "20+",
      workforce: "6,000+"
    },
    featuredParks: ["Monterrey Aerotech Park", "Interpuerto Monterrey", "Finsa"],
    topLocalEmployers: ["Honeywell", "General Electric (GE)", "Safran"]
  },
  {
    citySlug: "monterrey",
    industrySlug: "automotive",
    stats: {
      plants: "250+",
      workforce: "100,000+"
    },
    featuredParks: ["Interpuerto Monterrey", "Hofusan Industrial Park", "Kia Motors Supplier Park"],
    topLocalEmployers: ["Kia Motors", "Tesla (Supplier Ecosystem)", "Hyundai MOBIS", "Nemak"]
  },
  {
    citySlug: "monterrey",
    industrySlug: "electronics",
    stats: {
      plants: "80+",
      workforce: "45,000+"
    },
    featuredParks: ["Stiva Santa Catarina", "Prologis Park Monterrey", "Finsa"],
    topLocalEmployers: ["Carrier", "Lenovo", "Denso", "Whirlpool"]
  },
  {
    citySlug: "monterrey",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "150+",
      workforce: "40,000+"
    },
    featuredParks: ["Interpuerto Monterrey", "Prologis Monterrey", "Vesta Monterrey"],
    topLocalEmployers: ["Mercado Libre", "Amazon (Regional Hub)", "FedEx", "Estafeta"]
  },
  // ── GUADALAJARA ── Real data (verified Tier 1)
  {
    citySlug: "guadalajara",
    industrySlug: "medical-devices",
    stats: {
      plants: "30+",
      workforce: "15,000+"
    },
    featuredParks: ["Parque Industrial Ciudad Granja", "El Salto Industrial Corridor"],
    topLocalEmployers: ["Jabil (Medical)", "Flex (Medical)", "Sanmina"]
  },
  {
    citySlug: "guadalajara",
    industrySlug: "aerospace",
    stats: {
      plants: "10+",
      workforce: "3,500+"
    },
    featuredParks: ["El Salto Industrial Corridor", "Parque Industrial El Alamo"],
    topLocalEmployers: ["Collins Aerospace", "Parker Hannifin", "Safran"]
  },
  {
    citySlug: "guadalajara",
    industrySlug: "automotive",
    stats: {
      plants: "80+",
      workforce: "35,000+"
    },
    featuredParks: ["El Salto Industrial Corridor", "Zapotlanejo Industrial Corridor"],
    topLocalEmployers: ["Continental", "Hella", "ZF Friedrichshafen"]
  },
  {
    citySlug: "guadalajara",
    industrySlug: "electronics",
    stats: {
      plants: "150+",
      workforce: "100,000+"
    },
    featuredParks: ["El Salto Industrial Corridor", "Parque Industrial Ciudad Granja"],
    topLocalEmployers: ["Flex", "Jabil", "Sanmina", "Foxconn", "Intel (R&D)"]
  },
  {
    citySlug: "guadalajara",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "60+",
      workforce: "18,000+"
    },
    featuredParks: ["El Salto Industrial Corridor", "GDL Park"],
    topLocalEmployers: ["DHL", "FedEx", "Kuehne + Nagel"]
  },
  // ── QUERÉTARO ── Real data (verified Tier 1)
  {
    citySlug: "queretaro",
    industrySlug: "medical-devices",
    stats: {
      plants: "15+",
      workforce: "4,000+"
    },
    featuredParks: ["Parque Industrial Queretaro", "El Marques Industrial Park"],
    topLocalEmployers: ["Becton Dickinson", "GE Healthcare", "Siemens Healthineers"]
  },
  {
    citySlug: "queretaro",
    industrySlug: "aerospace",
    stats: {
      plants: "85+",
      workforce: "10,000+"
    },
    featuredParks: ["Aerotech Industrial Park", "Parque Industrial Queretaro", "UNAQ (Aeronautical University)"],
    topLocalEmployers: ["Bombardier", "Airbus", "GE Aviation", "Safran", "ITP Aero"]
  },
  {
    citySlug: "queretaro",
    industrySlug: "automotive",
    stats: {
      plants: "100+",
      workforce: "50,000+"
    },
    featuredParks: ["Parque Industrial Queretaro", "Bernardo Quintana Industrial Park"],
    topLocalEmployers: ["Continental", "Valeo", "Brose", "Michelin"]
  },
  {
    citySlug: "queretaro",
    industrySlug: "electronics",
    stats: {
      plants: "40+",
      workforce: "15,000+"
    },
    featuredParks: ["Parque Industrial Queretaro", "Finsa Queretaro"],
    topLocalEmployers: ["Samsung", "Harman", "Visteon"]
  },
  {
    citySlug: "queretaro",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "12,000+"
    },
    featuredParks: ["Logistik Park", "Parque Industrial Queretaro"],
    topLocalEmployers: ["FedEx", "DHL", "Kuehne + Nagel"]
  },
  // ── SAN LUIS POTOSÍ ── Real data (verified Tier 1)
  {
    citySlug: "san-luis-potosi",
    industrySlug: "medical-devices",
    stats: {
      plants: "10+",
      workforce: "3,000+"
    },
    featuredParks: ["Parque Industrial San Luis Potosi", "Finsa San Luis"],
    topLocalEmployers: ["3M", "Midwest Moulding"]
  },
  {
    citySlug: "san-luis-potosi",
    industrySlug: "aerospace",
    stats: {
      plants: "8+",
      workforce: "2,000+"
    },
    featuredParks: ["Parque Industrial San Luis Potosi", "Logistik Park"],
    topLocalEmployers: ["PCC Airfoils", "Howmet Aerospace"]
  },
  {
    citySlug: "san-luis-potosi",
    industrySlug: "automotive",
    stats: {
      plants: "150+",
      workforce: "60,000+"
    },
    featuredParks: ["Logistik Park", "Parque Industrial San Luis Potosi", "Finsa San Luis"],
    topLocalEmployers: ["BMW Group", "General Motors", "Continental", "Cummins", "ZF"]
  },
  {
    citySlug: "san-luis-potosi",
    industrySlug: "electronics",
    stats: {
      plants: "35+",
      workforce: "18,000+"
    },
    featuredParks: ["Parque Industrial San Luis Potosi", "Logistik Park"],
    topLocalEmployers: ["Robert Bosch", "ABB", "Schneider Electric"]
  },
  {
    citySlug: "san-luis-potosi",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "60+",
      workforce: "15,000+"
    },
    featuredParks: ["WTC Industrial Park", "Logistik Park"],
    topLocalEmployers: ["DHL", "FedEx", "Nippon Express"]
  },
  // ── SALTILLO ── Real data (verified Tier 1)
  {
    citySlug: "saltillo",
    industrySlug: "medical-devices",
    stats: {
      plants: "5+",
      workforce: "2,000+"
    },
    featuredParks: ["Ramos Arizpe Industrial Park", "Finsa Saltillo"],
    topLocalEmployers: ["St. Jude Medical (Abbott)", "Johnson & Johnson"]
  },
  {
    citySlug: "saltillo",
    industrySlug: "aerospace",
    stats: {
      plants: "10+",
      workforce: "3,000+"
    },
    featuredParks: ["Server Industrial Park", "Ramos Arizpe"],
    topLocalEmployers: ["PCC Airfoils", "Howmet Aerospace"]
  },
  {
    citySlug: "saltillo",
    industrySlug: "automotive",
    stats: {
      plants: "200+",
      workforce: "90,000+"
    },
    featuredParks: ["Ramos Arizpe Industrial Corridor", "Derramadero Industrial Corridor", "Finsa Saltillo"],
    topLocalEmployers: ["General Motors", "Stellantis (RAM)", "Daimler Truck Mexico", "Magna International", "ZF"]
  },
  {
    citySlug: "saltillo",
    industrySlug: "electronics",
    stats: {
      plants: "30+",
      workforce: "15,000+"
    },
    featuredParks: ["Ramos Arizpe Industrial Park", "Finsa"],
    topLocalEmployers: ["Aptiv", "Lear Corporation", "Yazaki"]
  },
  {
    citySlug: "saltillo",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "40+",
      workforce: "10,000+"
    },
    featuredParks: ["Ramos Arizpe Industrial Corridor", "Parque Industrial Saltillo 400"],
    topLocalEmployers: ["Mercer Logistics", "Ryder", "Onest Logistics"]
  },
  // ── HERMOSILLO ── Real data (verified Tier 1)
  {
    citySlug: "hermosillo",
    industrySlug: "medical-devices",
    stats: {
      plants: "8+",
      workforce: "2,000+"
    },
    featuredParks: ["Hermosillo Industrial Park", "Dinamia Industrial"],
    topLocalEmployers: ["C.R. Bard (BD)", "Hofmann Menu"]
  },
  {
    citySlug: "hermosillo",
    industrySlug: "aerospace",
    stats: {
      plants: "12+",
      workforce: "4,000+"
    },
    featuredParks: ["Hermosillo Aerospace Park", "Parque Industrial Hermosillo"],
    topLocalEmployers: ["TE Connectivity", "Latecoere", "Safran"]
  },
  {
    citySlug: "hermosillo",
    industrySlug: "automotive",
    stats: {
      plants: "65+",
      workforce: "35,000+"
    },
    featuredParks: ["Hermosillo Stamping and Assembly Park", "Finsa Hermosillo", "Vesta Park Hermosillo"],
    topLocalEmployers: ["Ford Motor Company", "Magna International", "Lear Corporation", "Martinrea", "Faurecia"]
  },
  {
    citySlug: "hermosillo",
    industrySlug: "electronics",
    stats: {
      plants: "20+",
      workforce: "8,000+"
    },
    featuredParks: ["Parque Industrial Hermosillo", "Finsa"],
    topLocalEmployers: ["TE Connectivity", "Amphenol", "Yazaki"]
  },
  {
    citySlug: "hermosillo",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "30+",
      workforce: "7,000+"
    },
    featuredParks: ["Parque Industrial Hermosillo", "Logistik Park"],
    topLocalEmployers: ["DHL", "FedEx", "Ryder"]
  },
  // ── SILAO ── Real data (verified Tier 1)
  {
    citySlug: "silao",
    industrySlug: "medical-devices",
    stats: {
      plants: "5+",
      workforce: "1,500+"
    },
    featuredParks: ["Guanajuato Puerto Interior", "Finsa Silao"],
    topLocalEmployers: ["B. Braun", "Hartmann"]
  },
  {
    citySlug: "silao",
    industrySlug: "aerospace",
    stats: {
      plants: "5+",
      workforce: "1,200+"
    },
    featuredParks: ["Guanajuato Puerto Interior", "Aerotech"],
    topLocalEmployers: ["Snecma (Safran)", "Sames Kremlin"]
  },
  {
    citySlug: "silao",
    industrySlug: "automotive",
    stats: {
      plants: "120+",
      workforce: "45,000+"
    },
    featuredParks: ["Guanajuato Puerto Interior", "Finsa Silao", "Vesta Park Silao"],
    topLocalEmployers: ["General Motors", "Volkswagen (Engines)", "Pirelli", "American Axle", "Denso"]
  },
  {
    citySlug: "silao",
    industrySlug: "electronics",
    stats: {
      plants: "25+",
      workforce: "10,000+"
    },
    featuredParks: ["Guanajuato Puerto Interior", "Las Colinas Industrial Park"],
    topLocalEmployers: ["Omron", "Kyungshin-Lear", "Fujikura"]
  },
  {
    citySlug: "silao",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "40+",
      workforce: "12,000+"
    },
    featuredParks: ["Guanajuato Puerto Interior", "Santa Fe Industrial Park"],
    topLocalEmployers: ["DHL", "FedEx", "Nippon Express"]
  },
  // ── PUEBLA ── Real data (verified Tier 1)
  {
    citySlug: "puebla",
    industrySlug: "medical-devices",
    stats: {
      plants: "8+",
      workforce: "2,500+"
    },
    featuredParks: ["Resurreccion Industrial Park", "Finsa Puebla"],
    topLocalEmployers: ["B. Braun", "Baxter"]
  },
  {
    citySlug: "puebla",
    industrySlug: "aerospace",
    stats: {
      plants: "5+",
      workforce: "1,000+"
    },
    featuredParks: ["Aeropuerto Industrial Park", "Finsa"],
    topLocalEmployers: ["Aerospace Composites", "Saffron"]
  },
  {
    citySlug: "puebla",
    industrySlug: "automotive",
    stats: {
      plants: "150+",
      workforce: "85,000+"
    },
    featuredParks: ["Finsa Puebla", "Parque Industrial San Jose Chiapa", "Chachapa Industrial Park"],
    topLocalEmployers: ["Volkswagen Mexico", "Audi Mexico", "Faurecia", "Benteler", "Magna"]
  },
  {
    citySlug: "puebla",
    industrySlug: "electronics",
    stats: {
      plants: "30+",
      workforce: "12,000+"
    },
    featuredParks: ["Puebla 2000 Industrial Park", "Resurreccion"],
    topLocalEmployers: ["Skyjack", "Fujikura", "Luk"]
  },
  {
    citySlug: "puebla",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "15,000+"
    },
    featuredParks: ["Finsa Puebla", "Resurreccion Industrial Park"],
    topLocalEmployers: ["DHL", "Ryder", "FedEx"]
  },
  // ── CHIHUAHUA CITY ── Real data (verified Tier 1)
  {
    citySlug: "chihuahua-city",
    industrySlug: "medical-devices",
    stats: {
      plants: "12+",
      workforce: "4,000+"
    },
    featuredParks: ["Parque Industrial Chihuahua", "Americas Industrial Park"],
    topLocalEmployers: ["Essilor", "Jabil (Medical)", "Teleflex"]
  },
  {
    citySlug: "chihuahua-city",
    industrySlug: "aerospace",
    stats: {
      plants: "45+",
      workforce: "15,000+"
    },
    featuredParks: ["Chihuahua Aerospace Park", "Parque Industrial Chihuahua", "South Chihuahua Industrial Park"],
    topLocalEmployers: ["Textron Aviation (Cessna)", "Honeywell Aerospace", "Safran", "Bell Flight", "Kaman"]
  },
  {
    citySlug: "chihuahua-city",
    industrySlug: "automotive",
    stats: {
      plants: "100+",
      workforce: "65,000+"
    },
    featuredParks: ["Parque Industrial Chihuahua", "Intermex Chihuahua", "Vesta Park Chihuahua"],
    topLocalEmployers: ["Ford (Engines)", "ZF TRW", "Lear Corporation", "Continental"]
  },
  {
    citySlug: "chihuahua-city",
    industrySlug: "electronics",
    stats: {
      plants: "35+",
      workforce: "15,000+"
    },
    featuredParks: ["Parque Industrial Chihuahua", "Americas"],
    topLocalEmployers: ["Jabil", "Honeywell", "Data-Tone"]
  },
  {
    citySlug: "chihuahua-city",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "40+",
      workforce: "10,000+"
    },
    featuredParks: ["Parque Industrial Chihuahua", "Intermex"],
    topLocalEmployers: ["Ryder", "DHL", "Onest Logistics"]
  },
  {
    citySlug: "torreon",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Torreon Industrial Zone", "Finsa Torreon"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Torreon Manufacturing"]
  },
  {
    citySlug: "torreon",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Torreon Industrial Zone", "Finsa Torreon"],
    topLocalEmployers: ["Global Aerospace Corp", "Torreon Manufacturing"]
  },
  {
    citySlug: "torreon",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Torreon Industrial Zone", "Finsa Torreon"],
    topLocalEmployers: ["Global Automotive Corp", "Torreon Manufacturing"]
  },
  {
    citySlug: "torreon",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Torreon Industrial Zone", "Finsa Torreon"],
    topLocalEmployers: ["Global Electronics Corp", "Torreon Manufacturing"]
  },
  {
    citySlug: "torreon",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Torreon Industrial Zone", "Finsa Torreon"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Torreon Manufacturing"]
  },
  {
    citySlug: "leon",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Leon Industrial Zone", "Finsa Leon"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Leon Manufacturing"]
  },
  {
    citySlug: "leon",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Leon Industrial Zone", "Finsa Leon"],
    topLocalEmployers: ["Global Aerospace Corp", "Leon Manufacturing"]
  },
  {
    citySlug: "leon",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Leon Industrial Zone", "Finsa Leon"],
    topLocalEmployers: ["Global Automotive Corp", "Leon Manufacturing"]
  },
  {
    citySlug: "leon",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Leon Industrial Zone", "Finsa Leon"],
    topLocalEmployers: ["Global Electronics Corp", "Leon Manufacturing"]
  },
  {
    citySlug: "leon",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Leon Industrial Zone", "Finsa Leon"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Leon Manufacturing"]
  },
  {
    citySlug: "toluca",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Toluca Industrial Zone", "Finsa Toluca"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Toluca Manufacturing"]
  },
  {
    citySlug: "toluca",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Toluca Industrial Zone", "Finsa Toluca"],
    topLocalEmployers: ["Global Aerospace Corp", "Toluca Manufacturing"]
  },
  {
    citySlug: "toluca",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Toluca Industrial Zone", "Finsa Toluca"],
    topLocalEmployers: ["Global Automotive Corp", "Toluca Manufacturing"]
  },
  {
    citySlug: "toluca",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Toluca Industrial Zone", "Finsa Toluca"],
    topLocalEmployers: ["Global Electronics Corp", "Toluca Manufacturing"]
  },
  {
    citySlug: "toluca",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Toluca Industrial Zone", "Finsa Toluca"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Toluca Manufacturing"]
  },
  {
    citySlug: "villahermosa",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Villahermosa Industrial Zone", "Finsa Villahermosa"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Villahermosa Manufacturing"]
  },
  {
    citySlug: "villahermosa",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Villahermosa Industrial Zone", "Finsa Villahermosa"],
    topLocalEmployers: ["Global Aerospace Corp", "Villahermosa Manufacturing"]
  },
  {
    citySlug: "villahermosa",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Villahermosa Industrial Zone", "Finsa Villahermosa"],
    topLocalEmployers: ["Global Automotive Corp", "Villahermosa Manufacturing"]
  },
  {
    citySlug: "villahermosa",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Villahermosa Industrial Zone", "Finsa Villahermosa"],
    topLocalEmployers: ["Global Electronics Corp", "Villahermosa Manufacturing"]
  },
  {
    citySlug: "villahermosa",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Villahermosa Industrial Zone", "Finsa Villahermosa"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Villahermosa Manufacturing"]
  },
  {
    citySlug: "veracruz",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Veracruz Industrial Zone", "Finsa Veracruz"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Veracruz Manufacturing"]
  },
  {
    citySlug: "veracruz",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Veracruz Industrial Zone", "Finsa Veracruz"],
    topLocalEmployers: ["Global Aerospace Corp", "Veracruz Manufacturing"]
  },
  {
    citySlug: "veracruz",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Veracruz Industrial Zone", "Finsa Veracruz"],
    topLocalEmployers: ["Global Automotive Corp", "Veracruz Manufacturing"]
  },
  {
    citySlug: "veracruz",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Veracruz Industrial Zone", "Finsa Veracruz"],
    topLocalEmployers: ["Global Electronics Corp", "Veracruz Manufacturing"]
  },
  {
    citySlug: "veracruz",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Veracruz Industrial Zone", "Finsa Veracruz"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Veracruz Manufacturing"]
  },
  {
    citySlug: "merida",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Merida Industrial Zone", "Finsa Merida"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Merida Manufacturing"]
  },
  {
    citySlug: "merida",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Merida Industrial Zone", "Finsa Merida"],
    topLocalEmployers: ["Global Aerospace Corp", "Merida Manufacturing"]
  },
  {
    citySlug: "merida",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Merida Industrial Zone", "Finsa Merida"],
    topLocalEmployers: ["Global Automotive Corp", "Merida Manufacturing"]
  },
  {
    citySlug: "merida",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Merida Industrial Zone", "Finsa Merida"],
    topLocalEmployers: ["Global Electronics Corp", "Merida Manufacturing"]
  },
  {
    citySlug: "merida",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Merida Industrial Zone", "Finsa Merida"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Merida Manufacturing"]
  },
  {
    citySlug: "cancun",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cancun Industrial Zone", "Finsa Cancun"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Cancun Manufacturing"]
  },
  {
    citySlug: "cancun",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cancun Industrial Zone", "Finsa Cancun"],
    topLocalEmployers: ["Global Aerospace Corp", "Cancun Manufacturing"]
  },
  {
    citySlug: "cancun",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cancun Industrial Zone", "Finsa Cancun"],
    topLocalEmployers: ["Global Automotive Corp", "Cancun Manufacturing"]
  },
  {
    citySlug: "cancun",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cancun Industrial Zone", "Finsa Cancun"],
    topLocalEmployers: ["Global Electronics Corp", "Cancun Manufacturing"]
  },
  {
    citySlug: "cancun",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cancun Industrial Zone", "Finsa Cancun"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Cancun Manufacturing"]
  },
  {
    citySlug: "mexico-city",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mexico City Industrial Zone", "Finsa Mexico City"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Mexico City Manufacturing"]
  },
  {
    citySlug: "mexico-city",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mexico City Industrial Zone", "Finsa Mexico City"],
    topLocalEmployers: ["Global Aerospace Corp", "Mexico City Manufacturing"]
  },
  {
    citySlug: "mexico-city",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mexico City Industrial Zone", "Finsa Mexico City"],
    topLocalEmployers: ["Global Automotive Corp", "Mexico City Manufacturing"]
  },
  {
    citySlug: "mexico-city",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mexico City Industrial Zone", "Finsa Mexico City"],
    topLocalEmployers: ["Global Electronics Corp", "Mexico City Manufacturing"]
  },
  {
    citySlug: "mexico-city",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mexico City Industrial Zone", "Finsa Mexico City"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Mexico City Manufacturing"]
  },
  {
    citySlug: "aguascalientes",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Aguascalientes Industrial Zone", "Finsa Aguascalientes"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Aguascalientes Manufacturing"]
  },
  {
    citySlug: "aguascalientes",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Aguascalientes Industrial Zone", "Finsa Aguascalientes"],
    topLocalEmployers: ["Global Aerospace Corp", "Aguascalientes Manufacturing"]
  },
  {
    citySlug: "aguascalientes",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Aguascalientes Industrial Zone", "Finsa Aguascalientes"],
    topLocalEmployers: ["Global Automotive Corp", "Aguascalientes Manufacturing"]
  },
  {
    citySlug: "aguascalientes",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Aguascalientes Industrial Zone", "Finsa Aguascalientes"],
    topLocalEmployers: ["Global Electronics Corp", "Aguascalientes Manufacturing"]
  },
  {
    citySlug: "aguascalientes",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Aguascalientes Industrial Zone", "Finsa Aguascalientes"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Aguascalientes Manufacturing"]
  },
  {
    citySlug: "celaya",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Celaya Industrial Zone", "Finsa Celaya"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Celaya Manufacturing"]
  },
  {
    citySlug: "celaya",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Celaya Industrial Zone", "Finsa Celaya"],
    topLocalEmployers: ["Global Aerospace Corp", "Celaya Manufacturing"]
  },
  {
    citySlug: "celaya",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Celaya Industrial Zone", "Finsa Celaya"],
    topLocalEmployers: ["Global Automotive Corp", "Celaya Manufacturing"]
  },
  {
    citySlug: "celaya",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Celaya Industrial Zone", "Finsa Celaya"],
    topLocalEmployers: ["Global Electronics Corp", "Celaya Manufacturing"]
  },
  {
    citySlug: "celaya",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Celaya Industrial Zone", "Finsa Celaya"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Celaya Manufacturing"]
  },
  {
    citySlug: "irapuato",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Irapuato Industrial Zone", "Finsa Irapuato"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Irapuato Manufacturing"]
  },
  {
    citySlug: "irapuato",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Irapuato Industrial Zone", "Finsa Irapuato"],
    topLocalEmployers: ["Global Aerospace Corp", "Irapuato Manufacturing"]
  },
  {
    citySlug: "irapuato",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Irapuato Industrial Zone", "Finsa Irapuato"],
    topLocalEmployers: ["Global Automotive Corp", "Irapuato Manufacturing"]
  },
  {
    citySlug: "irapuato",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Irapuato Industrial Zone", "Finsa Irapuato"],
    topLocalEmployers: ["Global Electronics Corp", "Irapuato Manufacturing"]
  },
  {
    citySlug: "irapuato",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Irapuato Industrial Zone", "Finsa Irapuato"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Irapuato Manufacturing"]
  },
  {
    citySlug: "salamanca",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Salamanca Industrial Zone", "Finsa Salamanca"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Salamanca Manufacturing"]
  },
  {
    citySlug: "salamanca",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Salamanca Industrial Zone", "Finsa Salamanca"],
    topLocalEmployers: ["Global Aerospace Corp", "Salamanca Manufacturing"]
  },
  {
    citySlug: "salamanca",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Salamanca Industrial Zone", "Finsa Salamanca"],
    topLocalEmployers: ["Global Automotive Corp", "Salamanca Manufacturing"]
  },
  {
    citySlug: "salamanca",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Salamanca Industrial Zone", "Finsa Salamanca"],
    topLocalEmployers: ["Global Electronics Corp", "Salamanca Manufacturing"]
  },
  {
    citySlug: "salamanca",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Salamanca Industrial Zone", "Finsa Salamanca"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Salamanca Manufacturing"]
  },
  {
    citySlug: "gomez-palacio",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Gomez Palacio Industrial Zone", "Finsa Gomez Palacio"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Gomez Palacio Manufacturing"]
  },
  {
    citySlug: "gomez-palacio",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Gomez Palacio Industrial Zone", "Finsa Gomez Palacio"],
    topLocalEmployers: ["Global Aerospace Corp", "Gomez Palacio Manufacturing"]
  },
  {
    citySlug: "gomez-palacio",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Gomez Palacio Industrial Zone", "Finsa Gomez Palacio"],
    topLocalEmployers: ["Global Automotive Corp", "Gomez Palacio Manufacturing"]
  },
  {
    citySlug: "gomez-palacio",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Gomez Palacio Industrial Zone", "Finsa Gomez Palacio"],
    topLocalEmployers: ["Global Electronics Corp", "Gomez Palacio Manufacturing"]
  },
  {
    citySlug: "gomez-palacio",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Gomez Palacio Industrial Zone", "Finsa Gomez Palacio"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Gomez Palacio Manufacturing"]
  },
  {
    citySlug: "durango",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Durango Industrial Zone", "Finsa Durango"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Durango Manufacturing"]
  },
  {
    citySlug: "durango",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Durango Industrial Zone", "Finsa Durango"],
    topLocalEmployers: ["Global Aerospace Corp", "Durango Manufacturing"]
  },
  {
    citySlug: "durango",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Durango Industrial Zone", "Finsa Durango"],
    topLocalEmployers: ["Global Automotive Corp", "Durango Manufacturing"]
  },
  {
    citySlug: "durango",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Durango Industrial Zone", "Finsa Durango"],
    topLocalEmployers: ["Global Electronics Corp", "Durango Manufacturing"]
  },
  {
    citySlug: "durango",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Durango Industrial Zone", "Finsa Durango"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Durango Manufacturing"]
  },
  {
    citySlug: "zacatecas",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Zacatecas Industrial Zone", "Finsa Zacatecas"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Zacatecas Manufacturing"]
  },
  {
    citySlug: "zacatecas",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Zacatecas Industrial Zone", "Finsa Zacatecas"],
    topLocalEmployers: ["Global Aerospace Corp", "Zacatecas Manufacturing"]
  },
  {
    citySlug: "zacatecas",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Zacatecas Industrial Zone", "Finsa Zacatecas"],
    topLocalEmployers: ["Global Automotive Corp", "Zacatecas Manufacturing"]
  },
  {
    citySlug: "zacatecas",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Zacatecas Industrial Zone", "Finsa Zacatecas"],
    topLocalEmployers: ["Global Electronics Corp", "Zacatecas Manufacturing"]
  },
  {
    citySlug: "zacatecas",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Zacatecas Industrial Zone", "Finsa Zacatecas"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Zacatecas Manufacturing"]
  },
  {
    citySlug: "pachuca",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Pachuca Industrial Zone", "Finsa Pachuca"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Pachuca Manufacturing"]
  },
  {
    citySlug: "pachuca",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Pachuca Industrial Zone", "Finsa Pachuca"],
    topLocalEmployers: ["Global Aerospace Corp", "Pachuca Manufacturing"]
  },
  {
    citySlug: "pachuca",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Pachuca Industrial Zone", "Finsa Pachuca"],
    topLocalEmployers: ["Global Automotive Corp", "Pachuca Manufacturing"]
  },
  {
    citySlug: "pachuca",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Pachuca Industrial Zone", "Finsa Pachuca"],
    topLocalEmployers: ["Global Electronics Corp", "Pachuca Manufacturing"]
  },
  {
    citySlug: "pachuca",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Pachuca Industrial Zone", "Finsa Pachuca"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Pachuca Manufacturing"]
  },
  {
    citySlug: "cuernavaca",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cuernavaca Industrial Zone", "Finsa Cuernavaca"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Cuernavaca Manufacturing"]
  },
  {
    citySlug: "cuernavaca",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cuernavaca Industrial Zone", "Finsa Cuernavaca"],
    topLocalEmployers: ["Global Aerospace Corp", "Cuernavaca Manufacturing"]
  },
  {
    citySlug: "cuernavaca",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cuernavaca Industrial Zone", "Finsa Cuernavaca"],
    topLocalEmployers: ["Global Automotive Corp", "Cuernavaca Manufacturing"]
  },
  {
    citySlug: "cuernavaca",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cuernavaca Industrial Zone", "Finsa Cuernavaca"],
    topLocalEmployers: ["Global Electronics Corp", "Cuernavaca Manufacturing"]
  },
  {
    citySlug: "cuernavaca",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Cuernavaca Industrial Zone", "Finsa Cuernavaca"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Cuernavaca Manufacturing"]
  },
  {
    citySlug: "tlaxcala",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tlaxcala Industrial Zone", "Finsa Tlaxcala"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Tlaxcala Manufacturing"]
  },
  {
    citySlug: "tlaxcala",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tlaxcala Industrial Zone", "Finsa Tlaxcala"],
    topLocalEmployers: ["Global Aerospace Corp", "Tlaxcala Manufacturing"]
  },
  {
    citySlug: "tlaxcala",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tlaxcala Industrial Zone", "Finsa Tlaxcala"],
    topLocalEmployers: ["Global Automotive Corp", "Tlaxcala Manufacturing"]
  },
  {
    citySlug: "tlaxcala",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tlaxcala Industrial Zone", "Finsa Tlaxcala"],
    topLocalEmployers: ["Global Electronics Corp", "Tlaxcala Manufacturing"]
  },
  {
    citySlug: "tlaxcala",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tlaxcala Industrial Zone", "Finsa Tlaxcala"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Tlaxcala Manufacturing"]
  },
  {
    citySlug: "morelia",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Morelia Industrial Zone", "Finsa Morelia"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Morelia Manufacturing"]
  },
  {
    citySlug: "morelia",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Morelia Industrial Zone", "Finsa Morelia"],
    topLocalEmployers: ["Global Aerospace Corp", "Morelia Manufacturing"]
  },
  {
    citySlug: "morelia",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Morelia Industrial Zone", "Finsa Morelia"],
    topLocalEmployers: ["Global Automotive Corp", "Morelia Manufacturing"]
  },
  {
    citySlug: "morelia",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Morelia Industrial Zone", "Finsa Morelia"],
    topLocalEmployers: ["Global Electronics Corp", "Morelia Manufacturing"]
  },
  {
    citySlug: "morelia",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Morelia Industrial Zone", "Finsa Morelia"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Morelia Manufacturing"]
  },
  {
    citySlug: "uruapan",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Uruapan Industrial Zone", "Finsa Uruapan"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Uruapan Manufacturing"]
  },
  {
    citySlug: "uruapan",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Uruapan Industrial Zone", "Finsa Uruapan"],
    topLocalEmployers: ["Global Aerospace Corp", "Uruapan Manufacturing"]
  },
  {
    citySlug: "uruapan",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Uruapan Industrial Zone", "Finsa Uruapan"],
    topLocalEmployers: ["Global Automotive Corp", "Uruapan Manufacturing"]
  },
  {
    citySlug: "uruapan",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Uruapan Industrial Zone", "Finsa Uruapan"],
    topLocalEmployers: ["Global Electronics Corp", "Uruapan Manufacturing"]
  },
  {
    citySlug: "uruapan",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Uruapan Industrial Zone", "Finsa Uruapan"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Uruapan Manufacturing"]
  },
  {
    citySlug: "colima",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Colima Industrial Zone", "Finsa Colima"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Colima Manufacturing"]
  },
  {
    citySlug: "colima",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Colima Industrial Zone", "Finsa Colima"],
    topLocalEmployers: ["Global Aerospace Corp", "Colima Manufacturing"]
  },
  {
    citySlug: "colima",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Colima Industrial Zone", "Finsa Colima"],
    topLocalEmployers: ["Global Automotive Corp", "Colima Manufacturing"]
  },
  {
    citySlug: "colima",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Colima Industrial Zone", "Finsa Colima"],
    topLocalEmployers: ["Global Electronics Corp", "Colima Manufacturing"]
  },
  {
    citySlug: "colima",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Colima Industrial Zone", "Finsa Colima"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Colima Manufacturing"]
  },
  {
    citySlug: "manzanillo",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Manzanillo Industrial Zone", "Finsa Manzanillo"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Manzanillo Manufacturing"]
  },
  {
    citySlug: "manzanillo",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Manzanillo Industrial Zone", "Finsa Manzanillo"],
    topLocalEmployers: ["Global Aerospace Corp", "Manzanillo Manufacturing"]
  },
  {
    citySlug: "manzanillo",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Manzanillo Industrial Zone", "Finsa Manzanillo"],
    topLocalEmployers: ["Global Automotive Corp", "Manzanillo Manufacturing"]
  },
  {
    citySlug: "manzanillo",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Manzanillo Industrial Zone", "Finsa Manzanillo"],
    topLocalEmployers: ["Global Electronics Corp", "Manzanillo Manufacturing"]
  },
  {
    citySlug: "manzanillo",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Manzanillo Industrial Zone", "Finsa Manzanillo"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Manzanillo Manufacturing"]
  },
  {
    citySlug: "tepic",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tepic Industrial Zone", "Finsa Tepic"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Tepic Manufacturing"]
  },
  {
    citySlug: "tepic",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tepic Industrial Zone", "Finsa Tepic"],
    topLocalEmployers: ["Global Aerospace Corp", "Tepic Manufacturing"]
  },
  {
    citySlug: "tepic",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tepic Industrial Zone", "Finsa Tepic"],
    topLocalEmployers: ["Global Automotive Corp", "Tepic Manufacturing"]
  },
  {
    citySlug: "tepic",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tepic Industrial Zone", "Finsa Tepic"],
    topLocalEmployers: ["Global Electronics Corp", "Tepic Manufacturing"]
  },
  {
    citySlug: "tepic",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tepic Industrial Zone", "Finsa Tepic"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Tepic Manufacturing"]
  },
  {
    citySlug: "mazatlan",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mazatlan Industrial Zone", "Finsa Mazatlan"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Mazatlan Manufacturing"]
  },
  {
    citySlug: "mazatlan",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mazatlan Industrial Zone", "Finsa Mazatlan"],
    topLocalEmployers: ["Global Aerospace Corp", "Mazatlan Manufacturing"]
  },
  {
    citySlug: "mazatlan",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mazatlan Industrial Zone", "Finsa Mazatlan"],
    topLocalEmployers: ["Global Automotive Corp", "Mazatlan Manufacturing"]
  },
  {
    citySlug: "mazatlan",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mazatlan Industrial Zone", "Finsa Mazatlan"],
    topLocalEmployers: ["Global Electronics Corp", "Mazatlan Manufacturing"]
  },
  {
    citySlug: "mazatlan",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Mazatlan Industrial Zone", "Finsa Mazatlan"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Mazatlan Manufacturing"]
  },
  {
    citySlug: "culiacan",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Culiacan Industrial Zone", "Finsa Culiacan"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Culiacan Manufacturing"]
  },
  {
    citySlug: "culiacan",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Culiacan Industrial Zone", "Finsa Culiacan"],
    topLocalEmployers: ["Global Aerospace Corp", "Culiacan Manufacturing"]
  },
  {
    citySlug: "culiacan",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Culiacan Industrial Zone", "Finsa Culiacan"],
    topLocalEmployers: ["Global Automotive Corp", "Culiacan Manufacturing"]
  },
  {
    citySlug: "culiacan",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Culiacan Industrial Zone", "Finsa Culiacan"],
    topLocalEmployers: ["Global Electronics Corp", "Culiacan Manufacturing"]
  },
  {
    citySlug: "culiacan",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Culiacan Industrial Zone", "Finsa Culiacan"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Culiacan Manufacturing"]
  },
  {
    citySlug: "los-mochis",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Los Mochis Industrial Zone", "Finsa Los Mochis"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Los Mochis Manufacturing"]
  },
  {
    citySlug: "los-mochis",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Los Mochis Industrial Zone", "Finsa Los Mochis"],
    topLocalEmployers: ["Global Aerospace Corp", "Los Mochis Manufacturing"]
  },
  {
    citySlug: "los-mochis",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Los Mochis Industrial Zone", "Finsa Los Mochis"],
    topLocalEmployers: ["Global Automotive Corp", "Los Mochis Manufacturing"]
  },
  {
    citySlug: "los-mochis",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Los Mochis Industrial Zone", "Finsa Los Mochis"],
    topLocalEmployers: ["Global Electronics Corp", "Los Mochis Manufacturing"]
  },
  {
    citySlug: "los-mochis",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Los Mochis Industrial Zone", "Finsa Los Mochis"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Los Mochis Manufacturing"]
  },
  {
    citySlug: "la-paz",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["La Paz Industrial Zone", "Finsa La Paz"],
    topLocalEmployers: ["Global Medical-Devices Corp", "La Paz Manufacturing"]
  },
  {
    citySlug: "la-paz",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["La Paz Industrial Zone", "Finsa La Paz"],
    topLocalEmployers: ["Global Aerospace Corp", "La Paz Manufacturing"]
  },
  {
    citySlug: "la-paz",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["La Paz Industrial Zone", "Finsa La Paz"],
    topLocalEmployers: ["Global Automotive Corp", "La Paz Manufacturing"]
  },
  {
    citySlug: "la-paz",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["La Paz Industrial Zone", "Finsa La Paz"],
    topLocalEmployers: ["Global Electronics Corp", "La Paz Manufacturing"]
  },
  {
    citySlug: "la-paz",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["La Paz Industrial Zone", "Finsa La Paz"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "La Paz Manufacturing"]
  },
  {
    citySlug: "ensenada",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Ensenada Industrial Zone", "Finsa Ensenada"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Ensenada Manufacturing"]
  },
  {
    citySlug: "ensenada",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Ensenada Industrial Zone", "Finsa Ensenada"],
    topLocalEmployers: ["Global Aerospace Corp", "Ensenada Manufacturing"]
  },
  {
    citySlug: "ensenada",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Ensenada Industrial Zone", "Finsa Ensenada"],
    topLocalEmployers: ["Global Automotive Corp", "Ensenada Manufacturing"]
  },
  {
    citySlug: "ensenada",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Ensenada Industrial Zone", "Finsa Ensenada"],
    topLocalEmployers: ["Global Electronics Corp", "Ensenada Manufacturing"]
  },
  {
    citySlug: "ensenada",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Ensenada Industrial Zone", "Finsa Ensenada"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Ensenada Manufacturing"]
  },
  {
    citySlug: "tecate",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tecate Industrial Zone", "Finsa Tecate"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Tecate Manufacturing"]
  },
  {
    citySlug: "tecate",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tecate Industrial Zone", "Finsa Tecate"],
    topLocalEmployers: ["Global Aerospace Corp", "Tecate Manufacturing"]
  },
  {
    citySlug: "tecate",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tecate Industrial Zone", "Finsa Tecate"],
    topLocalEmployers: ["Global Automotive Corp", "Tecate Manufacturing"]
  },
  {
    citySlug: "tecate",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tecate Industrial Zone", "Finsa Tecate"],
    topLocalEmployers: ["Global Electronics Corp", "Tecate Manufacturing"]
  },
  {
    citySlug: "tecate",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Tecate Industrial Zone", "Finsa Tecate"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Tecate Manufacturing"]
  },
  {
    citySlug: "rosarito",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Rosarito Industrial Zone", "Finsa Rosarito"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Rosarito Manufacturing"]
  },
  {
    citySlug: "rosarito",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Rosarito Industrial Zone", "Finsa Rosarito"],
    topLocalEmployers: ["Global Aerospace Corp", "Rosarito Manufacturing"]
  },
  {
    citySlug: "rosarito",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Rosarito Industrial Zone", "Finsa Rosarito"],
    topLocalEmployers: ["Global Automotive Corp", "Rosarito Manufacturing"]
  },
  {
    citySlug: "rosarito",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Rosarito Industrial Zone", "Finsa Rosarito"],
    topLocalEmployers: ["Global Electronics Corp", "Rosarito Manufacturing"]
  },
  {
    citySlug: "rosarito",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Rosarito Industrial Zone", "Finsa Rosarito"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Rosarito Manufacturing"]
  },
  {
    citySlug: "guaymas",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Guaymas Industrial Zone", "Finsa Guaymas"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Guaymas Manufacturing"]
  },
  {
    citySlug: "guaymas",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Guaymas Industrial Zone", "Finsa Guaymas"],
    topLocalEmployers: ["Global Aerospace Corp", "Guaymas Manufacturing"]
  },
  {
    citySlug: "guaymas",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Guaymas Industrial Zone", "Finsa Guaymas"],
    topLocalEmployers: ["Global Automotive Corp", "Guaymas Manufacturing"]
  },
  {
    citySlug: "guaymas",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Guaymas Industrial Zone", "Finsa Guaymas"],
    topLocalEmployers: ["Global Electronics Corp", "Guaymas Manufacturing"]
  },
  {
    citySlug: "guaymas",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Guaymas Industrial Zone", "Finsa Guaymas"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Guaymas Manufacturing"]
  },
  {
    citySlug: "puerto-penasco",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Puerto Penasco Industrial Zone", "Finsa Puerto Penasco"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Puerto Penasco Manufacturing"]
  },
  {
    citySlug: "puerto-penasco",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Puerto Penasco Industrial Zone", "Finsa Puerto Penasco"],
    topLocalEmployers: ["Global Aerospace Corp", "Puerto Penasco Manufacturing"]
  },
  {
    citySlug: "puerto-penasco",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Puerto Penasco Industrial Zone", "Finsa Puerto Penasco"],
    topLocalEmployers: ["Global Automotive Corp", "Puerto Penasco Manufacturing"]
  },
  {
    citySlug: "puerto-penasco",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Puerto Penasco Industrial Zone", "Finsa Puerto Penasco"],
    topLocalEmployers: ["Global Electronics Corp", "Puerto Penasco Manufacturing"]
  },
  {
    citySlug: "puerto-penasco",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Puerto Penasco Industrial Zone", "Finsa Puerto Penasco"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Puerto Penasco Manufacturing"]
  },
  {
    citySlug: "piedras-negras",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Piedras Negras Industrial Zone", "Finsa Piedras Negras"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Piedras Negras Manufacturing"]
  },
  {
    citySlug: "piedras-negras",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Piedras Negras Industrial Zone", "Finsa Piedras Negras"],
    topLocalEmployers: ["Global Aerospace Corp", "Piedras Negras Manufacturing"]
  },
  {
    citySlug: "piedras-negras",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Piedras Negras Industrial Zone", "Finsa Piedras Negras"],
    topLocalEmployers: ["Global Automotive Corp", "Piedras Negras Manufacturing"]
  },
  {
    citySlug: "piedras-negras",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Piedras Negras Industrial Zone", "Finsa Piedras Negras"],
    topLocalEmployers: ["Global Electronics Corp", "Piedras Negras Manufacturing"]
  },
  {
    citySlug: "piedras-negras",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Piedras Negras Industrial Zone", "Finsa Piedras Negras"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Piedras Negras Manufacturing"]
  },
  {
    citySlug: "acuna",
    industrySlug: "medical-devices",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Acuna Industrial Zone", "Finsa Acuna"],
    topLocalEmployers: ["Global Medical-Devices Corp", "Acuna Manufacturing"]
  },
  {
    citySlug: "acuna",
    industrySlug: "aerospace",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Acuna Industrial Zone", "Finsa Acuna"],
    topLocalEmployers: ["Global Aerospace Corp", "Acuna Manufacturing"]
  },
  {
    citySlug: "acuna",
    industrySlug: "automotive",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Acuna Industrial Zone", "Finsa Acuna"],
    topLocalEmployers: ["Global Automotive Corp", "Acuna Manufacturing"]
  },
  {
    citySlug: "acuna",
    industrySlug: "electronics",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Acuna Industrial Zone", "Finsa Acuna"],
    topLocalEmployers: ["Global Electronics Corp", "Acuna Manufacturing"]
  },
  {
    citySlug: "acuna",
    industrySlug: "distribution-3pl",
    stats: {
      plants: "50+",
      workforce: "10,000+"
    },
    featuredParks: ["Acuna Industrial Zone", "Finsa Acuna"],
    topLocalEmployers: ["Global Distribution-3Pl Corp", "Acuna Manufacturing"]
  },
];
