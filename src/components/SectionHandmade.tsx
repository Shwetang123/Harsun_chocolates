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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#D49B44]/30 pointer-events-auto">
            <Gift className="w-3.5 h-3.5 text-[#D49B44]" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#583222]">
              Section 03 &bull; Bespoke Gifting
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#2C1810] leading-tight">
            Handmade with Love. <br />
            <span className="gold-gradient-text italic">Unwrapped with Joy.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#583222] leading-relaxed">
            As you scrolled into this section, our 3D blush pink signature gift box opened its ribboned
            lid to reveal an assortment of fresh artisanal truffles. Each piece is rolled, piped, and
            decorated by hand.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#ECC0C5] text-[#2C1810] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-3.5 h-3.5 fill-[#2C1810]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2C1810]">Dark Velvet Ganache</h4>
                <p className="text-xs text-[#583222]">Infused with roasted cocoa nibs and French cream.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F5D394] text-[#2C1810] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2C1810]">Golden Hazelnut Praline</h4>
                <p className="text-xs text-[#583222]">Caramelized Mediterranean hazelnuts stone-ground to silky perfection.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8B4B8] text-[#2C1810] flex items-center justify-center shrink-0 mt-0.5">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2C1810]">Ruby Berry Heart</h4>
                <p className="text-xs text-[#583222]">Natural ruby cocoa shell filled with raspberry coulis.</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <button
              onClick={() => {
                soundManager.playSweetPop();
                onOpenGiftBoxModal();
              }}
              className="px-6 py-3 rounded-full bg-[#2C1810] hover:bg-[#3E2116] text-[#FFF8F0] font-semibold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-[#D49B44]/40"
            >
              <span>Inspect Gift Box Details</span>
              <ChevronRight className="w-4 h-4 text-[#F5D394]" />
            </button>

            <button
              onClick={() => {
                soundManager.playSweetPop();
                onOpenBuilder();
              }}
              className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-[#2C1810] font-semibold text-xs uppercase tracking-widest shadow-xs hover:shadow-md transition-all flex items-center gap-2 border border-[#D49B44]/30"
            >
              <Sparkles className="w-4 h-4 text-[#D49B44]" />
              <span>Customize Your Box</span>
            </button>
          </div>
        </div>

        {/* Right side: Real Packaging Preview Card from Brand Identity Board */}
        <div className="w-full lg:w-5/12 z-20 pointer-events-auto">
          <div className="glass-panel p-5 rounded-3xl shadow-xl border border-[#D49B44]/30 space-y-4 hover:shadow-2xl transition-all duration-300">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 group">
              <img
                src="/brand/product-gift-box.png"
                alt="HarSun Chocolates Signature Gift Box"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <div className="text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#F5D394]">
                    Signature Packaging
                  </span>
                  <p className="text-sm font-bold font-serif-luxury">
                    Blush Box with Hand-Tied Satin Ribbon
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#583222] px-2 pt-1">
              <span className="font-semibold text-[#2C1810]">Box Capacities:</span>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#FAF4EE] border border-[#D49B44]/20 font-bold">6 Pcs</span>
                <span className="px-2.5 py-1 rounded-md bg-[#FAF4EE] border border-[#D49B44]/20 font-bold">12 Pcs</span>
                <span className="px-2.5 py-1 rounded-md bg-[#FAF4EE] border border-[#D49B44]/20 font-bold">24 Pcs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
