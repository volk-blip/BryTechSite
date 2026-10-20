import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (docHeight <= 0) {
        setProgress(0);
      } else {
        const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
        setProgress(ratio);
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#2b3033]/10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full w-full origin-left transition-transform duration-75 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, #0fa3c2 0%, #15BCDF 65%, #3fd0ef 100%)',
          boxShadow: '0 0 12px rgba(21, 188, 223, 0.85)',
        }}
      />
    </div>
  );
};
