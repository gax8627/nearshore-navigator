"use client";

import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/Button";
import { FounderBlock } from "@/components/FounderBlock";
import { CheckCircle2, MapPin, Factory, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const geoRef = useRef(null);
  const { scrollYProgress: geoScrollY } = useScroll({
    target: geoRef,
    offset: ["start end", "end start"]
  });
  const geoY = useTransform(geoScrollY, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={containerRef} className="pb-20 overflow-hidden">
        {/* Parallax Hero */}
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0 h-[125%] -top-[12.5%]">
                <Image
                    src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=2560"
                    alt="Industrial Strategic Advisory and Nearshoring in Baja California - Nearshore Navigator"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gray-900/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            </motion.div>
            
            <div className="container mx-auto px-4 z-10 text-center relative">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary-500/20 backdrop-blur-md text-primary-200 border border-primary-500/30 text-sm font-bold tracking-wider uppercase mb-8">
                        About Nearshore Navigator
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                        Local leadership.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Partner-powered</span> execution.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
                        Built for manufacturers entering Baja California. We provide structured guidance, practical options, and the right introductions so your expansion doesn’t stall in uncertainty.
                    </p>
                </motion.div>
            </div>
        </div>

        {/* Why It Exists */}
        <section className="py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                            Turning <span className="text-primary-600">“we want Mexico”</span> into a clear next step
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Nearshore Navigator exists to make decisions easier: grounded guidance, steady follow-through, and execution support that matches your reality.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">The Common Struggle</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Nearshoring decisions often get stuck after the initial excitement—when the real questions show up:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">?</span> Where in Baja should we be?
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">?</span> What will the cost structure look like?
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">?</span> Lease, Shelter, or Contract?
                                </li>
                            </ul>
                        </div>
                        <div className="bg-primary-50 dark:bg-primary-900/10 p-8 rounded-2xl border border-primary-100 dark:border-primary-900/50">
                            <h3 className="text-xl font-bold mb-4 text-primary-700 dark:text-primary-400">Our Approach</h3>
                            <p className="text-gray-700 dark:text-gray-200 mb-6">
                                We’re not a directory and we’re not “one-size-fits-all.” Every project has different constraints.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-gray-700 dark:text-gray-200">
                                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                                    Timeline & Footprint Analysis
                                </li>
                                <li className="flex gap-3 text-gray-700 dark:text-gray-200">
                                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                                    Labor & Certification Needs
                                </li>
                                <li className="flex gap-3 text-gray-700 dark:text-gray-200">
                                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                                    Logistics & Risk Tolerance
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Founder Block (Who We Are) */}
        <section className="border-y border-gray-100 dark:border-gray-800">
             <FounderBlock />
        </section>

        {/* What We Do */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                        A practical toolkit for expansion
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Companies don’t all enter Mexico the same way. We help you evaluate the best route—and support the steps that turn the decision into a launch.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                            <Factory className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Industrial Real Estate & Site Selection</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Shortlisting facility options that fit your requirements, coordinating productive site tours, building decision-ready comparisons, and supporting negotiation steps.
                        </p>
                        <Link href={`/${language}/services/industrial-real-estate-baja`} className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
                            Learn more <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contract Manufacturing Partner Matching</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            We help you start correctly: define requirements, connect with qualified vendors, and drive evaluation and follow-up so the process doesn’t stall.
                        </p>
                        <Link href={`/${language}/services/contract-manufacturing-tijuana`} className="text-green-600 font-semibold hover:underline flex items-center gap-2">
                            Learn more <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                            <MapPin className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Soft-landing pathways</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            For when speed matters. We help you assess whether this route fits your goals and timeline, then connect you with vetted options aligned to your needs.
                        </p>
                        <Link href={`/${language}/services/shelter-services-tijuana`} className="text-purple-600 font-semibold hover:underline flex items-center gap-2">
                            Learn more <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* How We Work */}
        <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                        A no-BS process that keeps projects moving
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {[
                        { step: "Discovery", desc: "Goals, footprint, requirements, timeline" },
                        { step: "Assessment", desc: "The most practical route for your situation" },
                        { step: "Shortlist & Plan", desc: "Clear options with tradeoffs explained" },
                        { step: "Visits & Due Diligence", desc: "Structured agendas, comparisons, decision support" },
                        { step: "Next Steps", desc: "Introductions and support to move into execution" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xl shrink-0">
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.step}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                    <div className="text-center pt-8 text-xl font-semibold text-primary-600">
                        You stay in control. We bring structure, realism, and momentum.
                    </div>
                </div>
            </div>
        </section>

        {/* Geography */}
        <section ref={geoRef} className="py-24 bg-gray-900 text-white relative overflow-hidden">
            <motion.div style={{ y: geoY }} className="absolute inset-0 z-0 opacity-40">
                 <Image
                    src="/images/baja-landscape.png"
                    alt="Industrial Real Estate and Manufacturing Hub in Baja California - Nearshore Navigator Industrial Network"
                    fill
                    className="object-cover"
                />
            </motion.div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6">Serving all of Baja California</h2>
                 <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                    We support projects across Baja California. The right location depends on what you need—labor profile, border strategy, infrastructure, supplier adjacency, operating model, and timeline. Our job is to help you align those variables and make a smart decision faster.
                 </p>
                 <div className="flex justify-center gap-4">
                     <Link href={`/${language}/contact`}>
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">Let’s map your best path</Button>
                    </Link>
                 </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary-600 text-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Let’s map your best path into Baja California</h2>
                <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
                    Tell us what you’re building and when you need to be operational. We’ll help you identify the smartest starting point—and the next steps to move forward.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Link href={`/${language}/contact`}>
                        <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 shadow-xl">Schedule a Discovery Call</Button>
                    </Link>
                    <Link href={`/${language}/contact`}>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Request a Location Assessment</Button>
                    </Link>
                </div>
            </div>
        </section>
    </div>
  );
}
