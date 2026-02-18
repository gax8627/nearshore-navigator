"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { StatsGrid } from "@/components/StatsGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { BlogCard } from "@/components/BlogCard";
import { Warehouse, Globe2, Cog, Truck, Headset, Users } from "lucide-react";
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { FounderBlock } from "@/components/FounderBlock";
import { HeroScanner } from "@/components/HeroScanner";
import { useRef, useState, useCallback, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export default function HomeClient() {
  const { t, language } = useLanguage();
  const [videoEnded, setVideoEnded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
  }, []);

  const [featuredPosts, setFeaturedPosts] = useState([
    {
      title: "Nearshoring in Baja California: A Guide for US Companies",
      excerpt: "Everything you need to know about setting up operations in Mexico's manufacturing hub.",
      date: "Oct 24, 2025",
      slug: "nearshoring-in-tijuana-guide-for-us-companies",
      imageUrl: "/images/warehouse.jpg",
      tags: ["Guide", "Strategy"],
    },
    {
      title: "Baja California vs Asia: Manufacturing Cost Comparison",
      excerpt: "Analyze the total landed cost benefits of manufacturing in Baja California versus traditional Asian hubs.",
      date: "Nov 12, 2025",
      slug: "tijuana-vs-asia-manufacturing-cost-comparison",
      imageUrl: "/images/factory-worker.jpg",
      tags: ["Cost Analysis", "Economics"],
    },
  ]);

  useEffect(() => {
    async function fetchFeatured() {
        try {
            const res = await fetch('/api/posts?limit=3');
            if (res.ok) {
                const data = await res.json();
                if (data.posts && data.posts.length > 0) {
                    setFeaturedPosts(data.posts.map((p: any) => ({
                        ...p,
                        tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags
                    })));
                }
            }
        } catch (e) {
            console.error("Failed to fetch featured posts");
        }
    }
    fetchFeatured();
  }, []);

  const filteredFeaturedPosts = featuredPosts.map(post => ({
    ...post,
    slug: `/${language}/insights/${post.slug.split('/').pop()}`
  }));

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nearshore Navigator - Baja California",
    "description": "Expert industrial nearshoring and shelter services in Baja California, Mexico.",
    "url": "https://nearshorenavigator.com",
    "telephone": "+52-664-123-7199",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tijuana",
      "addressRegion": "Baja California",
      "addressCountry": "MX"
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-24 pb-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 md:pt-0 md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background: Video → Last Frame → Scanner */}
        <motion.div 
            style={{ y }} 
            className="absolute inset-0 z-0"
        >
          {/* Phase 1: Drone Video */}
          <AnimatePresence>
            {!videoEnded && (
              <motion.div
                className="absolute inset-0 z-10"
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <video
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover"
                  poster="/images/hero-last-frame.jpg"
                >
                  <source src="/videos/hero-drone.webm" type="video/webm" />
                  <source src="/videos/hero-drone.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlays on video */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/70" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 2+3: Last frame + HeroScanner (always mounted, revealed when video fades) */}
          <HeroScanner 
            src="/images/hero-last-frame.jpg"
            alt="Tijuana Industrial Park Aerial View"
            active={videoEnded}
          />
        </motion.div>

        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            key={t('hero.title')}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.3
                    }
                }
            }}
            className="max-w-3xl"
          >
            <motion.h1 
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                aria-label={t('hero.title')}
                className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-2xl flex flex-wrap gap-x-3 md:gap-x-4 max-w-4xl"
            >
              {t('hero.title').split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 50, rotate: 5 },
                        visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                    }}
                  >
                    {word}
                  </motion.span>
              ))}
              <motion.span
                  variants={{
                      hidden: { opacity: 0, y: 50, rotate: 5 },
                      visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                  }}
                  className="text-primary-500 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200"
              >
                  {t('hero.titleHighlight')}
              </motion.span>
            </motion.h1>
            
            <motion.p 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-lg"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div 
                variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                className="flex flex-col sm:flex-row gap-6"
            >
              <Link href={`/${language}/contact`} className="w-full sm:w-auto">
                <Button 
                    size="lg" 
                    className="w-full sm:w-auto shadow-2xl shadow-primary-500/30 hover:scale-105 active:scale-95 transition-transform"
                >
                    {t('hero.cta_primary')}
                </Button>
              </Link>
              <Link href={`/${language}/assessment`} className="w-full sm:w-auto">
                <Button 
                    variant="glass" 
                    size="lg" 
                    className="w-full sm:w-auto border-white/20 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
                >
                    {t('hero.cta_secondary')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
            }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none" 
        />
      </section>

      {/* Broker Value Proposition */}
      <section className="container mx-auto px-4 relative z-20 -mt-12">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
            {[
                { title: t('broker.advisorTitle'), desc: t('broker.advisorDesc'), icon: <Globe2 className="text-primary-500" /> },
                { title: t('broker.matchmakingTitle'), desc: t('broker.matchmakingDesc'), icon: <Users className="text-primary-500" /> },
                { title: t('broker.networkTitle'), desc: t('broker.networkDesc'), icon: <Warehouse className="text-primary-500" /> }
            ].map((item, i) => (
                <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">"{item.desc}"</p>
                </div>
            ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <StatsGrid />
      </section>

      {/* Services Overview */}
      <section className="container mx-auto px-4">
        <SectionTitle
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
        >
          <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(20%-1.5rem)] min-w-[300px] flex-grow xl:flex-grow-0">
            <ServiceCard
              title={t('services.real_estate')}
              description={t('services.real_estate_desc')}
              href={`/${language}/services/industrial-real-estate-baja`}
              icon={<Warehouse className="w-6 h-6" />}
            />
          </div>

          <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(20%-1.5rem)] min-w-[300px] flex-grow xl:flex-grow-0">
            <ServiceCard
              title={t('services.contract')}
              description={t('services.contract_desc')}
              href={`/${language}/services/contract-manufacturing-tijuana`}
              icon={<Cog className="w-6 h-6" />}
            />
          </div>
          <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(20%-1.5rem)] min-w-[300px] flex-grow xl:flex-grow-0">
            <ServiceCard
              title={t('services.logistics')}
              description={t('services.logistics_desc')}
              href={`/${language}/services/distribution-centers-tijuana`}
              icon={<Truck className="w-6 h-6" />}
            />
          </div>
          <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(20%-1.5rem)] min-w-[300px] flex-grow xl:flex-grow-0">
            <ServiceCard
              title={t('services.call_center')}
              description={t('services.call_center_desc')}
              href={`/${language}/services/call-center-tijuana`}
              icon={<Headset className="w-6 h-6" />}
            />
          </div>
        </motion.div>
      </section>

      {/* How We Work */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-24 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-0" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title={t('howWeWork.title')}
            subtitle={t('howWeWork.subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 relative">
            {/* Connecting Line (Desktop) */}
            <motion.div 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 100%" }}
                className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-gray-200 via-primary-500 to-gray-200 dark:from-gray-800 dark:via-primary-500 dark:to-gray-800 -z-10 rounded-full opacity-50" 
            />

            {[
              { step: "01", title: t('howWeWork.step1_title'), desc: t('howWeWork.step1_desc') },
              { step: "02", title: t('howWeWork.step2_title'), desc: t('howWeWork.step2_desc') },
              { step: "03", title: t('howWeWork.step3_title'), desc: t('howWeWork.step3_desc') }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-3xl font-bold text-primary-500 border-4 border-gray-100 dark:border-gray-700 shadow-lg mx-auto mb-8 group-hover:border-primary-500 group-hover:scale-110 transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4 dark:text-gray-100">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('insights.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t('insights.subtitle')}</p>
          </div>
          <Link href={`/${language}/insights`} className="hidden md:block">
            <Button variant="outline">{t('insights.viewAll')}</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredFeaturedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href={`/${language}/insights`}>
            <Button variant="outline">{t('insights.viewAll')}</Button>
          </Link>
        </div>
      </section>

      {/* Founder Block */}
      <FounderBlock />

      {/* Newsletter Banner */}
      <NewsletterBanner />

      {/* Logos Placeholder */}
      <section className="container mx-auto px-4 py-12 border-t border-gray-100 dark:border-gray-800">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">{t('trustedBy')}</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple Text Placeholders for "Trusted By" */}
             <div className="text-xl font-black text-gray-800 dark:text-gray-200 tracking-tighter">GLOBAL<span className="text-primary-500">MFG</span></div>
             <div className="text-xl font-bold text-gray-800 dark:text-gray-200 italic">MedDevice<span className="font-light">Inc</span></div>
             <div className="text-xl font-bold text-gray-800 dark:text-gray-200">AERO<span className="text-primary-500">SPACE</span></div>
             <div className="text-xl font-black text-gray-800 dark:text-gray-200 tracking-widest">LOGISTIX</div>
             <div className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1"><div className="w-4 h-4 bg-primary-500 rounded-full"/>TECHCORE</div>
        </div>
      </section>
    </div>
  );
}
