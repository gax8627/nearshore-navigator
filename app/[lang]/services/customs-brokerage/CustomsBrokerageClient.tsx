"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Globe, 
  Database, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Server, 
  BarChart3, 
  HelpCircle, 
  Zap, 
  Building2, 
  RefreshCw, 
  Truck, 
  Cpu, 
  ChevronDown, 
  ChevronUp,
  Award,
  Check,
  AlertCircle
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CustomsBrokerageClient() {
  const { t, language } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const stats = [
    { value: t('customsPage.stat1Val') || "100%", label: t('customsPage.stat1Label') || "Pedimento & Annex 24 Audit Accuracy" },
    { value: t('customsPage.stat2Val') || "25%", label: t('customsPage.stat2Label') || "Section 301 Tariff Savings on Chinese Components" },
    { value: t('customsPage.stat3Val') || "0%", label: t('customsPage.stat3Label') || "USMCA Duty Rate on Qualified Goods" },
    { value: t('customsPage.stat4Val') || "2-4 hrs", label: t('customsPage.stat4Label') || "Average Border Customs Clearance Time" },
  ];

  const pillars = [
    {
      id: "pedimentos",
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      title: t('customsPage.pillar1Title') || "Pedimentos Clearance & Border Processing",
      desc: t('customsPage.pillar1Desc') || "Complete electronic clearance for temporary (IMMEX) and definitive import/export declarations through licensed Mexican Agentes Aduanales.",
      badge: "Pedimento de Importación / Exportación",
      points: [
        t('customsPage.pillar1Point1') || "Licensed Agente Aduanal (AA) Direct Representation & Encargo Conferido",
        t('customsPage.pillar1Point2') || "VUCEM Digital Filing, COVE Verification & e-Document Archival",
        t('customsPage.pillar1Point3') || "10-Digit Tariff Classification (Fracción Arancelaria & NICO) & NOM Compliance",
        t('customsPage.pillar1Point4') || "Reconocimiento Aduanero (Border Inspection) Pre-Audit & Fast-Track Lanes"
      ]
    },
    {
      id: "annex2431",
      icon: <Database className="w-8 h-8 text-sky-400" />,
      title: t('customsPage.pillar2Title') || "Annex 24 & 31 Digital Inventory Control",
      desc: t('customsPage.pillar2Desc') || "Real-time SAT-synchronized inventory management to protect IMMEX tax exemptions and prevent retroactive VAT liabilities.",
      badge: "Anexo 24 / Anexo 31 SCCC",
      points: [
        t('customsPage.pillar2Point1') || "Anexo 24 Automated BOM Explosion & Temporal Residency Tracking (18/36 Months)",
        t('customsPage.pillar2Point2') || "Anexo 31 SCCC Credit Balance Management & Automated VAT Certification Guard",
        t('customsPage.pillar2Point3') || "Virtual Pedimentos (V1, V5, V7) for In-Country Maquiladora Transfers",
        t('customsPage.pillar2Point4') || "Quarterly Automated SAT Reconciliations & Discrepancy Audits"
      ]
    },
    {
      id: "usmca",
      icon: <Scale className="w-8 h-8 text-indigo-400" />,
      title: t('customsPage.pillar3Title') || "USMCA (T-MEC) Tariff Mitigation",
      desc: t('customsPage.pillar3Desc') || "Maximize duty savings by qualifying your products under North American trade rules of origin.",
      badge: "T-MEC Preferential Duty (0%)",
      points: [
        t('customsPage.pillar3Point1') || "Regional Value Content (RVC) Net Cost & Transaction Value Calculations",
        t('customsPage.pillar3Point2') || "Tariff Shift (Change in Tariff Classification) Determination",
        t('customsPage.pillar3Point3') || "De Minimis 7% Non-Originating Material Exception Validation",
        t('customsPage.pillar3Point4') || "USMCA Certificates of Origin (Form CBP 434) & Audit Defense"
      ]
    },
    {
      id: "section301",
      icon: <TrendingDown className="w-8 h-8 text-emerald-400" />,
      title: t('customsPage.pillar4Title') || "Section 301 China Tariff Elimination",
      desc: t('customsPage.pillar4Desc') || "Legally eliminate punitive 25% tariffs on Chinese raw materials using nearshore Mexican assembly.",
      badge: "19 CFR § 134.1 Substantial Transformation",
      points: [
        t('customsPage.pillar4Point1') || "Substantial Transformation Analysis under 19 CFR § 134.1 / 19 U.S.C. § 1304",
        t('customsPage.pillar4Point2') || "IMMEX Duty-Free Component Importation & Re-Export to the United States",
        t('customsPage.pillar4Point3') || "U.S. Customs Duty Drawback (19 U.S.C. § 1313) Recovery up to 99%",
        t('customsPage.pillar4Point4') || "Foreign Trade Zone (FTZ) & Bonded Warehouse Integration at US Ports"
      ]
    }
  ];

  const comparisonRows = [
    {
      name: t('customsPage.compRow1Name') || "Brokerage Fee & Cost Structure",
      unbundled: t('customsPage.compRow1Unbundled') || "Transparent per-pedimento fee ($150–$350 flat rate)",
      shelter: t('customsPage.compRow1Shelter') || "Bundled 15-25% payroll/administrative markup",
      inhouse: t('customsPage.compRow1InHouse') || "High fixed overhead ($180k+/yr for licensed AA team)"
    },
    {
      name: t('customsPage.compRow2Name') || "Agente Aduanal Direct Access",
      unbundled: t('customsPage.compRow2Unbundled') || "Direct contract & direct communication with licensed AA",
      shelter: t('customsPage.compRow2Shelter') || "Third-party liaison; no direct AA access",
      inhouse: t('customsPage.compRow2InHouse') || "Direct, but limited to internal headcount bandwidth"
    },
    {
      name: t('customsPage.compRow3Name') || "Annex 24 & 31 Control",
      unbundled: t('customsPage.compRow3Unbundled') || "Full company ownership & API integration to your ERP",
      shelter: t('customsPage.compRow3Shelter') || "Locked into shelter operator's proprietary system",
      inhouse: t('customsPage.compRow3InHouse') || "Full ownership, but requires expensive software licenses"
    },
    {
      name: t('customsPage.compRow4Name') || "Section 301 Tariff Elimination Strategy",
      unbundled: t('customsPage.compRow4Unbundled') || "Customized substantial transformation & USMCA analysis",
      shelter: t('customsPage.compRow4Shelter') || "Generic handling without specialized trade optimization",
      inhouse: t('customsPage.compRow4InHouse') || "Requires external trade attorney consults"
    },
    {
      name: t('customsPage.compRow5Name') || "Pedimento Processing Speed",
      unbundled: t('customsPage.compRow5Unbundled') || "Automated VUCEM pre-clearance (2-4 hours)",
      shelter: t('customsPage.compRow5Shelter') || "Batch processing delays (12-24 hours)",
      inhouse: t('customsPage.compRow5InHouse') || "Variable depending on internal staffing"
    },
    {
      name: t('customsPage.compRow6Name') || "Flexibility & Scalability",
      unbundled: t('customsPage.compRow6Unbundled') || "Unbundled: use only needed ports & services, zero lock-in",
      shelter: t('customsPage.compRow6Shelter') || "High lock-in: tied to full shelter infrastructure",
      inhouse: t('customsPage.compRow6InHouse') || "Inflexible: hard to scale up/down during volume shifts"
    }
  ];

  const faqs = [
    {
      q: t('customsPage.faq1Q') || "What is standalone unbundled customs brokerage in Mexico?",
      a: t('customsPage.faq1A') || "Standalone unbundled customs brokerage allows US companies to contract directly with licensed Mexican Agentes Aduanales and trade compliance experts without being forced to buy full-scope shelter administrative packages. You pay only for customs clearance, maintain full ownership of your Pedimentos and Annex 24/31 inventory software, and eliminate 15-25% shelter markups."
    },
    {
      q: t('customsPage.faq2Q') || "How does a Pedimento de Importación clear Mexican customs?",
      a: t('customsPage.faq2A') || "A Pedimento is the legal customs declaration submitted to Mexico's SAT (Servicio de Administración Tributaria) via VUCEM. A licensed Agente Aduanal classifies your items by tariff code (Fracción Arancelaria & NICO), calculates applicable duties or IMMEX exemptions, attaches digital invoices (COVE), and routes the shipment through border customs (such as Otay Mesa or Laredo) with electronic pre-clearance."
    },
    {
      q: t('customsPage.faq3Q') || "Why are Annex 24 and Annex 31 inventory systems legally mandatory?",
      a: t('customsPage.faq3A') || "Under Mexican tax law, IMMEX companies import raw materials temporarily without paying the 16% VAT. Annex 24 tracks raw material entry, BOM explosion, finished goods export, and legal residency periods (18 to 36 months). Annex 31 manages your VAT/IEPS credit balances with SAT. Failing to reconcile Annex 24/31 results in massive retroactive 16% VAT penalties and IMMEX suspension."
    },
    {
      q: t('customsPage.faq4Q') || "How does manufacturing in Mexico eliminate US Section 301 tariffs on Chinese goods?",
      a: t('customsPage.faq4A') || "Under U.S. Customs Substantial Transformation regulations (19 CFR § 134.1 / 19 U.S.C. § 1304), when Chinese raw materials or components undergo substantial processing, assembly, or manufacturing in Mexico under IMMEX, they transform into a new commercial product with a distinct name, character, and use. The country of origin becomes Mexico, legally eliminating the 25% Section 301 Chinese tariff upon entry into the United States."
    },
    {
      q: t('customsPage.faq5Q') || "What is required to qualify goods for 0% duty under USMCA (T-MEC)?",
      a: t('customsPage.faq5A') || "To qualify for preferential 0% USMCA tariffs, products must satisfy specific Rules of Origin—either Regional Value Content (RVC) requirements (e.g., 60-75% North American content) or Tariff Shift rules (Change in Tariff Classification). Our team conducts origin verification, prepares USMCA Certificates of Origin (Form CBP 434), and maintains audit-ready defense files for 5 years."
    },
    {
      q: t('customsPage.faq6Q') || "What is a Virtual Pedimento (V1 / V5 entry)?",
      a: t('customsPage.faq6A') || "A Virtual Pedimento allows IMMEX maquiladoras to transfer raw materials, sub-assemblies, or tooling to another IMMEX facility or supplier within Mexico without physically hauling goods back into the United States first. This eliminates thousands of dollars in cross-border freight and speeds up local supply chain integration."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950 border-b border-gray-800">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000"
            alt="Mexico Customs Brokerage & Cross-Border Logistics"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-gray-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs md:text-sm font-semibold mb-6 uppercase tracking-wider"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            {t('customsPage.badge') || "Standalone Unbundled Service"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
          >
            {t('customsPage.heroTitle') || "Customs Brokerage & Trade Compliance"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-emerald-400">
              {t('customsPage.heroTitleHighlight') || "in Mexico"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            {t('customsPage.heroSubtitle') || "Bypass bundled shelter markups. Secure direct Agente Aduanal representation, automated Pedimentos clearance, Annex 24/31 IMMEX inventory tracking, USMCA tariff mitigation, and Section 301 China tariff elimination."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="#contact-form"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {t('customsPage.ctaBtn') || "Request Customs Compliance Audit"}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#comparison"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-800/80 hover:bg-gray-800 border border-gray-700 text-gray-200 font-semibold text-base transition-all hover:border-gray-600 flex items-center justify-center gap-2"
            >
              View Service Model Comparison
            </a>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((st, i) => (
              <div
                key={i}
                className="p-5 bg-gray-900/60 rounded-xl border border-gray-800/80 backdrop-blur-sm text-left hover:border-blue-500/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">{st.value}</div>
                <div className="text-xs sm:text-sm text-gray-400 leading-snug">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Unbundled Trade Compliance & Customs Pillars
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Direct, specialized customs solutions designed for US manufacturers, maquiladoras, and cross-border shippers operating across Baja California and Mexico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-gray-800/80 rounded-xl border border-gray-700">{p.icon}</div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800/50">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{p.desc}</p>
                
                <ul className="space-y-3 mb-6">
                  {p.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-blue-400 font-semibold uppercase tracking-wider">
                <span>Verified SAT & CBP Protocol</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deep-Dive Technical Detail Banners */}
      <section className="py-16 bg-gray-900/40 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <TrendingDown className="w-4 h-4" /> Section 301 China Tariff Elimination
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                How Mexico Assembly Eliminates 25% Section 301 Tariffs
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
                Under U.S. Customs Substantial Transformation doctrine (<code className="text-emerald-300 font-mono text-xs px-1.5 py-0.5 bg-gray-800 rounded">19 CFR § 134.1</code> & <code className="text-emerald-300 font-mono text-xs px-1.5 py-0.5 bg-gray-800 rounded">19 U.S.C. § 1304</code>), Chinese origin raw materials or components imported into Mexico under an IMMEX program undergo complex manufacturing or sub-assembly.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
                When the processing results in a article with a new name, character, and commercial utility, the legal Country of Origin shifts from China to Mexico. Upon entry into the U.S. port of entry (such as Otay Mesa or El Paso), the goods enter legally without the punitive 25% Section 301 Chinese tariff.
              </p>
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-4">
                <Award className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div className="text-xs text-gray-300">
                  <span className="font-bold text-white block mb-0.5">Audit-Proof Binding Rulings</span>
                  Nearshore Navigator assists clients in filing formal U.S. Customs CBP Binding Rulings (HQ/NY Rulings) to guarantee Section 301 tariff elimination before production scale-up.
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                Annex 24 & Annex 31 Compliance Checklist
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-lg bg-gray-950/80 border border-gray-800">
                  <span className="font-bold text-sky-300 block mb-1">Anexo 24: Temporal Residency Control</span>
                  Tracks raw materials, components, and tooling. Monitored strictly against Article 108 of the Ley Aduanera (18-month standard / 36-month certified residency limit).
                </div>
                <div className="p-4 rounded-lg bg-gray-950/80 border border-gray-800">
                  <span className="font-bold text-sky-300 block mb-1">Anexo 31: SCCC VAT Credit Balance</span>
                  Automated weekly reconciliation with SAT to protect your 16% VAT exemption on temporal imports and prevent retroactive tax assessments.
                </div>
                <div className="p-4 rounded-lg bg-gray-950/80 border border-gray-800">
                  <span className="font-bold text-sky-300 block mb-1">Virtual Pedimentos (V1, V5, V7)</span>
                  Enables zero-border freight transfers of raw materials and sub-assemblies between maquiladoras inside Mexico.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Comparison Table */}
      <section id="comparison" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('customsPage.compTitle') || "Customs Brokerage Model Comparison"}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            {t('customsPage.compSubtitle') || "Compare standalone unbundled customs brokerage against legacy shelter packages and in-house compliance."}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/60 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900 text-xs sm:text-sm text-gray-300 uppercase tracking-wider">
                <th className="py-5 px-6 font-bold w-1/4">{t('customsPage.compHeaderFeature') || "Operational Feature"}</th>
                <th className="py-5 px-6 font-bold text-blue-400 bg-blue-950/40 border-x border-blue-900/50 w-1/3">
                  {t('customsPage.compHeaderUnbundled') || "Standalone Unbundled Brokerage"}
                </th>
                <th className="py-5 px-6 font-bold text-gray-300 w-1/4">{t('customsPage.compHeaderShelter') || "Traditional Shelter Service Bundle"}</th>
                <th className="py-5 px-6 font-bold text-gray-300 w-1/4">{t('customsPage.compHeaderInHouse') || "In-House Compliance Team"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 text-xs sm:text-sm text-gray-300">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-900/40 transition-colors">
                  <td className="py-5 px-6 font-semibold text-white">{row.name}</td>
                  <td className="py-5 px-6 bg-blue-950/20 border-x border-blue-900/30 font-medium text-blue-200">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{row.unbundled}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-gray-400">{row.shelter}</td>
                  <td className="py-5 px-6 text-gray-400">{row.inhouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-20 bg-gray-900/40 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('customsPage.faqTitle') || "Mexico Customs & Compliance FAQ"}
            </h2>
            <p className="text-gray-400 text-base">
              Expert answers regarding Pedimentos clearance, Annex 24/31 IMMEX rules, USMCA qualification, and Section 301 tariff elimination.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden transition-colors hover:border-gray-700"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-white hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-gray-800/60">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal Navigation / Related Services & Locations Links */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-8 text-center sm:text-left">
          Explore Related Nearshore Services & Key Manufacturing Locations
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href={`/${language}/services/contract-manufacturing-tijuana`}
            className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="text-blue-400 font-bold text-lg mb-2 group-hover:text-blue-300">
              Contract Manufacturing &rarr;
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              ISO 13485 medical & AS9100 aerospace contract manufacturing in Tijuana and Baja California.
            </p>
          </Link>

          <Link
            href={`/${language}/services/distribution-centers-tijuana/section-321-guide`}
            className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="text-blue-400 font-bold text-lg mb-2 group-hover:text-blue-300">
              Section 321 Guide &rarr;
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Fulfill US e-commerce orders duty-free up to $800 de minimis from Tijuana fulfillment centers.
            </p>
          </Link>

          <Link
            href={`/${language}/services/industrial-real-estate-baja`}
            className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="text-blue-400 font-bold text-lg mb-2 group-hover:text-blue-300">
              Industrial Real Estate &rarr;
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Class A industrial parks, warehouse leasing, and site selection across Baja California.
            </p>
          </Link>

          <Link
            href={`/${language}/locations/tijuana`}
            className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="text-blue-400 font-bold text-lg mb-2 group-hover:text-blue-300">
              Tijuana Location Hub &rarr;
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Operational labor rates, Otay Mesa border crossing access, and industrial park directory.
            </p>
          </Link>
        </div>
      </section>

      {/* Lead Form & Executive Authority */}
      <section id="contact-form" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('customsPage.ctaTitle') || "Optimize Your Mexico Customs & Duty Strategy"}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
              {t('customsPage.ctaSubtitle') || "Schedule a confidential customs audit with our trade compliance team. We'll analyze your Pedimentos, Annex 24 records, and USMCA qualification to unlock immediate duty savings."}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Zero-Obligation Confidential Trade Compliance Review</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Pedimento & Annex 24/31 Inventory Audit Protocol</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Direct Access to Licensed Agentes Aduanales</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
            <LeadForm
              title="Request Customs Compliance Audit"
              subtitle="Get an expert analysis of your Pedimentos, Annex 24 software setup, and USMCA duty elimination."
              source="customs_brokerage_landing_page"
            />
          </div>
        </div>
      </section>

      {/* Founder Leadership Block */}
      <FounderBlock />
    </div>
  );
}
