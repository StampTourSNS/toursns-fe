'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Send } from 'lucide-react';

import type { PaperPlane as PaperPlaneType } from '../types';

import styles from './PaperPlane.module.css';

interface PaperPlaneProps {
  paperPlanes: PaperPlaneType[];
}

export function PaperPlane({ paperPlanes }: PaperPlaneProps) {
  return (
    <AnimatePresence>
      {paperPlanes.map((paperPlane) => (
        <motion.div
          key={paperPlane.id}
          className={`${styles.paperPlane} ${
            paperPlane.isExploding ? styles.exploding : ''
          }`}
          initial={{
            x: '20%',
            y: '100%',
            rotate: -45,
            scale: 0.5,
          }}
          animate={
            paperPlane.isExploding
              ? {
                  x: '20%',
                  y: '40%',
                  rotate: 0,
                  scale: [1, 1.5, 0],
                }
              : {
                  x: '20%',
                  y: '40%',
                  rotate: -45,
                  scale: 1,
                }
          }
          transition={
            paperPlane.isExploding
              ? {
                  duration: 1,
                  ease: 'easeOut',
                }
              : {
                  duration: 2,
                  ease: 'easeInOut',
                }
          }
          exit={{ opacity: 0 }}
        >
          <div className={styles.paperPlaneContent}>
            <Send size={34} color="#fff" />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
