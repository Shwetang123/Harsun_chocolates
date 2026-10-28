import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Sun, Shield, Gift } from 'lucide-react';
import { Reveal } from './Reveal';

export const SectionStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const auraY = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center pointer-events-none scroll-mt-20"
    >
      {/* Background warm glowing aura */}
      <motion.div style={{ y: reduced ? 0 : auraY }} className="ambient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#D49B44]/15 via-[#DE9AA2]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Story Container */}
      <div className="max-w-4xl mx-auto z-20 space-y-10 text-center">
        {/* Section Pill */}
        <Reveal direction="scale"><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-xs pointer-events-auto">
          <Heart className="w-3.5 h-3.5 text-[#DE9AA2] fill-[#DE9AA2]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#F5D394]">
            Our Story &bull; Two Names. One Sweet Dream.
          </span>
        </div></Reveal>

        {/* Headline */}
        <Reveal delay={0.08}><div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
            Our Story. <br />
            <span className="apple-gold-gradient italic font-display text-4xl sm:text-6xl lg:text-7xl">
              Honoring Harish &amp; Sunita.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-normal max-w-2xl mx-auto leading-relaxed">
            HarSun began as a son's wish to honour his parents, Harish and Sunita. Their names gave us
            the name, and their love gave us the reason to imagine a chocolate brand of our own.
          </p>
        </div></Reveal>

        <Reveal delay={0.1} className="pointer-events-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl aspect-[2/1]">
            <img src="/brand/editorial/story-family.jpg" alt="Two generations sharing a small chocolate gift, reflecting the family inspiration behind HarSun" loading="lazy" decoding="async" width="1672" height="941" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080605]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </Reveal>

        {/* The Name Connection Visual Board */}
        <div className="apple-bento-card p-8 sm:p-12 rounded-3xl relative overflow-hidden pointer-events-auto">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D49B44]/10 rounded-full blur-xl pointer-events-none" />

          {/* Interactive Names Equation */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] items-stretch gap-5 md:gap-6 relative">
            {/* Father: Harish */}
            <motion.div initial={reduced ? false : { opacity: 0, x: -36, rotateY: -7 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true, amount: 0.35 }} transition={reduced ? { duration: 0 } : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="min-w-0 h-full flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-[#4A2F20]/80 border border-white/10 hover:border-[#D49B44]/50 transition-all duration-300 group">
              <div className="w-12 h-12 shrink-0 rounded-full bg-white/10 text-[#F5D394] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <span className="block text-xs uppercase font-bold tracking-widest leading-relaxed text-neutral-400">
                Father's Blessing
              </span>
              <div className="flex items-baseline justify-center text-3xl leading-none font-bold font-display text-white">
                <span className="text-[#F5D394] bg-white/5 px-2 py-0.5 rounded-lg border border-white/10">
                  HAR
                </span>
                <span className="text-neutral-400 font-normal">ish</span>
              </div>
              <p className="max-w-xs text-xs text-neutral-300 leading-relaxed">
                The Har in HarSun comes from Harish, whose support and values are part of the idea behind this brand.
              </p>
            </motion.div>

            {/* Connecting Golden Line & Plus */}
            <motion.div initial={reduced ? false : { opacity: 0, scale: 0.65, rotate: -45 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, amount: 0.35 }} transition={reduced ? { duration: 0 } : { duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center justify-center gap-3 py-2 md:py-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D49B44] to-[#F5D394] text-[#120A05] flex items-center justify-center font-bold text-lg shadow-md">
                +
              </div>
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D49B44] to-transparent hidden md:block" />
              <span className="text-[11px] uppercase tracking-widest leading-relaxed font-semibold text-neutral-400 whitespace-nowrap">
                United as One
              </span>
            </motion.div>

            {/* Mother: Sunita */}
            <motion.div initial={reduced ? false : { opacity: 0, x: 36, rotateY: 7 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true, amount: 0.35 }} transition={reduced ? { duration: 0 } : { duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="min-w-0 h-full flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-[#4A2F20]/80 border border-white/10 hover:border-[#DE9AA2]/50 transition-all duration-300 group">
              <div className="w-12 h-12 shrink-0 rounded-full bg-white/10 text-[#DE9AA2] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sun className="w-5 h-5" />
              </div>
              <span className="block text-xs uppercase font-bold tracking-widest leading-relaxed text-neutral-400">
                Mother's Warmth
              </span>
              <div className="flex items-baseline justify-center text-3xl leading-none font-bold font-display text-white">
                <span className="text-[#DE9AA2] bg-white/5 px-2 py-0.5 rounded-lg border border-white/10">
                  SUN
                </span>
                <span className="text-neutral-400 font-normal">ita</span>
              </div>
              <p className="max-w-xs text-xs text-neutral-300 leading-relaxed">
                The Sun comes from Sunita, whose warmth and care inspire the feeling we hope to share.
              </p>
            </motion.div>
          </div>

          {/* Golden Synthesis Arrow & Result */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#D49B44]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#F5D394]">
                The Sweet Union
              </span>
              <Sparkles className="w-4 h-4 text-[#D49B44]" />
            </div>

            {/* Official HarSun Dark Logo Card */}
            <motion.div initial={reduced ? false : { opacity: 0, scale: 0.9, y: 16 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={reduced ? { duration: 0 } : { duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="p-4 rounded-2xl bg-[#F5D9C8] border border-[#F5D9C8]/70 shadow-2xl max-w-sm mx-auto hover:scale-105 transition-transform duration-300">
              <img
                src="/brand/harsun-logo-transparent.png"
                alt="HarSun Chocolates logo"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <p className="mt-4 text-xs sm:text-sm font-serif-luxury italic text-neutral-300 max-w-lg">
              HAR from Harish. SUN from Sunita. Together, they make HarSun: two names, one sweet dream.
            </p>
            <p className="mt-5 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              The idea grew from wanting to turn that personal tribute into something others could enjoy:
              chocolates for everyday moments and gifts that feel thoughtful. We have not launched yet.
              We are sharing the story now, listening to your ideas, and working out what HarSun should become.
            </p>
          </div>
        </div>

        {/* 4 Core Brand Pillars as displayed on the identity board */}
        <Reveal delay={0.1}><div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
          <div className="apple-bento-card p-4 rounded-2xl text-center space-y-1">
            <Heart className="w-5 h-5 text-[#DE9AA2] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Handmade Treats
            </h4>
            <p className="text-[11px] text-neutral-400">A collection we hope to make</p>
          </div>

          <div className="apple-bento-card p-4 rounded-2xl text-center space-y-1">
            <Gift className="w-5 h-5 text-[#D49B44] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Thoughtful Gift Boxes
            </h4>
            <p className="text-[11px] text-neutral-400">An idea for thoughtful giving</p>
          </div>

          <div className="apple-bento-card p-4 rounded-2xl text-center space-y-1">
            <Sparkles className="w-5 h-5 text-[#F5D394] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quality Ingredients
            </h4>
            <p className="text-[11px] text-neutral-400">A goal for our recipes</p>
          </div>

          <div className="apple-bento-card p-4 rounded-2xl text-center space-y-1">
            <Sun className="w-5 h-5 text-[#D49B44] mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Everyday Joy
            </h4>
            <p className="text-[11px] text-neutral-400">A sweet moment for more people</p>
          </div>
        </div></Reveal>
      </div>
    </section>
  );
};
