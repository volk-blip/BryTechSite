import React, { useRef, useState } from 'react';

interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  tiltIntensity?: number;
  spotlightColor?: string;
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children,
  className = '',
  style,
  onClick,
  tiltIntensity = 5,
  spotlightColor = 'rgba(21, 188, 223, 0.14)',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.innerWidth <= 700) return;

    const rect = el.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    const pctX = (localX / rect.width) * 2 - 1;
    const pctY = (localY / rect.height) * 2 - 1;

    const rotateY = pctX * tiltIntensity;
    const rotateX = -pctY * tiltIntensity;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(2px)`
    );
    setSpotlightPos({ x: localX, y: localY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-transform duration-150 ease-out ${className}`}
      style={{
        ...style,
        transform,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(420px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${spotlightColor}, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
