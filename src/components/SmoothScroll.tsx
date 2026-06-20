'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Faster, snappier scroll responsiveness
        duration: 0.8,
      }}
    >
      {children}
    </ReactLenis>
  );
}
