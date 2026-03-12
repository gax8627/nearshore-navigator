"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export function TrustSeal() {
  const { language } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-glass space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/20">
          <Image
            src="/images/denisse-1.jpg"
            alt="Denisse Martinez"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-1">
            Verified Strategy
          </p>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">Denisse Martinez</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Principal Nearshore Advisor</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
          "Our advisory team has overseen 200+ facility setups in Mexico. Every strategy is reviewed for USMCA compliance and operational feasibility."
        </p>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            ISO 9001:2015
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Award className="w-3 h-3" />
            IMMEX Certified
          </div>
        </div>
      </div>

      <Link 
        href={`/${language}/about/denisse-martinez`}
        className="block text-center py-3 text-sm font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        View Credentials & Portfolio
      </Link>
    </div>
  );
}
