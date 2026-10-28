import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { FestiveGift, FestiveParticles } from './DiwaliDecor';

interface Props { onExplore: () => void; onShareFeedback: () => void }

export function HeroSection({ onExplore, onShareFeedback }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const auraY = useTransform(scrollYProgress, [0, 1], [0, -54]);
  const enter = (delay: number, y = 24) => ({
    initial: reduced ? false as const : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0 } : { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={sectionRef} id="hero" className="theme-hero relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <FestiveParticles />
      <motion.div style={{ y: reduced ? 0 : auraY }} className="ambient-orb absolute right-[-10%] top-0 w-[550px] h-[550px] rounded-full bg-[#D49B44]/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12 relative">
        <div className="space-y-7">
          <motion.div {...enter(0.05, 14)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8692B]/25 bg-[#E9BB91]/20 text-[#874719] text-xs font-bold uppercase tracking-widest"><Sparkles className="w-4 h-4" /> A brand idea in the making</motion.div>
          <motion.p {...enter(0.12, 12)} className="diwali-hero-greeting">Celebrate the Festival of Lights with something sweet.</motion.p>
          <motion.h1 {...enter(0.18)} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] text-[#4A1702]">Something sweet is <span className="apple-gold-gradient italic">taking shape.</span></motion.h1>
          <motion.p {...enter(0.34)} className="text-lg text-[#624636] leading-relaxed max-w-xl">We are imagining HarSun Chocolates: thoughtful chocolate bars, handmade treats, and gifts inspired by family. We are still planning, and your honest opinion can help us decide what to make first.</motion.p>
          <motion.div {...enter(0.48)} className="flex flex-wrap gap-3">
            <motion.button whileHover={reduced ? undefined : { y: -3, scale: 1.02 }} whileTap={reduced ? undefined : { scale: 0.98 }} onClick={onShareFeedback} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#4A1702] text-[#FFF1E5] text-sm font-bold cursor-pointer hover:bg-[#713819] transition-all"><MessageCircle className="w-4 h-4" /> Share your opinion</motion.button>
            <motion.button whileHover={reduced ? undefined : { y: -3 }} whileTap={reduced ? undefined : { scale: 0.98 }} onClick={onExplore} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#4A1702]/25 bg-white/35 text-[#4A1702] text-sm font-semibold cursor-pointer hover:bg-white/65 transition-colors group">Explore our ideas <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></motion.button>
          </motion.div>
          <motion.p {...enter(0.6, 12)} className="text-xs text-[#765B4B]">Pre-launch concept · Products and details may change based on your feedback.</motion.p>
        </div>
        <motion.div initial={reduced ? false : { opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={reduced ? { duration: 0 } : { duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="relative max-w-xl mx-auto lg:mr-0">
          <div className="absolute inset-8 rounded-full bg-[#D49B44]/15 blur-3xl" />
          <motion.img style={{ y: reduced ? 0 : imageY }} src="/brand/editorial/hero-chocolate.jpg" alt="Artisan chocolate bars with blush wrapping and almonds in a HarSun concept still life" fetchPriority="high" decoding="async" width="1536" height="1024" className="relative w-full aspect-[3/2] rounded-3xl border border-[#4A1702]/15 shadow-2xl object-cover object-center" />
          <FestiveGift onShareFeedback={onShareFeedback} />
          <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={reduced ? { duration: 0 } : { duration: 0.65, delay: 0.85 }} className="absolute -bottom-5 left-5 right-5 sm:left-auto sm:right-[-16px] sm:w-60 rounded-2xl border border-white/15 bg-[#4A2818]/95 backdrop-blur-lg p-4 shadow-xl"><span className="text-[#F5D394] text-xs font-bold uppercase tracking-widest">Your voice matters</span><p className="text-sm text-neutral-200 mt-1">Help shape what HarSun becomes.</p></motion.div>
        </motion.div>
      </div>
    </section>
  );
}
