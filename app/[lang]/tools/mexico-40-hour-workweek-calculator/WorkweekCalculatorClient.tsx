'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  AlertTriangle,
  Users,
  ShieldAlert,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { LeadForm } from '@/components/LeadForm';

const PHASE_SCHEDULE = [
  { year: 2027, baseHours: 46, doubleOtCap: 9, tripleOtCap: 4 },
  { year: 2028, baseHours: 44, doubleOtCap: 10, tripleOtCap: 4 },
  { year: 2029, baseHours: 42, doubleOtCap: 11, tripleOtCap: 4 },
  { year: 2030, baseHours: 40, doubleOtCap: 12, tripleOtCap: 4 },
] as const;

const CORRIDORS = [
  { id: 'baja', label: 'Baja California Border (Tijuana / Mexicali)', defaultWage: 7.84 },
  { id: 'monterrey', label: 'Monterrey / Saltillo', defaultWage: 6.4 },
  { id: 'juarez', label: 'Ciudad Juárez / Reynosa', defaultWage: 7.45 },
  { id: 'bajio', label: 'Bajío / Guadalajara / Hermosillo', defaultWage: 5.5 },
] as const;

const UMA_2026_MXN = 117.31;
const MAX_FINE_UMA = 5000;
const MIN_FINE_UMA = 250;
const FX_MXN_PER_USD = 19.5;

export default function WorkweekCalculatorClient({ language }: { language: string }) {
  const [corridorId, setCorridorId] = useState<string>('baja');
  const [headcount, setHeadcount] = useState<number>(120);
  const [shifts, setShifts] = useState<number>(2);
  const [loadedHourlyUsd, setLoadedHourlyUsd] = useState<number>(7.84);
  const [targetYear, setTargetYear] = useState<number>(2027);
  const [oeeGainPct, setOeeGainPct] = useState<number>(0);

  const selectedCorridor = CORRIDORS.find((c) => c.id === corridorId) || CORRIDORS[0];

  const handleCorridorChange = (id: string) => {
    setCorridorId(id);
    const found = CORRIDORS.find((c) => c.id === id);
    if (found) setLoadedHourlyUsd(found.defaultWage);
  };

  const results = useMemo(() => {
    const phase = PHASE_SCHEDULE.find((p) => p.year === targetYear) || PHASE_SCHEDULE[0];
    const lostHoursPerEmpPerWeek = 48 - phase.baseHours;
    const rawWeeklyHoursGap = headcount * lostHoursPerEmpPerWeek;
    const effectiveGapHours = Math.max(0, rawWeeklyHoursGap * (1 - oeeGainPct / 100));

    // Option 1: Cover gap purely with Double-Pay Overtime (+100% => 2x base rate)
    const weeklyOtCostUsd = effectiveGapHours * loadedHourlyUsd * 2;
    const annualOtCostUsd = weeklyOtCostUsd * 52;

    // Option 2: Cover gap by adding proportional headcount (relief pool / extra operators)
    const extraHeadcountNeeded = Math.ceil(effectiveGapHours / phase.baseHours);
    const annualHiringCostUsd = extraHeadcountNeeded * phase.baseHours * 52 * loadedHourlyUsd;

    // Effective hourly rate inflation if keeping 48h weekly pay across fewer base hours
    const effectiveHourlyAfterReform = (loadedHourlyUsd * 48) / phase.baseHours;
    const unitRateIncreasePct = ((effectiveHourlyAfterReform - loadedHourlyUsd) / loadedHourlyUsd) * 100;

    // STPS Electronic Timekeeping Fine Exposure (LFT Arts. 132 Frac. XXXIV, 994 Frac. IV Bis, 992)
    const maxFinePerEmpMxn = MAX_FINE_UMA * UMA_2026_MXN; // 586,550 MXN at 2026 UMA
    const minFinePerEmpMxn = MIN_FINE_UMA * UMA_2026_MXN;
    const totalMaxFineMxn = maxFinePerEmpMxn * headcount;
    const totalMaxFineUsd = totalMaxFineMxn / FX_MXN_PER_USD;
    const totalMinFineUsd = (minFinePerEmpMxn * headcount) / FX_MXN_PER_USD;

    // Yearly progression table
    const timeline = PHASE_SCHEDULE.map((p) => {
      const gapHrs = headcount * (48 - p.baseHours) * (1 - oeeGainPct / 100);
      const otAnnual = gapHrs * loadedHourlyUsd * 2 * 52;
      const hiresNeeded = Math.ceil(gapHrs / p.baseHours);
      const hireAnnual = hiresNeeded * p.baseHours * 52 * loadedHourlyUsd;
      return {
        ...p,
        gapHrs: Math.round(gapHrs),
        otAnnual: Math.round(otAnnual),
        hiresNeeded,
        hireAnnual: Math.round(hireAnnual),
      };
    });

    return {
      phase,
      lostHoursPerEmpPerWeek,
      effectiveGapHours: Math.round(effectiveGapHours),
      annualOtCostUsd: Math.round(annualOtCostUsd),
      extraHeadcountNeeded,
      annualHiringCostUsd: Math.round(annualHiringCostUsd),
      effectiveHourlyAfterReform,
      unitRateIncreasePct,
      maxFinePerEmpMxn,
      totalMaxFineMxn,
      totalMaxFineUsd: Math.round(totalMaxFineUsd),
      totalMinFineUsd: Math.round(totalMinFineUsd),
      timeline,
    };
  }, [headcount, loadedHourlyUsd, targetYear, oeeGainPct]);

  const defaultBenchmarkMessage = `Modeled ${headcount} operators (${shifts} shifts) in ${selectedCorridor.label} at $${loadedHourlyUsd.toFixed(2)}/hr for ${targetYear} (${results.phase.baseHours}h week): est. ${results.effectiveGapHours.toLocaleString()} weekly hours gap (~$${results.annualHiringCostUsd.toLocaleString()}/yr relief headcount vs. ~$${results.annualOtCostUsd.toLocaleString()}/yr overtime). Requesting a 48-hour 2027 labor & shelter shift-transition benchmark.`;

  const fmtUsd = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Effective January 1, 2027 • LFT &amp; Art. 123 Reform
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mexico 40-Hour Workweek Cost &amp; STPS Fine Calculator (2027–2030)
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Quantify your plant&apos;s phased 48-to-40 hour weekly capacity gap, compare relief-pool hiring vs. expanded double-pay overtime, and estimate indicative STPS electronic timekeeping fine exposure before January 1, 2027.
          </p>
        </header>

        {/* Interactive Calculator Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 bg-gray-900/80 border border-gray-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-400" />
              Plant Operating Parameters
            </h2>

            <div className="space-y-2">
              <label htmlFor="corridor" className="block text-sm font-medium text-gray-300">
                Manufacturing Corridor
              </label>
              <select
                id="corridor"
                value={corridorId}
                onChange={(e) => handleCorridorChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:border-primary-500 outline-none"
              >
                {CORRIDORS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="headcount" className="font-medium text-gray-300">
                  Direct Production Headcount
                </label>
                <span className="font-bold text-primary-400">{headcount} operators</span>
              </div>
              <input
                id="headcount"
                type="range"
                min={20}
                max={1000}
                step={10}
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>20</span>
                <span>250</span>
                <span>500</span>
                <span>1,000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="shifts" className="block text-sm font-medium text-gray-300">
                  Active Shifts
                </label>
                <select
                  id="shifts"
                  value={shifts}
                  onChange={(e) => setShifts(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm"
                >
                  <option value={1}>1 Shift</option>
                  <option value={2}>2 Shifts</option>
                  <option value={3}>3 Shifts (24/6)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="targetYear" className="block text-sm font-medium text-gray-300">
                  Phase-In Year
                </label>
                <select
                  id="targetYear"
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm"
                >
                  <option value={2027}>2027 (46 hrs/wk)</option>
                  <option value={2028}>2028 (44 hrs/wk)</option>
                  <option value={2029}>2029 (42 hrs/wk)</option>
                  <option value={2030}>2030 (40 hrs/wk)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="wage" className="font-medium text-gray-300">
                  Current Fully Burdened Wage (USD/hr)
                </label>
                <span className="font-bold text-white">${loadedHourlyUsd.toFixed(2)}/hr</span>
              </div>
              <input
                id="wage"
                type="range"
                min={4.0}
                max={14.0}
                step={0.1}
                value={loadedHourlyUsd}
                onChange={(e) => setLoadedHourlyUsd(Number(e.target.value))}
                className="w-full accent-primary-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="oee" className="font-medium text-gray-300">
                  Target OEE / SMED Productivity Offset
                </label>
                <span className="font-bold text-emerald-400">{oeeGainPct}% offset</span>
              </div>
              <input
                id="oee"
                type="range"
                min={0}
                max={50}
                step={5}
                value={oeeGainPct}
                onChange={(e) => setOeeGainPct(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-xs text-gray-400">
                Model how much of the lost weekly hours you recover via changeover reduction, staggered handoffs, or bottleneck automation.
              </p>
            </div>
          </div>

          {/* Live Output Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {targetYear} Weekly Capacity Gap ({results.phase.baseHours}h cap)
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {results.effectiveGapHours.toLocaleString()} hrs/wk
                </div>
                <div className="text-xs text-amber-400">
                  Effective hourly rate rises +{results.unitRateIncreasePct.toFixed(1)}% (${results.effectiveHourlyAfterReform.toFixed(2)}/hr) with no wage cuts
                </div>
              </div>

              <div className="bg-gray-900 border border-emerald-900/50 rounded-2xl p-5 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Option A: Relief Pool Headcount
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {fmtUsd(results.annualHiringCostUsd)}
                  <span className="text-sm font-normal text-gray-400">/yr</span>
                </div>
                <div className="text-xs text-gray-300">
                  Requires ~<strong>+{results.extraHeadcountNeeded} operators</strong> (<em>grupos de relevo</em>) at {results.phase.baseHours}h/wk
                </div>
              </div>

              <div className="bg-gray-900 border border-rose-900/50 rounded-2xl p-5 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  Option B: Cover via Double-Pay OT (2x)
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {fmtUsd(results.annualOtCostUsd)}
                  <span className="text-sm font-normal text-gray-400">/yr</span>
                </div>
                <div className="text-xs text-gray-300">
                  {targetYear} legal double-OT cap: <strong>{results.phase.doubleOtCap} hrs/wk</strong> (max 4h/day, 4 days/wk)
                </div>
              </div>

              <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-5 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  STPS Electronic Timekeeping Exposure
                </div>
                <div className="text-2xl font-extrabold text-white">
                  {fmtUsd(results.totalMinFineUsd)} – {fmtUsd(results.totalMaxFineUsd)}
                </div>
                <div className="text-xs text-amber-200/90">
                  Up to <strong>MXN $586,550/employee</strong> (5,000 UMA at 2026 rate; rises Feb 1, 2027) × {headcount} workers under LFT Art. 992
                </div>
              </div>
            </div>

            {/* 2027–2030 Phase-In Table */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-400" />
                  2027–2030 Statutory Phase-In Projection
                </h3>
                <span className="text-xs text-gray-400">Based on {headcount} operators • {oeeGainPct}% OEE offset</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="py-2.5 pr-3">Year</th>
                      <th className="py-2.5 px-3">Base Cap</th>
                      <th className="py-2.5 px-3">2x OT Cap</th>
                      <th className="py-2.5 px-3">Gap (hrs/wk)</th>
                      <th className="py-2.5 px-3">Relief Pool</th>
                      <th className="py-2.5 pl-3">Overtime Cost/yr</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/70 text-gray-200">
                    {results.timeline.map((row) => (
                      <tr key={row.year} className={row.year === targetYear ? 'bg-primary-950/30 font-semibold' : ''}>
                        <td className="py-2.5 pr-3 text-white">{row.year}</td>
                        <td className="py-2.5 px-3">{row.baseHours} hrs</td>
                        <td className="py-2.5 px-3">{row.doubleOtCap} hrs (+4h 3x)</td>
                        <td className="py-2.5 px-3">{row.gapHrs.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-emerald-400">+{row.hiresNeeded} ({fmtUsd(row.hireAnnual)})</td>
                        <td className="py-2.5 pl-3 text-rose-300">{fmtUsd(row.otAnnual)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Caution Callout */}
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-3 text-xs text-gray-300 leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Compressed-Shift Caution (4×10 / 3×12):</strong> Standard daily caps stay at 8h day / 7.5h mixed / 7h night (LFT Art. 61) with an absolute 12-hour daily ceiling. Compressing shifts above 8 hours requires written Art. 58/59 agreements, updated <em>Reglamento Interior</em>, and union CBA alignment.{' '}
                <Link
                  href={`/${language}/insights/mexico-40-hour-workweek-2027-manufacturing-compliance-cost-guide`}
                  className="text-primary-400 underline font-semibold hover:text-primary-300"
                >
                  Read the full 2027–2030 Compliance Guide &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LeadForm Benchmark Section */}
        <section id="workweek-benchmark" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-semibold uppercase tracking-wider">
              Independent Multi-Provider Benchmark
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Don&apos;t Absorb the 2027 Workweek Cost Hike Blind
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We evaluate sites and market-entry models and introduce vetted third-party shelter, HR-compliance, and real estate providers across Mexico—so you can compare 2027–2030 shift-transition pricing across 3–5 independent operators before signing.
            </p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Open-book CFDI 4.0 &amp; IMSS SUA labor burden benchmarking</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Electronic time-attendance readiness across vetted shelter partners</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Introductions to qualified Mexican labor counsel for Art. 58/59 shift agreements</span>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="https://calendly.com/denisse-nearshorenavigator/30min?utm_source=workweek_calculator&utm_campaign=2027_workweek_benchmark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-semibold transition-all"
              >
                <Calendar className="w-4 h-4 text-primary-400" />
                <span>Book a 30-Min Strategy Call Directly</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-gray-800">
              <strong>Advisory Notice:</strong> Figures above are illustrative financial estimates based on 2026 INEGI UMA values ($117.31 MXN) and published LFT reform parameters. Nearshore Navigator is an independent advisory and brokerage firm; we do not provide legal, tax, accounting, or labor-law counsel. Verify all shift structures and statutory calculations with qualified Mexican labor counsel.
            </p>
          </div>

          <div className="lg:col-span-7">
            <LeadForm
              source="workweek_2027_benchmark"
              title="Request a Free 48-Hour 2027 Labor Cost & Shelter Shift-Transition Benchmark"
              subtitle="Share your headcount, shift structure, and target corridor (NDA-protected). We benchmark 3–5 vetted shelter and HR-compliance providers on 2027–2030 shift-transition pricing and electronic timekeeping readiness."
              defaultMessage={defaultBenchmarkMessage}
            />
          </div>
        </section>

        {/* Cross-Links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
          <Link
            href={`/${language}/insights/mexico-40-hour-workweek-2027-manufacturing-compliance-cost-guide`}
            className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-primary-500/50 transition-all"
          >
            <div className="text-xs font-semibold text-primary-400 uppercase mb-1">Cornerstone Guide</div>
            <div className="font-bold text-white text-sm">Mexico 40-Hour Workweek 2027 Compliance Playbook &rarr;</div>
          </Link>
          <Link
            href={`/${language}/tools/cost-calculator`}
            className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-primary-500/50 transition-all"
          >
            <div className="text-xs font-semibold text-primary-400 uppercase mb-1">Financial Modeler</div>
            <div className="font-bold text-white text-sm">Nearshore Landed Cost Calculator &rarr;</div>
          </Link>
          <Link
            href={`/${language}/services/shelter-services`}
            className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-primary-500/50 transition-all"
          >
            <div className="text-xs font-semibold text-primary-400 uppercase mb-1">Market Entry</div>
            <div className="font-bold text-white text-sm">Mexico Shelter Services &amp; Proposal Benchmark &rarr;</div>
          </Link>
        </section>
      </div>
    </main>
  );
}
