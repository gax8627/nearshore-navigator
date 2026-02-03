"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight, Calendar, MapPin } from "lucide-react"
import { useLanguage } from "@/app/context/LanguageContext"

export function FounderBlock() {
  const { t, language } = useLanguage();
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative order-last lg:order-first">
            <div className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/denisse-1.jpg"
                alt={`${t('about.founderName')} - ${t('about.founderBadge')}`}
                fill
                quality={100}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white p-4">
                <div className="text-2xl font-bold">{t('about.founderName')}</div>
                <div className="text-white/80 font-medium">{t('about.founderBadge')}</div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
              {t('about.founderBadge')}
            </div>
            
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('about.founderTitle')}
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.founderDescription')}
            </p>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('about.founderStat1')}</h3>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('about.founderStat2')}</h3>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('about.founderStat3')}</h3>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/${language}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t('about.ctaDiscovery')}
              </Link>
              <Link
                href={`/${language}/assessment`}
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {t('about.ctaAssessment')}
              </Link>
            </div>
            
            <div className="pt-6 border-t font-medium italic text-muted-foreground relative pl-12">
              <div className="absolute left-0 top-4 text-7xl text-primary/10 select-none leading-none">&quot;</div>
              <p className="relative z-10">{t('about.founderQuote')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
