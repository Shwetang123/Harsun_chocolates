import React from 'react';
import { Gift, Sparkles, Heart, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SectionHandmadeProps {
  onOpenGiftBoxModal: () => void;
  onOpenBuilder: () => void;
}

export const SectionHandmade: React.FC<SectionHandmadeProps> = ({
  onOpenGiftBoxModal,
  onOpenBuilder,
}) => {
  return (
    <section
      id="handmade"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 z-20">
        {/* Left Column Text */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 pointer-events-auto">
            <Gift className="w-3.5 h-3.5 text-[#D49B44]" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#F5D394]">
              Bespoke Gift Atelier
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
            Handmade with Love. <br />
            <span className="apple-gold-gradient italic">Unwrapped with Joy.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            As you scrolled into this section, our 3D blush pink signature gift box opened its ribboned
            lid to reveal an assortment of fresh artisanal truffles. Each piece is rolled, piped, and
            decorated by hand with zero artificial preservatives.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-white/10 text-[#F5D394] flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                <Heart className="w-3.5 h-3.5 fill-[#F5D394]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dark Velvet Ganache</h4>
                <p className="text-xs text-neutral-400">Infused with roasted cocoa nibs and French cream.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-white/10 text-[#F5D394] flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Golden Hazelnut Praline</h4>
                <p className="text-xs text-neutral-400">Caramelized Mediterranean hazelnuts stone-ground to silky perfection.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-white/10 text-[#DE9AA2] flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Ruby Berry Heart</h4>
                <p className="text-xs text-neutral-400">Natural ruby cocoa shell filled with raspberry coulis.</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <button
              onClick={() => {
                soundManager.playSweetPop();
                onOpenBuilder();
              }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] hover:from-[#E5A853] hover:to-[#FFF0D4] text-[#120A05] font-semibold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Build Custom Gift Box</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playSweetPop();
                onOpenGiftBoxModal();
              }}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all flex items-center gap-2 border border-white/15 cursor-pointer"
            >
              <span>Inspect Gift Box Details</span>
            </button>
          </div>
        </div>

        {/* Right side: Real Packaging Preview Card from Brand Identity Board */}
        <div className="w-full lg:w-5/12 z-20 pointer-events-auto">
          <div className="apple-bento-card p-6 rounded-3xl space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 group">
              <img
                src="/brand/product-gift-box.png"
                alt="HarSun Chocolates Signature Gift Box"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#F5D394]">
                    Signature Packaging
                  </span>
                  <p className="text-base font-bold font-serif-luxury">
                    Blush Rigid Chest with Gold Foil Ribbon
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-300 px-2 pt-1">
              <span className="font-semibold text-white">Box Sizes Available:</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-bold text-white">6 Pcs</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-bold text-[#F5D394]">12 Pcs</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-bold text-white">24 Pcs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
