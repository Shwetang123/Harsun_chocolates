import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface SectionFinalRevealProps {
  onExploreCollection: () => void;
  onOpenGiftBuilder: () => void;
}

export const SectionFinalReveal: React.FC<SectionFinalRevealProps> = ({
  onExploreCollection,
  onOpenGiftBuilder,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundManager.playChime(523.25, 0.4);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D49B44', '#E8B4B8', '#FAF4EE'],
    });
    setSubscribed(true);
  };

  return (
    <section
      id="reveal"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center text-center pointer-events-none"
    >
      {/* Background warm radiant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#F5D394]/30 via-[#E8B4B8]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto z-20 space-y-8">
        {/* Official Brand Logo */}
        <div className="pointer-events-auto inline-block">
          <img
            src="/brand/harsun-logo-hero.png"
            alt="HarSun Chocolates"
            className="w-full max-w-md mx-auto h-auto object-contain drop-shadow-md select-none"
          />
        </div>

        {/* Closing Message */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2C1810] tracking-tight leading-tight">
            HarSun Chocolates. <br />
            <span className="gold-gradient-text italic font-serif-luxury text-4xl sm:text-6xl lg:text-7xl">
              Two Names. One Sweet Dream.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#583222] max-w-xl mx-auto leading-relaxed">
            From our family's hearth to your sweet celebrations. Taste the dedication, the pure cocoa
            butter, and the timeless love poured into every creation.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pointer-events-auto">
          <button
            onClick={() => {
              soundManager.playSweetPop();
              onExploreCollection();
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#2C1810] via-[#3E2116] to-[#2C1810] hover:from-[#3D2217] hover:to-[#552E1E] text-[#FFF8F0] font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-[#D49B44]/40 group"
          >
            <span>Explore Our Collection</span>
            <ArrowRight className="w-4 h-4 text-[#F5D394] group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundManager.playSweetPop();
              onOpenGiftBuilder();
            }}
            className="px-8 py-4 rounded-full bg-white/85 hover:bg-white text-[#2C1810] font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-[#D49B44]/40"
          >
            <Sparkles className="w-4 h-4 text-[#D49B44]" />
            <span>Build a Custom Gift Box</span>
          </button>
        </div>

        {/* VIP Tasting Club & Launch Updates */}
        <div className="pt-10 max-w-md mx-auto pointer-events-auto">
          <form
            onSubmit={handleSubscribe}
            className="glass-panel p-2 rounded-full border border-[#D49B44]/30 shadow-md flex items-center gap-2"
          >
            <div className="pl-4 text-[#8A5A44]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Join VIP Sweet Club (updates &amp; tasting boxes)"
              disabled={subscribed}
              className="w-full bg-transparent text-xs text-[#2C1810] placeholder-[#8A5A44]/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="px-5 py-2.5 rounded-full bg-[#2C1810] hover:bg-[#3D2217] text-[#FFF8F0] text-xs font-semibold uppercase tracking-wider shrink-0 transition-all disabled:bg-green-700"
            >
              {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-green-700 font-semibold mt-2 animate-in fade-in">
              Welcome to the HarSun family! Sweet surprises are on the way.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
