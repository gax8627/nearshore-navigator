"use client";

import { useState, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Share2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
  Info,
  Scale,
  Award,
  DollarSign,
  Building2,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Flame,
  FileSpreadsheet
} from "lucide-react";

export type CertificationModality = "AAA" | "AA" | "A" | "uncertified";

interface QuestionnaireItem {
  id: "anexo24_vucem" | "anexo30_discharge" | "opinion_32d" | "sensitive_fractions" | "virtual_pedimentos" | "submaquila_registered";
  number: number;
  question: string;
  tag: string;
  citation: string;
  weight: number;
  description: string;
  auditTrigger: string;
  remediationTitle: string;
  remediationSteps: string[];
}

const QUESTIONNAIRE_ITEMS: QuestionnaireItem[] = [
  {
    id: "anexo24_vucem",
    number: 1,
    question: "Anexo 24 vs VUCEM Data Stage monthly reconciliation completed?",
    tag: "Inventory Reconciliation",
    citation: "Ley Aduanera Art. 59, Fracc. I • RGCE Rule 4.3.1 & 7.1.1",
    weight: 20,
    description:
      "Continuous electronic cross-check between your ERP customs inventory database and VUCEM Data Stage (Stage 1-5 pedimento records) to eliminate tariff fraction, commercial quantity, and valuation discrepancies.",
    auditTrigger:
      "SAT neural networks ingest monthly pedimento filings. Variances above 0.5% between ERP inputs and VUCEM records trigger automated CFF Article 53-B electronic pre-liquidation notices via Buzón Tributario.",
    remediationTitle: "Automate Monthly Data Stage (SDA) Pedimento Ingestion",
    remediationSteps: [
      "Request raw Data Stage Stage 1-5 files from your customs broker or download directly from SAT VUCEM portal.",
      "Execute automated cross-reconciliation against internal ERP Bill of Materials (BOM) explosions and customs inventories.",
      "File spontaneous pedimento rectifications (Clave R1) under Customs Law Article 89 before SAT delivers formal electronic audit notifications."
    ]
  },
  {
    id: "anexo30_discharge",
    number: 2,
    question: "Anexo 30 discharge reports (informes de descargo) formally validated in SCCC-VE without error codes?",
    tag: "Fiscal Credit Ledger & Validation",
    citation: "Ley del IVA Art. 28-A • RGCE Rule 7.1.1 & 7.2.1",
    weight: 20,
    description:
      "Timely monthly discharge submissions verified with a formal Acuse de Validación showing status 'VÁLIDO' (submitting is not equal to validating), with zero open rejection codes (claves de rechazo).",
    auditTrigger:
      "A preliminary 'Acuse de Recepción' grants zero legal immunity. If SAT's batch algorithms flag rejections (Error 01 BOM mismatch, Error 04 lack of balance, Error 08 negative balance, Error 12 expired pedimento) and 30 days lapse without rectification, SAT automatically revokes CIVA and triggers 16% VAT clawbacks plus 70–100% fines.",
    remediationTitle: "Purge SCCC-VE Discrepancies & Enforce 'Acuse de Validación' Review",
    remediationSteps: [
      "Extract current 'Estado de Cuenta de Créditos y Garantías' and confirm each discharge reflects status 'VÁLIDO' (Acuse de Validación), not merely an upload timestamp (Acuse de Recepción).",
      "Screen for automated SCCC-VE rejection codes (Error 01 Fracción no correlativa, Error 04 Falta de saldo, Error 08 Sobredescargo, Error 12 Pedimento vencido) and reconcile root BOM causes.",
      "Submit extemporaneous corrected discharge reports (informes rectificados) within the strict 30-day statutory grace window under RGCE Rule 7.2.1 before automated Buzón Tributario pre-liquidations trigger."
    ]
  },
  {
    id: "opinion_32d",
    number: 3,
    question: "SAT Opinión de Cumplimiento (Art. 32-D CFF) positive for legal entity, partners, and top 10 suppliers?",
    tag: "Fiscal Integrity & EFOS",
    citation: "Código Fiscal de la Federación Art. 32-D & 69-B • RGCE Rule 7.2.4",
    weight: 15,
    description:
      "Active 'Positiva' compliance opinions for the Mexican manufacturing subsidiary, direct shareholders/board members, and continuous monthly screening of Tier-1 vendors against SAT blacklists.",
    auditTrigger:
      "Under RGCE 7.2.4, a single negative 32-D opinion or active invoice transaction with a blacklisted EFOS (Empresa que Factura Operaciones Simuladas) triggers automatic CIVA suspension without prior administrative hearing.",
    remediationTitle: "Establish Automated 32-D & Art. 69-B Vendor Screening",
    remediationSteps: [
      "Download fresh 32-D opinions for the company and registered legal representatives on the 1st of every month.",
      "Implement an automated supplier scrub against the official SAT Article 69-B definitive blacklist published in the DOF.",
      "Freeze payments and withhold purchase orders from any supplier exhibiting tax liens or non-compliant fiscal status."
    ]
  },
  {
    id: "sensitive_fractions",
    number: 4,
    question: "Sensitive tariff fractions (steel, aluminum, textiles) under active physical inventory lock?",
    tag: "High-Risk Commodities",
    citation: "2024–2026 Presidential Decrees • RGCE Anexo II • Ley Aduanera Art. 151",
    weight: 15,
    description:
      "Strict physical and electronic isolation of steel, aluminum, and textile inputs subject to heightened Mexican import tariffs, special permits, and installed capacity quotas.",
    auditTrigger:
      "AGACE customs inspectors prioritize physical unannounced plant inspections on sensitive commodity importers. Physical shortages or inventory discrepancies mandate immediate precautionary seizure (PAMA).",
    remediationTitle: "Enforce Physical Cycle Counts & Installed Capacity Audits",
    remediationSteps: [
      "Physically quarantine and tag all Anexo II sensitive raw materials in dedicated, access-controlled plant staging zones.",
      "Verify that temporary import volume limits strictly match active Secretaría de Economía (SE) IMMEX program permits.",
      "Maintain 100% lot-level traceability linking inbound pedimentos directly to finished export commercial invoices."
    ]
  },
  {
    id: "virtual_pedimentos",
    number: 5,
    question: "Virtual pedimentos (V1/V5) reconciled with vendor/client cross-matching?",
    tag: "Inter-Maquila Transfers",
    citation: "Ley Aduanera Art. 112 • RGCE Rule 4.3.21 & 5.2.6",
    weight: 15,
    description:
      "Bilateral monthly reconciliation of virtual pedimentos (V1 transfers between maquiladoras, V5 domestic vendor transfers) ensuring reciprocal pedimentos are validated and stamped.",
    auditTrigger:
      "If your Mexican customer or vendor fails to stamp their reciprocal closing virtual pedimento within the calendar month, the temporary import remains open on your books as an unpaid tax debt.",
    remediationTitle: "Close Unliquidated Virtual Pedimentos with Counterparties",
    remediationSteps: [
      "Run an open virtual balance report in Anexo 24 identifying any V1/V5 transfers exceeding 30 calendar days.",
      "Request stamped reciprocal pedimento copies (pedimento virtual correlativo) from the transfer counterparty.",
      "Where counterparties failed to validate, execute unilateral rectifications or return declarations under RGCE 4.3.21."
    ]
  },
  {
    id: "submaquila_registered",
    number: 6,
    question: "Sub-maquila facilities physically registered and inspected with AGACE?",
    tag: "Subcontractor Domiciles",
    citation: "Ley Aduanera Art. 21 & 144 • RGCE Rule 7.2.1",
    weight: 15,
    description:
      "All third-party secondary processors (coating, heat treatment, stamping, outside warehouses) officially declared on VUCEM with verified tax domiciles and operational capacity.",
    auditTrigger:
      "Under Mexican Customs Law, materials found at an unregistered physical location are treated as illegal contraband or unauthorized domestic diversion, triggering immediate IMMEX program suspension.",
    remediationTitle: "Register Auxiliary Domiciles on VUCEM Submaquila Registry",
    remediationSteps: [
      "Review all external contractor and warehousing agreements for active temporary import processing.",
      "File an official 'Aviso de Submaquila' on VUCEM including certified RFC, lease contract, and IMSS employee rosters.",
      "Confirm that Complemento Carta Porte 3.1 transport CFDI invoices strictly specify registered sub-maquila plant addresses."
    ]
  }
];

const MODALITY_DETAILS: Record<
  CertificationModality,
  {
    title: string;
    term: string;
    vatCredit: string;
    refundWindow: string;
    auditScrutiny: string;
    basePenalty: number;
    badgeColor: string;
    multiplier: number;
  }
> = {
  AAA: {
    title: "Modality AAA (Premier Tier)",
    term: "3-Year Certification Validity",
    vatCredit: "100% VAT Tax Credit (0% Cash Prepayment)",
    refundWindow: "Accelerated 10-Day Statutory Refund Window",
    auditScrutiny: "Lowest Routine Audit Frequency (Randomized AI Surveillance)",
    basePenalty: 0,
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    multiplier: 0.70
  },
  AA: {
    title: "Modality AA (Intermediate Tier)",
    term: "2-Year Certification Validity",
    vatCredit: "100% VAT Tax Credit (0% Cash Prepayment)",
    refundWindow: "15-Day Expedited Statutory Refund Window",
    auditScrutiny: "Moderate Audit Surveillance (Requires 4+ Yrs IMMEX or 50+ Workers)",
    basePenalty: 5,
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
    multiplier: 0.80
  },
  A: {
    title: "Modality A (Standard Baseline)",
    term: "1-Year Certification Validity (Annual Renewal Required)",
    vatCredit: "100% VAT Tax Credit (0% Cash Prepayment)",
    refundWindow: "Standard 60-Day Statutory Refund Window",
    auditScrutiny: "High Audit Frequency (Annual Re-inspection by AGACE)",
    basePenalty: 10,
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    multiplier: 0.90
  },
  uncertified: {
    title: "Uncertified / In Application / Suspended",
    term: "No Active VAT Certification",
    vatCredit: "0% Credit — 16% Cash Prepaid Upfront at Clearance",
    refundWindow: "Standard Refund Claim (180+ Days Processing Delays)",
    auditScrutiny: "Maximum Regulatory Exposure (Prepayment Mandatory)",
    basePenalty: 35,
    badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
    multiplier: 0.65
  }
};

export default function CivaCalculatorClient({ language }: { language: string }) {
  const [, startTransition] = useTransition();

  // Inputs
  const [monthlyImports, setMonthlyImports] = useState<number>(5000000);
  const [importInputText, setImportInputText] = useState<string>("5,000,000");
  const [certification, setCertification] = useState<CertificationModality>("A");
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    anexo24_vucem: true,
    anexo30_discharge: true,
    opinion_32d: true,
    sensitive_fractions: true,
    virtual_pedimentos: false,
    submaquila_registered: true
  });

  // UI state
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync inputs from URL params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const vol = params.get("vol");
      const cert = params.get("cert");

      if (vol) {
        const parsed = Number(vol);
        if (!isNaN(parsed) && parsed >= 500000 && parsed <= 50000000) {
          setMonthlyImports(parsed);
          setImportInputText(parsed.toLocaleString("en-US"));
        }
      }

      if (cert && ["AAA", "AA", "A", "uncertified"].includes(cert)) {
        setCertification(cert as CertificationModality);
      }

      setAnswers((prev) => {
        const updated = { ...prev };
        QUESTIONNAIRE_ITEMS.forEach((item, idx) => {
          const val = params.get(`q${idx + 1}`);
          if (val === "0") updated[item.id] = false;
          if (val === "1") updated[item.id] = true;
        });
        return updated;
      });
    }
  }, []);

  // Update URL params without reloading page
  const updateUrl = (
    newVol: number,
    newCert: CertificationModality,
    newAnswers: Record<string, boolean>
  ) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("vol", newVol.toString());
      params.set("cert", newCert);
      QUESTIONNAIRE_ITEMS.forEach((item, idx) => {
        params.set(`q${idx + 1}`, newAnswers[item.id] ? "1" : "0");
      });
      const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    }
  };

  // Handlers
  const handleSliderChange = (val: number) => {
    setMonthlyImports(val);
    setImportInputText(val.toLocaleString("en-US"));
    updateUrl(val, certification, answers);
  };

  const handleInputChange = (text: string) => {
    setImportInputText(text);
    const numeric = Number(text.replace(/[^0-9]/g, ""));
    if (!isNaN(numeric) && numeric >= 500000 && numeric <= 50000000) {
      setMonthlyImports(numeric);
      updateUrl(numeric, certification, answers);
    }
  };

  const handleInputBlur = () => {
    const numeric = Number(importInputText.replace(/[^0-9]/g, ""));
    const bounded = isNaN(numeric) || numeric < 500000
      ? 500000
      : Math.min(50000000, numeric);
    setMonthlyImports(bounded);
    setImportInputText(bounded.toLocaleString("en-US"));
    updateUrl(bounded, certification, answers);
  };

  const handleCertificationChange = (cert: CertificationModality) => {
    setCertification(cert);
    updateUrl(monthlyImports, cert, answers);
  };

  const handleToggleAnswer = (id: string) => {
    startTransition(() => {
      setAnswers((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        updateUrl(monthlyImports, certification, next);
        return next;
      });
    });
  };

  // Calculations
  const calculations = useMemo(() => {
    const monthlyVatRisk = monthlyImports * 0.16;
    const annualCapitalFreeze = monthlyVatRisk * 12;

    // Statutory fines under Ley Aduanera Art. 178: 70% to 100% of omitted duties
    const penaltyMin = annualCapitalFreeze * 0.70;
    const penaltyMax = annualCapitalFreeze * 1.00;

    // CFF Art. 21 inflation & surcharges (actualización e recargos): estimated at ~22.5% per annum
    const surchargeAndInflation = annualCapitalFreeze * 0.225;
    const totalExposureMin = annualCapitalFreeze + penaltyMin + surchargeAndInflation;
    const totalExposureMax = annualCapitalFreeze + penaltyMax + surchargeAndInflation;

    // Calculate questionnaire penalty points
    let rawFailedPoints = 0;
    let failedCount = 0;
    QUESTIONNAIRE_ITEMS.forEach((item) => {
      if (!answers[item.id]) {
        rawFailedPoints += item.weight;
        failedCount += 1;
      }
    });

    const modalityConfig = MODALITY_DETAILS[certification];
    let calculatedScore = Math.round(modalityConfig.basePenalty + rawFailedPoints * modalityConfig.multiplier);

    // Critical Discrepancy Rule: Under SAT Plan Maestro 2026, failing Anexo 24 reconciliation
    // or Anexo 30 discharge filings triggers automatic CFF Article 53-B electronic audit notices,
    // precluding a "Low Risk" classification even under Modality AAA.
    const criticalDiscrepancy = !answers.anexo24_vucem || !answers.anexo30_discharge;
    if (criticalDiscrepancy && calculatedScore < 35) {
      calculatedScore = 35;
    }

    const auditVulnerabilityScore = Math.min(100, Math.max(0, calculatedScore));

    let riskTier: "low" | "moderate" | "critical";
    if (auditVulnerabilityScore < 30) {
      riskTier = "low";
    } else if (auditVulnerabilityScore <= 65) {
      riskTier = "moderate";
    } else {
      riskTier = "critical";
    }

    return {
      monthlyVatRisk,
      annualCapitalFreeze,
      penaltyMin,
      penaltyMax,
      surchargeAndInflation,
      totalExposureMin,
      totalExposureMax,
      failedCount,
      auditVulnerabilityScore,
      riskTier
    };
  }, [monthlyImports, certification, answers]);

  const failedItems = useMemo(() => {
    return QUESTIONNAIRE_ITEMS.filter((item) => !answers[item.id]);
  }, [answers]);

  const formatCurrency = (val: number, fractionDigits = 0) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: fractionDigits
    }).format(val);
  };

  const handleShareLink = async () => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams();
        params.set("vol", monthlyImports.toString());
        params.set("cert", certification);
        QUESTIONNAIRE_ITEMS.forEach((item, idx) => {
          params.set(`q${idx + 1}`, answers[item.id] ? "1" : "0");
        });
        const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    }
  };

  const handleCopySummary = async () => {
    const summaryText = `--- NEARSHORE NAVIGATOR: CIVA VAT RISK & ANEXO 30 AUDIT ASSESSMENT ---
Monthly Temporary Import Volume: ${formatCurrency(monthlyImports)}
Certification Status: ${MODALITY_DETAILS[certification].title}
Audit Vulnerability Score: ${calculations.auditVulnerabilityScore}% (${calculations.riskTier.toUpperCase()} RISK)

FINANCIAL IMPACT:
• Immediate Monthly 16% VAT Cash Outflow: ${formatCurrency(calculations.monthlyVatRisk)} / month
• Annual Working Capital Freeze: ${formatCurrency(calculations.annualCapitalFreeze)} / year
• Statutory Fines (Art. 178 LA, 70%-100%): ${formatCurrency(calculations.penaltyMin)} - ${formatCurrency(calculations.penaltyMax)}
• Estimated CFF Art. 21 Surcharges & Inflation (~22.5%): ${formatCurrency(calculations.surchargeAndInflation)}
• Total Potential Fiscal Exposure: ${formatCurrency(calculations.totalExposureMin)} - ${formatCurrency(calculations.totalExposureMax)}

AUDIT FINDINGS (${calculations.failedCount} High-Impact Deficiencies):
${
  failedItems.length === 0
    ? "• All 6 statutory compliance controls passed."
    : failedItems.map((f, i) => `${i + 1}. [ACTION REQUIRED] ${f.question} (${f.citation})`).join("\n")
}

Consultation Reference: https://nearshorenavigator.com/${language}/tools/civa-audit-risk-calculator
Confidential Advisor: Denisse Martinez, Principal Nearshore Advisor`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch (err) {
      console.error("Copy summary failed", err);
    }
  };

  const calendlyUrl = `https://calendly.com/denisse-nearshorenavigator/30min?utm_source=civa_calculator&utm_medium=interactive_tool&utm_campaign=civa_audit_risk&utm_content=${certification}_${calculations.riskTier}`;

  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
      (window as unknown as { gtag: Function }).gtag("event", "click_calendly", {
        event_category: "lead_generation",
        event_label: "civa_calculator_consultation",
        value: calculations.monthlyVatRisk,
        modality: certification,
        risk_tier: calculations.riskTier
      });
    }
  };

  return (
    <div className="pb-24 pt-32 overflow-hidden bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Top Header Capsule */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-800/80">
            <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>SAT Plan Maestro 2026 Audit Diagnostic</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-4xl mx-auto">
            CIVA VAT Risk & Anexo 30 Audit Assessment Tool
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Quantify your company&apos;s immediate <strong>16% VAT cash outflow exposure</strong>, Anexo 24 vs 30 discharge gaps, and AGACE electronic audit vulnerability under <em>Article 28-A of the Mexican VAT Law</em>.
          </p>

          {/* Quick Stat Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              16% Statutory VAT Credit
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              18-Month Temporary Return Clock
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              CFF Art. 26 Director Solidary Liability
            </span>
          </div>
        </div>

        {/* Main Grid: Controls (7 cols) + Sticky Scorecard (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Control Box 1: Monthly Temporary Import Volume */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <label htmlFor="import-volume-input" className="block text-base font-bold text-slate-900 dark:text-white">
                    Monthly Temporary Import Volume (USD)
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Raw materials, parts, and machinery imported under IMMEX pedimentos (Clave IN / AF)
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </span>
                  <input
                    type="text"
                    id="import-volume-input"
                    aria-label="Monthly Temporary Import Volume numeric entry"
                    value={importInputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={handleInputBlur}
                    className="w-full sm:w-44 pl-7 pr-3 py-2 text-right text-lg font-black bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-3 pt-2">
                <input
                  type="range"
                  id="import-volume-range"
                  aria-label="Monthly Temporary Import Volume in USD"
                  aria-valuenow={monthlyImports}
                  aria-valuemin={500000}
                  aria-valuemax={50000000}
                  min="500000"
                  max="50000000"
                  step="250000"
                  value={monthlyImports}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 font-medium">
                  <span>$500K / mo</span>
                  <span>$10M / mo</span>
                  <span>$25M / mo</span>
                  <span>$50M+ / mo</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                  Standard Manufacturing Volume Presets:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: "$1M/mo", desc: "Mid-Market", val: 1000000 },
                    { label: "$5M/mo", desc: "High Volume", val: 5000000 },
                    { label: "$15M/mo", desc: "Tier-1 Auto", val: 15000000 },
                    { label: "$30M/mo", desc: "Major OEM", val: 30000000 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => handleSliderChange(preset.val)}
                      className={`px-3 py-2 rounded-xl text-left border transition-all text-xs ${
                        monthlyImports === preset.val
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold"
                          : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold">{preset.label}</div>
                      <div className="text-[10px] opacity-75">{preset.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Control Box 2: Current Certification Status */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="mb-4">
                <label className="block text-base font-bold text-slate-900 dark:text-white mb-1">
                  Current CIVA Certification Status (RGCE Rule 7.1.1 - 7.1.3)
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your active VAT/IEPS certification tier or pending application status in Mexico.
                </p>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                role="radiogroup"
                aria-label="CIVA Certification Modality Selection"
              >
                {(
                  [
                    { key: "AAA", title: "Modality AAA", desc: "3-Yr Validity • 10-Day Refunds • Top Tier", badge: "Preferred" },
                    { key: "AA", title: "Modality AA", desc: "2-Yr Validity • 15-Day Refunds • Intermediate", badge: "Standard" },
                    { key: "A", title: "Modality A", desc: "1-Yr Validity • 60-Day Refunds • Baseline", badge: "Annual Audit" },
                    { key: "uncertified", title: "Uncertified / In App", desc: "0% Credit • 16% Cash Prepaid Upfront", badge: "High Outflow" }
                  ] as const
                ).map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    role="radio"
                    aria-checked={certification === tier.key}
                    aria-label={`${tier.title}: ${tier.desc}`}
                    onClick={() => handleCertificationChange(tier.key)}
                    className={`p-4 rounded-xl border text-left transition-all relative ${
                      certification === tier.key
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {tier.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {tier.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {tier.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* Modality Insight Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    {MODALITY_DETAILS[certification].title}:
                  </strong>{" "}
                  {MODALITY_DETAILS[certification].vatCredit}. {MODALITY_DETAILS[certification].refundWindow}.
                </div>
              </div>
            </div>

            {/* Control Box 3: Diagnostic Self-Audit Questionnaire (6 Factors) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Diagnostic Self-Audit Questionnaire (6 High-Impact Controls)
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Toggle each operational compliance factor based on your facility&apos;s current customs procedures.
              </p>

              <div className="space-y-4">
                {QUESTIONNAIRE_ITEMS.map((item) => {
                  const isChecked = answers[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-xl border transition-all ${
                        isChecked
                          ? "bg-slate-50/70 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800"
                          : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300/70 dark:border-rose-900/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              Item #{item.number}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                              {item.tag}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              {item.citation}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {item.question}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.description}
                          </p>

                          {!isChecked && (
                            <div className="pt-2 text-xs text-rose-700 dark:text-rose-400 flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>
                                <strong>SAT Audit Risk:</strong> {item.auditTrigger}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Interactive Status Switch */}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isChecked}
                          aria-label={`Toggle Item ${item.number}: ${item.question}. Status: ${isChecked ? "Compliant" : "At Risk"}`}
                          onClick={() => handleToggleAnswer(item.id)}
                          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            isChecked
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-500/20"
                          }`}
                        >
                          {isChecked ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Pass / Compliant</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              <span>At Risk / Failed</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reset / Share Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleShareLink}
                  className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedLink ? "Audit Link Copied to Clipboard!" : "Share Audit Configuration Link"}
                </button>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedSummary ? "Executive Summary Copied!" : "Copy Executive Briefing"}
                </button>
              </div>
            </div>

            {/* Control Box 4: Actionable SAT Audit Defense Playbook */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                    <FileSpreadsheet className="w-4 h-4" />
                    Customs Compliance Action Plan
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Actionable SAT Audit Defense Playbook
                  </h3>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    calculations.failedCount === 0
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                  }`}
                >
                  {calculations.failedCount === 0
                    ? "Audit-Proof Status"
                    : `${calculations.failedCount} Priority Remediation${calculations.failedCount > 1 ? "s" : ""}`}
                </span>
              </div>

              {failedItems.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Based on your diagnostic responses, your Mexican facility is vulnerable to automated discrepancy flags under the <strong>SAT Plan Maestro 2026</strong>. Execute the following legal and operational cures:
                  </p>

                  <div className="space-y-4">
                    {failedItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-rose-700 dark:text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Remediation #{idx + 1}: {item.remediationTitle}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {item.citation}
                          </span>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pl-4 list-disc">
                          {item.remediationSteps.map((step, stepIdx) => (
                            <li key={stepIdx} className="leading-relaxed">
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    All 6 Primary Compliance Pillars Active & Compliant
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    Your Mexican operation maintains exemplary Anexo 24/30 reconciliation discipline. Continue conducting monthly Data Stage delta reconciliations. If currently operating under Modality A or AA, consider applying for an upgrade to <strong>Modality AAA</strong> to secure 3-year certification validity and 10-day statutory VAT refund processing.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Sticky Results & Advisory Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Exposure Scorecard Box */}
            <div
              className={`rounded-2xl p-6 md:p-8 border shadow-lg transition-all ${
                calculations.riskTier === "low"
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-950 dark:text-emerald-100"
                  : calculations.riskTier === "moderate"
                  ? "bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-500/40 text-amber-950 dark:text-amber-100"
                  : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-500/40 text-rose-950 dark:text-rose-100"
              }`}
            >
              {/* Header Status */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    calculations.riskTier === "low"
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : calculations.riskTier === "moderate"
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                      : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {calculations.riskTier === "low" ? (
                    <ShieldCheck className="w-6 h-6" />
                  ) : calculations.riskTier === "moderate" ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    <Flame className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider block opacity-75">
                    AGACE Audit Exposure Index
                  </span>
                  <h4 className="text-xl font-black">
                    {calculations.riskTier === "low"
                      ? "LOW AUDIT RISK"
                      : calculations.riskTier === "moderate"
                      ? "MODERATE AUDIT VULNERABILITY"
                      : "CRITICAL AUDIT EXPOSURE"}
                  </h4>
                </div>
              </div>

              {/* Audit Score Meter */}
              <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/80 mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Vulnerability Score:
                  </span>
                  <span
                    className={`text-3xl font-black ${
                      calculations.riskTier === "low"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : calculations.riskTier === "moderate"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {calculations.auditVulnerabilityScore}%
                  </span>
                </div>

                {/* Meter Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      calculations.riskTier === "low"
                        ? "bg-emerald-500"
                        : calculations.riskTier === "moderate"
                        ? "bg-amber-500"
                        : "bg-rose-600"
                    }`}
                    style={{ width: `${calculations.auditVulnerabilityScore}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  <span>0% (Secure)</span>
                  <span>30% Threshold</span>
                  <span>65% Critical</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Financial Outflow Metrics */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/60">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    Immediate Monthly 16% VAT Cash Outflow Risk:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
                    {formatCurrency(calculations.monthlyVatRisk)}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ month</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Mandatory upfront cash payment required at customs clearance if CIVA is canceled or suspended.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/60">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    Annual Working Capital Freeze:
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {formatCurrency(calculations.annualCapitalFreeze)}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ year</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Cumulative operating capital locked in the SAT tax refund pipeline (180+ business days delay).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/60">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Potential SAT Statutory Fines (Art. 178 LA):
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(calculations.penaltyMin)} – {formatCurrency(calculations.penaltyMax)}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Fines of 70% to 100% on unpaid VAT under Ley Aduanera Article 178.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/60">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Total Potential Fiscal Exposure (Fines + CFF Art. 21):
                    </span>
                  </div>
                  <div className="text-lg font-black text-rose-700 dark:text-rose-400">
                    {formatCurrency(calculations.totalExposureMin)} – {formatCurrency(calculations.totalExposureMax)}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Includes 16% principal clawback, fines, plus ~22.5% inflation adjustment (INPC) &amp; monthly compound surcharges.
                  </p>
                </div>
              </div>

              {/* Responsabilidad Solidaria Legal Alert */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 dark:bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  CFF Art. 26: Corporate Director Personal Liability
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Under Mexican law, corporate board members, general managers, and legal representatives bear <strong>joint personal financial liability</strong> for unremitted 16% VAT and customs fines incurred by the Mexican operating entity.
                </p>
              </div>

            </div>

            {/* Advisory CTA Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-900/50">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                Confidential Trade & Tax Advisory
              </div>

              <h4 className="text-xl font-bold mb-2">
                Schedule a Confidential IMMEX & CIVA Audit Review
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Don&apos;t wait for a Buzón Tributario notification. Review your Anexo 24/30 reconciliation health and discover how a <strong>Mexico Shelter Structure</strong> eliminates 100% of upfront VAT cash outflows with an established AAA certification.
              </p>

              {/* Consultant Bio Capsule */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 mb-5">
                <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center font-bold text-emerald-300 text-sm shrink-0 border border-emerald-400/40">
                  DM
                </div>
                <div>
                  <div className="font-bold text-xs text-white">Denisse Martinez</div>
                  <div className="text-[11px] text-slate-300">
                    Founder & Principal Nearshore Advisor
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={calendlyUrl}
                  onClick={handleCalendlyClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/30"
                >
                  <span>Book Free 30-Min Audit Strategy Session</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <Link
                  href={`/${language}/services/shelter-services`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-all"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How Shelter Services Shield 100% of VAT Risk</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Deep Dive Educational Section */}
        <div className="mt-16 bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
                Regulatory Blueprint & Direct Answers
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                Mexican Customs Law, CIVA & Anexo 30 Compliance Architecture
              </h2>
            </div>

            <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold inline-flex items-center justify-center">
                    1
                  </span>
                  What Is the CIVA VAT Certification (Certificación en Materia de IVA e IEPS)?
                </h3>
                <p className="mb-2">
                  <strong>Direct Answer:</strong> Established under <em>Article 28-A of the Ley del Impuesto al Valor Agregado (LIVA)</em> and Chapter 7.1 of the General Foreign Trade Rules (RGCE), CIVA grants qualified IMMEX maquiladoras an immediate <strong>100% tax credit</strong> on the 16% VAT normally assessed on temporary imports of raw materials, components, packaging, and machinery.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Without active CIVA certification, an enterprise must disburse 16% cash VAT at the customs port of entry on every inbound shipment, draining critical cash reserves until finished products are exported and tax refunds are processed by SAT (which routinely takes 6 to 12 months).
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold inline-flex items-center justify-center">
                    2
                  </span>
                  How Do Anexo 24 and Anexo 30 Interact Under SAT Surveillance?
                </h3>
                <p className="mb-2">
                  <strong>Direct Answer:</strong> <strong>Anexo 24</strong> is the manufacturer&apos;s physical customs inventory engine tracking bill of materials (BOM), inbound pedimentos, production transformations, and scrap under Article 59 of the Customs Law. <strong>Anexo 30</strong> is SAT&apos;s electronic fiscal balance sheet (SCCC-VE) tracking the monetary 16% tax credit applied against temporary imports.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Every month, manufacturers must submit discharge reports (informes de descargo) proving that materials entered under Anexo 24 were exported abroad, transferred via virtual pedimento (V1), or destroyed as registered scrap. A failure to reconcile Anexo 24 with Anexo 30 leads SAT to presume the merchandise was diverted into the domestic Mexican economy.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold inline-flex items-center justify-center">
                    3
                  </span>
                  What Is the 18-Month Statutory Holding Clock Under Customs Law Article 108?
                </h3>
                <p className="mb-2">
                  <strong>Direct Answer:</strong> Under <em>Article 108, Section I of the Mexican Customs Law (Ley Aduanera)</em>, temporarily imported raw materials, lubricants, and packaging materials may legally remain inside Mexico for a maximum of <strong>18 months</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  If raw materials exceed 18 months without an associated export discharge pedimento (Clave RT) or valid virtual transfer, SAT automatically classifies the inventory as illegally residing in national territory, triggering immediate precautionary seizure (PAMA) under Article 151 and cancellation of the IMMEX program.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold inline-flex items-center justify-center">
                    4
                  </span>
                  How Does the SAT Plan Maestro 2026 Deploy AI to Trigger Customs Electronic Audits?
                </h3>
                <p className="mb-2">
                  <strong>Direct Answer:</strong> Under the 2026 Plan Maestro, SAT and AGACE cross-examine CFDI 4.0 payroll and transport invoices, VUCEM electronic customs pedimentos, Complemento Carta Porte 3.1 GPS waybills, and SCCC-VE credit accounts using predictive neural network classifiers.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  When neural models detect inventory micro-variances exceeding 0.5% between imported raw materials and exported finished units, SAT delivers an electronic audit notice via Buzón Tributario under <em>Federal Fiscal Code (CFF) Article 53-B</em>. Companies are granted strictly <strong>10 business days</strong> to provide digital defense evidence before tax debts and bank liens are enacted.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold inline-flex items-center justify-center">
                    5
                  </span>
                  How Do Mexican Shelter Services Completely Eliminate CIVA Audit Liability?
                </h3>
                <p className="mb-2">
                  <strong>Direct Answer:</strong> In a Shelter Manufacturing model, foreign manufacturers operate as a dedicated production division under the shelter company&apos;s established Mexican legal entity, pre-approved IMMEX program, and active <strong>Modality AAA CIVA VAT certification</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  The shelter entity acts as the legal Importer of Record and assumes 100% of the statutory liability under CFF Article 26 (Responsabilidad Solidaria). The foreign client avoids the 6–12 month application lag for government certification, escapes 16% cash prepayment on day one, and insulates corporate officers from personal Mexican tax liability.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold inline-flex items-center justify-center">
                    6
                  </span>
                  What Are the Financial Penalties and Director Liabilities if SAT Suspends CIVA Certification?
                </h3>
                <p className="mb-2">
                  <strong>Direct Answer:</strong> If SAT or AGACE suspends or cancels CIVA certification under RGCE Rule 7.2.4, the company must immediately begin paying 16% cash VAT at customs clearance on all temporary imports, freezing millions in working capital. Furthermore, un-discharged historical balances in Anexo 30 trigger retroactive 16% VAT clawbacks, statutory fines from 70% to 100% of omitted taxes (Ley Aduanera Art. 178), inflation adjustments (actualización), and monthly compound surcharges (recargos) under CFF Art. 21. Under CFF Article 26, corporate directors and legal representatives face joint personal liability (responsabilidad solidaria).
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Under CFF Article 26, Fraction X, corporate general managers, board members, and legal representatives who executed pedimento declarations or corporate powers of attorney can have personal Mexican bank accounts frozen and assets seized to satisfy unpaid customs debts incurred during their tenure.
                </p>
              </div>

            </div>

            {/* CIVA Modalities Comparison Table */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                  Statutory Comparison Matrix
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  CIVA Modalities Comparison: A vs AA vs AAA vs Uncertified (2026)
                </h3>
              </div>
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left font-bold text-slate-900 dark:text-white">Dimension</th>
                      <th scope="col" className="px-4 py-3 text-left font-bold text-slate-900 dark:text-white">Modality A</th>
                      <th scope="col" className="px-4 py-3 text-left font-bold text-slate-900 dark:text-white">Modality AA</th>
                      <th scope="col" className="px-4 py-3 text-left font-bold text-slate-900 dark:text-white">Modality AAA</th>
                      <th scope="col" className="px-4 py-3 text-left font-bold text-slate-900 dark:text-white">Uncertified / Suspended</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Certification Validity</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">1 Year (Annual Renewal)</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">2 Years</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">3 Years (Premier Tier)</td>
                      <td className="px-4 py-3 text-rose-600 dark:text-rose-400 font-semibold">None (Prepayment Required)</td>
                    </tr>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">16% VAT Credit Benefit</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">100% Tax Credit</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">100% Tax Credit</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">100% Tax Credit</td>
                      <td className="px-4 py-3 text-rose-600 dark:text-rose-400 font-semibold">0% (16% Cash Paid at Border)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Statutory Refund Window</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">20 Business Days</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">15 Business Days</td>
                      <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold">10 Business Days</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">180+ Days (Audit Scrutiny)</td>
                    </tr>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Minimum Headcount (IMSS)</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">10+ Workers</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">50+ Workers</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">250+ Workers</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">N/A</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Fixed Assets / Machinery</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">$10,000,000 MXN</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">$50,000,000 MXN</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">$100,000,000 MXN</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">N/A</td>
                    </tr>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">AGACE Audit Frequency</td>
                      <td className="px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">High (Annual Audit)</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Moderate</td>
                      <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Low (Continuous AI Exception Scan)</td>
                      <td className="px-4 py-3 text-rose-600 dark:text-rose-400 font-bold">Maximum (100% Pre-Clearance)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Related Resources & Playbooks Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
              Strategic Trade Compliance Guides
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Related IMMEX, Customs & Nearshoring Resources
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Resource Card 1: CIVA Playbook */}
            <Link
              href={`/${language}/insights/immex-civa-certification-anexo-24-30-audit-defense-monitoring-playbook`}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    Compliance Playbook
                  </span>
                  <FileText className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  IMMEX & CIVA Certification: Anexo 24 vs 30 Audit Defense
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Executive guide covering Ley del IVA Art. 28-A, Modalities A/AA/AAA, reconciliation algorithms, and SAT Plan Maestro audit triggers.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Read Executive Playbook</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Resource Card 2: SAT AI Audits */}
            <Link
              href={`/${language}/insights/sat-ai-predictive-customs-audits-mexico-immex`}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                    AI Regulatory Audits
                  </span>
                  <ShieldAlert className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                  SAT AI Predictive Customs Audits: Algorithmic Targeting
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Learn how AGACE neural networks cross-examine VUCEM pedimentos, CFDI 4.0 invoices, and Carta Porte 3.1 telemetry in real time.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Explore AI Defense</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Resource Card 3: USMCA RVC Calculator */}
            <Link
              href={`/${language}/tools/usmca-rvc-calculator`}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
                    Interactive Tool
                  </span>
                  <Scale className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                  USMCA Regional Value Content (RVC) Calculator
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Determine if your Mexican manufactured products qualify for 0% USMCA tariff preference under post-ATR automotive and industrial rules.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>Calculate RVC</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Resource Card 4: Cost Calculator */}
            <Link
              href={`/${language}/tools/cost-calculator`}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    Cost Modeling
                  </span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  Baja California Manufacturing Cost Calculator
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Model fully burdened labor savings, Class A industrial lease rates, and operational paybacks in Tijuana and Mexicali vs US domestic.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Model Landed Costs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}
