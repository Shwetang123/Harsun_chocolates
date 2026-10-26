import React from 'react';
import { Layers, Sparkles, ShieldCheck, Flame } from 'lucide-react';

export const SectionDiscover: React.FC = () => {
  return (
    <section
      id="discover"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none"
    >
      {/* Title & Section Tag */}
      <div className="w-full lg:w-1/2 z-20 space-y-4 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#D49B44]/30 pointer-events-auto">
          <Layers className="w-3.5 h-3.5 text-[#D49B44]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#583222]">
            Section 01 &bull; Anatomy of Perfection
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#2C1810] leading-tight">
          Crafted to the <span className="gold-gradient-text italic">Exact Snap.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#583222] max-w-lg leading-relaxed">
          As you scroll, notice how each individual chocolate square gently separates. We temper our
          cocoa to microscopic crystal alignment for that unmistakable, satisfying clean snap and
          silky melt.
        </p>
      </div>

      {/* Floating feature annotations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl z-20 pointer-events-auto">
        <div className="glass-panel p-6 rounded-2xl space-y-3 hover:border-[#D49B44] transition-all duration-300 hover:shadow-lg group">
          <div className="w-10 h-10 rounded-xl bg-[#2C1810] text-[#F5D394] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#2C1810]">Micro-Tempered Finish</h3>
          <p className="text-sm text-[#583222] leading-relaxed">
            Formed at precisely 31.5°C to achieve a glossy sheen, zero blooming, and a crisp acoustic
            snap in every bite.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-3 hover:border-[#D49B44] transition-all duration-300 hover:shadow-lg group">
          <div className="w-10 h-10 rounded-xl bg-[#2C1810] text-[#ECC0C5] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#2C1810]">Velvety Emulsion</h3>
          <p className="text-sm text-[#583222] leading-relaxed">
            Conched for 48 uninterrupted hours to reduce cocoa particles to under 18 microns, yielding
            effortless oral warmth melt.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-3 hover:border-[#D49B44] transition-all duration-300 hover:shadow-lg group">
          <div className="w-10 h-10 rounded-xl bg-[#2C1810] text-[#D49B44] flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#2C1810]">Single Origin Quality</h3>
          <p className="text-sm text-[#583222] leading-relaxed">
            Pure single-origin cocoa beans blended with pure cocoa butter. No hydrogenated oils, no
            artificial preservatives.
          </p>
        </div>
      </div>
    </section>
  );
};
