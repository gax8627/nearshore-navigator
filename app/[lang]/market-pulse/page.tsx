import { Metadata } from "next";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { MarketPulseNewsroom } from "@/components/MarketPulseNewsroom";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Market Pulse Newsroom | Nearshore Navigator",
  description: "Autonomous geopolitical trade alerts and manufacturing impact analysis for Mexico operations.",
};

export default async function MarketPulsePage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-500/10 text-primary-500 border border-primary-500/20 mb-4 tracking-widest uppercase">
                    Agentic Stream v1.0
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Market Pulse <span className="text-primary-500">Newsroom</span>
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                    Real-time geopolitical analysis and trade-impact bulletins generated autonomously by our MarketPulseAgent.
                </p>
            </div>
            
            <div className="hidden lg:block p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-widest mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Agent State: Active
                </div>
                <div className="text-[10px] text-gray-400">Scan Frequency: 240min</div>
            </div>
        </div>

        <MarketPulseNewsroom />
      </div>
    </main>
  );
}
