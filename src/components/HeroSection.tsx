import React from 'react';
import { ArrowDown, Sparkles, Heart, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  onExplore: () => void;
  onDiscoverStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onDiscoverStory }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden pointer-events-none"
    >
      {/* Background warm radial aura */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#F2D7B3]/40 via-[#E8B4B8]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Content Column (Left on Desktop, Full on Mobile) */}
      <div className="w-full lg:w-1/2 z-20 space-y-6 pt-4 sm:pt-8">
        {/* Brand identity emblem pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D49B44]/30 shadow-xs pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#D49B44]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#583222]">
            Artisanal Confectionery
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D49B44]" />
          <span className="text-xs font-serif-luxury italic text-[#8A5A44]">
            Harish &amp; Sunita
          </span>
        </div>

        {/* Official Brand Logo with seamless multiply blend */}
        <div className="pointer-events-auto">
          <img
            src="/brand/harsun-logo-hero.png"
            alt="HarSun Chocolates - Two Names. One Sweet Dream."
            className="w-full max-w-sm sm:max-w-md h-auto object-contain mix-blend-multiply select-none"
          />
        </div>

        {/* Main Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C1810] leading-[1.12]">
            A Little Bite of <span className="gold-gradient-text italic font-serif-luxury">Happiness.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#583222] font-normal leading-relaxed max-w-lg">
            Handcrafted with love. Made for every sweet moment. From silky everyday treats to bespoke
            handcrafted truffles and luxury gift boxes.
          </p>
        </div>

        {/* Two CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
          <button
            onClick={() => {
              soundManager.playSweetPop();
              onExplore();
            }}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2C1810] via-[#3E2116] to-[#2C1810] hover:from-[#3D2217] hover:to-[#552E1E] text-[#FFF8F0] font-semibold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border border-[#D49B44]/30 group cursor-pointer"
          >
            <span>Explore Chocolates</span>
            <Compass className="w-4 h-4 text-[#F5D394] group-hover:rotate-45 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundManager.playSweetPop();
              onDiscoverStory();
            }}
            className="px-7 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#2C1810] font-semibold text-xs uppercase tracking-widest shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-[#D49B44]/40 group cursor-pointer"
          >
            <Heart className="w-4 h-4 text-[#DE9AA2] fill-[#DE9AA2]/30 group-hover:scale-110 transition-transform" />
            <span>Discover Our Story</span>
          </button>
        </div>

        {/* Brand Core Pillars Mini Badges */}
        <div className="pt-6 border-t border-[#D49B44]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 pointer-events-auto">
          <div>
            <span className="block text-xs font-bold text-[#2C1810]">100% Pure</span>
            <span className="text-[11px] text-[#8A5A44]">Cocoa Butter</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-[#2C1810]">Handmade</span>
            <span className="text-[11px] text-[#8A5A44]">In Small Batches</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-[#2C1810]">Luxury Gifting</span>
            <span className="text-[11px] text-[#8A5A44]">Bespoke Boxes</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-[#2C1810]">Everyday Joy</span>
            <span className="text-[11px] text-[#8A5A44]">Affordable Luxury</span>
          </div>
        </div>
      </div>

      {/* Right Column (Reserved for the 3D Canvas Chocolate Bar) */}
      <div className="hidden lg:flex w-1/2 h-[550px] items-center justify-center relative pointer-events-none">
        {/* Desktop interactive hover hint */}
        <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#D49B44]/20 text-[11px] text-[#8A5A44] pointer-events-auto flex items-center gap-2 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#D49B44] animate-ping" />
          Interactive 3D Bar &bull; Move mouse to rotate
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        onClick={() => {
          soundManager.playSweetPop();
          onExplore();
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-auto cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#8A5A44]">
          Scroll to Unwrap Story
        </span>
        <ArrowDown className="w-4 h-4 text-[#D49B44] animate-bounce" />
      </div>
    </section>
  );
};
