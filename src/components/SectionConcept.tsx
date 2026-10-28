import { Heart, Lightbulb, HandHeart, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';

export function SectionConcept() {
  return (
    <>
      <section id="vision" className="theme-vision px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left"><div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#80552B]">Our Vision &amp; Plans</span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">Chocolate made for <span className="apple-gold-gradient italic">everyday joy and meaningful moments.</span></h2>
            <p className="text-[#51453B] leading-relaxed">We want HarSun to feel personal, generous, and easy to share. Our hope is to create chocolates people look forward to enjoying themselves and giving to others.</p>
            <p className="text-[#51453B] leading-relaxed">Our vision is to offer enjoyable everyday chocolates alongside handmade treats and thoughtful gift boxes. We want good ingredients, appealing flavours, and beautiful presentation to feel welcoming rather than out of reach.</p>
            <p className="text-sm text-[#80552B]">This is our starting idea. We are listening before we launch.</p>
          </div></Reveal>
          <Reveal direction="right" delay={0.12}><div className="apple-bento-card rounded-3xl p-8 sm:p-10 grid gap-7">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-white/10"><img src="/brand/editorial/vision-craft.jpg" alt="Hands tempering dark chocolate as a visual for HarSun's planned small-batch craft" loading="lazy" decoding="async" width="1536" height="1024" className="w-full h-full object-cover object-center" /></div>
            <div className="flex gap-4"><Heart className="w-6 h-6 shrink-0 text-[#DE9AA2]" /><div><h3 className="font-bold text-white mb-1">Why we are starting</h3><p className="text-sm text-neutral-400 leading-relaxed">To turn a family inspired dream into something people genuinely enjoy giving and receiving.</p></div></div>
            <div className="h-px bg-white/10" />
            <div className="flex gap-4"><Lightbulb className="w-6 h-6 shrink-0 text-[#F5D394]" /><div><h3 className="font-bold text-white mb-1">What we hope to create</h3><p className="text-sm text-neutral-400 leading-relaxed">Chocolate bars, handmade confections, and gift boxes for small moments and big celebrations.</p></div></div>
            <div className="h-px bg-white/10" />
            <div className="flex gap-4"><MessageCircle className="w-6 h-6 shrink-0 text-[#D49B44]" /><div><h3 className="font-bold text-white mb-1">Why we need you</h3><p className="text-sm text-neutral-400 leading-relaxed">Your interest, doubts, and suggestions will help us choose the products and details worth developing.</p></div></div>
          </div></Reveal>
        </div>
      </section>
      <section id="plan" className="theme-plan px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="max-w-2xl mb-10"><span className="text-xs font-bold uppercase tracking-widest text-[#80552B]">How we plan to begin</span><h2 className="text-4xl sm:text-5xl font-bold mt-3">A small start, shaped together.</h2><p className="text-[#5D5044] mt-4">We are at the idea stage. Here is the simple path we hope to follow.</p></div></Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { number: '01', title: 'Listen first', text: 'Share the idea, show possible products, and learn what people would actually want.' },
              { number: '02', title: 'Make and refine', text: 'Develop a focused range in small batches, guided by feedback on flavours, quality, and gifting.' },
              { number: '03', title: 'Launch thoughtfully', text: 'Open only when the products and experience are ready. We are not taking orders yet.' },
            ].map((step, index) => <Reveal key={step.number} delay={index * 0.12} direction="scale" className="h-full"><div className="apple-bento-card rounded-3xl p-7 h-full text-[#F5EFEB]"><HandHeart className="w-6 h-6 text-[#D49B44] mb-6" /><span className="text-xs font-mono text-[#F5D394]">{step.number}</span><h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3><p className="text-sm text-neutral-400 leading-relaxed">{step.text}</p></div></Reveal>)}
          </div>
        </div>
      </section>
    </>
  );
}
