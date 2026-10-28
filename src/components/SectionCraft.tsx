import React from 'react';
import { Sun, Wind, Droplets, Award, Compass } from 'lucide-react';

export const SectionCraft: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Handpicked Pods',
      desc: 'Selected at optimal brix ripeness from sustainable agroforestry estates, unlocking natural red fruit and floral notes.',
      icon: Sun,
    },
    {
      num: '02',
      title: 'Granite Roasting',
      desc: 'Gentle low-temperature roasting preserves volatile aromatics while caramelizing deep cocoa butter undertones.',
      icon: Wind,
    },
    {
      num: '03',
      title: '72-Hour Conching',
      desc: 'Continuously aerated and stone-milled with pure cocoa butter into an ethereal 14-micron liquid cascade.',
      icon: Droplets,
    },
    {
      num: '04',
      title: 'Beta-V Tempering',
      desc: 'Calibrated at exactly 31.5°C to lock crystalline polymorph alignment for the iconic 92 dB acoustic snap.',
      icon: Award,
    },
  ];

  return (
    <section
      id="craft"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none"
    >
      <div className="w-full lg:w-3/5 z-20 space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 pointer-events-auto">
          <Compass className="w-3.5 h-3.5 text-[#D49B44]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#F5D394]">
            The Craft Engineering
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
          From Raw Cacao to <span className="apple-gold-gradient italic">Liquid Poetry.</span>
        </h2>
        <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
          Watch the cocoa beans and rich chocolate ribbon glide across your screen. Every batch of
          HarSun chocolate is made from scratch with patience, micro-precision, and pure single-origin
          ingredients.
        </p>
      </div>

      {/* Step Process Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-20 pointer-events-auto">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="apple-bento-card p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-3xl font-bold text-white/10 group-hover:text-[#D49B44]/30 transition-colors">
                {step.num}
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-[#F5D394] flex items-center justify-center mb-5 group-hover:bg-[#D49B44] group-hover:text-[#120A05] transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
