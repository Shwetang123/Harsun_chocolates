import React from 'react';
import { Plus, Check, SlidersHorizontal } from 'lucide-react';
import { FLAVORS, type FlavorConfig } from './Scene3D';
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
      percentage: string;
      origin: string;
      profile: string;
      pairings: string;
      wrapperImg: string;
    }
  > = {
    dark: {
      percentage: '70% Cocoa',
      origin: 'Single Origin Ghana',
      profile: 'Bittersweet, smoky wood notes with roasted espresso finish',
      pairings: 'Black coffee, vintage red wine, sea salt caramel',
      wrapperImg: '/brand/product-bar-dark.png',
    },
    milk: {
      percentage: '42% Cocoa',
      origin: 'Alpine Milk & Ivory Coast',
      profile: 'Velvety cream, wild honey, and toasted shortbread undertones',
      pairings: 'Earl Grey tea, roasted hazelnuts, warm brioche',
      wrapperImg: '/brand/product-bar-milk.png',
    },
    almond: {
      percentage: '55% Cocoa',
      origin: 'California Roasted Almonds',
      profile: 'Crunchy caramelized whole nuts enveloped in balanced cocoa',
      pairings: 'Espresso macchiato, aged cheddar, dried cranberries',
      wrapperImg: '/brand/product-bar-almond.png',
    },
    ruby: {
      percentage: '47% Cocoa',
      origin: 'Ruby Cocoa Beans, Brazil',
      profile: 'Luscious natural berry sourness with fresh yogurt tart finish',
      pairings: 'Sparkling rosé, fresh raspberries, pistachio cream',
      wrapperImg: '/brand/product-bar-milk.png',
    },
  };

  const selectedDetails = flavorDetails[currentFlavor] || flavorDetails.dark;
  const activeObj = FLAVORS[currentFlavor] || FLAVORS.dark;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 pointer-events-auto">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-[#D49B44]/30 shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D49B44]/20 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B88029]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive 3D Bar Inspector</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#2C1810]">
              Customize Chocolate &bull; Watch 3D Realtime
            </h3>
          </div>

          <span className="text-xs text-[#8A5A44] font-serif-luxury italic">
            Select a flavor to morph the 3D model above
          </span>
        </div>

        {/* 4 Flavor Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {flavorList.map((f) => {
            const isSelected = f.id === currentFlavor;
            return (
              <button
                key={f.id}
                onClick={() => {
                  soundManager.playSweetPop();
                  onSelectFlavor(f.id);
                }}
                className={`p-4 rounded-2xl text-left transition-all duration-300 relative border ${
                  isSelected
                    ? 'bg-[#2C1810] text-[#FFF8F0] border-[#D49B44] shadow-lg scale-102 ring-2 ring-[#D49B44]/30'
                    : 'bg-white/70 hover:bg-white text-[#2C1810] border-[#D49B44]/20 hover:border-[#D49B44]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#D49B44] text-white flex items-center justify-center text-xs">
                    <Check className="w-3 h-3" />
                  </span>
                )}
                <div
                  className="w-7 h-7 rounded-full mb-3 shadow-xs border border-white/50"
                  style={{ backgroundColor: f.color }}
                />
                <span className="block text-xs font-semibold tracking-wider uppercase mb-1">
                  {f.name}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-[#F5D394]' : 'text-[#8A5A44]'
                  }`}
                >
                  {flavorDetails[f.id]?.percentage || 'Signature Blend'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Flavor Detail Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#D49B44]/20 text-xs">
          <div className="p-4 rounded-xl bg-white/60 space-y-1">
            <span className="block font-bold uppercase tracking-wider text-[#8A5A44]">
              Cocoa Origin &amp; Purity
            </span>
            <p className="text-sm font-semibold text-[#2C1810]">{selectedDetails.origin}</p>
            <p className="text-[11px] text-[#583222]">{selectedDetails.percentage}</p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 space-y-1">
            <span className="block font-bold uppercase tracking-wider text-[#8A5A44]">
              Tasting Aroma Profile
            </span>
            <p className="text-sm font-semibold text-[#2C1810]">{selectedDetails.profile}</p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 space-y-1">
            <span className="block font-bold uppercase tracking-wider text-[#8A5A44]">
              Ideal Pairings
            </span>
            <p className="text-sm font-semibold text-[#2C1810]">{selectedDetails.pairings}</p>
          </div>
        </div>

        {/* Add to Bag CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-[#8A5A44] italic">
            * Artisanal small-batch craft. Packed in fresh airtight barrier foil.
          </p>

          <button
            onClick={() => {
              soundManager.playSweetPop();
              onAddToBag(activeObj);
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#2C1810] to-[#4A2618] hover:from-[#3D2217] hover:to-[#5A3120] text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#D49B44]/40"
          >
            <Plus className="w-4 h-4 text-[#F5D394]" />
            <span>Add {activeObj.name} to Gift Bag</span>
          </button>
        </div>
      </div>
    </section>
  );
};
