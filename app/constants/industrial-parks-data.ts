export interface IndustrialPark {
  id: string;
  name: string;
  city: string;
  classification: string;
  vacancyStatus: string;
  leaseRate: string;
  keyTenants: string[];
}

export const BAJA_INDUSTRIAL_PARKS: IndustrialPark[] = [
  {
    id: "pacifico-tij",
    name: "Parque Industrial Pacifico",
    city: "Tijuana",
    classification: "Class A",
    vacancyStatus: "Low (<3%)",
    leaseRate: "$0.79 – $0.85 NNN",
    keyTenants: ["Stryker", "Boeing", "Pepsi", "Legrand", "Sohnen"]
  },
  {
    id: "florido-tij",
    name: "Parque Industrial El Florido",
    city: "Tijuana",
    classification: "Class A",
    vacancyStatus: "Low (~2%)",
    leaseRate: "$0.75 – $0.82 NNN",
    keyTenants: ["Samsung", "Foxconn", "Poly", "Hyundai", "Amazon"]
  },
  {
    id: "finsa-tij",
    name: "Parque Industrial Finsa",
    city: "Tijuana",
    classification: "Class A",
    vacancyStatus: "Low (3.6%)",
    leaseRate: "$0.80 – $0.88 NNN",
    keyTenants: ["Medtronic", "Schneider Electric", "Foxconn", "Honeywell"]
  },
  {
    id: "nordika-tij",
    name: "Parque Industrial Nordika",
    city: "Tijuana",
    classification: "Class A",
    vacancyStatus: "Very Low (<2%)",
    leaseRate: "$0.78 – $0.85 NNN",
    keyTenants: ["DJO Global", "Enphase Energy", "ResMed", "Nypro"]
  },
  {
    id: "san-diego-tij",
    name: "Parque Industrial San Diego",
    city: "Tijuana (Otay)",
    classification: "Class A",
    vacancyStatus: "Low (2.5%)",
    leaseRate: "$0.82 – $0.88 NNN",
    keyTenants: ["Bose", "Panasonic", "Honeywell", "Foxconn", "Toyota"]
  },
  {
    id: "mexicali-mxl",
    name: "Parque Industrial Mexicali",
    city: "Mexicali",
    classification: "Class A",
    vacancyStatus: "Low (3–5%)",
    leaseRate: "$0.55 – $0.68 NNN",
    keyTenants: ["Gulfstream", "Collins Aerospace", "Honeywell", "Kenworth"]
  },
  {
    id: "calafia-mxl",
    name: "Parque Industrial Calafia",
    city: "Mexicali",
    classification: "Class A/B",
    vacancyStatus: "Stable",
    leaseRate: "$0.50 – $0.65 NNN",
    keyTenants: ["Intuitive Surgical", "Masimo", "Cardinal Health", "Schneider"]
  },
  {
    id: "bajamaq-tec",
    name: "Parque Industrial Baja Maq",
    city: "Tecate",
    classification: "Class B+/A-",
    vacancyStatus: "Moderate",
    leaseRate: "$0.60 – $0.75 NNN",
    keyTenants: ["Rockwell Automation", "Schlage", "Scantibodies"]
  }
];
