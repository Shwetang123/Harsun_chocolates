import { X, MessageCircle } from 'lucide-react';

export interface PreviewProductData { name: string; category: string; image: string; desc: string }
interface Props { product: PreviewProductData | null; onClose: () => void; onShareFeedback: () => void }

export function ProductPreviewModal({ product, onClose, onShareFeedback }: Props) {
  if (!product) return null;
  return (
    <div role="presentation" onMouseDown={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div role="dialog" aria-modal="true" aria-label={`${product.name} preview`} onMouseDown={e => e.stopPropagation()} className="bg-[#FAF4EE] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D49B44]/40 relative text-[#2C1810]">
        <button onClick={onClose} aria-label="Close preview" className="absolute top-4 right-4 p-2 rounded-full bg-white text-[#2C1810] shadow-md cursor-pointer"><X className="w-5 h-5" /></button>
        <img src={product.image} alt={product.name} decoding="async" className="w-full aspect-4/3 object-cover object-center" />
        <div className="p-7 space-y-4"><span className="text-xs uppercase tracking-widest font-bold text-[#9E6F22]">Pre-launch concept</span><h3 className="text-3xl font-bold">{product.name}</h3><p className="text-sm leading-relaxed text-[#583222]">{product.desc}</p><p className="text-xs text-[#8A5A44]">This is a planned collection. Products and details may change, and we are not taking orders yet.</p><button onClick={onShareFeedback} className="inline-flex items-center gap-2 rounded-full bg-[#2C1810] px-6 py-3 text-[#FAF4EE] text-sm font-semibold cursor-pointer"><MessageCircle className="w-4 h-4" /> Share your thoughts</button></div>
      </div>
    </div>
  );
}
