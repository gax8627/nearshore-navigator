"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ArrowRight, Calculator, MapPin, Share2 } from "lucide-react";

export default function CostCalculatorClient({ language }: { language: string }) {
  const { t } = useLanguage();

  // State Management
  const [headcount, setHeadcount] = useState(50);
  const [skillLevel, setSkillLevel] = useState(7.84); // 2026 CONASAMI Border Rate
  const [usRate, setUsRate] = useState(17.00);
  const [sqft, setSqft] = useState(25000);
  const [leaseRate, setLeaseRate] = useState(0.79); // Baja CA Class A Default
  const [setupCost, setSetupCost] = useState(100000);

  // Link state
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Constants
  const hoursPerMonth = 160;

  // Derived Calculations
  const monthlyBajaLabor = headcount * skillLevel * hoursPerMonth;
  const monthlyUsLabor = headcount * usRate * hoursPerMonth;
  const monthlyLaborSavings = monthlyUsLabor - monthlyBajaLabor;
  const annualLaborSavings = monthlyLaborSavings * 12;

  const monthlyLeaseCost = sqft * leaseRate;
  
  // Total Operating includes labor savings minus lease cost (assuming lease is a new cost, or we just look at the raw delta)
  // For simplicity based on prompt: "Annual Labor Savings" is primary metric.
  const annualTotalSavings = annualLaborSavings; 
  const paybackMonths = setupCost / monthlyLaborSavings;

  // Update URL for shareability
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        h: headcount.toString(),
        s: skillLevel.toString(),
        ur: usRate.toString(),
        sq: sqft.toString(),
        lr: leaseRate.toString(),
      });
      const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      setShareLink(newUrl);
      
      // Update browser address bar without reload
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    }
  }, [headcount, skillLevel, usRate, sqft, leaseRate]);

  // Read URL params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("h")) setHeadcount(Number(params.get("h")));
      if (params.get("s")) setSkillLevel(Number(params.get("s")));
      if (params.get("ur")) setUsRate(Number(params.get("ur")));
      if (params.get("sq")) setSqft(Number(params.get("sq")));
      if (params.get("lr")) setLeaseRate(Number(params.get("lr")));
    }
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="pb-20 pt-32 overflow-hidden bg-gray-50 dark:bg-gray-900/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('cost_calculator.title') || "Baja California Manufacturing Cost Calculator"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('cost_calculator.subtitle') || "Estimate your fully-burdened manufacturing costs in Mexico vs. US domestic."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Inputs Panel */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
              <Calculator className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cost Variables</h2>
            </div>

            <div className="space-y-8">
              {/* Headcount */}
              <div>
                <label className="flex justify-between font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  <span>Direct Labor Headcount</span>
                  <span className="text-primary-600 dark:text-primary-400">{headcount} Employees</span>
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="5"
                  value={headcount} 
                  onChange={(e) => setHeadcount(Number(e.target.value))} 
                  className="w-full accent-primary-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              {/* Skill Level */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Mexico Skill Level (Fully Burdened $/hr)</label>
                <select 
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(Number(e.target.value))}
                >
                  <option value={7.84}>General Assembly Labor ($7.84/hr)</option>
                  <option value={7.50}>Skilled Technician ($7.50/hr)</option>
                  <option value={15.00}>Engineer / Supervisor ($15.00/hr)</option>
                </select>
              </div>

              {/* US Rate */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">US Equivalent Rate ($/hr)</label>
                <div className="flex items-center">
                  <span className="p-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-200 dark:border-gray-600 rounded-l-xl text-gray-600 dark:text-gray-300">$</span>
                  <input 
                    type="number" 
                    value={usRate} 
                    onChange={(e) => setUsRate(Number(e.target.value))}
                    className="w-full p-3 rounded-r-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Square Footage */}
              <div>
                <label className="flex justify-between font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  <span>Industrial Facility Size (Sq Ft)</span>
                  <span className="text-primary-600 dark:text-primary-400">{sqft.toLocaleString()} sq ft</span>
                </label>
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="5000"
                  value={sqft} 
                  onChange={(e) => setSqft(Number(e.target.value))} 
                  className="w-full accent-primary-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              {/* Lease Rate */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Industrial Region Lease Rate (NNN $/sqft)</label>
                <select 
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  value={leaseRate}
                  onChange={(e) => setLeaseRate(Number(e.target.value))}
                >
                  <option value={0.79}>Baja California Class A ($0.79/sqft)</option>
                  <option value={0.67}>Baja California Class B ($0.67/sqft)</option>
                  <option value={0.72}>Saltillo / Monterrey ($0.72/sqft)</option>
                  <option value={0.62}>Bajío Region ($0.62/sqft)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Results Panel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="bg-primary-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[80px] opacity-20 pointer-events-none -mx-24 -mt-24"></div>
              
              <h3 className="text-lg font-medium text-primary-200 mb-2">Estimated Annual Deficit / Savings</h3>
              <div className="text-5xl font-black text-white mb-8 tracking-tight">
                {formatCurrency(annualTotalSavings)}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-primary-800">
                  <span className="text-primary-100">Monthly Mexico Labor</span>
                  <span className="font-semibold text-xl">{formatCurrency(monthlyBajaLabor)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-primary-800">
                  <span className="text-primary-100">Monthly US Equivalent</span>
                  <span className="font-semibold text-xl">{formatCurrency(monthlyUsLabor)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-primary-800">
                  <span className="text-primary-100">Monthly Lease Cost (Mexico)</span>
                  <span className="font-semibold text-xl">{formatCurrency(monthlyLeaseCost)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-primary-100 bg-primary-800/50 px-3 py-1 rounded-full text-sm">Estimated Payback Period</span>
                  <span className="font-bold text-primary-300">{paybackMonths.toFixed(1)} Months</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-800 flex flex-col sm:flex-row gap-4">
                 <a href="https://calendly.com/denisse-nearshorenavigator/30min" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full py-4 text-primary-900 bg-white hover:bg-gray-100 text-lg">
                      Get Custom Cost Model <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </Button>
                 </a>
                 <Button onClick={handleShare} variant="outline" className="text-white border-white/30 hover:bg-white/10">
                   {copied ? "Copied!" : <><Share2 className="w-4 h-4 mr-2 inline" /> Share</>}
                 </Button>
              </div>
              <p className="text-xs text-primary-300/70 mt-6 leading-relaxed">
                Rates based on 2026 CONASAMI, IVEMSA, and regional market data. Contact Nearshore Navigator for a custom cost model.
              </p>
            </div>

            {/* Internal Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Related Insights</h4>
              <div className="space-y-3">
                <Link href={`/${language}/insights/ultimate-guide-nearshore-shelter-services-baja-california`} className="block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Guide</div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">Ultimate Guide to Nearshore Shelter Services</div>
                </Link>
                <Link href={`/${language}/insights/2025-tariffs-baja-california-supply-chain`} className="block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Analysis</div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">How 2025 Tariffs Reshape Supply Chains</div>
                </Link>
                <Link href={`/${language}/locations/tijuana/contract-manufacturing`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full">
                     <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">Tijuana Contract Manufacturing</div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
