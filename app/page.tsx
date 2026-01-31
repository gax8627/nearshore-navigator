"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { StatsGrid } from "@/components/StatsGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { BlogCard } from "@/components/BlogCard";
import { Warehouse, Globe2, Cog, Truck, Headset } from "lucide-react"; // Import icons
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { FounderBlock } from "@/components/FounderBlock";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const featuredPosts = [
    {
      title: "Nearshoring in Baja California: A Guide for US Companies",
      excerpt: "Everything you need to know about setting up operations in Mexico's manufacturing hub.",
      date: "Oct 24, 2025",
      slug: "nearshoring-in-tijuana-guide-for-us-companies",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", // Warehouse/Logistics
      tags: ["Guide", "Strategy"],
    },
    {
      title: "Baja California vs Asia: Manufacturing Cost Comparison",
      excerpt: "Analyze the total landed cost benefits of manufacturing in Baja California versus traditional Asian hubs.",
      date: "Nov 12, 2025",
      slug: "tijuana-vs-asia-manufacturing-cost-comparison",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", // Factory/Manufacturing
      tags: ["Cost Analysis", "Economics"],
    },
    {
      title: "How Shelter Services Work in Baja California",
      excerpt: "Understanding the shelter model: the fastest, lowest-risk way to start manufacturing in Mexico.",
      date: "Dec 05, 2025",
      slug: "how-shelter-services-work-in-tijuana",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", // Consulting/Planning
      tags: ["Shelter", "Legal"],
    },
  ];

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2600" // Modern Glass Building/City
            alt="Baja California Industrial Skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {t('hero.title').split('Nearshoring')[0]} <span className="text-primary-500 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Nearshoring</span> {t('hero.title').split('Nearshoring')[1] || ''}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed shadow-black/50">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto shadow-primary-500/50">{t('hero.cta_primary')}</Button>
              </Link>
              <Link href="/services/industrial-real-estate-tijuana">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">{t('hero.cta_secondary')}</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Abstract Element */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] animate-float" />
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-32 relative z-20">
        <StatsGrid />
      </section>

      {/* Services Overview */}
      <section className="container mx-auto px-4">
        <SectionTitle
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          <ServiceCard
            title={t('services.real_estate')}
            description={t('services.real_estate_desc')}
            href="/services/industrial-real-estate-tijuana"
            icon={<Warehouse className="w-6 h-6" />}
          />
          <ServiceCard
            title={t('services.shelter')}
            description={t('services.shelter_desc')}
            href="/services/shelter-services-tijuana"
            icon={<Globe2 className="w-6 h-6" />}
          />
          <ServiceCard
            title={t('services.contract')}
            description={t('services.contract_desc')}
            href="/services/contract-manufacturing-tijuana"
            icon={<Cog className="w-6 h-6" />}
          />
          <ServiceCard
            title={t('services.logistics')}
            description={t('services.logistics_desc')}
            href="/services/distribution-centers-tijuana"
            icon={<Truck className="w-6 h-6" />}
          />
          <ServiceCard
            title={t('services.call_center')}
            description={t('services.call_center_desc')}
            href="/services/call-center-tijuana"
            icon={<Headset className="w-6 h-6" />}
          />
        </div>
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
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transition-colors" />

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
          <Link href="/insights" className="hidden md:block">
            <Button variant="outline">{t('insights.viewAll')}</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/insights">
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
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </section>
    </div>
  );
}
