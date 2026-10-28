import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { FestiveLights } from './DiwaliDecor';

const links = [
  { id: 'story', label: 'Our Story' },
  { id: 'vision', label: 'Vision & Plans' },
  { id: 'categories', label: 'Our Store' },
  { id: 'feedback', label: 'Reviews & Feedback' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#4A1702]/15 bg-[#F8E6D8]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(74,23,2,0.07)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
        <button onClick={() => go('hero')} aria-label="HarSun home" className="logo-festive-glow shrink-0 cursor-pointer">
          <img src="/brand/harsun-logo-transparent.png" alt="HarSun Chocolates" className="h-20 sm:h-[84px] w-auto object-contain" />
        </button>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
          {links.map(link => <button key={link.id} onClick={() => go(link.id)} className="nav-link text-xs uppercase tracking-widest font-semibold text-[#4A2718] hover:text-[#A95E1F] transition-colors cursor-pointer">{link.label}</button>)}
        </nav>
        <button onClick={() => go('feedback')} className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A1702] hover:bg-[#713819] hover:-translate-y-0.5 text-[#FFF1E5] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300">
          <MessageCircle className="w-4 h-4" /> Share your thoughts
        </button>
        <button onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} className="lg:hidden p-2 text-[#4A1702] cursor-pointer">{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{open && <motion.nav initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reduced ? undefined : { opacity: 0, height: 0 }} transition={{ duration: reduced ? 0 : 0.28 }} aria-label="Mobile navigation" className="lg:hidden overflow-hidden border-t border-[#4A1702]/10 px-6 py-5 flex flex-col gap-5 bg-[#F8E6D8]">{links.map(link => <button key={link.id} onClick={() => go(link.id)} className="text-left text-sm uppercase tracking-widest text-[#4A2718] cursor-pointer">{link.label}</button>)}</motion.nav>}</AnimatePresence>
      <FestiveLights />
      {!reduced && <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }} className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#D49B44] to-[#F5D394]" />}
    </header>
  );
}
