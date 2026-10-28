import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const SectionHighlightsBento: React.FC = () => {
  const [snapped, setSnapped] = useState(false);

  const handleSnap = () => {
    soundManager.playChocolateSnap();
    setSnapped(true);
    setTimeout(() => setSnapped(false), 1200);
  };

  return (
    <section id="highlights" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Apple Section Header */}
      <div className="mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D49B44]" />
          <span>Explore the highlights</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Major breakthroughs. <br />
          <span className="apple-gold-gradient">Pure bliss in every bite.</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Large Feature Card (Span 7 cols) */}
        <div className="md:col-span-7 apple-bento-card p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[380px] group">
          {/* Ambient warm glow in background */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#D49B44]/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 z-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5D394]">
              Granite Conching Engine
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              72 uninterrupted hours. <br />
              <span className="text-neutral-400 font-normal">
                Refined to an imperceptible 14 microns.
              </span>
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed">
              Standard chocolate stops at 24 hours. We grind Criollo nibs with organic cocoa butter
              in granite mills for three full days. The friction melts all astringency, creating an
              ethereal, instant silkiness that begins melting the moment it touches your tongue.
            </p>
          </div>

          <div className="pt-8 flex items-center justify-between z-10 border-t border-white/10 mt-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-extrabold text-white">14µm</div>
              <div className="text-xs text-neutral-400 leading-tight">
                Micro-particle size <br />
                (Smoother than silk)
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F5D394] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Zero gritty friction</span>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Acoustic Snap Tester (Span 5 cols) */}
        <div className="md:col-span-5 apple-bento-card p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[380px] group">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#DE9AA2]">
              The Sound of Perfection
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              The 92 dB Acoustic Snap.
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              A sloppy chocolate bends. A masterwork chocolate snaps like crystal glass. Hear the
              Beta-V crystal structure in action.
            </p>
          </div>

          {/* Interactive Snap Button */}
          <div className="py-6 flex flex-col items-center justify-center">
            <button
              onClick={handleSnap}
              className={`px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 group/snap cursor-pointer shadow-xl ${
                snapped
                  ? 'bg-[#D49B44] text-[#120A05] border-[#F5D394] scale-105'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-[#D49B44]/60'
              }`}
            >
              <Volume2
                className={`w-5 h-5 transition-transform ${
                  snapped ? 'scale-125 text-[#120A05]' : 'text-[#F5D394] group-hover/snap:scale-110'
                }`}
              />
              <span className="text-sm font-semibold tracking-wide">
                {snapped ? 'SNAP! Acoustic Verified' : 'Click to Trigger Snap Test'}
              </span>
            </button>
            <span className="text-[11px] text-neutral-400 mt-2 font-mono">
              Calibrated at 31.5°C Beta-V Polymorph
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-white/10 pt-4">
            <span>Crystal Alignment</span>
            <span className="text-[#F5D394] font-semibold">100% Beta-V</span>
          </div>
        </div>

        {/* Card 3: Direct Terroir Equity (Span 5 cols) */}
        <div className="md:col-span-5 apple-bento-card p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[340px]">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5D394]">
              Single-Estate Provenance
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Direct Farmer Equity.
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              We bypass commodity brokers entirely. Every cacao bean is sourced from heritage
              agroforestry plots in Kerala and Manabí, Ecuador, paying 2.4x standard Fair Trade wages.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">2.4x</div>
              <div className="text-xs text-neutral-400">Fair Trade Premium</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F5D394]">100%</div>
              <div className="text-xs text-neutral-400">Plot Traceability</div>
            </div>
          </div>
        </div>

        {/* Card 4: All-Day Dopamine & Clean Energy (Span 7 cols) */}
        <div className="md:col-span-7 apple-bento-card p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[340px]">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#ECC0C5]">
              Neurochemical Bliss
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              All-day joy. Zero caffeine jitters.
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed">
              Unlike harsh coffee caffeine spikes, pure Criollo cacao contains rich concentrations of
              natural theobromine and anandamide (known in neuroscience as the "bliss molecule"). It
              delivers smooth heart-opening focus and gentle sustained euphoria.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-4 text-center sm:text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">750mg</div>
              <div className="text-[11px] text-neutral-400">Natural Theobromine</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#F5D394]">High</div>
              <div className="text-[11px] text-neutral-400">Anandamide Bliss</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">0%</div>
              <div className="text-[11px] text-neutral-400">Palm Oil or Fillers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
