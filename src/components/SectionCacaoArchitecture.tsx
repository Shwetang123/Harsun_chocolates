import React, { useState } from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CacaoTier {
  id: string;
  name: string;
  tagline: string;
  cacaoPct: string;
  roastTime: string;
  flavorNotes: string[];
  metrics: {
    intensity: number; // 0 - 100
    linger: number;
    velvet: number;
    antioxidants: number;
  };
  description: string;
  bestFor: string;
}

const CACAO_TIERS: CacaoTier[] = [
  {
    id: 'criollo',
    name: 'Criollo Grand Cru',
    tagline: 'The M4 of Cacao. Ultra-rare, floral, and deeply delicate.',
    cacaoPct: '85% Single-Origin',
    roastTime: 'Low-Temp Slow Roast (115°C)',
    flavorNotes: ['Wild Jasmine', 'Red Currant', 'Raw Honey', 'Cedarwood'],
    metrics: {
      intensity: 94,
      linger: 98,
      velvet: 95,
      antioxidants: 99,
    },
    description:
      'Representing less than 3% of global cacao harvests. The Criollo bean possesses almost no bitterness, allowing delicate floral esters and raspberry acidity to shine with astonishing clarity.',
    bestFor: 'Connoisseur tastings, neat single malt pairings, mindful sensory evening rituals.',
  },
  {
    id: 'trinitario',
    name: 'Trinitario Reserve',
    tagline: 'The M4 Pro. Complex, aromatic, and impeccably balanced.',
    cacaoPct: '72% Estate Blend',
    roastTime: 'Medium Convection (128°C)',
    flavorNotes: ['Roasted Hazelnut', 'Aged Bourbon Oak', 'Brown Butter', 'Dark Plum'],
    metrics: {
      intensity: 86,
      linger: 88,
      velvet: 92,
      antioxidants: 89,
    },
    description:
      'A natural hybrid combining Criollo elegance with Forastero resilience. Brings rich cocoa resonance with notes of toasted caramel and spiced tobacco smoke.',
    bestFor: 'Bespoke corporate gifting, dinner party centerpieces, everyday luxury indulgences.',
  },
  {
    id: 'forastero',
    name: 'Forastero Bold',
    tagline: 'The M4 Max. Maximum cocoa horsepower and relentless depth.',
    cacaoPct: '65% Full-Bodied Dark',
    roastTime: 'Intense Granite Fire Roast (138°C)',
    flavorNotes: ['Double Espresso', 'Dark Truffle Earth', 'Molasses', 'Sea Salt'],
    metrics: {
      intensity: 99,
      linger: 90,
      velvet: 87,
      antioxidants: 92,
    },
    description:
      'Engineered for those who crave deep, unapologetic cocoa intensity. High natural cocoa butter content gives it a heavier, buttery mouthfeel and a dramatic dark hue.',
    bestFor: 'Espresso aficionados, dark baking mastery, energy-boosting afternoon bites.',
  },
];

export const SectionCacaoArchitecture: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('criollo');

  const currentTier = CACAO_TIERS.find((t) => t.id === selectedTier) || CACAO_TIERS[0];

  return (
    <section id="cacao-engine" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Apple-style Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-widest">
          <Cpu className="w-3.5 h-3.5 text-[#D49B44]" />
          <span>The Cacao Architecture</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Three legendary strains. <br />
          <span className="apple-gold-gradient">One transcendent standard.</span>
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
          Just like custom silicon, great chocolate begins at the architectural level. Choose the
          terroir and bean profile calibrated to your sensory frequency.
        </p>
      </div>

      {/* Apple M4 Chip Switcher Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          {CACAO_TIERS.map((tier) => {
            const active = tier.id === selectedTier;
            return (
              <button
                key={tier.id}
                onClick={() => {
                  soundManager.playSweetPop();
                  setSelectedTier(tier.id);
                }}
                className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#D49B44] to-[#F5D394] text-[#120A05] shadow-lg scale-102'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tier.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Architecture Panel */}
      <div className="apple-bento-card p-8 sm:p-12 rounded-3xl relative overflow-hidden">
        {/* Ambient backlight glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D49B44]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
          {/* Left Column: Description & Notes */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#F5D394]">
                {currentTier.cacaoPct} &bull; {currentTier.roastTime}
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {currentTier.tagline}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed pt-2">
                {currentTier.description}
              </p>
            </div>

            {/* Flavor Note Chips */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                Dominant Tasting Esters:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentTier.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-neutral-200 font-medium flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#F5D394]" />
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300">
              <span className="font-bold text-[#F5D394] uppercase tracking-wider block mb-1">
                Curator's Pairing Guide:
              </span>
              {currentTier.bestFor}
            </div>
          </div>

          {/* Right Column: Performance Graph Meters (Apple Spec Comparison style) */}
          <div className="lg:col-span-5 space-y-6 p-6 sm:p-8 rounded-2xl bg-[#0F0B09]/90 border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#D49B44]" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Laboratory Profile
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#F5D394]">ISO-Cacao Validated</span>
            </div>

            {/* Graph 1: Cocoa Intensity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Aromatic Cocoa Intensity</span>
                <span className="text-white font-mono font-bold">{currentTier.metrics.intensity}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentTier.metrics.intensity}%` }}
                />
              </div>
            </div>

            {/* Graph 2: Palate Linger (Hours) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Finish Longevity on Palate</span>
                <span className="text-white font-mono font-bold">{currentTier.metrics.linger}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D49B44] to-[#FFF0D4] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentTier.metrics.linger}%` }}
                />
              </div>
            </div>

            {/* Graph 3: Velvet Viscosity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Silky Velvet Melt Rate</span>
                <span className="text-white font-mono font-bold">{currentTier.metrics.velvet}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#DE9AA2] to-[#F5D394] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentTier.metrics.velvet}%` }}
                />
              </div>
            </div>

            {/* Graph 4: Antioxidant Density */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Polyphenol Bioavailability</span>
                <span className="text-white font-mono font-bold">{currentTier.metrics.antioxidants}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D49B44] to-[#ECC278] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentTier.metrics.antioxidants}%` }}
                />
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 text-center pt-2">
              Tested under calibrated human sensory panel in Zurich & Mumbai.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
