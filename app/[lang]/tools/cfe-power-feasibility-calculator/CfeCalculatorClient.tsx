"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Building2,
  DollarSign,
  Clock,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  Droplet,
  FileText,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";

interface Submarket {
  id: string;
  name: string;
  state: string;
  baselineDelayMonths: number;
  baseCostPerKva: number;
  waterStress: "Critical" | "High" | "Moderate" | "Low";
  gridNotes: string;
  avgRent: number;
}

const SUBMARKETS: Submarket[] = [
  {
    id: "mty",
    name: "Monterrey (Apodaca, Santa Catarina, Pesquería)",
    state: "Nuevo León",
    baselineDelayMonths: 16,
    baseCostPerKva: 225,
    waterStress: "Critical",
    gridNotes: "115 kV donor substation saturation; CFE obras de refuerzo mandated across transmission nodes.",
    avgRent: 0.65
  },
  {
    id: "saltillo",
    name: "Saltillo / Ramos Arizpe",
    state: "Coahuila",
    baselineDelayMonths: 14,
    baseCostPerKva: 200,
    waterStress: "Moderate",
    gridNotes: "Rapid automotive expansion (EV cluster) absorbing high-voltage breaker capacity at Ramos nodes.",
    avgRent: 0.57
  },
  {
    id: "tijuana",
    name: "Tijuana (Otay Mesa, El Florido, Valle Redondo)",
    state: "Baja California",
    baselineDelayMonths: 22,
    baseCostPerKva: 290,
    waterStress: "High",
    gridNotes: "Isolated Baja California Grid (BCA); zero connection to Mexico's National Grid; reliant on CAISO imports.",
    avgRent: 0.82
  },
  {
    id: "mexicali",
    name: "Mexicali (Palaco, Gonzalez Ortega)",
    state: "Baja California",
    baselineDelayMonths: 15,
    baseCostPerKva: 250,
    waterStress: "Moderate",
    gridNotes: "Summer ambient heat (>48°C) de-rates transformer capacity by 18–25%; BCA isolated grid constraints.",
    avgRent: 0.70
  },
  {
    id: "juarez",
    name: "Ciudad Juárez (Southeast, Panamericana)",
    state: "Chihuahua",
    baselineDelayMonths: 18,
    baseCostPerKva: 235,
    waterStress: "Critical",
    gridNotes: "High-voltage transmission lines saturated along border; CFE requiring dedicated switching bays.",
    avgRent: 0.73
  },
  {
    id: "reynosa",
    name: "Reynosa / Matamoros",
    state: "Tamaulipas",
    baselineDelayMonths: 12,
    baseCostPerKva: 185,
    waterStress: "Moderate",
    gridNotes: "Regional gas pipeline capacity constraints for on-site cogeneration/microgrids.",
    avgRent: 0.59
  },
  {
    id: "queretaro",
    name: "Querétaro (El Marqués, Aeropuerto)",
    state: "Querétaro",
    baselineDelayMonths: 24,
    baseCostPerKva: 300,
    waterStress: "High",
    gridNotes: "Hyperscale AI data centers absorbing 300+ MW, creating severe power rationing for industrial tenants.",
    avgRent: 0.65
  },
  {
    id: "slp",
    name: "San Luis Potosí (Millennium, WTC 1 & 2)",
    state: "San Luis Potosí",
    baselineDelayMonths: 14,
    baseCostPerKva: 195,
    waterStress: "High",
    gridNotes: "Deep well concessions restricted under CONAGUA decrees; WTC private substation capacity premium.",
    avgRent: 0.55
  },
  {
    id: "gdl",
    name: "Guadalajara (El Salto, Zapopan)",
    state: "Jalisco",
    baselineDelayMonths: 20,
    baseCostPerKva: 265,
    waterStress: "Moderate",
    gridNotes: "Extreme industrial land scarcity in El Salto; semiconductor cleanroom power demands competing for feeds.",
    avgRent: 0.71
  },
  {
    id: "bajio",
    name: "Guanajuato / Bajío (Silao, Puerto Interior)",
    state: "Guanajuato",
    baselineDelayMonths: 12,
    baseCostPerKva: 180,
    waterStress: "High",
    gridNotes: "Favorable rail access (Ferromex/CPKC), but localized 34.5 kV line drops require private bays.",
    avgRent: 0.53
  }
];

export default function CfeCalculatorClient({ lang }: { lang: string }) {
  // User Inputs
  const [selectedMarketId, setSelectedMarketId] = useState<string>("mty");
  const [facilitySqFt, setFacilitySqFt] = useState<number>(150000);
  const [kvaDemand, setKvaDemand] = useState<number>(4000);
  const [verificationTier, setVerificationTier] = useState<number>(2); // 1 = Brochure, 2 = Factibilidad, 3 = CENACE, 4 = Executed
  const [substationStatus, setSubstationStatus] = useState<string>("C"); // A, B, C, D
  const [targetCommissioningMonths, setTargetCommissioningMonths] = useState<number>(9);
  const [rentInput, setRentInput] = useState<number>(0.65);
  const [copiedClause, setCopiedClause] = useState<number | null>(null);

  const selectedMarket = useMemo(() => {
    return SUBMARKETS.find((m) => m.id === selectedMarketId) || SUBMARKETS[0];
  }, [selectedMarketId]);

  // Calculations
  const {
    substationCapExMin,
    substationCapExMax,
    projectedEnergizationMonths,
    monthsOfDelay,
    deadRentExposure,
    machineryCarryExposure,
    totalFinancialExposure,
    phantomPowerRiskScore,
    riskClassification,
    bessAnnualSavings
  } = useMemo(() => {
    // 1. CapEx calculation
    const isHighVoltage = kvaDemand >= 5000;
    const voltageMultiplier = isHighVoltage ? 1.35 : 1.0;
    const baseUnitCost = selectedMarket.baseCostPerKva * voltageMultiplier;
    
    // Base substation equipment + civil work + bay
    const bayCost = isHighVoltage ? 1800000 : 450000;
    const minUnit = baseUnitCost * 0.9;
    const maxUnit = baseUnitCost * 1.25;
    
    const capExMin = Math.round((kvaDemand * minUnit + bayCost) / 10000) * 10000;
    const capExMax = Math.round((kvaDemand * maxUnit + bayCost * 1.3) / 10000) * 10000;

    // 2. Projected Energization Lead Time
    let readinessDelay = 0;
    if (substationStatus === "A") {
      readinessDelay = 0; // Substation energized
    } else if (substationStatus === "B") {
      readinessDelay = 8; // Transformer ordered, yard ready
    } else if (substationStatus === "C") {
      readinessDelay = selectedMarket.baselineDelayMonths; // Developer promises upon lease
    } else {
      readinessDelay = Math.max(20, selectedMarket.baselineDelayMonths + 4); // Tenant builds from scratch
    }

    // Tier friction adjustment
    let tierFriction = 0;
    if (verificationTier === 1) tierFriction = 6;
    if (verificationTier === 2) tierFriction = 4;
    if (verificationTier === 3) tierFriction = 1;
    if (verificationTier === 4) tierFriction = 0;

    const projectedMonths = substationStatus === "A" && verificationTier === 4 
      ? 2 
      : Math.max(3, readinessDelay + tierFriction);

    const delayMonths = Math.max(0, projectedMonths - targetCommissioningMonths);

    // 3. Carrying Costs
    const rentLoss = Math.round(facilitySqFt * rentInput * delayMonths);
    const machineryLoss = Math.round(kvaDemand * 115 * delayMonths);
    const totalExposure = rentLoss + machineryLoss;

    // 4. Phantom Power Risk Score (0-100)
    let score = 20;
    if (verificationTier === 1) score += 35;
    if (verificationTier === 2) score += 25;
    if (verificationTier === 3) score += 10;
    if (verificationTier === 4) score -= 15;

    if (substationStatus === "D") score += 30;
    if (substationStatus === "C") score += 25;
    if (substationStatus === "B") score += 10;
    if (substationStatus === "A") score -= 20;

    if (delayMonths > 6) score += 20;
    else if (delayMonths > 0) score += 10;

    const finalScore = Math.min(98, Math.max(12, score));

    let classification: { label: string; color: string; desc: string } = {
      label: "Low Risk",
      color: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800",
      desc: "Substation documentation is legally verified. Minor scheduling buffers recommended."
    };

    if (finalScore >= 65) {
      classification = {
        label: "Critical Phantom Power Risk",
        color: "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800",
        desc: "High probability of 12+ month dark facility delay. Do NOT execute lease without Utility Condition Precedent."
      };
    } else if (finalScore >= 35) {
      classification = {
        label: "Moderate Operational Risk",
        color: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800",
        desc: "Capacity is likely unconfirmed at the local CFE node. Escrow agreements and transformer audit required."
      };
    }

    // 5. BESS Peak Shaving Arbitrage (estimate)
    // 4 hours of peak per day @ 250 working days, shaving 30% of peak load
    const peakKw = (kvaDemand * 0.9) * 0.35;
    const annualKwhShaved = peakKw * 4 * 250;
    const rateDelta = 0.14; // $0.23 peak - $0.09 base GDMTH tariff delta
    const bessAnnual = Math.round(annualKwhShaved * rateDelta);

    return {
      substationCapExMin: capExMin,
      substationCapExMax: capExMax,
      projectedEnergizationMonths: projectedMonths,
      monthsOfDelay: delayMonths,
      deadRentExposure: rentLoss,
      machineryCarryExposure: machineryLoss,
      totalFinancialExposure: totalExposure,
      phantomPowerRiskScore: finalScore,
      riskClassification: classification,
      bessAnnualSavings: bessAnnual
    };
  }, [selectedMarket, facilitySqFt, kvaDemand, verificationTier, substationStatus, targetCommissioningMonths, rentInput]);

  const copyClauseToClipboard = (clauseNumber: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClause(clauseNumber);
    setTimeout(() => setCopiedClause(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Breadcrumbs & Title */}
        <div className="space-y-4">
          <nav className="flex items-center text-xs md:text-sm text-slate-500 dark:text-slate-400 space-x-2">
            <Link href={`/${lang}`} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${lang}/assessment`} className="hover:text-primary-600 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">CFE Power Feasibility Estimator</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800 mb-2">
                <Zap className="w-3.5 h-3.5" />
                Infrastructure &amp; Real Estate Intelligence (2026)
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                CFE Industrial Power Feasibility &amp; KVA Cost Estimator
              </h1>
              <p className="mt-2 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
                Model medium/high-voltage substation CapEx, quantify CFE/CENACE grid energization lead times, and audit &ldquo;Phantom Power&rdquo; lease risks across 10 Mexican manufacturing hubs before signing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/${lang}/insights/mexico-industrial-real-estate-q3-2026-decoded-power-water-site-selection`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-primary-500 transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4 text-primary-600" />
                Read 10-Market Playbook
              </Link>
            </div>
          </div>
        </div>

        {/* Main Grid: Inputs Left, Dashboard Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Inputs Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-8">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <Activity className="w-5 h-5 text-primary-600" />
                Project Utility &amp; Facility Parameters
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Configure your manufacturing power requirements and target facility specifications.
              </p>
            </div>

            {/* Input 1: Submarket */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                <span>1. Target Manufacturing Submarket</span>
                <span className="text-xs font-normal text-slate-500">10 Primary Corridors</span>
              </label>
              <select
                value={selectedMarketId}
                onChange={(e) => {
                  setSelectedMarketId(e.target.value);
                  const m = SUBMARKETS.find((sub) => sub.id === e.target.value);
                  if (m) setRentInput(m.avgRent);
                }}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                {SUBMARKETS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.state} (Queue: ~{m.baselineDelayMonths} Mo)
                  </option>
                ))}
              </select>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300">
                <Droplet className={`w-4 h-4 shrink-0 mt-0.5 ${selectedMarket.waterStress === 'Critical' ? 'text-rose-500' : selectedMarket.waterStress === 'High' ? 'text-amber-500' : 'text-primary-500'}`} />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">CONAGUA Water Stress: {selectedMarket.waterStress}.</span> {selectedMarket.gridNotes}
                </div>
              </div>
            </div>

            {/* Input 2: Power Demand (kVA) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">
                  2. Required Electrical Capacity (kVA)
                </label>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {kvaDemand.toLocaleString()} kVA ({(kvaDemand / 1000).toFixed(1)} MVA)
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={25000}
                step={250}
                value={kvaDemand}
                onChange={(e) => setKvaDemand(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer"
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {[
                  { label: "Light Assembly", val: 1500 },
                  { label: "Cleanroom / Precision", val: 3500 },
                  { label: "Molding / Stamping", val: 8000 },
                  { label: "Heavy / Automotive", val: 15000 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setKvaDemand(preset.val)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      kvaDemand === preset.val
                        ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 font-bold"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {preset.label} ({(preset.val / 1000).toFixed(1)}M)
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Facility Footprint & Rent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">
                    3. Footprint (sq ft)
                  </label>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {facilitySqFt.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={400000}
                  step={5000}
                  value={facilitySqFt}
                  onChange={(e) => setFacilitySqFt(Number(e.target.value))}
                  className="w-full accent-primary-600 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">
                    4. Monthly NNN Rent ($/sq ft)
                  </label>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    ${rentInput.toFixed(2)} USD
                  </span>
                </div>
                <input
                  type="range"
                  min={0.45}
                  max={0.95}
                  step={0.01}
                  value={rentInput}
                  onChange={(e) => setRentInput(Number(e.target.value))}
                  className="w-full accent-primary-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Input 4: Verification Tier (The Phantom Power Filter) */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                <span>5. Current Developer Power Documentation Level</span>
                <span className="text-xs text-rose-500 font-medium">Critical Risk Gate</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  {
                    tier: 1,
                    title: "Tier 1: Park Promotional Brochure Only",
                    desc: "Developer flyer claims '10 MVA Available in Park' (unverified, shared capacity)."
                  },
                  {
                    tier: 2,
                    title: "Tier 2: CFE Carta de Factibilidad (Informative)",
                    desc: "Standard superintendent letter (non-binding, expires in 180 days, zero capacity reserve)."
                  },
                  {
                    tier: 3,
                    title: "Tier 3: Formal CENACE Dictamen de Interconexión",
                    desc: "Approved SISCON engineering study specifying exact PCC and required Obras de Refuerzo."
                  },
                  {
                    tier: 4,
                    title: "Tier 4: Executed Convenio de Aportación & Contrato",
                    desc: "Fully executed bilateral contract with CFE; financial guarantees escrowed; RPU assigned."
                  }
                ].map((item) => (
                  <div
                    key={item.tier}
                    onClick={() => setVerificationTier(item.tier)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      verificationTier === item.tier
                        ? "bg-primary-50 dark:bg-primary-950/40 border-primary-600 dark:border-primary-500 shadow-sm ring-1 ring-primary-500"
                        : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        item.tier === 4 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300" :
                        item.tier === 3 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" :
                        item.tier === 2 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" :
                        "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300"
                      }`}>
                        {item.tier === 4 ? "Verified" : item.tier === 3 ? "Technical Study" : item.tier === 2 ? "Non-Binding" : "Unverified"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input 5: Substation Physical Readiness */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">
                6. On-Site Substation &amp; Transformer Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: "A", label: "Energized Substation On-Site", sub: "Operational UVIE certificate in hand" },
                  { id: "B", label: "Yard Built + Transformer Ordered", sub: "PO placed; delivery scheduled in <8 mo" },
                  { id: "C", label: "Landlord Promises Upon Lease", sub: "No equipment ordered yet (standard broker pitch)" },
                  { id: "D", label: "No Substation / Greenfield", sub: "Tenant must construct from ground up" }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSubstationStatus(s.id)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      substationStatus === s.id
                        ? "bg-slate-900 text-white dark:bg-primary-600 dark:text-white border-transparent shadow-sm"
                        : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-semibold text-xs md:text-sm">{s.label}</div>
                    <div className="text-[11px] opacity-75 mt-0.5">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input 6: Target Launch Window */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">
                  7. Target Plant Commissioning Window
                </label>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {targetCommissioningMonths} Months
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[3, 6, 9, 12, 18, 24].map((mo) => (
                  <button
                    key={mo}
                    type="button"
                    onClick={() => setTargetCommissioningMonths(mo)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                      targetCommissioningMonths === mo
                        ? "bg-primary-600 text-white border-primary-600"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {mo} Mo
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Real-Time Intelligence Dashboard (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            
            {/* Risk Score Dial Card */}
            <div className={`p-6 rounded-2xl border ${riskClassification.color} shadow-sm space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  Phantom Power Vulnerability
                </span>
                <span className="text-2xl font-black">{phantomPowerRiskScore}/100</span>
              </div>
              
              <div>
                <h3 className="text-xl font-bold">{riskClassification.label}</h3>
                <p className="text-xs md:text-sm mt-1 opacity-90">{riskClassification.desc}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    phantomPowerRiskScore >= 65 ? "bg-rose-600" :
                    phantomPowerRiskScore >= 35 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${phantomPowerRiskScore}%` }}
                />
              </div>
            </div>

            {/* Core Financial Outputs Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                Capital &amp; Delay Exposure Model
              </h3>

              {/* Substation CapEx */}
              <div className="space-y-1">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Estimated Substation &amp; Interconnection CapEx
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  ${(substationCapExMin / 1000000).toFixed(2)}M &ndash; ${(substationCapExMax / 1000000).toFixed(2)}M USD
                </div>
                <div className="text-[11px] text-slate-500">
                  ~${Math.round(substationCapExMin / kvaDemand)} to ${Math.round(substationCapExMax / kvaDemand)}/kVA installed ({kvaDemand >= 5000 ? "115 kV High Voltage" : "34.5 kV Medium Voltage"})
                </div>
              </div>

              {/* Timeline Delivery */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs text-slate-500">Projected Grid Energization</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {projectedEnergizationMonths} Months
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Timeline Slippage</div>
                  <div className={`text-xl font-bold mt-0.5 ${monthsOfDelay > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {monthsOfDelay > 0 ? `+${monthsOfDelay} Mo Delay` : "On Schedule"}
                  </div>
                </div>
              </div>

              {/* Dead Rent & Carry Outflow */}
              {monthsOfDelay > 0 && (
                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                  <div className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Dead Facility Carrying Outflow (Pre-Launch)
                  </div>
                  <div className="text-xl font-black text-rose-700 dark:text-rose-400">
                    ${(totalFinancialExposure / 1000000).toFixed(2)}M USD
                  </div>
                  <div className="text-[11px] text-rose-600/90 dark:text-rose-300/80 space-y-0.5">
                    <div>• Unproductive Base Rent: ${(deadRentExposure / 1000).toFixed(0)}k USD</div>
                    <div>• Idled Machinery Depreciation Carry: ${(machineryCarryExposure / 1000).toFixed(0)}k USD</div>
                  </div>
                </div>
              )}

              {/* BESS Peak Shaving Value */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                    BESS Peak Shaving Arbitrage
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Avoid CFE GDMTH peak tariff surcharges (6 PM&ndash;10 PM)
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    +${(bessAnnualSavings / 1000).toFixed(0)}k/yr
                  </span>
                </div>
              </div>

              {/* CTA Booking Form Hook */}
              <div className="pt-2">
                <a
                  href={`https://calendly.com/nearshorenavigator/30min?utm_source=cfe_calculator&utm_campaign=power_feasibility_risk&submarket=${selectedMarket.id}&kva=${kvaDemand}&sqft=${facilitySqFt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-primary-600 hover:bg-primary-700 text-white shadow-md transition-all"
                >
                  Schedule 72-Hour CFE Grid Feasibility Audit
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  Confidential review of landlord Cartas de Factibilidad &amp; CENACE nodal capacity.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* SECTION: 5 Essential Fiduciary Lease Covenants */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200 dark:border-primary-800 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Fiduciary Legal Architecture
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              5 Non-Negotiable Lease Covenants to Prevent Phantom Power Defaults
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Commercial broker contracts decouple rent from energized utility meters. Mandate these exact clauses into your Mexican industrial lease contract to insulate corporate cash.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                num: 1,
                name: "Utility Energization Condition Precedent (Condición Suspensiva)",
                text: "Notwithstanding any provision herein to the contrary, the Lease Commencement Date, the obligation to take possession of the Leased Premises, and the obligation to pay Base Rent or Operating Expenses shall be strictly conditioned upon the complete, certified energization and delivery of contracted electrical capacity by CFE to Tenant's dedicated meter, as verified by an official CFE UVIE Inspection Certificate."
              },
              {
                num: 2,
                name: "Substation CapEx Escrow & Liquidated Delay Damages",
                text: "Landlord shall cause the construction and commissioning of the on-site electrical substation to be completed no later than [Target Date]. Landlord shall deposit the full estimated construction cost into an irrevocable third-party escrow account. If energization is delayed beyond the Target Date, Landlord shall pay liquidated damages of $1,500.00 USD per calendar day for the first 60 days, and $3,000.00 USD per day thereafter."
              },
              {
                num: 3,
                name: "Contractually Guaranteed kVA Nodal Allocation Rider",
                text: "Landlord legally warrants that of the total capacity allocated to the Industrial Park under CENACE Dictamen [Study Number], strictly [X,XXX] kVA has been dedicated and reserved exclusively for the Leased Premises. Landlord covenants not to reallocate, transfer, or assign any portion of said capacity to any other tenant or building phase."
              },
              {
                num: 4,
                name: "Temporary Power Generation Cost-Sharing Subsidy",
                text: "If the Leased Premises are complete and Tenant desires to begin commissioning prior to CFE energization, Landlord shall provide on-site mobile generators capable of delivering [X,XXX] kW continuous power, and Landlord shall subsidize 100% of the cost differential between generator fuel/rental expenses and standard CFE industrial tariff rates (GDMTH)."
              },
              {
                num: 5,
                name: "Mutual Unconditional Right of Rescission (Rescisión Unilateral)",
                text: "If final CFE energization and certified delivery of contracted utility capacity has not occurred within one hundred twenty (120) calendar days following the Target Energization Date, Tenant shall have the absolute right to terminate this Lease Agreement immediately upon written notice, and Landlord shall refund 100% of all security deposits and prepaid rent."
              }
            ].map((clause) => (
              <div
                key={clause.num}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold">
                      {clause.num}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                      {clause.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyClauseToClipboard(clause.num, clause.text)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-primary-600 transition-colors"
                  >
                    {copiedClause === clause.num ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Clause
                      </>
                    )}
                  </button>
                </div>
                <blockquote className="text-xs md:text-sm text-slate-600 dark:text-slate-300 italic pl-3 border-l-2 border-primary-500 leading-relaxed">
                  &ldquo;{clause.text}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Read Article CTA Footer */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-slate-900 via-slate-850 to-primary-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl md:text-2xl font-black">
              Need Fiduciary Site Selection Due Diligence in Mexico?
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Nearshore Navigator does not accept landlord commissions or represent industrial developers. We represent your corporate balance sheet, independently auditing CFE nodal queues, REPDA water rights, and negotiating penalty-backed leases.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href={`/${lang}/insights/mexico-industrial-real-estate-q3-2026-decoded-power-water-site-selection`}
              className="px-5 py-3 rounded-xl text-xs md:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-center"
            >
              Read Full 10-Market Playbook
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="px-5 py-3 rounded-xl text-xs md:text-sm font-bold bg-primary-500 hover:bg-primary-400 text-white transition-all text-center shadow-lg"
            >
              Contact Our Advisory Team
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
