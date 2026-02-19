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
    const servicesRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
                setIsServicesOpen(false);
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

                        {/* Language Toggle */}
                        <div className="flex items-center divide-x divide-gray-300 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <button
                                onClick={() => {
                                    const segments = pathname.split('/');
                                    if (segments.length > 1) {
                                        segments[1] = 'en';
                                        router.push(segments.join('/'));
                                    } else {
                                        router.push('/en');
                                    }
                                }}
                                className={cn("px-2 py-1 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition", language === 'en' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400')}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => {
                                    const segments = pathname.split('/');
                                    if (segments.length > 1) {
                                        segments[1] = 'es';
                                        router.push(segments.join('/'));
                                    } else {
                                        router.push('/es');
                                    }
                                }}
                                className={cn("px-2 py-1 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition", language === 'es' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400')}
                            >
                                ES
                            </button>
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
                            <Button variant="primary" size="sm">Book a Call</Button>
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

                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-600 dark:text-gray-400">Language</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setLanguage('en')}
                                        className={cn("px-3 py-1 rounded border text-sm font-medium", language === 'en' ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300')}
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => setLanguage('es')}
                                        className={cn("px-3 py-1 rounded border text-sm font-medium", language === 'es' ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300')}
                                    >
                                        Español
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-600 dark:text-gray-400">Appearance</span>
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                                >
                                    {theme === 'light' ? (
                                        <>Dark Mode <Moon className="w-4 h-4" /></>
                                    ) : (
                                        <>Light Mode <Sun className="w-4 h-4" /></>
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
