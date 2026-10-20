import { useState, useEffect } from 'react';

export interface MousePosition {
  clientX: number;
  clientY: number;
  /** Normalized -1 to 1 across viewport width */
  normX: number;
  /** Normalized -1 to 1 across viewport height */
  normY: number;
  isTouch: boolean;
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    clientX: -1000,
    clientY: -1000,
    normX: 0,
    normY: 0,
    isTouch: false,
  });

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) {
      setPos((prev) => ({ ...prev, isTouch: true }));
      return;
    }

    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const updateMouse = () => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const normX = (latestX / w) * 2 - 1;
      const normY = (latestY / h) * 2 - 1;

      setPos({
        clientX: latestX,
        clientY: latestY,
        normX: Math.max(-1, Math.min(1, normX)),
        normY: Math.max(-1, Math.min(1, normY)),
        isTouch: false,
      });
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateMouse);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return pos;
}
