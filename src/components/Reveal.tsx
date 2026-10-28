import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  amount?: number;
}

export function Reveal({ children, className, direction = 'up', delay = 0, amount = 0.18 }: RevealProps) {
  const reduced = useReducedMotion();
  const distance = direction === 'left' ? -32 : direction === 'right' ? 32 : 28;
  const initial = reduced ? false : {
    opacity: 0,
    x: direction === 'left' || direction === 'right' ? distance : 0,
    y: direction === 'up' ? distance : 0,
    scale: direction === 'scale' ? 0.96 : 1,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={reduced ? { duration: 0 } : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
