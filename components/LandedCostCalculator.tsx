"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export function LandedCostCalculator() {
  const { t } = useLanguage();
  const [usRate, setUsRate] = useState(38.00);
  const [employees, setEmployees] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  
  const tjRate = 7.84; // 2026 Fully Burdened Rate
  
  const usAnnual = usRate * employees * hoursPerWeek * 52;
  const tjAnnual = tjRate * employees * hoursPerWeek * 52;
  const savings = usAnnual - tjAnnual;
  const savingsPercent = (savings / usAnnual) * 100;

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
      <div className="grid lg:grid-cols-2">
        {/* Left: Inputs */}
        <div className="p-12 lg:p-16 bg-slate-50 border-r border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('tijuanaMasterGuide.calculator.title')}</h2>
          <p className="text-slate-500 mb-10 font-light italic">{t('tijuanaMasterGuide.calculator.subtitle')}</p>
          
          <div className="space-y-10">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t('tijuanaMasterGuide.calculator.label_rate')}</label>
                <span className="text-sky-600 font-black">${usRate.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="25" 
                max="85" 
                step="0.5"
                value={usRate} 
                onChange={(e) => setUsRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t('tijuanaMasterGuide.calculator.label_headcount')}</label>
                <span className="text-sky-600 font-black">{employees} FTEs</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="5"
                value={employees} 
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
            
            <div className="pt-8 border-t border-slate-200 mt-10">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-sky-50 border border-sky-100">
                <div className="w-12 h-12 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">TJ</div>
                <div>
                  <p className="text-xs font-bold text-sky-900 uppercase">{t('tijuanaMasterGuide.calculator.label_baseline')}</p>
                  <p className="text-sm text-sky-700">{t('tijuanaMasterGuide.calculator.label_baseline_sub')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="p-12 lg:p-16 bg-white flex flex-col justify-center">
          <div className="space-y-12">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">{t('tijuanaMasterGuide.calculator.label_savings')}</p>
              <motion.div 
                key={savings}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl lg:text-7xl font-black text-sky-600 tracking-tighter"
              >
                ${(savings / 1000000).toFixed(2)}M
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">{t('tijuanaMasterGuide.calculator.label_reduction')}</p>
                <p className="text-3xl font-bold text-slate-900">{savingsPercent.toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">{t('tijuanaMasterGuide.calculator.label_weekly')}</p>
                <p className="text-3xl font-bold text-slate-900">${(savings / 52 / 1000).toFixed(1)}k</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-light mt-8">
              {t('tijuanaMasterGuide.calculator.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
