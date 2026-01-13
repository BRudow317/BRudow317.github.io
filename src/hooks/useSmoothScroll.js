// useSmoothScroll.js
import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const smoothScrollTo = useCallback((target, options = {}) => {
    const {
      align = 'bottom', // 'top', 'center', 'bottom'
      margin = 16,
      duration = 800,
      delay = 100,
    } = options;

    // Handle both ref objects and element selectors
    const element = target?.current || 
                    (typeof target === 'string' ? document.querySelector(target) : target);
    
    if (!element) return;

    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      let targetTop;

      // Calculate target position based on alignment
      switch (align) {
        case 'top':
          targetTop = window.scrollY + rect.top - margin;
          break;
        case 'center':
          targetTop = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
          break;
        case 'bottom':
        default:
          targetTop = window.scrollY + rect.bottom - window.innerHeight + margin;
          break;
      }

      const finalTarget = Math.max(0, targetTop);
      const startPosition = window.scrollY;
      const distance = finalTarget - startPosition;
      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }, delay);
  }, []);

  return smoothScrollTo;
};