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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D49B44]/20 via-[#DE9AA2]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto z-20 space-y-8">
        {/* Official Brand Logo */}
        <div className="pointer-events-auto inline-block">
          <img
            src="/brand/harsun-logo-transparent.png"
            alt="HarSun Chocolates"
            className="w-full max-w-sm mx-auto h-auto object-contain drop-shadow-xl select-none brightness-110"
          />
        </div>

        {/* Closing Message */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            HarSun Chocolates. <br />
            <span className="apple-gold-gradient italic font-display text-4xl sm:text-6xl lg:text-7xl">
              Two Names. One Sweet Dream.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
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
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] hover:from-[#E5A853] hover:to-[#FFF0D4] text-[#120A05] font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4 text-[#120A05]" />
          </button>

          <button
            onClick={() => {
              soundManager.playSweetPop();
              onOpenGiftBuilder();
            }}
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/15 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#F5D394]" />
            <span>Build a Custom Gift Box</span>
          </button>
        </div>

        {/* VIP Tasting Club & Launch Updates */}
        <div className="pt-10 max-w-md mx-auto pointer-events-auto">
          <form
            onSubmit={handleSubscribe}
            className="apple-bento-card p-2 rounded-full flex items-center gap-2"
          >
            <div className="pl-4 text-neutral-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Join VIP Tasting Club (early releases)"
              disabled={subscribed}
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] text-[#120A05] text-xs font-semibold uppercase tracking-wider shrink-0 transition-all disabled:bg-green-600 disabled:text-white cursor-pointer"
            >
              {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-[#F5D394] font-semibold mt-2 animate-in fade-in">
              Welcome to the HarSun family! Sweet surprises are on the way.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
