import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface PreviewProductData {
  name: string;
  category: string;
  image: string;
  desc: string;
}

interface ProductPreviewModalProps {
  product: PreviewProductData | null;
  onClose: () => void;
  onOpenGiftBuilder: () => void;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  product,
  onClose,
  onOpenGiftBuilder,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#FAF4EE] rounded-3xl max-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-[#D49B44]/40 flex flex-col relative text-[#2C1810]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-[#2C1810] hover:bg-white shadow-xs z-10 hover:scale-110 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-4/3 bg-[#2C1810] overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-[#2C1810]/80 backdrop-blur-md text-[#F5D394] text-[10px] font-bold uppercase tracking-wider border border-[#D49B44]/30">
              {product.category}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-2xl font-bold font-display text-[#2C1810]">{product.name}</h3>
            <p className="text-xs font-serif-luxury italic text-[#8A5A44]">
              Two Names. One Sweet Dream.
            </p>
          </div>

          <p className="text-sm text-[#583222] leading-relaxed">{product.desc}</p>

          <div className="p-3 rounded-xl bg-[#FAF4EE] border border-[#D49B44]/20 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#D49B44]" />
              <span className="text-[#583222]">Handcrafted with 100% pure cocoa butter</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#D49B44]" />
              <span className="text-[#583222]">Packed in signature protective foil / keepsake box</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#D49B44]" />
              <span className="text-[#583222]">Available in single slabs or gift hampers</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#D49B44]/30 text-xs font-semibold uppercase tracking-wider text-[#2C1810] hover:bg-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                soundManager.playSweetPop();
                onClose();
                onOpenGiftBuilder();
              }}
              className="px-6 py-2.5 rounded-full bg-[#2C1810] hover:bg-[#3D2217] text-[#FFF8F0] text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-2 border border-[#D49B44]/40"
            >
              <Sparkles className="w-4 h-4 text-[#F5D394]" />
              <span>Add to Custom Gift Box</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
