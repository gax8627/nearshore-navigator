"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Zap, ShieldCheck, Phone } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

/**
 * AI Manufacturing Consultant
 * Real Gemini-powered chat with full accessibility support.
 */
export function AIConsultant() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
        { role: 'assistant', content: "Hello! I'm your AI Manufacturing Consultant, powered by real industrial data. Ask me about labor costs, industrial hubs, USMCA tariffs, shelter services, or how to start manufacturing in Mexico. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: { role: 'user' | 'assistant', content: string } = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] })
            });
            const data = await res.json();
            setMessages(prev => [...prev, data]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: "I encountered a temporary issue. Please try again or contact Denisse directly at denisse@nearshorenavigator.com." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Simple newline → paragraph renderer (no external dependency needed)
    const renderContent = (text: string) => {
        return text.split('\n').filter(Boolean).map((line, i) => (
            <span key={i} className="block mb-1 last:mb-0">{line}</span>
        ));
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open AI Manufacturing Consultant"
                    className="w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20 dark:border-gray-800/50 hover:bg-primary-500 transition-colors"
                >
                    <MessageSquare size={28} aria-hidden="true" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" aria-hidden="true" />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="dialog"
                        aria-label="AI Manufacturing Consultant chat"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        className="w-[380px] h-[550px] bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                    >
                        <div className="p-6 bg-gradient-to-r from-primary-900/40 to-gray-900/40 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/20">
                                    <Bot size={22} className="text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold leading-none">AI Consultant</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Powered by Gemini</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a 
                                    href="https://wa.me/526643640203" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors group relative"
                                    aria-label="Talk to an expert on WhatsApp"
                                >
                                    <Phone size={18} />
                                    <span className="absolute -top-10 right-0 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Speak to Expert</span>
                                </a>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close AI Manufacturing Consultant"
                                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                                >
                                    <X size={20} aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            role="log"
                            aria-live="polite"
                            aria-label="Conversation"
                            className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-primary-600 text-white rounded-tr-none'
                                            : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                                    }`}>
                                        {renderContent(msg.content)}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start" role="status" aria-label="AI is thinking">
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-white/5 bg-gray-900/50">
                            <div className="flex gap-2">
                                <label htmlFor="ai-chat-input" className="sr-only">Ask about manufacturing in Mexico</label>
                                <input
                                    id="ai-chat-input"
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about tariffs, hubs, or costs..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    aria-label="Send message"
                                    className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex justify-center gap-4 mt-4 opacity-30 grayscale" aria-hidden="true">
                                <ShieldCheck size={14} className="text-gray-400" />
                                <Zap size={14} className="text-gray-400" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
