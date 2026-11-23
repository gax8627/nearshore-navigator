
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, ArrowRight } from 'lucide-react';

interface FloatingLeadDockProps {
  city: string;
  language: string;
}

export const FloatingLeadDock: React.FC<FloatingLeadDockProps> = ({ city, language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000); // Show after 6 seconds

    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-auto max-w-lg"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/10 p-4 md:p-6 flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex h-12 w-12 rounded-xl bg-emerald-500/20 items-center justify-center text-emerald-400 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Direct Executive Briefing</span>
              </div>
              <h4 className="text-white font-bold text-sm md:text-base leading-tight">
                Book a 30-Min {city.charAt(0).toUpperCase() + city.slice(1)} Cost &amp; Risk Briefing
              </h4>
              <p className="text-slate-400 text-xs mt-1">Review 2027 labor rates, shelter quotes, and site options with Denisse Martinez.</p>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setIsVisible(false)}
                aria-label="Close"
                className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
              
              <a 
                href={`https://calendly.com/denisse-nearshorenavigator/30min?utm_source=floating_dock&utm_campaign=${city}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_calendly', {
                      event_category: 'lead_generation',
                      event_label: `floating_dock_${city}`,
                    });
                  }
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 min-h-[44px] rounded-lg flex items-center gap-2 transition-all whitespace-nowrap shadow-md"
              >
                <span>Book 30-Min Call</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
