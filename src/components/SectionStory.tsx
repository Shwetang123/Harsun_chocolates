import React from 'react';
import { Heart, Sparkles, Sun, Shield, Gift } from 'lucide-react';

export const SectionStory: React.FC = () => {
  return (
    <section
      id="story"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none"
    >
      {/* Background warm glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#ECC0C5]/30 via-[#F5D394]/30 to-[#FAF4EE]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Story Container */}
      <div className="max-w-4xl mx-auto z-20 space-y-10 text-center">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D49B44]/40 shadow-xs pointer-events-auto">
          <Heart className="w-3.5 h-3.5 text-[#DE9AA2] fill-[#DE9AA2]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#583222]">
            Section 05 &bull; The Story Behind The Name
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2C1810] leading-tight">
            Two Names. <br />
            <span className="gold-gradient-text italic font-serif-luxury text-4xl sm:text-6xl lg:text-7xl">
              One Sweet Dream.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#583222] font-normal max-w-2xl mx-auto leading-relaxed">
            Every piece of chocolate we pour is a tribute to family, sacrifice, and unconditional love.
            HarSun was born from a son's gratitude to his parents.
          </p>
        </div>

        {/* The Name Connection Visual Board */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-[#D49B44]/30 shadow-2xl relative overflow-hidden pointer-events-auto">
          {/* Subtle background sun rays and cocoa pod watermark */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D49B44]/5 rounded-full blur-xl pointer-events-none" />

          {/* Interactive Names Equation */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 relative">
            {/* Father: Harish */}
            <div className="space-y-3 p-6 rounded-2xl bg-white/60 border border-[#D49B44]/20 hover:border-[#D49B44] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-[#2C1810] text-[#F5D394] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A44]">
                Father's Blessing
              </span>
              <div className="text-3xl font-bold font-display text-[#2C1810]">
                <span className="text-[#B88029] bg-[#F5D394]/30 px-2 py-0.5 rounded-lg underline decoration-[#D49B44] decoration-2">
                  HAR
                </span>
                <span className="text-[#8A5A44] font-normal">ish</span>
              </div>
              <p className="text-xs text-[#583222] leading-relaxed">
                Strength, discipline, and the foundation of honesty that guides every decision we make.
              </p>
            </div>

            {/* Connecting Golden Line & Plus */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D49B44] to-[#F5D394] text-[#2C1810] flex items-center justify-center font-bold text-lg shadow-md animate-pulse">
                +
              </div>
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D49B44] to-transparent hidden md:block" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8A5A44]">
                United as One
              </span>
            </div>

            {/* Mother: Sunita */}
            <div className="space-y-3 p-6 rounded-2xl bg-white/60 border border-[#DE9AA2]/30 hover:border-[#DE9AA2] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-[#2C1810] text-[#ECC0C5] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A44]">
                Mother's Warmth
              </span>
              <div className="text-3xl font-bold font-display text-[#2C1810]">
                <span className="text-[#B88029] bg-[#ECC0C5]/40 px-2 py-0.5 rounded-lg underline decoration-[#DE9AA2] decoration-2">
                  SUN
                </span>
                <span className="text-[#8A5A44] font-normal">ita</span>
              </div>
              <p className="text-xs text-[#583222] leading-relaxed">
                Affection, boundless generosity, and the radiant sunshine that warms every home.
              </p>
            </div>
          </div>

          {/* Golden Synthesis Arrow & Result */}
          <div className="mt-10 pt-8 border-t border-[#D49B44]/20 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#D49B44]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#B88029]">
                The Sweet Union
              </span>
              <Sparkles className="w-4 h-4 text-[#D49B44]" />
            </div>

            {/* Official HarSun Dark Logo Card */}
            <div className="p-4 rounded-2xl bg-[#2C1810] border border-[#D49B44]/40 shadow-xl max-w-sm mx-auto hover:scale-105 transition-transform duration-300">
              <img
                src="/brand/harsun-logo-dark.png"
                alt="HarSun Chocolates Official Dark Emblem"
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="mt-4 text-xs sm:text-sm font-serif-luxury italic text-[#583222] max-w-lg">
              “HAR from Harish. SUN from Sunita. Together, they create HarSun — a brand built to share
              the sweetness of family love with the entire world.”
            </p>
          </div>
        </div>

        {/* 4 Core Brand Pillars as displayed on the identity board */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
          <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
            <Heart className="w-5 h-5 text-[#DE9AA2] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Handmade Chocolates
            </h4>
            <p className="text-[11px] text-[#8A5A44]">Crafted with love</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
            <Gift className="w-5 h-5 text-[#D49B44] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Gift Boxes &amp; Hampers
            </h4>
            <p className="text-[11px] text-[#8A5A44]">Thoughtful giving</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
            <Sparkles className="w-5 h-5 text-[#B88029] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Quality Ingredients
            </h4>
            <p className="text-[11px] text-[#8A5A44]">Real cocoa butter</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
            <Sun className="w-5 h-5 text-[#D49B44] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Affordable For Everyone
            </h4>
            <p className="text-[11px] text-[#8A5A44]">Small bites, big joy</p>
          </div>
        </div>
      </div>
    </section>
  );
};
