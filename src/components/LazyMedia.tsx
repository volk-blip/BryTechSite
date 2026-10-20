import React, { useState, useEffect, useRef } from 'react';

interface UseIntersectionLazyOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Custom hook using IntersectionObserver to lazy-load images, videos, and heavy visual assets
 * when they approach the viewport, while also tracking live visibility for playback optimization.
 */
export function useIntersectionLazy({
  rootMargin = '260px 0px',
  threshold = 0.05,
  triggerOnce = false,
}: UseIntersectionLazyOptions = {}) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEntered(true);
            setIsIntersecting(true);
            if (triggerOnce) {
              observer.unobserve(node);
            }
          } else {
            setIsIntersecting(false);
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, triggerOnce]);

  return { elementRef, hasEntered, isIntersecting };
}

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  wrapperClassName?: string;
  rootMargin?: string;
}

/**
 * Lazy-loaded Image component powered by IntersectionObserver with smooth fade-in
 * and subtle Champagne Gold / Cyan architectural skeleton placeholder.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  rootMargin = '280px 0px',
  style,
  ...rest
}) => {
  const { elementRef, hasEntered } = useIntersectionLazy({
    rootMargin,
    threshold: 0.01,
    triggerOnce: true,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${wrapperClassName}`}
    >
      {/* Subtle architectural shimmer placeholder before image finishes loading */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1a1c1e]/40 flex items-center justify-center"
        >
          <div className="w-8 h-0.5 bg-[#D4AF37]/50 animate-pulse" />
        </div>
      )}

      {hasEntered && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={style}
          {...rest}
        />
      )}
    </div>
  );
};

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  rootMargin?: string;
}

/**
 * Lazy-loaded Video component powered by IntersectionObserver.
 * Only attaches video source when near the viewport, automatically plays when visible,
 * pauses when scrolled far off-screen, and retains robust retry logic for autoplay policies.
 */
export const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  className = '',
  wrapperClassName = '',
  wrapperStyle,
  rootMargin = '320px 0px',
  style,
  ...rest
}) => {
  const { elementRef, hasEntered, isIntersecting } = useIntersectionLazy({
    rootMargin,
    threshold: 0.02,
    triggerOnce: false,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasEntered) return;

    const tryPlay = () => {
      if (!video || !isIntersecting) return;
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Swallow autoplay rejections cleanly
        });
      }
    };

    if (isIntersecting) {
      tryPlay();
    } else {
      video.pause();
    }

    const intervalId = window.setInterval(() => {
      if (isIntersecting && video.paused) {
        tryPlay();
      }
    }, 1200);

    const handleUserGesture = () => {
      if (isIntersecting && video.paused) {
        tryPlay();
      }
    };

    document.addEventListener('click', handleUserGesture, { passive: true });
    document.addEventListener('touchstart', handleUserGesture, { passive: true });

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('click', handleUserGesture);
      document.removeEventListener('touchstart', handleUserGesture);
    };
  }, [hasEntered, isIntersecting]);

  return (
    <div
      ref={elementRef}
      className={wrapperClassName}
      style={wrapperStyle}
    >
      <video
        ref={videoRef}
        src={hasEntered ? src : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload={hasEntered ? 'auto' : 'none'}
        onLoadedData={() => setIsReady(true)}
        className={`transition-opacity duration-500 ease-out ${
          isReady ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={style}
        {...rest}
      />
    </div>
  );
};
