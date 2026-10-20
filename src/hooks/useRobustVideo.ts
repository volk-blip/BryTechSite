import { useEffect, useRef } from 'react';

/**
 * Hook to ensure robust autoplay across browsers:
 * - sets muted before every play attempt
 * - swallows play promise rejections
 * - retries every 1 second if paused
 * - retries on first document click or touchstart
 */
export function useRobustVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const attemptPlay = () => {
      const el = videoRef.current;
      if (!el) return;
      el.muted = true;
      const promise = el.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Swallow browser autoplay policy rejections
        });
      }
    };

    attemptPlay();

    const intervalId = window.setInterval(() => {
      const el = videoRef.current;
      if (el && el.paused) {
        attemptPlay();
      }
    }, 1000);

    const onUserGesture = () => {
      attemptPlay();
    };

    document.addEventListener('click', onUserGesture, { once: true });
    document.addEventListener('touchstart', onUserGesture, { once: true });

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('click', onUserGesture);
      document.removeEventListener('touchstart', onUserGesture);
    };
  }, []);

  return videoRef;
}
