"use client";

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    const phoneNumber = "526641237199";
    const message = "Hello Denisse, I am inquiring about industrial manufacturing and shelter feasibility in Mexico.";
    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'click_whatsapp', {
                event_category: 'lead_generation',
                event_label: 'floating_whatsapp_button',
            });
        }
    };

    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] sm:bottom-24 sm:right-6 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 min-w-[52px] min-h-[52px] sm:min-w-[56px] sm:min-h-[56px] rounded-full shadow-2xl hover:bg-[#1fa851] transition-all flex items-center justify-center group border-2 border-white/20"
            title="Confidential WhatsApp Inquiry (US, EU & APAC Timezones)"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Chat on WhatsApp with Denisse Martinez"
        >
            <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            >
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </motion.div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap sm:group-hover:max-w-xs sm:group-hover:ml-2.5 transition-all duration-300 ease-in-out text-xs sm:text-sm font-bold tracking-tight">
                Discreet WhatsApp Chat
            </span>
        </motion.a>
    );
}
