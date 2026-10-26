import React, { useState } from 'react';
import { MapPin, Mail, Phone, Sparkles, Send, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    soundManager.playChime(659.25, 0.4);
    setMsgSent(true);
  };

  const scrollTo = (id: string) => {
    soundManager.playSweetPop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#24120B] text-[#FFF8F0] pt-20 pb-12 relative overflow-hidden border-t-2 border-[#D49B44]/40 z-20 pointer-events-auto">
      {/* Background soft ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D49B44]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Tier: Contact & Inquiry Form + Brand Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-[#D49B44]/20">
          {/* Left: Brand Identity Summary */}
          <div className="space-y-6">
            <img
              src="/brand/harsun-logo-dark.png"
              alt="HarSun Chocolates"
              className="h-16 w-auto object-contain filter drop-shadow-md"
            />
            <p className="text-sm text-[#E0CEBE] leading-relaxed max-w-md">
              HarSun Chocolates represents the lifelong love and blessing of our parents,{' '}
              <strong className="text-white">Harish</strong> and{' '}
              <strong className="text-white">Sunita</strong>. We craft small-batch artisan chocolates,
              keepsake gift hampers, and everyday sweet moments with 100% pure cocoa butter.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#D49B44]">
              <Sparkles className="w-4 h-4" />
              <span className="font-serif-luxury italic text-sm">Two Names. One Sweet Dream.</span>
            </div>

            <div className="space-y-3 pt-2 text-xs text-[#E0CEBE]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#D49B44] shrink-0" />
                <span>HarSun Chocolate Studio &bull; Artisanal Confectionery Atelier</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D49B44] shrink-0" />
                <span>hello@harsunchocolates.com (Placeholder business contact)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D49B44] shrink-0" />
                <span>+91 98765 43210 (Customer Concierge)</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Inquiry / Gifting Request Form */}
          <div className="bg-[#2C1810]/80 p-8 rounded-3xl border border-[#D49B44]/30 shadow-xl space-y-4">
            <h3 className="text-xl font-bold font-display text-white">
              Connect with HarSun Atelier
            </h3>
            <p className="text-xs text-[#E0CEBE]">
              Planning a wedding, corporate celebration, custom hamper, or retail inquiry? Leave a
              message for our master chocolatiers.
            </p>

            {msgSent ? (
              <div className="p-4 rounded-xl bg-[#FAF4EE]/10 border border-[#D49B44]/40 text-center space-y-2 animate-in fade-in">
                <Check className="w-8 h-8 text-[#D49B44] mx-auto" />
                <h4 className="text-sm font-bold text-white">Inquiry Received with Love!</h4>
                <p className="text-xs text-[#E0CEBE]">
                  Our gifting team will connect with you shortly with tasting options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-[#D49B44]/30 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#D49B44]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-[#D49B44]/30 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#D49B44]"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your chocolate or gifting request..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-[#D49B44]/30 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#D49B44] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D49B44] to-[#F5D394] hover:from-[#E5A83B] hover:to-[#FFF0D4] text-[#2C1810] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Navigation Links & Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs text-[#E0CEBE]">
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-[#D49B44] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('discover')} className="hover:text-[#D49B44] transition-colors">
                  The Chocolate
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('craft')} className="hover:text-[#D49B44] transition-colors">
                  Cocoa Craft
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('handmade')} className="hover:text-[#D49B44] transition-colors">
                  Handmade Gifting
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('story')} className="hover:text-[#D49B44] transition-colors">
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider">Confections</h4>
            <ul className="space-y-2">
              <li>Everyday Chocolate Slabs</li>
              <li>70% Dark Chocolate Bar</li>
              <li>Velvet Milk Chocolate</li>
              <li>Roasted Almond Crunch</li>
              <li>Artisanal Truffles Assortment</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider">Gifting &amp; Events</h4>
            <ul className="space-y-2">
              <li>Blush Keepsake 6-Piece Box</li>
              <li>Signature 12-Piece Assortment</li>
              <li>Grand Celebration 24-Piece Hamper</li>
              <li>Weddings &amp; Corporate Favors</li>
              <li>Custom Ribbon Engraving</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider">Heritage &amp; Trust</h4>
            <ul className="space-y-2">
              <li>100% Pure Cocoa Butter</li>
              <li>Small-Batch Handmade Promise</li>
              <li>Zero Preservatives</li>
              <li>Allergen Notice (Contains Nuts/Dairy)</li>
              <li>Privacy Policy &amp; Terms</li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Socials */}
        <div className="pt-8 border-t border-[#D49B44]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A5A44]">
          <p>
            &copy; {new Date().getFullYear()} HarSun Chocolates. All rights reserved. Built with love in
            honor of Harish &amp; Sunita.
          </p>

          <div className="flex items-center gap-4 text-[#D49B44]">
            {/* Instagram SVG */}
            <a href="#" className="hover:text-white transition-colors" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook SVG */}
            <a href="#" className="hover:text-white transition-colors" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
