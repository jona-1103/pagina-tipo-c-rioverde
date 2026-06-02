/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, Award, HeartPulse } from 'lucide-react';
import { benefitsList } from '../data';
import { motion } from 'motion/react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Clock: Clock,
  Award: Award,
  HeartPulse: HeartPulse,
};

export default function Benefits() {
  return (
    <div className="bg-emerald-950 text-white border-t border-emerald-900" id="barra-beneficios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 divide-y md:divide-y-0 md:divide-x divide-emerald-800">
          {benefitsList.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.iconName] || HeartPulse;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={benefit.id}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 px-3 py-2.5 md:py-0 first:pt-0 last:pb-0 md:pt-0 md:pb-0"
              >
                <div className="p-3 bg-emerald-900/60 text-emerald-400 rounded-xl shrink-0 group hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm tracking-wide text-emerald-100 uppercase">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

