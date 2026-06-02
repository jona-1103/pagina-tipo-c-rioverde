/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { Smile, ShieldCheck, CalendarRange, MapPin } from 'lucide-react';
import { statisticsList } from '../data';
import { motion } from 'motion/react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Smile: Smile,
  ShieldCheck: ShieldCheck,
  CalendarRange: CalendarRange,
  MapPin: MapPin,
};

function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // Extract digits (e.g. "+25,000" -> "25000", "24/7" -> "24")
    const cleanNumStr = value.replace(/[^0-9]/g, '');
    const num = parseInt(cleanNumStr, 10);

    if (isNaN(num)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200; // Snappy 1.2s animation
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo for high-end feel
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.max(0, Math.floor(easedProgress * num));

      // Reconstruct original formatting
      let formatted = '';
      if (value.startsWith('+')) {
        formatted += '+';
      }

      if (value.includes(',')) {
        formatted += currentVal.toLocaleString('en-US');
      } else {
        formatted += currentVal.toString();
      }

      if (value.includes('/7')) {
        formatted += '/7';
      } else if (value.endsWith('%')) {
        formatted += '%';
      }

      setDisplayValue(formatted);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Statistics() {
  return (
    <section className="py-4 bg-white border-y border-gray-100" id="seccion-estadisticas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y sm:divide-y-0 sm:grid-cols-2 md:divide-x divide-gray-100">
          {statisticsList.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || MapPin;
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                key={stat.id}
                className="flex flex-col items-center text-center space-y-2 p-4 pt-4 sm:pt-0 first:pt-0"
                id={`stat-block-${stat.id}`}
              >
                {/* Icon wrapper */}
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <IconComponent className="w-5.5 h-5.5 text-emerald-600" />
                </div>
                {/* Number value with Counter-Up dynamics */}
                <div className="font-sans font-black text-2xl sm:text-3xl text-emerald-950 tracking-tight leading-none">
                  <AnimatedCounter value={stat.value} />
                </div>
                {/* Short status label */}
                <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider max-w-[150px] leading-normal font-mono">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
