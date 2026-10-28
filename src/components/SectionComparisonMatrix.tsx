import React from 'react';
import { Check, Sparkles, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ComparisonItem {
  id: string;
  name: string;
  badge: string;
  subtitle: string;
  price: string;
  image: string;
  specs: {
    cacaoPercentage: string;
    origin: string;
    conchingTime: string;
    packaging: string;
    servingOccasion: string;
    customRibbon: boolean;
  };
  recommended?: boolean;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    id: 'single-bar',
    name: 'HarSun Reserve Bar',
    badge: 'Pure Single-Origin',
    subtitle: 'For personal daily elevation and discerning solo rituals.',
    price: '₹349',
    image: '/brand/product-bar-dark.png',
    specs: {
      cacaoPercentage: '85% or 70% Criollo',
      origin: 'Idukki Estate, Kerala',
      conchingTime: '72 Hours Granite Stone',
      packaging: 'Gold Hermetic Foil & Textured Matte Box',
      servingOccasion: 'Daily Mindful Tasting',
      customRibbon: false,
    },
  },
  {
    id: 'truffle-box',
    name: 'Artisan Truffle Box (16 pcs)',
    badge: 'Most Loved Gift',
    subtitle: 'An intimate gallery of 16 hand-rolled ganaches and praline domes.',
    price: '₹1,499',
    image: '/brand/product-truffle-box.png',
    specs: {
      cacaoPercentage: 'Multi-terroir 42% – 85%',
      origin: 'Kerala & Manabí Ecuador',
      conchingTime: '48 to 72 Hours',
      packaging: 'Handmade Rigid Gift Box with Magnetic Clasp',
      servingOccasion: 'Birthdays, Anniversaries, Dinners',
      customRibbon: true,
    },
    recommended: true,
  },
  {
    id: 'heritage-chest',
    name: 'Grand Heritage Chest (32 pcs)',
    badge: 'The Masterpiece',
    subtitle: 'The ultimate bespoke expression with gold-foil embossed plaque.',
    price: '₹2,999',
    image: '/brand/product-gift-box.png',
    specs: {
      cacaoPercentage: 'Full Reserve Portfolio',
      origin: 'Four Heritage Partner Estates',
      conchingTime: 'Up to 96 Hours Conched',
      packaging: 'Solid Cedar & Silk-Lined Presentation Chest',
      servingOccasion: 'Weddings, VIP Corporate, Milestone Celebrations',
      customRibbon: true,
    },
  },
];

interface SectionComparisonMatrixProps {
  onSelectProduct: (productId: string) => void;
  onOpenGiftBuilder: () => void;
}

export const SectionComparisonMatrix: React.FC<SectionComparisonMatrixProps> = ({
  onSelectProduct,
  onOpenGiftBuilder,
}) => {
  return (
    <section id="compare" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D49B44]" />
          <span>Compare the line-up</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Which HarSun is <br />
          <span className="apple-gold-gradient">right for your moment?</span>
        </h2>
        <p className="text-base sm:text-lg text-neutral-400">
          Engineered for every budget and occasion. Uncompromising purity across every edition.
        </p>
      </div>

      {/* Grid of 3 Comparison Columns (Apple Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COMPARISON_DATA.map((item) => (
          <div
            key={item.id}
            className={`apple-bento-card p-8 rounded-3xl flex flex-col justify-between relative group ${
              item.recommended ? 'ring-2 ring-[#D49B44]/60 border-[#D49B44]/40' : ''
            }`}
          >
            {item.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] text-[#120A05] text-[10px] font-bold uppercase tracking-widest shadow-lg">
                Curator's Choice
              </div>
            )}

            <div className="space-y-6">
              {/* Product Visual */}
              <div className="w-full h-48 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center p-4 overflow-hidden relative group-hover:scale-102 transition-transform duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>

              {/* Title & Price */}
              <div className="space-y-2 border-b border-white/10 pb-6">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#F5D394] block">
                  {item.badge}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{item.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                  {item.subtitle}
                </p>
                <div className="text-3xl font-extrabold text-white pt-2">{item.price}</div>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-semibold">
                    Cacao Content
                  </span>
                  <span className="text-neutral-200 font-medium">{item.specs.cacaoPercentage}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-semibold">
                    Conching Duration
                  </span>
                  <span className="text-neutral-200 font-medium">{item.specs.conchingTime}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-semibold">
                    Terroir Source
                  </span>
                  <span className="text-neutral-200 font-medium">{item.specs.origin}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-semibold">
                    Presentation Finish
                  </span>
                  <span className="text-neutral-200 font-medium">{item.specs.packaging}</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      item.specs.customRibbon
                        ? 'bg-[#D49B44] text-[#120A05]'
                        : 'bg-white/10 text-neutral-500'
                    }`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-neutral-300">
                    {item.specs.customRibbon ? 'Personalized Silk Ribbon Included' : 'Standard Wax Seal Wrap'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8 mt-6 border-t border-white/10">
              <button
                onClick={() => {
                  soundManager.playSweetPop();
                  if (item.id === 'single-bar') {
                    onSelectProduct('single-bar');
                  } else {
                    onOpenGiftBuilder();
                  }
                }}
                className={`w-full py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  item.recommended
                    ? 'bg-gradient-to-r from-[#D49B44] to-[#F5D394] hover:from-[#E5A853] hover:to-[#FFF0D4] text-[#120A05] hover:scale-105 active:scale-95'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30'
                }`}
              >
                <span>Select &amp; Order</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
