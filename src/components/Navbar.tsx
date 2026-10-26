import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, Menu, X, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenGiftBuilder: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGiftBuilder, cartCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setIsAudioActive(newState);
  };

  const scrollTo = (id: string) => {
    soundManager.playSweetPop();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF4EE]/95 backdrop-blur-md shadow-sm border-b border-[#D49B44]/20 py-2.5'
            : 'bg-[#FAF4EE]/60 backdrop-blur-xs py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Brand Logo & Tagline */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex items-center gap-3.5 group pointer-events-auto shrink-0"
          >
            <img
              src="/brand/harsun-logo-hero.png"
              alt="HarSun Chocolates"
              className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden xl:block border-l border-[#D49B44]/40 pl-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#2C1810]">
                HarSun Chocolates
              </span>
              <span className="block text-[11px] font-serif-luxury italic text-[#8A5A44]">
                Two Names. One Sweet Dream.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 pointer-events-auto mx-auto">
            <button
              onClick={() => scrollTo('hero')}
              className="text-xs uppercase tracking-widest text-[#2C1810] font-semibold hover:text-[#D49B44] transition-colors cursor-pointer py-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('discover')}
              className="text-xs uppercase tracking-widest text-[#2C1810] font-semibold hover:text-[#D49B44] transition-colors cursor-pointer py-1"
            >
              The Chocolate
            </button>
            <button
              onClick={() => scrollTo('craft')}
              className="text-xs uppercase tracking-widest text-[#2C1810] font-semibold hover:text-[#D49B44] transition-colors cursor-pointer py-1"
            >
              Cocoa Craft
            </button>
            <button
              onClick={() => scrollTo('handmade')}
              className="text-xs uppercase tracking-widest text-[#2C1810] font-semibold hover:text-[#D49B44] transition-colors cursor-pointer py-1"
            >
              Gifting
            </button>
            <button
              onClick={() => scrollTo('categories')}
              className="text-xs uppercase tracking-widest text-[#2C1810] font-semibold hover:text-[#D49B44] transition-colors cursor-pointer py-1"
            >
              Collection
            </button>
            <button
              onClick={() => scrollTo('story')}
              className="text-xs uppercase tracking-widest text-[#2C1810] font-semibold hover:text-[#D49B44] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#DE9AA2] fill-[#DE9AA2]" />
              Our Story
            </button>
          </nav>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 pointer-events-auto shrink-0">
            {/* Audio Ambient Toggle */}
            <button
              onClick={toggleSound}
              title={isAudioActive ? 'Mute ambient soundscapes' : 'Enable ambient chocolate chimes'}
              className="p-2 sm:p-2.5 rounded-full border border-[#D49B44]/30 hover:border-[#D49B44] bg-white/80 hover:bg-white text-[#583222] transition-all shadow-xs cursor-pointer"
            >
              {isAudioActive ? (
                <Volume2 className="w-4 h-4 text-[#D49B44] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#8A5A44]" />
              )}
            </button>

            {/* Custom Gift Builder Button */}
            <button
              onClick={() => {
                soundManager.playSweetPop();
                onOpenGiftBuilder();
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2C1810] to-[#4A2618] hover:from-[#3D2217] hover:to-[#5A3120] text-[#FFF8F0] text-xs font-semibold tracking-wider uppercase shadow-md transition-all hover:scale-105 active:scale-95 border border-[#D49B44]/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5D394]" />
              <span>Build Gift Box</span>
            </button>

            {/* Bag / Cart indicator */}
            <button
              onClick={() => {
                soundManager.playSweetPop();
                onOpenGiftBuilder();
              }}
              className="relative p-2 sm:p-2.5 rounded-full border border-[#D49B44]/30 hover:border-[#D49B44] bg-white/80 hover:bg-white text-[#2C1810] transition-all shadow-xs cursor-pointer"
              title="View Box & Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#2C1810]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D49B44] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2C1810] hover:bg-black/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF4EE]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-12 animate-in fade-in duration-300">
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#D49B44]/20">
              <img
                src="/brand/harsun-logo-hero.png"
                alt="HarSun"
                className="h-12 w-auto mb-2 mix-blend-multiply"
              />
              <p className="text-xs font-serif-luxury italic text-[#8A5A44]">
                Two Names. One Sweet Dream.
              </p>
            </div>
            <div className="flex flex-col space-y-4 text-base font-semibold tracking-wider uppercase text-[#2C1810]">
              <button
                onClick={() => scrollTo('hero')}
                className="text-left py-2 hover:text-[#D49B44] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo('discover')}
                className="text-left py-2 hover:text-[#D49B44] transition-colors"
              >
                The Chocolate
              </button>
              <button
                onClick={() => scrollTo('craft')}
                className="text-left py-2 hover:text-[#D49B44] transition-colors"
              >
                From Cocoa to Chocolate
              </button>
              <button
                onClick={() => scrollTo('handmade')}
                className="text-left py-2 hover:text-[#D49B44] transition-colors"
              >
                Handmade &amp; Gifting
              </button>
              <button
                onClick={() => scrollTo('categories')}
                className="text-left py-2 hover:text-[#D49B44] transition-colors"
              >
                Chocolate For Every Budget
              </button>
              <button
                onClick={() => scrollTo('story')}
                className="text-left py-2 text-[#9E3E4B] hover:text-[#D49B44] transition-colors flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                The Story Behind The Name
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D49B44]/20 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGiftBuilder();
              }}
              className="w-full py-3.5 rounded-full bg-[#2C1810] text-[#FFF8F0] font-semibold tracking-widest text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#F5D394]" />
              Build Custom Gift Box
            </button>
            <p className="text-center text-xs text-[#8A5A44]">
              Handcrafted in honor of Harish &amp; Sunita
            </p>
          </div>
        </div>
      )}
    </>
  );
};
