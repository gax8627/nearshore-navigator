"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calculator, 
  ShieldCheck, 
  AlertTriangle, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Info,
  Scale,
  Award
} from "lucide-react";

interface SectorConfig {
  name: string;
  category: string;
  netCostThreshold: number;
  txValueThreshold: number;
  description: string;
  citation: string;
}

const SECTOR_PRESETS: Record<string, SectorConfig> = {
  auto_core: {
    name: "Automotive Core Parts",
    category: "Automotive",
    netCostThreshold: 75,
    txValueThreshold: 75,
    description: "Engines, transmissions, chassis, body, axle, steering, suspension, and advanced lithium traction batteries.",
    citation: "USMCA Uniform Regulations Article 4.7 / Appendix to Annex 4-B (Post-ATR Standard)"
  },
  auto_principal: {
    name: "Automotive Principal Parts",
    category: "Automotive",
    netCostThreshold: 70,
    txValueThreshold: 70,
    description: "Brake systems, air bags, electronic control units (ECUs), pumps, and steering columns.",
    citation: "USMCA Table A.2 Principal Parts Harmonized Schedule"
  },
  auto_comp: {
    name: "Automotive Complementary Parts",
    category: "Automotive",
    netCostThreshold: 65,
    txValueThreshold: 65,
    description: "Wiring harnesses, lighting equipment, sensors, switches, audio systems, and interior trim.",
    citation: "USMCA Table B Complementary Parts Staging"
  },
  electronics: {
    name: "Electronics & Semiconductors",
    category: "Technology",
    netCostThreshold: 50,
    txValueThreshold: 60,
    description: "Printed circuit board assemblies (PCBA), semiconductor packaging (OSAT), microelectronics, and telecommunication hardware.",
    citation: "USMCA Chapter 4 Rules of Origin (HTS Chapter 84, 85)"
  },
  medical: {
    name: "Medical Devices & Cleanroom Assemblies",
    category: "Healthcare",
    netCostThreshold: 50,
    txValueThreshold: 60,
    description: "Class I, II, and III surgical instruments, catheters, diagnostics, IV delivery systems, and cleanroom disposables.",
    citation: "USMCA Specific Rules of Origin (HTS Chapter 90, 94)"
  },
  general_industrial: {
    name: "General Industrial Machinery & Metalworking",
    category: "Industrial",
    netCostThreshold: 50,
    txValueThreshold: 60,
    description: "Pumps, valves, electric motors, precision metal stampings, and heavy machinery sub-assemblies.",
    citation: "USMCA General Tariff Shift & Regional Value Content Standard"
  }
};

export default function UsmcaCalculatorClient({ language }: { language: string }) {
  // Sector & Method Selection
  const [sectorKey, setSectorKey] = useState<string>("auto_core");
  const [method, setMethod] = useState<"net_cost" | "tx_value">("net_cost");

  // Financial Inputs (in USD)
  const [totalValue, setTotalValue] = useState<number>(1000); // Net Cost or Transaction Value per unit
  const [vnm, setVnm] = useState<number>(220); // Value of Non-Originating Materials (e.g. Asia/EU inputs)
  const [annualUnits, setAnnualUnits] = useState<number>(25000); // Annual export volume

  // Share link state
  const [copied, setCopied] = useState(false);

  // Sector config
  const currentSector = SECTOR_PRESETS[sectorKey] || SECTOR_PRESETS.auto_core;
  const targetThreshold = method === "net_cost" ? currentSector.netCostThreshold : currentSector.txValueThreshold;

  // Calculation Math
  // RVC = ((Total - VNM) / Total) * 100
  const safeTotal = totalValue > 0 ? totalValue : 1;
  const calculatedRvc = Math.max(0, Math.min(100, ((safeTotal - vnm) / safeTotal) * 100));
  const isQualifying = calculatedRvc >= targetThreshold;
  const margin = calculatedRvc - targetThreshold;

  // Tariff exposure modeling if disqualified
  // Average MFN or Section 301 exposure estimated at 12.5% to 25% on non-qualifying goods
  const totalAnnualValue = safeTotal * annualUnits;
  const estimatedTariffAvoided = totalAnnualValue * 0.15; // 15% blended baseline tariff savings under 0% USMCA

  // Sync with URL params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("sec") && SECTOR_PRESETS[params.get("sec")!]) setSectorKey(params.get("sec")!);
      if (params.get("m") === "tx_value") setMethod("tx_value");
      if (params.get("val")) setTotalValue(Number(params.get("val")));
      if (params.get("vnm")) setVnm(Number(params.get("vnm")));
      if (params.get("vol")) setAnnualUnits(Number(params.get("vol")));
    }
  }, []);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        sec: sectorKey,
        m: method,
        val: totalValue.toString(),
        vnm: vnm.toString(),
        vol: annualUnits.toString()
      });
      const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy URL", err);
      }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="pb-24 pt-32 overflow-hidden bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Capsule */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200 dark:border-blue-800/60">
            <Scale className="w-3.5 h-3.5" />
            USMCA Rules of Origin Audit Tool (2026 Release)
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            USMCA Regional Value Content (RVC) Calculator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Verify whether your Mexican manufacturing production qualifies for <strong>0% USMCA Duty-Free Tariff Preference</strong> under post-ATR automotive, electronics, and medical regulatory mandates.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            
            {/* Sector Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Target Sector / Rule of Origin Appendix
              </label>
              <select
                value={sectorKey}
                onChange={(e) => setSectorKey(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              >
                {Object.entries(SECTOR_PRESETS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name} (Requires {method === "net_cost" ? item.netCostThreshold : item.txValueThreshold}% RVC)
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-start gap-1.5">
                <Info className="w-4 h-4 shrink-0 text-blue-500 mt-0.5" />
                {currentSector.description}
              </p>
            </div>

            {/* Calculation Method Toggle */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                USMCA Valuation Method
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMethod("net_cost")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    method === "net_cost"
                      ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Net Cost Method (NC)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("tx_value")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    method === "tx_value"
                      ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Transaction Value (TV)
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {method === "net_cost" 
                  ? "Mandatory for automotive OEM assemblies; excludes royalties, sales marketing, and non-allowable interest."
                  : "Based on FOB transaction price adjusted for customs freight and packaging; standard for non-automotive goods."}
              </p>
            </div>

            {/* Numeric Sliders / Inputs */}
            <div className="space-y-6 pt-2 border-t border-slate-100 dark:border-slate-800">
              
              {/* Total Net Cost / Transaction Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {method === "net_cost" ? "Unit Net Cost (NC)" : "Transaction Value (TV)"} (USD)
                  </label>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {formatCurrency(totalValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="25"
                  value={totalValue}
                  onChange={(e) => setTotalValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Value of Non-Originating Materials (VNM) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Non-Originating Materials (VNM) (USD)
                    </label>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      Subcomponents imported from Asia, Europe, or non-USMCA origins
                    </span>
                  </div>
                  <span className="text-base font-bold text-rose-600 dark:text-rose-400">
                    {formatCurrency(vnm)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={totalValue}
                  step="10"
                  value={vnm}
                  onChange={(e) => setVnm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              {/* Annual Export Volume */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Projected Annual US Export Units
                  </label>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {annualUnits.toLocaleString()} units
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={annualUnits}
                  onChange={(e) => setAnnualUnits(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

            </div>

            {/* Share & Reset Actions */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                {copied ? "Link Copied to Clipboard!" : "Share Audit Configuration"}
              </button>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                Formula: (({method === "net_cost" ? "NC" : "TV"} - VNM) / {method === "net_cost" ? "NC" : "TV"}) × 100
              </div>
            </div>

          </div>

          {/* Results Scorecard Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Qualification Banner */}
            <div className={`rounded-2xl p-6 md:p-8 border shadow-lg transition-all ${
              isQualifying 
                ? "bg-emerald-950/20 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-900 dark:text-emerald-100" 
                : "bg-rose-950/20 dark:bg-rose-950/40 border-rose-500/40 text-rose-900 dark:text-rose-100"
            }`}>
              
              <div className="flex items-center gap-3 mb-4">
                {isQualifying ? (
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block opacity-75">
                    USMCA Customs Status
                  </span>
                  <h3 className="text-xl font-extrabold">
                    {isQualifying ? "QUALIFIES FOR 0% USMCA DUTY-FREE" : "DISQUALIFIED — TARIFF RISK"}
                  </h3>
                </div>
              </div>

              {/* Big Metric Display */}
              <div className="my-6 py-4 px-5 rounded-xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/60">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Calculated RVC:
                  </span>
                  <span className={`text-4xl font-black ${isQualifying ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {calculatedRvc.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <span>Statutory Threshold Required:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{targetThreshold}%</span>
                </div>
                <div className="flex justify-between items-center text-xs mt-1 text-slate-500 dark:text-slate-400">
                  <span>Compliance Safety Buffer:</span>
                  <span className={`font-bold ${margin >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                    {margin >= 0 ? `+${margin.toFixed(1)}% Safe` : `${margin.toFixed(1)}% Deficit`}
                  </span>
                </div>
              </div>

              {/* Financial Impact */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">Annual Export Value:</span>
                  <span className="font-semibold">{formatCurrency(totalAnnualValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Estimated Tariff Savings (at 0% USMCA):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(estimatedTariffAvoided)}/yr</span>
                </div>
              </div>

              {/* Regulatory Citation Footer */}
              <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 text-xs opacity-75">
                <strong>Basis:</strong> {currentSector.citation}
              </div>

            </div>

            {/* Advisory CTA Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                Fiduciary Compliance Verification
              </div>
              <h4 className="text-xl font-bold mb-3">
                Need an Audit-Proof Origin Certification?
              </h4>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6">
                CBP and SAT perform automated AI audits on Annex 24/30 pedimentos and supplier flow-down BOMs. Schedule a confidential origin verification with Denisse Martinez to protect your duty-free status.
              </p>
              
              <div className="space-y-3">
                <a
                  href="https://calendly.com/denisse-nearshorenavigator/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all shadow-md hover:shadow-blue-500/25"
                >
                  <span>Book Free Origin Strategy Review (30 Min)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href={`/${language}/services/shelter-services`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-blue-200 text-xs font-semibold transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Learn How Shelter Structures Shield RVC Liability</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Educational Content / AEO Context Section */}
        <div className="mt-16 bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            USMCA Rules of Origin & RVC Calculation Architecture (2026 Direct Answers)
          </h2>
          
          <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                1. How Is Regional Value Content (RVC) Calculated Under USMCA?
              </h3>
              <p className="mb-2">
                <strong>Direct Answer:</strong> Under USMCA Chapter 4, Regional Value Content measures the percentage of a finished product's value originating within the United States, Mexico, or Canada. The Net Cost Method subtracts the Value of Non-Originating Materials (VNM) from total manufacturing Net Cost, while Transaction Value uses the FOB commercial invoice value.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                2. What Are the 2026 Automotive RVC Mandates Post-ATR Expiration?
              </h3>
              <p className="mb-2">
                <strong>Direct Answer:</strong> As of 2026, all Alternative Transition Regimes (ATR) have expired. Light vehicles and passenger cars require a strict 75% Net Cost RVC threshold. Core parts (engines, transmissions, chassis, axles) require 75%, principal parts require 70%, and complementary components require 65% RVC, coupled with 70% North American steel/aluminum purchasing and $16/hr Labor Value Content (LVC).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                3. What Is the Difference Between Net Cost and Transaction Value?
              </h3>
              <p className="mb-2">
                <strong>Direct Answer:</strong> The Transaction Value method calculates RVC based on the total commercial sales price, making it simpler for consumer goods and electronics. The Net Cost method strips out non-allowable expenses (sales promotion, marketing, after-sales service, royalties, and non-allowable interest) to calculate origin purely on direct production labor, raw materials, and factory overhead.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
