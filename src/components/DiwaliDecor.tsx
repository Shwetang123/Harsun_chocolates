import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export function FestiveLights() {
  return <div className="diwali-light-string" aria-hidden="true">{Array.from({ length: 17 }, (_, index) => <span key={index} style={{ animationDelay: `${(index % 5) * -0.46}s` }} />)}</div>;
}

export function FestiveParticles() {
  return <div className="diwali-particles" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <span key={index} style={{ '--particle-index': index } as CSSProperties} />)}</div>;
}

export function FestiveFrame() {
  return <div className="diwali-frame" aria-hidden="true">
    <span className="diwali-rangoli" />
    <span className="diwali-garland diwali-garland-left" />
    <span className="diwali-garland diwali-garland-right" />
    <span className="diwali-diya diwali-diya-left"><span className="diwali-flame" /><span className="diwali-bowl" /></span>
    <span className="diwali-diya diwali-diya-right"><span className="diwali-flame" /><span className="diwali-bowl" /></span>
  </div>;
}

interface FestiveGiftProps { onShareFeedback: () => void }

export function FestiveGift({ onShareFeedback }: FestiveGiftProps) {
  const [opened, setOpened] = useState(false);
  const reduced = useReducedMotion();

  return <motion.div
    className="diwali-gift-wrap"
    initial={reduced ? false : { opacity: 0, y: -36, rotate: -8 }}
    animate={{ opacity: 1, y: 0, rotate: 0 }}
    transition={reduced ? { duration: 0 } : { duration: 0.75, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
  >
    <button type="button" className={`diwali-gift ${opened ? 'is-open' : ''}`} onClick={() => setOpened(value => !value)} aria-expanded={opened} aria-controls="diwali-surprise" aria-label={opened ? 'Close Diwali surprise' : 'Open a Diwali surprise'}>
      <span className="diwali-gift-glow" />
      <span className="diwali-gift-base"><span className="diwali-gift-ribbon-vertical" /><span className="diwali-gift-ribbon-horizontal" /></span>
      <span className="diwali-gift-lid"><span className="diwali-gift-lid-ribbon" /><span className="diwali-gift-bow diwali-gift-bow-left" /><span className="diwali-gift-bow diwali-gift-bow-right" /></span>
    </button>
    <span className="diwali-gift-hint">A little Diwali surprise</span>
    {opened && <div className="diwali-gift-burst" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <span key={index} style={{ '--spark-index': index } as CSSProperties} />)}</div>}
    <AnimatePresence>
      {opened && <motion.div id="diwali-surprise" className="diwali-surprise" role="region" aria-label="Diwali greeting" initial={reduced ? false : { opacity: 0, y: 12, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.18 }}>
        <button type="button" onClick={() => setOpened(false)} aria-label="Close Diwali greeting" className="diwali-surprise-close"><X className="h-4 w-4" /></button>
        <span className="diwali-surprise-eyebrow">A wish from HarSun</span>
        <strong>May your Diwali glow with sweet moments.</strong>
        <p>We are still dreaming up our first chocolates. Your ideas can help shape what we share when we launch.</p>
        <button type="button" onClick={() => { setOpened(false); onShareFeedback(); }} className="diwali-surprise-cta"><MessageCircle className="h-4 w-4" /> Share your wish</button>
      </motion.div>}
    </AnimatePresence>
  </motion.div>;
}
