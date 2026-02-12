"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

interface HeroScannerProps {
  src: string;
  alt: string;
}

export const HeroScanner = ({ src, alt }: HeroScannerProps) => {
  const controls = useAnimation();
  const [isScanned, setIsScanned] = useState(false);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const sequence = async () => {
      // Start slightly delayed
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Animate the scan
      await controls.start({
        height: "100%",
        transition: { 
          duration: 3.5, // Slower, more deliberate
          ease: "easeInOut" 
        }
      });
      
      setIsScanned(true);
    };

    sequence();

    // Trigger data nodes at specific intervals matched to scan progress
    const nodeTimings = [1200, 1800, 2400, 3000];
    nodeTimings.forEach((ms, i) => {
        setTimeout(() => {
            setActiveNodes(prev => [...prev, i]);
        }, ms);
    });
  }, [controls]);

  // Data nodes positioning and labels
  const dataNodes = [
    { top: "25%", left: "40%", label: "Structural Sync: 99.8%", value: "32.42° N, 117.03° W" },
    { top: "45%", left: "60%", label: "Baja Industrial Hub", value: "Class A Distribution" },
    { top: "60%", left: "30%", label: "Grid Capacity: Verified", value: "115kV Substation" },
    { top: "75%", left: "70%", label: "Logistics Latency: <15ms", value: "Border Connection: Direct" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900 group">
      {/* 0. Parallax Background Shadow (The deep zoom) */}
      <motion.div 
        animate={{ 
            scale: [1.1, 1.15, 1.1],
        }}
        transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
        }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover blur-2xl contrast-200"
        />
      </motion.div>

      {/* 1. Underlying "Blueprint" Layer (The Edge detection / Tech view) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
            animate={{ 
                scale: [1.1, 1.12, 1.1],
            }}
            transition={{ 
                duration: 25, 
                repeat: Infinity,
                ease: "linear" 
            }}
            className="w-full h-full relative"
        >
            <Image
            src={src}
            alt={alt}
            fill
            className="object-cover grayscale contrast-150 brightness-75 invert sepia hue-rotate-[200deg] saturate-200"
            priority
            />
            {/* HUD Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </motion.div>
        
        {/* Radar Pulse */}
        <motion.div 
            animate={{ scale: [0, 4], opacity: [0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/30 rounded-full z-10" 
        />
      </div>

      {/* 2. Data Nodes Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <AnimatePresence>
            {dataNodes.map((node, i) => activeNodes.includes(i) && (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute"
                    style={{ top: node.top, left: node.left }}
                >
                    <div className="relative">
                        <div className="w-3 h-3 bg-primary-500 rounded-full animate-ping absolute -left-1.5 -top-1.5" />
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full relative z-10" />
                        <div className="ml-4 -mt-2 bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-lg min-w-[140px]">
                            <div className="text-[10px] uppercase tracking-tighter text-primary-400 font-bold">{node.label}</div>
                            <div className="text-[9px] text-gray-300 font-mono">{node.value}</div>
                        </div>
                        {/* Connecting Line to scanner if scanned */}
                        <div className="absolute top-0 left-0 w-[1px] h-32 bg-gradient-to-b from-primary-500/50 to-transparent" />
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* 3. Revealing "Reality" Layer (The Final Image) */}
      <motion.div
        initial={{ height: "0%" }}
        animate={controls}
        className="absolute top-0 left-0 right-0 z-10 overflow-hidden border-b-2 border-primary-400/50 box-content shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
      >
        <motion.div 
            animate={{ 
                scale: [1.1, 1.12, 1.1],
            }}
            transition={{ 
                duration: 25, 
                repeat: Infinity,
                ease: "linear" 
            }}
            className="relative w-full h-screen"
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
            />
            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/100 via-gray-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/80" />
        </motion.div>
      </motion.div>

      {/* 4. The "Scanner" Bar (The Agent) */}
      {!isScanned && (
        <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ 
                duration: 3.5, 
                ease: "easeInOut",
                delay: 0.8 
            }}
            className="absolute left-0 right-0 z-20 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]"
        >
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  <div className="flex flex-col items-center">
                      <div className="text-[9px] font-mono text-primary-300 bg-black/80 px-2 py-0.5 rounded border border-primary-500/30 backdrop-blur-sm animate-pulse">
                          LIVE_STRUCTURAL_DETECTION_ACTIVE
                      </div>
                      <div className="w-[1px] h-4 bg-primary-400" />
                  </div>
             </div>
             
             {/* Scanning Light sweep */}
             <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary-500/10 to-transparent -translate-y-full pointer-events-none" />
        </motion.div>
      )}

      {/* Corner UI Elements */}
      <div className="absolute top-24 left-8 z-40 flex flex-col gap-1 pointer-events-none opacity-50">
          <div className="h-0.5 w-12 bg-primary-500/50" />
          <div className="h-12 w-0.5 bg-primary-500/50" />
      </div>
      <div className="absolute bottom-12 right-8 z-40 flex flex-col items-end gap-1 pointer-events-none opacity-50">
          <div className="h-12 w-0.5 bg-primary-500/50" />
          <div className="h-0.5 w-12 bg-primary-500/50" />
      </div>
    </div>
  );
};
