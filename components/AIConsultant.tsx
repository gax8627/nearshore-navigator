"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

/**
 * AI Manufacturing Consultant - Phase B
 * Premium floating chat interface with Agentic Stream v1.0 feedback.
 */
export function AIConsultant() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
        { role: 'assistant', content: "Hello. I am your AI Manufacturing Consultant. I have real-time access to the Mexico Industrial Matrix and USMCA trade alerts. How can I help optimize your operation today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user', content: input };
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
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "I encountered a synchronization error with the knowledge matrix. Please try again or contact our human specialists." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20 dark:border-gray-800/50 hover:bg-primary-500 transition-colors"
                >
                    <MessageSquare size={28} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        className="w-[380px] h-[550px] bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-primary-900/40 to-gray-900/40 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/20">
                                    <Bot size={22} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold leading-none">AI Consultant</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Agentic Stream v1.0</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-primary-600 text-white rounded-tr-none' 
                                            : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
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
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about tariffs, hubs, or costs..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-500 transition-colors disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="flex justify-center gap-4 mt-4 opacity-30 grayscale">
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
