import React, { useEffect, useState } from 'react';
import { ChevronRight, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AppleLocalNavProps {
  onOpenGiftBuilder: () => void;
}

export const AppleLocalNav: React.FC<AppleLocalNavProps> = ({ onOpenGiftBuilder }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      // Pin when scrolled past top banner
      setIsSticky(window.scrollY > 60);

      // Detect current section
      const sections = ['hero', 'highlights', 'cacao-engine', 'closer-look', 'compare', 'story'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundManager.playSweetPop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isSticky
          ? 'bg-[#0A0706]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-2.5'
          : 'bg-[#0A0706]/40 backdrop-blur-md border-b border-white/5 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Product Name (MacBook Pro equivalent) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('hero')}
            className="text-left group flex items-center gap-2 cursor-pointer"
          >
            <span className="text-sm sm:text-base font-semibold text-white tracking-tight group-hover:text-[#F5D394] transition-colors">
              HarSun Reserve
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-white/10 text-[#F5D394] border border-white/10">
              Criollo Edition
            </span>
          </button>
        </div>

        {/* Center / Right Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs">
          <nav className="hidden md:flex items-center gap-5 text-neutral-400 font-medium">
            <button
              onClick={() => scrollTo('hero')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSection === 'hero' ? 'text-white' : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => scrollTo('highlights')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSection === 'highlights' ? 'text-white' : ''
              }`}
            >
              Highlights
            </button>
            <button
              onClick={() => scrollTo('cacao-engine')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSection === 'cacao-engine' ? 'text-white' : ''
              }`}
            >
              The Cacao Engine
            </button>
            <button
              onClick={() => scrollTo('closer-look')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSection === 'closer-look' ? 'text-white' : ''
              }`}
            >
              Take a Closer Look
            </button>
            <button
              onClick={() => scrollTo('compare')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSection === 'compare' ? 'text-white' : ''
              }`}
            >
              Compare
            </button>
          </nav>

          {/* Apple-style Snap Sound Tester */}
          <button
            onClick={() => {
              soundManager.playChocolateSnap();
            }}
            title="Acoustic Temper Snap Test"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-[#F5D394] border border-white/10 transition-all text-[11px] cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#D49B44]" />
            <span>Test Snap (92dB)</span>
          </button>

          {/* Right: Apple-style Gold Pill Action Button */}
          <button
            onClick={() => {
              soundManager.playSweetPop();
              onOpenGiftBuilder();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] hover:from-[#E5A853] hover:to-[#FFF0D4] text-[#1A0F08] font-semibold text-xs tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Order Box</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#1A0F08]" />
          </button>
        </div>
      </div>
    </div>
  );
};
