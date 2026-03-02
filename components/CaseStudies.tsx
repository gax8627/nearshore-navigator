"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface CaseStudy {
  tag: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
}

import { useLanguage } from "@/app/context/LanguageContext";

export function CaseStudies() {
  const { t } = useLanguage();

  const case1_tag = t("caseStudies.case1_tag");
  if (!case1_tag || case1_tag === "caseStudies.case1_tag") return null; // Wait for translations to load

  const cases: CaseStudy[] = [
    {
      tag: t("caseStudies.case1_tag"),
      title: t("caseStudies.case1_title"),
      challenge: t("caseStudies.case1_challenge"),
      solution: t("caseStudies.case1_solution"),
      results: [t("caseStudies.case1_result1"), t("caseStudies.case1_result2"), t("caseStudies.case1_result3")],
    },
    {
      tag: t("caseStudies.case2_tag"),
      title: t("caseStudies.case2_title"),
      challenge: t("caseStudies.case2_challenge"),
      solution: t("caseStudies.case2_solution"),
      results: [t("caseStudies.case2_result1"), t("caseStudies.case2_result2"), t("caseStudies.case2_result3")],
    },
    {
      tag: t("caseStudies.case3_tag"),
      title: t("caseStudies.case3_title"),
      challenge: t("caseStudies.case3_challenge"),
      solution: t("caseStudies.case3_solution"),
      results: [t("caseStudies.case3_result1"), t("caseStudies.case3_result2"), t("caseStudies.case3_result3")],
    },
  ];

  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-4">
            {t("caseStudies.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("caseStudies.title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t("caseStudies.subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col hover:border-primary-500/40 transition-colors duration-300"
            >
              {/* Tag */}
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4">
                {c.tag}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-6 leading-snug">{c.title}</h3>

              {/* Challenge */}
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Challenge</p>
                <p className="text-sm text-gray-400 leading-relaxed">{c.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Approach</p>
                <p className="text-sm text-gray-400 leading-relaxed">{c.solution}</p>
              </div>

              {/* Results */}
              <div className="mt-auto pt-6 border-t border-gray-800 space-y-3">
                {c.results.map((r, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-white font-medium leading-snug">{r}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
