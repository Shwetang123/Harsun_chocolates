import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Reveal } from './Reveal';

interface SectionCategoriesProps {
  onShareFeedback: () => void;
  onPreviewProduct: (product: { name: string; category: string; image: string; desc: string }) => void;
}

export const SectionCategories: React.FC<SectionCategoriesProps> = ({
  onShareFeedback,
  onPreviewProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'everyday' | 'handmade' | 'gifting'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  const handleCardMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`);
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`);
    card.style.setProperty('--shine-x', `${x * 100}%`);
    card.style.setProperty('--shine-y', `${y * 100}%`);
  };

  const resetCard = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  const categories = [
    {
      id: 'everyday',
      title: 'Everyday Chocolates',
      tagline: 'An idea for everyday sweet moments',
      description:
        'We hope to begin with smooth milk, dark, and almond chocolate bars made for small everyday treats.',
      image: '/brand/editorial/store-bars.jpg',
      badge: 'Planned collection',
      items: [
        { name: 'HarSun 70% Dark Chocolate Slab', note: 'Rich roasted cocoa & subtle vanilla', wrap: 'Matte Cocoa' },
        { name: 'HarSun Velvet Milk Chocolate Bar', note: 'Caramelized milk & honey warmth', wrap: 'Dusty Blush' },
        { name: 'HarSun Roasted Almond Bar', note: 'Whole Californian almonds in creamy cocoa', wrap: 'Warm Cream' },
      ],
      priceNote: 'Concept preview · Flavours and packaging may change',
      cta: 'Explore the idea',
    },
    {
      id: 'handmade',
      title: 'Handmade Chocolates',
      tagline: 'A small-batch collection we would love to make',
      description:
        'We are exploring handmade truffles, pralines, and bonbons with carefully chosen flavours and a personal touch.',
      image: '/brand/editorial/store-handmade.jpg',
      badge: 'Planned collection',
      items: [
        { name: 'Espresso Dark Truffle', note: 'Infused with freshly extracted espresso', wrap: 'Artisan Cup' },
        { name: 'Ruby Raspberry Praline', note: 'Crisp wafer & fruity ruby cocoa', wrap: 'Heart Bonbon' },
        { name: 'Sea-Salted Caramel Dome', note: 'Slow-cooked amber caramel with fleur de sel', wrap: 'Gold Swirl' },
      ],
      priceNote: 'Concept preview · Tell us which flavours appeal to you',
      cta: 'Explore the idea',
    },
    {
      id: 'gifting',
      title: 'Chocolate Gift Boxes',
      tagline: 'A thoughtful way to share something sweet',
      description:
        'We are imagining gift boxes for birthdays, celebrations, and simple thank-yous, with packaging worth keeping.',
      image: '/brand/editorial/store-gifts.jpg',
      badge: 'Planned collection',
      items: [
        { name: 'The HarSun Signature 12-Piece Box', note: 'Curated blend of truffles and pralines', wrap: 'Satin Bow' },
        { name: 'Grand Celebration 24-Piece Hamper', note: 'Full luxury assortment with greeting card', wrap: 'Double Ribbon' },
        { name: 'Custom Family Gift Assortment', note: 'Personalized selections in keepsake box', wrap: 'Custom Tag' },
      ],
      priceNote: 'Concept preview · No orders are being taken yet',
      cta: 'Explore the idea',
    },
  ];

  const filteredCategories =
    activeTab === 'all' ? categories : categories.filter((c) => c.id === activeTab);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none scroll-mt-20"
    >
      {/* Section Header */}
      <Reveal className="text-center max-w-3xl mx-auto space-y-4 mb-14 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#D49B44]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#F5D394]">
            Pre-launch product preview
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold text-white">
          Our <span className="apple-gold-gradient italic">Store.</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Explore the chocolates and gifting ideas we hope to create, including sweet inspiration for celebrations like Diwali.
          These are pre-launch concepts, not items for sale yet. Tell us what you would be excited to try.
        </p>

        {/* Apple Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 pointer-events-auto">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'everyday', label: 'Everyday Chocolates' },
            { id: 'handmade', label: 'Handmade Treats' },
            { id: 'gifting', label: 'Gift Boxes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playSweetPop();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#D49B44] to-[#F5D394] text-[#120A05] shadow-lg scale-102'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* 3 Main Category Cards */}
      <AnimatePresence mode="wait">
      <motion.div key={activeTab} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduced ? 0 : 0.28 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 z-20 pointer-events-auto">
        {filteredCategories.map((cat, index) => (
          <Reveal key={cat.id} delay={index * 0.1} direction="scale" className="h-full">
          <div
            onPointerMove={handleCardMove}
            onPointerLeave={resetCard}
            className="apple-bento-card product-card rounded-3xl overflow-hidden flex flex-col justify-between group h-full relative"
          >
            <div className="product-shine" aria-hidden="true" />
            <div>
              {/* Product Visual */}
              <div className="relative aspect-4/3 overflow-hidden bg-black/40">
                <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute -inset-6">
                <img
                  src={cat.image}
                  alt={`${cat.title} pre-launch concept photograph`}
                  loading="lazy"
                  decoding="async"
                  width="1448"
                  height="1086"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                </motion.div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#F5D394] text-[11px] font-bold tracking-wider uppercase border border-white/15">
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
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-black shadow-md hover:scale-110 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 cursor-pointer"
                  title="Preview concept"
                  aria-label={`Preview ${cat.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-xs font-serif-luxury italic text-[#F5D394]">{cat.tagline}</p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{cat.description}</p>

                {/* Highlights list */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D49B44] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">{item.name}</span>
                        <span className="block text-[11px] text-neutral-400">{item.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0 space-y-3">
              <p className="text-[11px] italic text-neutral-400 bg-white/5 p-2 rounded-lg border border-white/10">
                {cat.priceNote}
              </p>

              <button
                onClick={() => onPreviewProduct({ name: cat.title, category: cat.badge, image: cat.image, desc: cat.description })}
                className="w-full py-3.5 rounded-full bg-white/10 hover:bg-[#D49B44] text-white hover:text-[#120A05] text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md border border-white/15 cursor-pointer"
              >
                <span>{cat.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button onClick={onShareFeedback} className="w-full text-xs text-[#F5D394] hover:text-white underline underline-offset-4 cursor-pointer">Tell us what you think</button>
            </div>
          </div>
          </Reveal>
        ))}
      </motion.div>
      </AnimatePresence>
    </section>
  );
};
