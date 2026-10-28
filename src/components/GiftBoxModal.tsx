import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';

interface GiftBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomizer: () => void;
}

export const GiftBoxModal: React.FC<GiftBoxModalProps> = ({
  isOpen,
  onClose,
  onOpenCustomizer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#120D0A] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/15 flex flex-col relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 shadow-xs z-10 hover:scale-110 transition-transform cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Packaging Close-up visual */}
        <div className="relative aspect-16/9 bg-black overflow-hidden">
          <img
            src="/brand/product-gift-box.png"
            alt="HarSun Chocolates Signature Gift Box"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-transparent to-transparent flex items-end p-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] text-[#120A05] text-[10px] font-bold uppercase tracking-wider">
                Official Packaging Design
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                HarSun Signature Keepsake Box
              </h3>
            </div>
          </div>
        </div>

        {/* Details & Specs */}
        <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
          <p className="text-sm text-neutral-300 leading-relaxed">
            Constructed with heavy-weight recycled rigid board in muted blush pink, wrapped in fine
            vellum and sealed with an espresso grosgrain ribbon. The HarSun logo is hot-stamped in
            matte gold foil, honoring our tagline:{' '}
            <span className="italic font-serif-luxury font-bold text-[#F5D394]">
              “Two Names. One Sweet Dream.”
            </span>
          </p>

          <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D49B44]" />
              <span className="font-semibold text-white">Food-Grade Gold Foil Inserts</span>
              <span className="text-neutral-400">- Shields aroma and retains crisp temper</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D49B44]" />
              <span className="font-semibold text-white">Hand-Tied Satin Ribbon</span>
              <span className="text-neutral-400">- Reusable keepsake packaging</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D49B44]" />
              <span className="font-semibold text-white">Custom Gift Message Slip</span>
              <span className="text-neutral-400">- Gold embossed family seal</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenCustomizer();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] text-[#120A05] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#120A05]" />
              <span>Curate This Box</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
