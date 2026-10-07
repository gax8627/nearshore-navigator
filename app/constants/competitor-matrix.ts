export type OperatingModelEntry = {
    name: string;
    model: string;
    typicalStartup: string;
    pricingStructure: string;
    bestFor: string;
    tradeOffs: string;
    reviewedAt: string;
    isOurs?: boolean;
};

export const COMPETITOR_DISCLAIMER =
    "Information is for general educational purposes only and describes common industry operating models, not any specific company. Timelines and pricing vary significantly by project, sector, facility and provider and are not guarantees or offers. Not affiliated with or endorsed by any provider.";

export const OPERATING_MODEL_MATRIX: OperatingModelEntry[] = [
    {
        name: "Standalone Mexican Entity",
        model: "Own legal entity",
        typicalStartup: "Typically 6-12 months; varies by project",
        pricingStructure: "Custom quote",
        bestFor: "Companies seeking full control and long-term, higher-volume operations",
        tradeOffs: "Requires entity setup, local compliance and HR infrastructure, and more upfront capital and management attention",
        reviewedAt: "2026-Q1",
    },
    {
        name: "Traditional Shelter Provider",
        model: "Shelter / IMMEX",
        typicalStartup: "Typically 30-90 days under a shelter model; varies by project",
        pricingStructure: "Custom quote",
        bestFor: "Companies that want to launch operations without forming a Mexican entity",
        tradeOffs: "Less direct control over administration; fee structures and contract terms vary by provider",
        reviewedAt: "2026-Q1",
    },
    {
        name: "Contract Manufacturer",
        model: "Outsourced production",
        typicalStartup: "Varies by project and capabilities",
        pricingStructure: "Custom quote",
        bestFor: "Companies that prefer to outsource production rather than run their own plant",
        tradeOffs: "Less control over processes and capacity; intellectual property and quality arrangements need careful review",
        reviewedAt: "2026-Q1",
    },
    {
        name: "Nearshore Navigator",
        model: "Advisory-led managed route",
        typicalStartup: "Typically 30-90 days depending on the project",
        pricingStructure: "Custom quote",
        bestFor: "Companies that want independent guidance on choosing and structuring an entry route",
        tradeOffs: "Advisory only: operations are delivered by third-party providers selected for the project",
        reviewedAt: "2026-Q1",
        isOurs: true,
    },
];

// Backwards-compatible alias
export const COMPETITOR_MATRIX = OPERATING_MODEL_MATRIX;
