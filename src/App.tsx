import { useState } from 'react';
import { Scene3D, type FlavorConfig } from './components/Scene3D';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SectionDiscover } from './components/SectionDiscover';
import { SectionCraft } from './components/SectionCraft';
import { SectionHandmade } from './components/SectionHandmade';
import { SectionCategories } from './components/SectionCategories';
import { SectionStory } from './components/SectionStory';
import { SectionFlavorCustomizer } from './components/SectionFlavorCustomizer';
import { SectionFinalReveal } from './components/SectionFinalReveal';
import { Footer } from './components/Footer';
import { SectionGiftBuilder } from './components/SectionGiftBuilder';
import { GiftBoxModal } from './components/GiftBoxModal';
import { ProductPreviewModal, type PreviewProductData } from './components/ProductPreviewModal';
import { soundManager } from './utils/audio';

export function App() {
  const [currentFlavor, setCurrentFlavor] = useState<string>('dark');
  const [giftBuilderOpen, setGiftBuilderOpen] = useState(false);
  const [giftBoxModalOpen, setGiftBoxModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<PreviewProductData | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectFlavor = (flavorId: string) => {
    setCurrentFlavor(flavorId);
  };

  const handleAddToBag = (flavor: FlavorConfig) => {
    setCartCount((prev) => prev + 1);
    showToast(`Added 1x ${flavor.name} to your HarSun Gift Bag`);
  };

  const handleBoxCompleted = (summary: { size: number; ribbon: string; pieces: string[] }) => {
    setCartCount((prev) => prev + 1);
    showToast(`Custom ${summary.size}-Piece Gift Box added to your bag!`);
  };

  const scrollTo = (id: string) => {
    soundManager.playSweetPop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="page-root" className="relative min-h-screen selection:bg-[#D49B44] selection:text-white">
      {/* 3D WebGL Background Layer (Fixed and scroll-driven) */}
      <Scene3D currentFlavor={currentFlavor} />

      {/* Floating Header */}
      <Navbar
        onOpenGiftBuilder={() => setGiftBuilderOpen(true)}
        cartCount={cartCount}
      />

      {/* Main Storytelling Sections */}
      <main className="relative z-20">
        <HeroSection
          onExplore={() => scrollTo('categories')}
          onDiscoverStory={() => scrollTo('story')}
        />

        <SectionDiscover />

        <SectionCraft />

        <SectionHandmade
          onOpenGiftBoxModal={() => setGiftBoxModalOpen(true)}
          onOpenBuilder={() => setGiftBuilderOpen(true)}
        />

        <SectionCategories
          onSelectCategory={(catId) => {
            if (catId === 'gifting') {
              setGiftBuilderOpen(true);
            } else {
              scrollTo('categories');
            }
          }}
          onPreviewProduct={(prod) => setPreviewProduct(prod)}
        />

        {/* Real-time 3D Chocolate Bar Inspector */}
        <SectionFlavorCustomizer
          currentFlavor={currentFlavor}
          onSelectFlavor={handleSelectFlavor}
          onAddToBag={handleAddToBag}
        />

        <SectionStory />

        <SectionFinalReveal
          onExploreCollection={() => scrollTo('categories')}
          onOpenGiftBuilder={() => setGiftBuilderOpen(true)}
        />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <SectionGiftBuilder
        isOpen={giftBuilderOpen}
        onClose={() => setGiftBuilderOpen(false)}
        onBoxComplete={handleBoxCompleted}
      />

      <GiftBoxModal
        isOpen={giftBoxModalOpen}
        onClose={() => setGiftBoxModalOpen(false)}
        onOpenCustomizer={() => {
          setGiftBoxModalOpen(false);
          setGiftBuilderOpen(true);
        }}
      />

      <ProductPreviewModal
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
        onOpenGiftBuilder={() => {
          setPreviewProduct(null);
          setGiftBuilderOpen(true);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#2C1810] text-[#FFF8F0] text-xs font-semibold shadow-2xl border border-[#D49B44] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D49B44] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
