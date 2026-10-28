import React from 'react';
import { Plus, Check, Volume2, Eye } from 'lucide-react';
import { FLAVORS, type FlavorConfig } from '../data/flavors';
import { soundManager } from '../utils/audio';

interface SectionFlavorCustomizerProps {
  currentFlavor: string;
  onSelectFlavor: (flavorId: string) => void;
  onAddToBag: (flavor: FlavorConfig) => void;
}

export const SectionFlavorCustomizer: React.FC<SectionFlavorCustomizerProps> = ({
  currentFlavor,
  onSelectFlavor,
  onAddToBag,
}) => {
  const flavorList = Object.values(FLAVORS);

  const flavorDetails: Record<
    string,
    {
      finishTag: string;
      percentage: string;
      origin: string;
      profile: string;
      pairings: string;
      acousticDecibel: string;
      temperGloss: string;
    }
  > = {
    dark: {
      finishTag: 'Midnight Noir (Space Black equivalent)',
      percentage: '85% Criollo Cocoa',
      origin: 'Single Origin Kerala & Ecuador',
      profile: 'Bittersweet dark molasses, roasted espresso, and black cherry finish',
      pairings: 'Neat Islay Scotch, black cold brew, Fleur de Sel',
      acousticDecibel: '94 dB Snap',
      temperGloss: 'Mirror Temper Polish',
    },
    milk: {
      finishTag: 'Velvet Gold (Silver / Starlight equivalent)',
      percentage: '45% Grand Cru Cocoa',
      origin: 'A2 Grass-Fed Dairy & Ivory Coast',
      profile: 'Wild heather honey, warm browned butter, and silky shortbread',
      pairings: 'Smoked Earl Grey, roasted macadamia, crisp champagne',
      acousticDecibel: '86 dB Snap',
      temperGloss: 'Velvet Satin Finish',
    },
    almond: {
      finishTag: 'Roasted Amber Praline',
      percentage: '60% Roasted Cocoa',
      origin: 'Californian Nonpareil Almonds',
      profile: 'Double-caramelized roasted nuts folded into dense aromatic chocolate',
      pairings: 'Aged Tawny Port, salted butter brioche, dark espresso',
      acousticDecibel: '91 dB Crunch',
      temperGloss: 'Textured Crystal Sheen',
    },
    ruby: {
      finishTag: 'Rose Quartz Botanical',
      percentage: '52% Unfermented Ruby Bean',
      origin: 'Specialty Brazilian Cacao',
      profile: 'Naturally sour red berries, hibiscus florals, and creamy yogurt tang',
      pairings: 'Sparkling Rosé, fresh raspberries, Iranian pistachios',
      acousticDecibel: '89 dB Snap',
      temperGloss: 'Iridescent Ruby Luster',
    },
  };

  const selectedDetails = flavorDetails[currentFlavor] || flavorDetails.dark;
  const activeObj = FLAVORS[currentFlavor] || FLAVORS.dark;

  return (
    <section id="closer-look" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Apple Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-widest">
          <Eye className="w-3.5 h-3.5 text-[#D49B44]" />
          <span>Explore the Collection</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Take a closer look. <br />
          <span className="apple-gold-gradient">Four finishes. Zero compromises.</span>
        </h2>
        <p className="text-base sm:text-lg text-neutral-400">
          Select a chocolate below to explore its origin, tasting notes, and finish.
        </p>
      </div>

      {/* Main Apple Bento Panel */}
      <div className="apple-bento-card p-8 sm:p-12 rounded-3xl relative overflow-hidden space-y-10">
        {/* Apple Style Finish Pill Switchers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block">
              Current Selection
            </span>
            <span className="text-xl font-bold text-white flex items-center gap-2">
              <span>{activeObj.name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[#F5D394] font-normal">
                {selectedDetails.finishTag}
              </span>
            </span>
          </div>

          {/* Color Switcher Pills (Apple Space Black / Silver style) */}
          <div className="flex items-center gap-3">
            {flavorList.map((f) => {
              const isSelected = f.id === currentFlavor;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    soundManager.playSweetPop();
                    onSelectFlavor(f.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 border-[#D49B44] text-white scale-105 shadow-md'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                  title={f.name}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/30 shadow-xs"
                    style={{ backgroundColor: f.color }}
                  />
                  <span className="text-xs font-medium hidden sm:inline">{f.name.split(' ')[0]}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#F5D394]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Hotspots Grid (Apple Spec Callouts) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-[#0E0A08]/80 border border-white/10 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Origin &amp; Purity
            </span>
            <p className="text-base font-bold text-white">{selectedDetails.origin}</p>
            <p className="text-neutral-400">{selectedDetails.percentage}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0A08]/80 border border-white/10 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Aroma Top-Notes
            </span>
            <p className="text-xs text-neutral-200 leading-relaxed">{selectedDetails.profile}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0A08]/80 border border-white/10 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Sensory Metrics
            </span>
            <div className="flex items-center justify-between text-neutral-300">
              <span>Acoustic Snap</span>
              <span className="text-[#F5D394] font-mono font-bold">
                {selectedDetails.acousticDecibel}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-300">
              <span>Temper Finish</span>
              <span className="text-white font-mono">{selectedDetails.temperGloss}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0A08]/80 border border-white/10 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Sommelier Pairing
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">{selectedDetails.pairings}</p>
          </div>
        </div>

        {/* Interactive Actions Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              soundManager.playChocolateSnap();
            }}
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#F5D394] transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-[#D49B44]" />
            <span>Click to test snap frequency of {activeObj.name}</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playSweetPop();
                onAddToBag(activeObj);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] hover:from-[#E5A853] hover:to-[#FFF0D4] text-[#120A05] font-semibold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#120A05]" />
              <span>Add 1x {activeObj.name} to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
