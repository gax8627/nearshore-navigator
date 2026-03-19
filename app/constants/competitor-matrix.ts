export type CompetitorEntry = {
    name: string;
    focus: string;
    model: "Shelter" | "Managed" | "Advisory";
    strengths: string[];
    weaknesses: string[];
    speedToMarket: string;
    pricingModel: string;
};

export const COMPETITOR_MATRIX: CompetitorEntry[] = [
    {
        name: "IVEMSA",
        focus: "Comprehensive Shelter & IMMEX",
        model: "Shelter",
        strengths: ["Historical depth", "Flexibility", "Medical focus"],
        weaknesses: ["Customization takes time", "Higher overhead"],
        speedToMarket: "90-120 Days",
        pricingModel: "Percentage of payroll / Fixed Fee"
    },
    {
        name: "NAPS",
        focus: "Full Admin & Compliance Management",
        model: "Shelter",
        strengths: ["Standardized compliance", "USMCA expertise", "Scalability"],
        weaknesses: ["Less operational control", "Corporate rigidity"],
        speedToMarket: "90 Days",
        pricingModel: "All-inclusive monthly fee"
    },
    {
        name: "CPI (Collectron)",
        focus: "Fast-track Maquiladora Setup",
        model: "Shelter",
        strengths: ["Speed", "Sonora/Queretaro dominance", "Government ties"],
        weaknesses: ["Geographic concentration", "Potential hidden costs"],
        speedToMarket: "45-60 Days",
        pricingModel: "Hourly rate based on labor hours"
    },
    {
        name: "Tecma",
        focus: "Large-scale Operational Stability",
        model: "Shelter",
        strengths: ["Low turnover", "Massive footprint", "El Paso/Juarez focus"],
        weaknesses: ["Large corporate feel", "Communication gaps in large teams"],
        speedToMarket: "60-90 Days",
        pricingModel: "Fixed monthly per-employee fee"
    },
    {
        name: "Nearshore Navigator (Agile)",
        focus: "Agentic-First Hub Entry",
        model: "Managed",
        strengths: ["0 Capex Launch", "Real-time AI monitoring", "Contract Mfg agility"],
        weaknesses: ["Newer brand", "Digital-first interface"],
        speedToMarket: "15-30 Days",
        pricingModel: "Success-based / Subscription"
    }
];
