"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const servicesRef = useRef<HTMLDivElement>(null);
    const langRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'es', label: 'Español', flag: '🇲🇽' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'ja', label: '日本語', flag: '🇯🇵' },
        { code: 'zh', label: '中文', flag: '🇨🇳' },
        { code: 'ko', label: '한국어', flag: '🇰🇷' },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const handleLanguageChange = (newLang: string) => {
        // Set cookie for middleware persistence (1 year)
        document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
        
        // Update context and redirect
        setLanguage(newLang as any);
        const newPath = pathname.replace(`/${language}`, `/${newLang}`);
        router.push(newPath);
        setIsLangMenuOpen(false);
        setIsMobileMenuOpen(false);
    };

    const serviceLinks = [
        { name: t('services.real_estate'), href: `/${language}/services/industrial-real-estate-baja` },

        { name: t('services.contract'), href: `/${language}/services/contract-manufacturing-tijuana` },
        { name: t('services.logistics'), href: `/${language}/services/distribution-centers-tijuana` },
        { name: t('services.call_center'), href: `/${language}/services/call-center-tijuana` },
    ];

    const navLinks = [
        { name: t('nav.insights'), href: `/${language}/insights` },
        { name: t('nav.assessment'), href: `/${language}/assessment` },
        { name: t('nav.resources'), href: `/${language}/resources/tijuana-industrial-park-map` },
        { name: t('nav.about'), href: `/${language}/about` },
        { name: t('nav.contact'), href: `/${language}/contact` },
    ];

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
                setIsServicesOpen(false);
            }
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isServiceActive = pathname.startsWith("/services");

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                    isScrolled
                        ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-black/5 py-3"
                        : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                    <Link href={`/${language}`} className="flex items-center group">
                        <div className="relative w-44 md:w-60 h-12 md:h-16 transition-all group-hover:scale-105 duration-300">
                            <Image
                                src="/images/nearshore-logo-brand.png"
                                alt="Nearshore Navigator Logo"
                                fill
                                className="object-contain dark:brightness-[1.2] dark:contrast-[1.1] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Services Dropdown */}
                        <div ref={servicesRef} className="relative">
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-500 flex items-center gap-1",
                                    isServiceActive ? "text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-gray-300"
                                )}
                                aria-expanded={isServicesOpen}
                                aria-haspopup="true"
                            >
                                {t('nav.services')}
                                <ChevronDown className={cn("w-4 h-4 transition-transform", isServicesOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isServicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 overflow-hidden"
                                    >
                                        {serviceLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsServicesOpen(false)}
                                                className={cn(
                                                    "block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                                                    pathname === link.href
                                                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                                                        : "text-gray-700 dark:text-gray-300"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-500",
                                    pathname === link.href ? "text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-gray-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Language Dropdown */}
                        <div ref={langRef} className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                                <span>{currentLang.flag}</span>
                                <span className="hidden xl:inline">{currentLang.code.toUpperCase()}</span>
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            </button>

                            <AnimatePresence>
                                {isLangMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 overflow-hidden"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2",
                                                    language === lang.code
                                                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                                                        : "text-gray-700 dark:text-gray-300"
                                                )}
                                            >
                                                <span>{lang.flag}</span>
                                                <span>{lang.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === 'light' ? 0 : 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </motion.div>
                        </button>

                        <a href="https://calendly.com/denisse-nearshorenavigator/30min" target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="sm">{t('nav.bookCall')}</Button>
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-expanded={isMobileMenuOpen}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isMobileMenuOpen ? 90 : 0, scale: isMobileMenuOpen ? 1.1 : 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </motion.div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-[70px] left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 z-40 lg:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {/* Services Accordion */}
                            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                                <button
                                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                                    className="flex items-center justify-between w-full text-lg font-medium text-gray-800 dark:text-gray-100 py-2"
                                >
                                    {t('nav.services')}
                                    <ChevronDown className={cn("w-5 h-5 transition-transform", isServicesOpen && "rotate-180")} />
                                </button>
                                <AnimatePresence>
                                    {isServicesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-4 pt-2 space-y-2">
                                                {serviceLinks.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary-500"
                                                    >
                                                        {link.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-800 dark:text-gray-100 py-2 border-b border-gray-100 dark:border-gray-800"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                                <span className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-3 px-1">{t('nav.selectLanguage') || 'Select Language'}</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={cn(
                                                "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border transition-colors",
                                                language === lang.code 
                                                    ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300" 
                                                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <span>{lang.flag}</span>
                                            <span>{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-600 dark:text-gray-400">{t('nav.appearance') || 'Appearance'}</span>
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                                >
                                    {theme === 'light' ? (
                                        <>{t('nav.darkMode') || 'Dark Mode'} <Moon className="w-4 h-4" /></>
                                    ) : (
                                        <>{t('nav.lightMode') || 'Light Mode'} <Sun className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>

                            <div className="pt-2">
                                <Link href={`/${language}/assessment`} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-full">{t('nav.bookTour')}</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
