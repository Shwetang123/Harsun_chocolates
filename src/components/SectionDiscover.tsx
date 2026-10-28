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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 pointer-events-auto">
          <Layers className="w-3.5 h-3.5 text-[#D49B44]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#F5D394]">
            Anatomy of Perfection
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
          Crafted to the <span className="apple-gold-gradient italic">Exact Snap.</span>
        </h2>
        <p className="text-base sm:text-lg text-neutral-300 max-w-lg leading-relaxed">
          As you scroll, notice how each individual chocolate square gently separates. We temper our
          cocoa to microscopic crystal alignment for that unmistakable, satisfying clean snap and
          silky melt.
        </p>
      </div>

      {/* Floating feature annotations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl z-20 pointer-events-auto">
        <div className="apple-bento-card p-6 rounded-2xl space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-[#F5D394] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Micro-Tempered Finish</h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Formed at precisely 31.5°C to achieve a glossy sheen, zero blooming, and a crisp acoustic
            snap in every bite.
          </p>
        </div>

        <div className="apple-bento-card p-6 rounded-2xl space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-[#ECC0C5] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Velvety Emulsion</h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Conched for 72 uninterrupted hours to reduce cocoa particles to under 14 microns, yielding
            effortless oral warmth melt.
          </p>
        </div>

        <div className="apple-bento-card p-6 rounded-2xl space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-[#D49B44] flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Single Origin Quality</h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Pure single-origin cocoa beans blended with pure cocoa butter. No hydrogenated oils, no
            artificial preservatives.
          </p>
        </div>
      </div>
    </section>
  );
};
