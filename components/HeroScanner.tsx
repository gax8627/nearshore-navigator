"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

interface HeroScannerProps {
  src: string;
  alt: string;
}

export const HeroScanner = ({ src, alt }: HeroScannerProps) => {
  const controls = useAnimation();
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Start slightly delayed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Animate the scan
      await controls.start({
        height: "100%",
        transition: { 
          duration: 2.5, 
          ease: "easeInOut" 
        }
      });
      
      setIsScanned(true);
    };

    sequence();
  }, [controls]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {/* 1. Underlying "Blueprint" Layer (Tech/Analysis View) */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover scale-110 grayscale contrast-125 brightness-50"
          priority
        />
        {/* Blue Tech Overlay */}
        <div className="absolute inset-0 bg-blue-900/50 mix-blend-overlay" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>

      {/* 2. Revealing "Reality" Layer (The Final Image) */}
      <motion.div
        initial={{ height: "0%" }}
        animate={controls}
        className="absolute top-0 left-0 right-0 z-10 overflow-hidden border-b-2 border-primary-400 box-content shadow-[0_0_20px_rgba(59,130,246,0.5)]"
      >
        <div className="relative w-full h-screen"> {/* Use h-screen to keep image fixed relative to scan */}
           {/* 
              Trick: The inner image must be full height to match the background, 
              even though the container is clipped. 
              We use absolute positioning to keep it aligned with the 'Blueprint' layer.
           */}
           <div className="absolute inset-0 h-full w-full">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover scale-110"
                    priority
                />
                {/* Re-apply the gradient overlay so the text remains readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/100 via-gray-900/90 to-gray-900/70 opacity-90" />
           </div>
        </div>
      </motion.div>

      {/* 3. The "Scanner" Bar (The Agent) */}
      {!isScanned && (
        <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ 
                duration: 2.5, 
                ease: "easeInOut",
                delay: 0.5 
            }}
            className="absolute left-0 right-0 z-20 h-1 bg-primary-400 shadow-[0_0_40px_rgba(34,211,238,0.8)]"
        >
             <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4">
                  <span className="text-[10px] font-mono text-primary-200 bg-black/50 px-1 rounded">ANALYZING GEOGRAPHY...</span>
                  <span className="text-[10px] font-mono text-primary-200 bg-black/50 px-1 rounded">MATCHING INFRASTRUCTURE...</span>
             </div>
        </motion.div>
      )}
    </div>
  );
};
