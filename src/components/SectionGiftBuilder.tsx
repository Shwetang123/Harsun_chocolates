import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface SectionGiftBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onBoxComplete?: (boxSummary: { size: number; ribbon: string; pieces: string[]; note: string }) => void;
}

export const SectionGiftBuilder: React.FC<SectionGiftBuilderProps> = ({
  isOpen,
  onClose,
  onBoxComplete,
}) => {
  const [boxSize, setBoxSize] = useState<6 | 12 | 24>(12);
  const [ribbon, setRibbon] = useState<'espresso' | 'blush' | 'gold'>('espresso');
  const [selectedPieces, setSelectedPieces] = useState<string[]>([
    'Dark Velvet Ganache',
    'Golden Hazelnut Praline',
    'Ruby Raspberry Heart',
    'Sea-Salt Caramel Dome',
  ]);
  const [giftNote, setGiftNote] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const availableChocolates = [
    { id: 'dark-ganache', name: 'Dark Velvet Ganache', tag: '70% Dark' },
    { id: 'hazelnut-praline', name: 'Golden Hazelnut Praline', tag: 'Crunchy Nut' },
    { id: 'ruby-heart', name: 'Ruby Raspberry Heart', tag: 'Natural Ruby' },
    { id: 'caramel-dome', name: 'Sea-Salt Caramel Dome', tag: 'Amber Caramel' },
    { id: 'almond-bap', name: 'Roasted Almond Cluster', tag: 'California Almonds' },
    { id: 'white-vanilla', name: 'Bourbon Vanilla Swirl', tag: 'Creamy Silk' },
  ];

  const handleAddPiece = (name: string) => {
    if (selectedPieces.length >= boxSize) return;
    soundManager.playSweetPop();
    setSelectedPieces([...selectedPieces, name]);
  };

  const handleRemovePiece = (index: number) => {
    soundManager.playSweetPop();
    const updated = [...selectedPieces];
    updated.splice(index, 1);
    setSelectedPieces(updated);
  };

  const handleCompleteBox = () => {
    soundManager.playChime(659.25, 0.5); // E5 chime
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D49B44', '#E8B4B8', '#3D1A10', '#FAF4EE'],
    });
    setIsCompleted(true);
    if (onBoxComplete) {
      onBoxComplete({
        size: boxSize,
        ribbon,
        pieces: selectedPieces,
        note: giftNote,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#FAF4EE] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#D49B44]/40 flex flex-col relative text-[#2C1810]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-[#2C1810] shadow-xs border border-[#D49B44]/20 hover:scale-110 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#D49B44]/20 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B88029]">
            <Gift className="w-4 h-4 text-[#D49B44]" />
            <span>Interactive Gift Box Atelier</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#2C1810]">
            Curate Your Signature HarSun Box
          </h3>
          <p className="text-xs sm:text-sm text-[#8A5A44] font-serif-luxury italic">
            Select box capacity, choose a luxury satin ribbon, and hand-pick your favorite artisanal truffles.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Step 1: Select Box Capacity */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#583222] block">
              1. Choose Box Size
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 6, label: '6 Pieces', desc: 'Petite Gift Box' },
                { size: 12, label: '12 Pieces', desc: 'Signature Favorite' },
                { size: 24, label: '24 Pieces', desc: 'Grand Celebration' },
              ].map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => {
                    soundManager.playSweetPop();
                    setBoxSize(opt.size as 6 | 12 | 24);
                  }}
                  className={`p-3 sm:p-4 rounded-2xl text-left border transition-all ${
                    boxSize === opt.size
                      ? 'bg-[#2C1810] text-[#FFF8F0] border-[#D49B44] shadow-md ring-1 ring-[#D49B44]'
                      : 'bg-white hover:bg-[#FFFDFB] text-[#2C1810] border-[#D49B44]/20'
                  }`}
                >
                  <span className="block text-sm font-bold">{opt.label}</span>
                  <span
                    className={`block text-[11px] ${
                      boxSize === opt.size ? 'text-[#F5D394]' : 'text-[#8A5A44]'
                    }`}
                  >
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Ribbon Color */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#583222] block">
              2. Select Satin Ribbon Style
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'espresso', label: 'Classic Espresso', color: '#3D1A10' },
                { id: 'blush', label: 'Dusty Blush Silk', color: '#DE9AA2' },
                { id: 'gold', label: 'Royal Gold Satin', color: '#D49B44' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    soundManager.playSweetPop();
                    setRibbon(r.id as typeof ribbon);
                  }}
                  className={`p-3 rounded-2xl flex items-center gap-3 border transition-all ${
                    ribbon === r.id
                      ? 'bg-white border-[#D49B44] shadow-md ring-2 ring-[#D49B44]/30'
                      : 'bg-white/70 border-[#D49B44]/20'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shrink-0 shadow-xs border border-white"
                    style={{ backgroundColor: r.color }}
                  />
                  <span className="text-xs font-semibold text-[#2C1810]">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Pick Truffles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#583222]">
                3. Fill Box Assortment ({selectedPieces.length}/{boxSize} slots)
              </span>
              <span className="text-xs text-[#8A5A44] font-medium">
                {boxSize - selectedPieces.length} remaining
              </span>
            </div>

            {/* Currently Selected Tray */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[#D49B44]/25 min-h-[90px] flex flex-wrap gap-2 items-center">
              {selectedPieces.length === 0 ? (
                <p className="text-xs text-[#8A5A44] italic">
                  Tray is empty. Click chocolates below to add.
                </p>
              ) : (
                selectedPieces.map((p, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF4EE] border border-[#D49B44]/30 text-xs font-semibold text-[#2C1810] shadow-xs animate-in zoom-in-95 duration-150"
                  >
                    <span>{p}</span>
                    <button
                      onClick={() => handleRemovePiece(idx)}
                      className="text-[#8A5A44] hover:text-red-600 transition-colors"
                      title="Remove piece"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Chocolate Available to Add */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {availableChocolates.map((c) => (
                <button
                  key={c.id}
                  disabled={selectedPieces.length >= boxSize}
                  onClick={() => handleAddPiece(c.name)}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#FFFDFB] border border-[#D49B44]/20 hover:border-[#D49B44] text-left transition-all disabled:opacity-50 disabled:hover:border-[#D49B44]/20 flex items-center justify-between group"
                >
                  <div>
                    <span className="block text-xs font-bold text-[#2C1810] group-hover:text-[#D49B44] transition-colors">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-[#8A5A44]">{c.tag}</span>
                  </div>
                  <Plus className="w-4 h-4 text-[#D49B44] shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Handwritten Gift Card Note */}
          <div className="space-y-3 pt-2 border-t border-[#D49B44]/20">
            <span className="text-xs font-bold uppercase tracking-wider text-[#583222] block">
              4. Complimentary Gift Card Note
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Recipient Name (e.g., Mom &amp; Dad)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D49B44]/30 text-xs text-[#2C1810] placeholder-[#8A5A44]/60 focus:outline-none focus:ring-1 focus:ring-[#D49B44]"
              />
              <input
                type="text"
                placeholder="Personal note (e.g., Two Names. One Sweet Dream!)"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D49B44]/30 text-xs text-[#2C1810] placeholder-[#8A5A44]/60 focus:outline-none focus:ring-1 focus:ring-[#D49B44]"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer / Complete */}
        <div className="p-6 border-t border-[#D49B44]/20 bg-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8A5A44]">
            {isCompleted ? (
              <span className="text-green-700 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Box created and added to gift session!
              </span>
            ) : (
              <span>Handcrafted fresh on demand. Elegant keepsake packaging.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#D49B44]/30 text-xs font-semibold uppercase tracking-wider text-[#2C1810] hover:bg-white"
            >
              Close
            </button>
            <button
              onClick={handleCompleteBox}
              className="flex-1 sm:flex-initial px-7 py-2.5 rounded-full bg-gradient-to-r from-[#2C1810] to-[#4A2618] hover:from-[#3D2217] hover:to-[#5A3120] text-[#FFF8F0] text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#D49B44]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5D394]" />
              <span>Complete Gift Box</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
