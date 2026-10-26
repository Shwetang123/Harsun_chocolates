import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SectionCategoriesProps {
  onSelectCategory: (category: string) => void;
  onPreviewProduct: (product: { name: string; category: string; image: string; desc: string }) => void;
}

export const SectionCategories: React.FC<SectionCategoriesProps> = ({
  onSelectCategory,
  onPreviewProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'everyday' | 'handmade' | 'gifting'>('all');

  const categories = [
    {
      id: 'everyday',
      title: 'Everyday Chocolates',
      tagline: 'Simple Pleasures for Daily Sweet Moments',
      description:
        'Silky smooth milk, dark, and nutty almond chocolate bars wrapped in pocket-friendly elegance. Crafted to brighten your daily routine.',
      image: '/brand/product-bars-collection.png',
      badge: 'Everyday Indulgence',
      items: [
        { name: 'HarSun 70% Dark Chocolate Slab', note: 'Rich roasted cocoa & subtle vanilla', wrap: 'Matte Cocoa' },
        { name: 'HarSun Velvet Milk Chocolate Bar', note: 'Caramelized milk & honey warmth', wrap: 'Dusty Blush' },
        { name: 'HarSun Roasted Almond Bar', note: 'Whole Californian almonds in creamy cocoa', wrap: 'Warm Cream' },
      ],
      priceNote: 'Starting from accessible daily treats (Placeholder pricing upon launch)',
      cta: 'Explore Everyday Treats',
    },
    {
      id: 'handmade',
      title: 'Handmade Chocolates',
      tagline: 'Artisanal Confections Crafted in Small Batches',
      description:
        'Small-batch truffles, dusted mendiants, and ganache bonbons carefully shaped and decorated by master hands with 100% pure cocoa butter.',
      image: '/brand/product-truffle-box.png',
      badge: 'Handcrafted',
      items: [
        { name: 'Espresso Dark Truffle', note: 'Infused with freshly extracted espresso', wrap: 'Artisan Cup' },
        { name: 'Ruby Raspberry Praline', note: 'Crisp wafer & fruity ruby cocoa', wrap: 'Heart Bonbon' },
        { name: 'Sea-Salted Caramel Dome', note: 'Slow-cooked amber caramel with fleur de sel', wrap: 'Gold Swirl' },
      ],
      priceNote: 'Artisan assortment boxes (Placeholder pricing upon launch)',
      cta: 'Discover Handmade Collection',
    },
    {
      id: 'gifting',
      title: 'Chocolate Gift Boxes',
      tagline: 'Two Names. One Sweet Dream for Loved Ones.',
      description:
        'Signature blush pink keepsake boxes with rich espresso satin ribbons and gold-foil HarSun crests. Perfect for weddings, birthdays, and festive sharing.',
      image: '/brand/product-gift-box.png',
      badge: 'Celebrations & Hampers',
      items: [
        { name: 'The HarSun Signature 12-Piece Box', note: 'Curated blend of truffles and pralines', wrap: 'Satin Bow' },
        { name: 'Grand Celebration 24-Piece Hamper', note: 'Full luxury assortment with greeting card', wrap: 'Double Ribbon' },
        { name: 'Custom Family Gift Assortment', note: 'Personalized selections in keepsake box', wrap: 'Custom Tag' },
      ],
      priceNote: 'Luxury festive hampers (Placeholder pricing upon launch)',
      cta: 'Curate a Gift Box',
    },
  ];

  const filteredCategories =
    activeTab === 'all' ? categories : categories.filter((c) => c.id === activeTab);

  return (
    <section
      id="categories"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#D49B44]/30 pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#D49B44]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#583222]">
            Section 04 &bull; Chocolate For Every Budget
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-[#2C1810]">
          Sweetness Designed for <span className="gold-gradient-text italic">Everyone.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#583222] leading-relaxed">
          At HarSun, luxury isn't an exclusive privilege. Inspired by our parents Harish and Sunita,
          we believe genuine quality should be accessible to all: from pocket-friendly everyday slabs
          to lavish bespoke hampers.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 pointer-events-auto">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'everyday', label: 'Everyday Chocolates' },
            { id: 'handmade', label: 'Handmade Chocolates' },
            { id: 'gifting', label: 'Gift Boxes & Hampers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playSweetPop();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#2C1810] text-[#FFF8F0] shadow-md border border-[#D49B44]/50'
                  : 'bg-white/70 hover:bg-white text-[#583222] border border-[#D49B44]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Main Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 z-20 pointer-events-auto">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between border border-[#D49B44]/30 hover:border-[#D49B44] transition-all duration-300 hover:shadow-2xl group"
          >
            <div>
              {/* Product Visual */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF4EE]/60">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#2C1810]/85 backdrop-blur-md text-[#F5D394] text-[11px] font-bold tracking-wider uppercase border border-[#D49B44]/30">
                    {cat.badge}
                  </span>
                </div>
                <button
                  onClick={() =>
                    onPreviewProduct({
                      name: cat.title,
                      category: cat.badge,
                      image: cat.image,
                      desc: cat.description,
                    })
                  }
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#2C1810] shadow-md hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2C1810] mb-1">{cat.title}</h3>
                  <p className="text-xs font-serif-luxury italic text-[#8A5A44]">{cat.tagline}</p>
                </div>

                <p className="text-xs sm:text-sm text-[#583222] leading-relaxed">{cat.description}</p>

                {/* Highlights list */}
                <div className="pt-2 border-t border-[#D49B44]/20 space-y-2">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D49B44] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#2C1810]">{item.name}</span>
                        <span className="block text-[11px] text-[#8A5A44]">{item.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0 space-y-3">
              <p className="text-[11px] italic text-[#8A5A44] bg-[#FAF4EE] p-2 rounded-lg border border-[#D49B44]/15">
                {cat.priceNote}
              </p>

              <button
                onClick={() => {
                  soundManager.playSweetPop();
                  onSelectCategory(cat.id);
                }}
                className="w-full py-3 rounded-full bg-[#2C1810] hover:bg-[#3D2217] text-[#FFF8F0] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg border border-[#D49B44]/30"
              >
                <span>{cat.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#F5D394] group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
