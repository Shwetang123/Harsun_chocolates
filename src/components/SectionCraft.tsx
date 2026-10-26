import React from 'react';
import { Sun, Wind, Droplets, Award, Compass } from 'lucide-react';

export const SectionCraft: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Handpicked Cocoa Pods',
      desc: 'Selected at optimal ripeness from sustainable farms, ensuring deep fruit and floral aroma notes.',
      icon: Sun,
    },
    {
      num: '02',
      title: 'Slow Wood-Fired Roasting',
      desc: 'Gentle roasting brings out the caramelized undertones and complex nutty depth without bitterness.',
      icon: Wind,
    },
    {
      num: '03',
      title: 'Artisanal Conching',
      desc: 'Continuously aerated and refined with pure cocoa butter for an impeccably smooth liquid cascade.',
      icon: Droplets,
    },
    {
      num: '04',
      title: 'Master Tempering',
      desc: 'Poured onto cool granite slabs and brought into perfect temper for that radiant satin shine.',
      icon: Award,
    },
  ];

  return (
    <section
      id="craft"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none"
    >
      <div className="w-full lg:w-3/5 z-20 space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#D49B44]/30 pointer-events-auto">
          <Compass className="w-3.5 h-3.5 text-[#D49B44]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#583222]">
            Section 02 &bull; The Craft Journey
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#2C1810] leading-tight">
          From Cocoa Bean to <span className="gold-gradient-text italic">Liquid Poetry.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#583222] max-w-xl leading-relaxed">
          Watch the cocoa beans and rich chocolate ribbon glide across your screen. Every batch of
          HarSun chocolate is made from scratch with patience, time-honored European techniques, and
          pure ingredients.
        </p>
      </div>

      {/* Step Process Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-20 pointer-events-auto">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-3xl font-bold font-serif-luxury text-[#D49B44]/20 group-hover:text-[#D49B44]/40 transition-colors">
                {step.num}
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#2C1810] text-[#F5D394] flex items-center justify-center mb-5 group-hover:bg-[#4A2618] transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#2C1810] mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#583222] leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
