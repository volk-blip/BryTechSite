import React, { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'action' | 'card' | 'input';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPointer = () => {
      const fine = window.matchMedia('(min-width: 701px) and (pointer: fine)').matches;
      setEnabled(fine);
      if (fine) {
        document.body.classList.add('custom-cursor-enabled');
      } else {
        document.body.classList.remove('custom-cursor-enabled');
      }
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => {
      window.removeEventListener('resize', checkPointer);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode('default');
        return;
      }

      if (target.closest('input, textarea')) {
        setMode('input');
      } else if (target.closest('button, a, select, [role="button"], [data-cursor="action"]')) {
        setMode('action');
      } else if (target.closest('[data-cursor="card"]')) {
        setMode('card');
      } else {
        setMode('default');
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
      rafId = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    rafId = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  const getRingStyle = (): React.CSSProperties => {
    const scale = isPressed ? 0.84 : 1;

    if (mode === 'input') {
      return {
        width: '4px',
        height: '28px',
        backgroundColor: '#15BCDF',
        border: 'none',
        clipPath: 'none',
        opacity: isVisible ? 0.9 : 0,
        transform: `scale(${scale})`,
      };
    }

    if (mode === 'action') {
      return {
        width: '52px',
        height: '52px',
        backgroundColor: 'rgba(21, 188, 223, 0.18)',
        border: '1.5px solid #15BCDF',
        clipPath:
          'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
        boxShadow: '0 0 20px rgba(21, 188, 223, 0.45)',
        opacity: isVisible ? 1 : 0,
        transform: `scale(${scale}) rotate(45deg)`,
      };
    }

    if (mode === 'card') {
      return {
        width: '62px',
        height: '44px',
        backgroundColor: 'rgba(21, 188, 223, 0.10)',
        border: '1.5px solid #0fa3c2',
        clipPath:
          'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
        opacity: isVisible ? 1 : 0,
        transform: `scale(${scale})`,
      };
    }

    return {
      width: '28px',
      height: '28px',
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(43, 48, 51, 0.55)',
      clipPath:
        'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
      opacity: isVisible ? 1 : 0,
      transform: `scale(${scale})`,
    };
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{ willChange: 'transform' }}
      >
        <div
          className="transition-all duration-150 ease-out flex items-center justify-center"
          style={getRingStyle()}
        >
          {mode === 'card' && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#111] bg-[#15BCDF] px-1.5 py-0.5">
              OPEN
            </span>
          )}
        </div>
      </div>

      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className="transition-all duration-100"
          style={{
            width: mode === 'action' ? '8px' : mode === 'input' ? '0px' : '6px',
            height: mode === 'action' ? '8px' : mode === 'input' ? '0px' : '6px',
            backgroundColor: '#15BCDF',
            boxShadow: '0 0 8px rgba(21, 188, 223, 0.9)',
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};
