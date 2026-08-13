"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  ShieldCheck,
  Clock,
  DollarSign,
  FileText,
  Factory,
  Scale,
  Building2,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Percent,
  Zap,
  AlertCircle,
  Briefcase,
  Award,
  HelpCircle,
  Check,
  X,
  TrendingUp,
  Globe
} from "lucide-react";

export default function ShelterClient() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentLang = language || 'en';

  const roadmapPhases = [
    {
      phase: "Phase 1",
      days: "Days 1–30",
      title: "Legal Structure, IMMEX Permitting & Site Selection",
      subtitle: "Corporate Foundation & Site Authorization",
      icon: <Building2 className="w-6 h-6 text-primary-400" />,
      tasks: [
        "Select optimal unbundled shelter entity structure and execute corporate advisory agreements",
        "Submit official IMMEX program application to the Secretarías de Economía (SE)",
        "Identify, negotiate, and execute lease agreements for Class A industrial space in Tijuana or Mexicali",
        "Obtain municipal land-use permits (Uso de Suelo) and SEMARNAT environmental clearance"
      ]
    },
    {
      phase: "Phase 2",
      days: "Days 31–60",
      title: "Tax Certification & LFT Labor Architecture",
      subtitle: "VAT 0% Certification & HR Compliance",
      icon: <ShieldCheck className="w-6 h-6 text-primary-400" />,
      tasks: [
        "File for Article 28-A LIVA 0% VAT & IEPS certification with SAT (Servicio de Administración Tributaria)",
        "Implement Annex 24 & Annex 30 automated inventory tracking software for customs compliance",
        "Design wage structures, benefit packages, and internal rules compliant with Ley Federal del Trabajo (LFT)",
        "Onboard customs brokers and register digital signatures in VUCEM (Ventanilla Única)"
      ]
    },
    {
      phase: "Phase 3",
      days: "Days 61–90",
      title: "Equipment Import, Safe Harbor & Launch",
      subtitle: "Commissioning, Operations & Commercial Go-Live",
      icon: <Zap className="w-6 h-6 text-primary-400" />,
      tasks: [
        "Import tooling, machinery, and raw materials duty-free under 0% VAT IMMEX tariff headings",
        "Finalize Article 182 LISR Safe Harbor transfer pricing tax election with SAT",
        "Complete utility hookups (HVAC, power drops, compressed air) and line commissioning",
        "Execute LFT employment contracts, conduct operator safety training, and launch commercial exports"
      ]
    }
  ];

  const laborCostItems = [
    { component: "Direct Base Hourly Wage", rate: "$4.55", share: "58.0%", note: "Skilled operator rate in Baja California border zone" },
    { component: "IMSS Social Security & Health", rate: "$0.92", share: "11.7%", note: "Mandatory statutory healthcare & disability coverage" },
    { component: "INFONAVIT (5%) & SAR Retirement (2%)", rate: "$0.36", share: "4.6%", note: "Federal housing fund and pension contributions" },
    { component: "State Payroll Tax (ISN)", rate: "$0.19", share: "2.4%", note: "Baja California regional payroll tax (3.0-4.25%)" },
    { component: "Statutory Christmas (Aguinaldo) & Vacation Premium", rate: "$0.52", share: "6.6%", note: "15 days Christmas bonus + 25% vacation bonus (LFT)" },
    { component: "Fringe Benefits & Retention Perks", rate: "$0.70", share: "8.9%", note: "Food vouchers (vales), transport, cafeteria & punctuality bonus" },
    { component: "Unbundled Shelter Admin Fee", rate: "$0.60", share: "7.7%", note: "Fixed transparent compliance & HR administration fee" },
  ];

  const comparisonRows = [
    {
      feature: "Time to Production Go-Live",
      unbundled: "90 Days",
      bundled: "90–120 Days",
      standalone: "9–12 Months",
      contract: "30–60 Days",
      highlight: true
    },
    {
      feature: "Upfront Setup Capital Needed",
      unbundled: "Low ($)",
      bundled: "Low ($)",
      standalone: "High ($$$$)",
      contract: "Very Low ($)"
    },
    {
      feature: "Operational & Process Control",
      unbundled: "100% Client Controlled",
      bundled: "100% Client Controlled",
      standalone: "100% Client Controlled",
      contract: "Vendor Controlled"
    },
    {
      feature: "IP & Proprietary Design Security",
      unbundled: "Full Client Ownership",
      bundled: "Full Client Ownership",
      standalone: "Full Client Ownership",
      contract: "Contractual OEM Risk"
    },
    {
      feature: "Article 28-A LIVA 0% Import VAT",
      unbundled: "Turnkey (Day 1 Active)",
      bundled: "Turnkey (Day 1 Active)",
      standalone: "6–9 Month Application Delay",
      contract: "Handled by OEM"
    },
    {
      feature: "Article 182 LISR Safe Harbor PE Immunity",
      unbundled: "Guaranteed Zero PE Risk",
      bundled: "Guaranteed Zero PE Risk",
      standalone: "N/A (Direct 30% ISR Corporate Tax)",
      contract: "N/A (Vendor Tax Structure)"
    },
    {
      feature: "Labor Rate & Admin Fee Structure",
      unbundled: "$7.84/hr Pass-Through + Flat Fee",
      bundled: "$9.50–$12.50/hr Hidden Markups",
      standalone: "Direct Cost + In-House Overhead",
      contract: "Built-In Per-Unit Margin Markup",
      highlight: true
    },
    {
      feature: "Long-Term Subsidiary Conversion",
      unbundled: "Seamless 1-Click Transition",
      bundled: "High Exit Penalties & Retained Contracts",
      standalone: "Already Direct Entity",
      contract: "Vendor Lock-in (Must Re-equip)"
    }
  ];

  const faqs = [
    {
      q: "What is an unbundled shelter service model in Mexico?",
      a: "An unbundled shelter service model separates core Mexican administrative and legal compliance—such as IMMEX program management, Article 28-A LIVA 0% VAT certification, Ley Federal del Trabajo labor administration, customs clearance, and Article 182 LISR Safe Harbor transfer pricing filings—from operational overhead. Unlike legacy bundled shelter providers who embed 20% to 40% hidden profit markups into hourly labor rates and facility lease costs, an unbundled shelter provides total cost transparency: you pay actual pass-through costs plus a transparent, fixed monthly administrative fee per employee."
    },
    {
      q: "How does Article 182 LISR Safe Harbor protect US parent companies from Mexican tax exposure?",
      a: "Under standard Mexican income tax laws, a foreign company manufacturing in Mexico risks establishing a 'Permanent Establishment' (PE), which would subject its global corporate profits to 30% Mexican corporate income tax (ISR). Article 182 of the Ley del Impuesto sobre la Renta (LISR) creates a statutory Safe Harbor shield for foreign principals operating through a shelter entity. To qualify, the shelter company files Mexican ISR taxes calculated on the HIGHER of two statutory formulas: 1) 6.9% of the total value of all assets used in Mexico (machinery, tooling, inventory), or 2) 6.5% of total operating costs and expenses. This statutory election guarantees complete tax immunity for the foreign parent company from Mexican tax audits on its global revenues."
    },
    {
      q: "How does Article 28-A LIVA grant 0% VAT on temporary imports under IMMEX?",
      a: "The standard Value-Added Tax (IVA) in Mexico is 16%. Under Article 28-A of the Ley del Impuesto al Valor Agregado (LIVA), companies operating within an authorized IMMEX shelter program can obtain VAT and IEPS Certification (Certificación en Materia de IVA e IEPS). This certification applies a 100% tax credit directly at customs against the 16% VAT normally due on temporarily imported raw materials, components, tooling, machinery, and equipment. As long as inventory is tracked via Annex 24 software and reported to SAT under Annex 30, foreign manufacturers maintain an effective 0% import VAT burden, preserving millions of dollars in working capital."
    },
    {
      q: "What is included in the $7.84/hr fully burdened labor rate in Baja California?",
      a: "The $7.84/hr burdened labor rate represents the complete, landed hourly cost for direct manufacturing operators in Tijuana and Baja California. It includes: direct base salary (~$4.55/hr), mandatory IMSS social security and healthcare (~$0.92/hr), INFONAVIT housing fund (5%) and SAR retirement fund (2%) (~$0.36/hr), Baja California state payroll tax (~$0.19/hr), LFT statutory Christmas bonus (Aguinaldo) and vacation premium (~$0.52/hr), retention fringe benefits including food vouchers (vales de despensa), transport subsidies, and cafeteria perks (~$0.70/hr), and the unbundled shelter administrative fee (~$0.60/hr). This delivers over 70% direct labor savings compared to US manufacturing wages ($28–$35/hr)."
    },
    {
      q: "What are the primary employer obligations under Mexico's Ley Federal del Trabajo (LFT)?",
      a: "The Ley Federal del Trabajo (LFT) governs all employer-employee relationships in Mexico. Critical statutory requirements include: a 48-hour standard daytime work week with 1 paid rest day per 6 days worked; mandatory 15-day Christmas bonus (Aguinaldo) paid by Dec 20; minimum 12 days paid annual vacation in year one with a 25% vacation bonus (Prima Vacacional); mandatory 10% worker profit sharing (PTU); strict overtime pay rules (200% for first 9 overtime hours/week, 300% thereafter); mandatory severance payouts for non-cause dismissal (3 months salary + 20 days per year of service + 12 days/yr seniority premium); and compliance with secret-ballot collective bargaining agreement (CBA) union voting under 2019 labor reforms."
    },
    {
      q: "What is the key structural difference between a shelter service and a contract manufacturer?",
      a: "Under a shelter model, you operate your own dedicated manufacturing facility, install your own machinery, deploy your proprietary processes, hire your dedicated workforce, and maintain 100% control over quality, IP, and production schedules. The shelter provider functions as the legal and administrative infrastructure in Mexico. By contrast, a contract manufacturer (OEM) produces your products inside their third-party facility using their equipment and shared labor pool on a purchase order basis, leaving you with limited visibility and control over manufacturing processes."
    },
    {
      q: "Can a US manufacturer convert from an unbundled shelter to a direct Mexican subsidiary later?",
      a: "Yes. Converting from a shelter program to a direct wholly-owned Mexican corporation (S.A. de C.V. or S. de R.L. de C.V.) is a standard growth trajectory. Nearshore Navigator structures unbundled shelter agreements with explicit 'buyout and conversion' clauses. When your facility reaches scale (typically 100+ operators or 3+ years of operating history), you can transfer the facility lease, IMMEX permits, equipment ownership, and trained employee workforce directly into your own standalone entity without stopping production or re-hiring workers."
    },
    {
      q: "Why is Tijuana and Baja California the preferred hub for nearshore shelter operations?",
      a: "Baja California—anchored by Tijuana, Mexicali, and Tecate—is North America's premier nearshore manufacturing hub. Located 15 minutes from San Diego border entry ports, Baja California features over 70 Class A industrial parks, an active industrial workforce of 700,000+ skilled workers, established supply chains in medical devices (ISO 13485), aerospace (AS9100), automotive (IATF 16949), and electronics, and Pacific Standard Time (PST) alignment that permits same-day executive travel and real-time oversight."
    }
  ];

  const canonicalUrl = `https://nearshorenavigator.com/${currentLang}/services/shelter-services`;

  return (
    <div ref={containerRef} className="pb-20 overflow-hidden bg-gray-950 text-white min-h-screen">
      {/* Structured Data: JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `https://nearshorenavigator.com/${currentLang}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": `https://nearshorenavigator.com/${currentLang}/services`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Nearshore Shelter Services",
                "item": canonicalUrl
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            "name": "Nearshore Shelter Services in Mexico & Baja California",
            "provider": {
              "@type": "Organization",
              "name": "Nearshore Navigator",
              "url": "https://nearshorenavigator.com",
              "logo": "https://nearshorenavigator.com/logo.webp"
            },
            "serviceType": "IMMEX Shelter Operations, Tax Compliance & HR Administration",
            "areaServed": [
              {
                "@type": "Country",
                "name": "Mexico"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Baja California"
              },
              {
                "@type": "City",
                "name": "Tijuana"
              },
              {
                "@type": "City",
                "name": "Mexicali"
              }
            ],
            "description": "Standalone unbundled shelter services in Mexico. Turnkey 90-day IMMEX setup, Article 28-A LIVA 0% VAT certification, Article 182 LISR Safe Harbor transfer pricing protection, Ley Federal del Trabajo labor compliance, and $7.84/hr burdened labor rate.",
            "offers": {
              "@type": "Offer",
              "url": canonicalUrl,
              "priceCurrency": "USD",
              "eligibleRegion": {
                "@type": "Country",
                "name": "US"
              }
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Shelter Administration & Advisory Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "IMMEX Program Permitting & Secretarías de Economía Approval"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Article 28-A LIVA 0% VAT & IEPS Customs Certification"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Article 182 LISR Safe Harbor Transfer Pricing Shield"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ley Federal del Trabajo (LFT) HR & Payroll Administration"
                  }
                }
              ]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] py-28 flex items-center justify-center overflow-hidden border-b border-gray-800">
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
            alt="Nearshore manufacturing shelter facility in Tijuana Mexico"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-6 tracking-wide">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Unbundled Shelter Advisory & Legal Compliance
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Nearshore Shelter Services <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-green-400">
                in Mexico & Baja California
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Establish fully legal, tariff-free manufacturing operations in <strong>90 days</strong> under Mexico&apos;s IMMEX framework. Protect foreign assets with <strong>Article 182 LISR Safe Harbor</strong> transfer pricing, capture <strong>0% VAT under Article 28-A LIVA</strong>, and achieve a <strong>$7.84/hr fully burdened labor rate</strong> with 100% <strong>Ley Federal del Trabajo (LFT)</strong> compliance.
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 backdrop-blur">
                <div className="text-xs uppercase text-gray-400 font-semibold mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Go-Live Timeline
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">90 Days</div>
                <div className="text-xs text-gray-400 mt-1">vs 9–12 months direct setup</div>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 backdrop-blur">
                <div className="text-xs uppercase text-gray-400 font-semibold mb-1 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-green-400" /> Burdened Labor
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-green-400">$7.84 / hr</div>
                <div className="text-xs text-gray-400 mt-1">Landed rate incl. LFT & perks</div>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 backdrop-blur">
                <div className="text-xs uppercase text-gray-400 font-semibold mb-1 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-teal-400" /> Art. 28-A LIVA
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-teal-300">0% VAT</div>
                <div className="text-xs text-gray-400 mt-1">Temporary import tax credit</div>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 backdrop-blur">
                <div className="text-xs uppercase text-gray-400 font-semibold mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Art. 182 LISR
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-indigo-300">Safe Harbor</div>
                <div className="text-xs text-gray-400 mt-1">Permanent establishment immunity</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-16 space-y-24">
        
        {/* Section 1: Strategic Overview & Unbundled Model Advantage */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-blue-400">
              The Modern Nearshore Framework
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Why Unbundled Shelter Advisory Beats Legacy Bundled Programs
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
              Traditional shelter providers act as monolithic intermediaries, bundling real estate, labor, customs, and administrative markups into inflated hourly fees. Nearshore Navigator&apos;s unbundled shelter model provides 100% cost transparency, direct contract ownership, and a seamless 1-click legal conversion pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">100% Pass-Through Pricing</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pay actual local expenses—exact facility lease costs, true payroll, and statutory tax rates—plus a clear, fixed monthly shelter administrative fee per worker. No hidden 30% labor markups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-teal-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Turnkey Tax Immunity</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Operate under an established IMMEX legal shelter shield. Enjoy Article 28-A LIVA 0% import VAT and complete Article 182 LISR Safe Harbor protection from day one without regulatory delays.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-green-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Seamless Exit & Conversion</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Retain full ownership of equipment, tooling, IP, and employee relationships. Convert to your own standalone Mexican entity (S.A. de C.V.) whenever you scale, with zero financial penalties.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 90-Day IMMEX Setup Roadmap */}
        <section className="max-w-5xl mx-auto space-y-12 bg-gray-900/50 border border-gray-800 rounded-3xl p-6 md:p-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" /> Turnkey Deployment Timeline
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              The 90-Day IMMEX Setup Roadmap
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              A structured step-by-step timeline taking your nearshore manufacturing project from initial legal framework execution to commercial go-live in under 3 months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {roadmapPhases.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/50">
                      {phase.phase} • {phase.days}
                    </span>
                    {phase.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
                  <p className="text-xs text-gray-400 font-medium mb-4">{phase.subtitle}</p>
                  <ul className="space-y-2.5">
                    {phase.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-800/80 text-xs text-gray-500 font-medium">
                  Milestone Deliverable: Phase {idx + 1} Sign-off
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Ley Federal del Trabajo (LFT) & $7.84/hr Labor Rate */}
        <section className="max-w-5xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LFT Legal Requirements Explanation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                  Mexican Labor Law Compliance
                </span>
                <h2 className="text-3xl font-bold text-white">
                  Ley Federal del Trabajo (LFT) & Labor Governance
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Operating in Mexico requires strict adherence to the <strong>Ley Federal del Trabajo (LFT)</strong>. Nearshore Navigator ensures your unbundled shelter operation remains 100% legally compliant, protecting your organization from union labor disputes and statutory labor penalties.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex gap-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Work Shifts & Overtime Rules</h4>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                      Standard daytime shift is 48 hours/week (6 days or 5 compressed days) with 1 paid rest day. Overtime is paid at <strong>200% (double pay)</strong> for the first 9 weekly hours and <strong>300% (triple pay)</strong> thereafter.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex gap-3">
                  <DollarSign className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Statutory Mandatory Benefits</h4>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                      Mandatory perks include <strong>Aguinaldo</strong> (15-day Christmas bonus by Dec 20), <strong>Prima Vacacional</strong> (25%+ bonus on 12+ paid vacation days), and <strong>PTU Profit Sharing</strong> (10% capped at 3 months salary).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">IMSS, INFONAVIT & Severance Protection</h4>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                      Employers contribute to IMSS (healthcare/disability), INFONAVIT (5% housing fund), and SAR (2% pension). Non-cause termination requires 3 months salary + 20 days/yr served + Seniority Premium (Prima de Antigüedad).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex gap-3">
                  <Users className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">2019 LFT Reform & Collective Bargaining (CBA)</h4>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                      Full compliance with USMCA-aligned labor reform mandates secret-ballot democratic union ratification, eliminating wildcat labor union extortion and ensuring workforce stability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* $7.84/hr Cost Breakdown Card */}
            <div className="lg:col-span-5 bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Fully Burdened Operator Rate</span>
                  <span className="text-xs font-bold text-green-400 bg-green-950 px-2 py-0.5 rounded border border-green-800">
                    Baja California 2026
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-white">$7.84 <span className="text-lg font-medium text-gray-400">/ hr</span></div>
                <p className="text-xs text-gray-400 mt-1">Total landed cost per direct operator hour</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-800">
                {laborCostItems.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>{item.component}</span>
                      <span className="text-green-400">{item.rate} ({item.share})</span>
                    </div>
                    <p className="text-[11px] text-gray-400 italic">{item.note}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-green-950/40 border border-green-800/60 text-xs text-green-200 leading-relaxed">
                <strong>Savings Impact:</strong> Operating at $7.84/hr saves over $20.00/hr per worker compared to US assembly rates ($28.50–$35.00/hr), generating <strong>$41,600+ annual savings per operator position</strong>.
              </div>
            </div>

          </div>
        </section>

        {/* Section 4: Article 28-A LIVA 0% VAT Mechanism */}
        <section className="max-w-5xl mx-auto space-y-8 bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Tax Optimization Framework
            </span>
            <h2 className="text-3xl font-bold text-white">
              Article 28-A LIVA: 0% VAT on Temporary Imports
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Standard Mexican commercial transactions trigger a 16% Value-Added Tax (IVA). Article 28-A of the <em>Ley del Impuesto al Valor Agregado (LIVA)</em> grants certified IMMEX shelter programs complete 0% VAT tax treatment on temporarily imported manufacturing inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
                <Percent className="w-5 h-5" /> 100% Customs VAT Tax Credit
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Under Article 28-A LIVA, foreign raw materials, components, tooling, machinery, and equipment temporarily imported into Mexico under IMMEX receive an instant 100% tax credit against the 16% VAT at border entry ports.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                <DollarSign className="w-5 h-5" /> Working Capital Protection
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                By eliminating the need to pay 16% VAT upfront at customs, foreign parent companies avoid locking up millions of dollars in working capital waiting for SAT tax refunds, maintaining maximum operational liquidity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
                <FileText className="w-5 h-5" /> Annex 24 Automated Inventory Control
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Customs regulations mandate that all temporarily imported goods be registered in an authorized <strong>Annex 24 software system</strong>, tracking inventory from border crossing to finished goods export.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                <CheckCircle2 className="w-5 h-5" /> Annex 30 SAT Electronic Audit Reporting
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                <strong>Annex 30</strong> integrates your inventory balance directly with the SAT electronic database, verifying that temporarily imported items are exported within statutory limits (18 to 36 months).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Article 182 LISR Safe Harbor Transfer Pricing */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Corporate Tax Immunity
            </span>
            <h2 className="text-3xl font-bold text-white">
              Article 182 LISR: Safe Harbor Transfer Pricing Shield
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Foreign parent companies operating manufacturing facilities in Mexico face the risk of creating a <strong>Permanent Establishment (PE)</strong>, which exposes their worldwide profits to 30% Mexican corporate income tax (ISR). Article 182 of the <em>Ley del Impuesto sobre la Renta (LISR)</em> provides absolute statutory PE immunity for foreign principals operating under an authorized shelter framework.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                The Safe Harbor Statutory Formula
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                To satisfy Mexican transfer pricing rules and maintain Permanent Establishment immunity, the shelter entity calculates its Mexican corporate tax obligation based on the <strong>HIGHER</strong> of two statutory calculations:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-2">
                  <div className="text-2xl font-extrabold text-indigo-300">6.9%</div>
                  <div className="text-xs font-bold text-white">Asset Value Formula</div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    6.9% of the total value of all assets used in the Mexican facility (machinery, tooling, equipment & inventory).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/60 space-y-2">
                  <div className="text-2xl font-extrabold text-blue-300">6.5%</div>
                  <div className="text-xs font-bold text-white">Cost & Expense Formula</div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    6.5% of total operating costs and expenses (wages, facility rent, utilities & administrative expenses).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-400 leading-relaxed">
                <strong>Unbundled Advantage:</strong> Under Nearshore Navigator&apos;s unbundled model, transfer pricing inputs are calculated with 100% pass-through transparency. You pay the exact statutory requirement without arbitrary shelter tax markups.
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Complete PE Immunity
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Prevents Mexican tax authority (SAT) audits from inspecting or taxing your US parent company&apos;s global revenues.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-400" /> Predictable Tax Budgeting
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Allows CFOs to forecast Mexican tax liabilities with absolute mathematical certainty year after year.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Globe className="w-4 h-4 text-teal-400" /> USMCA Tax Compliance
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Fully harmonized with US-Mexico tax treaties and OECD transfer pricing guidelines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Structured Comparison Table */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Operational Model Comparison
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Comparing Nearshore Operating Models in Mexico
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Evaluate how Unbundled Shelter Advisory compares against legacy bundled shelters, direct standalone Mexican entities, and contract manufacturing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900">
            <table itemScope itemType="https://schema.org/Table" className="w-full text-left text-xs md:text-sm">
              <thead className="bg-gray-950 border-b border-gray-800 text-gray-300">
                <tr>
                  <th className="p-4 font-bold min-w-[200px]">Decision Criteria</th>
                  <th className="p-4 font-bold text-blue-400 bg-blue-950/40 min-w-[180px]">
                    Unbundled Shelter (Nearshore Navigator)
                  </th>
                  <th className="p-4 font-bold text-gray-300 min-w-[160px]">Legacy Bundled Shelter</th>
                  <th className="p-4 font-bold text-gray-300 min-w-[170px]">Direct Sub (S.A. de C.V.)</th>
                  <th className="p-4 font-bold text-gray-300 min-w-[160px]">Contract Mfg (OEM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={row.highlight ? "bg-gray-900/90 font-medium" : "hover:bg-gray-850/50"}>
                    <td className="p-4 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 font-bold text-blue-300 bg-blue-950/30 border-x border-blue-900/30">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-green-400 shrink-0" />
                        <span>{row.unbundled}</span>
                      </div>
                    </td>
                    <td className="p-4">{row.bundled}</td>
                    <td className="p-4">{row.standalone}</td>
                    <td className="p-4">{row.contract}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: Q&A FAQ Accordion */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-bold text-white">
              Nearshore Shelter Services Q&A
            </h2>
            <p className="text-gray-400 text-sm">
              Authoritative answers to critical legal, tax, labor, and operational questions regarding Mexican shelter operations.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white text-base hover:text-blue-400 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-blue-400 font-bold bg-blue-950 px-2 py-1 rounded border border-blue-800">
                      Q{idx + 1}
                    </span>
                    {faq.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-gray-800/60 bg-gray-950/50"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Internal Links Block */}
        <section className="max-w-5xl mx-auto pt-8 border-t border-gray-800">
          <div className="text-xs uppercase font-bold text-gray-400 mb-4 tracking-wider">
            Explore Related Advisory Services & Tools
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <Link
              href={`/${currentLang}/services/industrial-real-estate-baja`}
              className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition flex flex-col justify-between group"
            >
              <span className="font-bold text-white group-hover:text-blue-400">Class A Industrial Parks</span>
              <span className="text-gray-400 mt-2">Lease representation & BTS negotiations in Tijuana & Mexicali &rarr;</span>
            </Link>

            <Link
              href={`/${currentLang}/services/contract-manufacturing-tijuana`}
              className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-teal-500/50 transition flex flex-col justify-between group"
            >
              <span className="font-bold text-white group-hover:text-teal-400">Contract Manufacturing</span>
              <span className="text-gray-400 mt-2">ISO certified CM partner matching & OEM placement &rarr;</span>
            </Link>

            <Link
              href={`/${currentLang}/tools/cost-calculator`}
              className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-green-500/50 transition flex flex-col justify-between group"
            >
              <span className="font-bold text-white group-hover:text-green-400">Landed Cost Calculator</span>
              <span className="text-gray-400 mt-2">Model your exact fully burdened hourly labor & facility costs &rarr;</span>
            </Link>

            <Link
              href={`/${currentLang}/insights/maquiladora-vs-shelter-services-mexico`}
              className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition flex flex-col justify-between group"
            >
              <span className="font-bold text-white group-hover:text-purple-400">Maquiladora vs Shelter</span>
              <span className="text-gray-400 mt-2">Read our deep-dive analysis on legal & tax structures &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Section 8: Lead Intake Form Section */}
        <section className="max-w-4xl mx-auto pt-4">
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl">
            <LeadForm
              title="Schedule Your Shelter Feasibility Assessment"
              subtitle="Get an unbundled cost breakdown, facility shortlist, and IMMEX roadmap for your manufacturing project."
              source="shelter-services-landing-page"
            />
          </div>
        </section>

        {/* Founder Advisory Credential Block */}
        <FounderBlock />

      </div>
    </div>
  );
}
