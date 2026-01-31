"use client";

import { Button } from "@/components/Button";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

export function NewsletterBanner() {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto px-4 mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gray-900 border border-white/10 p-8 md:p-12 text-center md:text-left shadow-2xl"
      >
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated on Baja Manufacturing
            </h3>
            <p className="text-gray-300 text-lg">
              Get the latest insights on nearshoring, industrial real estate trends, and shelter services delivered to your inbox.
            </p>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 w-full sm:w-80 backdrop-blur-sm"
              />
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary-500/20">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
