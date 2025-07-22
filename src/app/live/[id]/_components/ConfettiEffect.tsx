'use client';

import Confetti from 'react-confetti';

import { Message } from '../types';

interface ConfettiEffectProps {
  messages: Message[];
}

export function ConfettiEffect({ messages }: ConfettiEffectProps) {
  const confettiMessages = messages.filter((msg) => msg.showConfetti);

  return (
    <>
      {confettiMessages.map((msg) => (
        <Confetti
          key={`confetti-${msg.id}-${msg.confettiKey}`}
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          wind={0.05}
          colors={[
            '#ff6f61',
            '#ffd93d',
            '#6bcf7f',
            '#4d9de0',
            '#e15554',
            '#ff8a80',
            '#ffb74d',
            '#ffeb3b',
            '#9c27b0',
            '#00bcd4',
          ]}
          confettiSource={{
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.4,
            w: 20,
            h: 20,
          }}
        />
      ))}
    </>
  );
}
