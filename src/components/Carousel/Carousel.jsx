// src/components/compounds/carousel/Carousel.jsx
import React from 'react';
import styles from './Carousel.module.css';

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

/**
 * Compound: Carousel (agnostic)
 * - Takes any children (cards, images, etc.)
 * - Provides horizontal scroll + scroll-snap
 * - Optional arrows and programmatic scrolling
 */
function Carousel({
  title,
  subtitle,
  children,
  className = '',
  trackClassName = '',
  itemClassName = '',
  gap = 16,          // px or CSS string
  paddingX = 4,      // px or CSS string
  paddingY = 8,      // px or CSS string
  snap = 'mandatory',// mandatory | proximity | none
  showArrows = true,
  scrollBy = 'page', // page | item | number(px)
  as: Comp = 'section',
  ...rest
}) {
  const CompTag = Comp;
  const trackRef = React.useRef(null);

  const trackStyle = {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    padding: `${typeof paddingY === 'number' ? `${paddingY}px` : paddingY} ${
      typeof paddingX === 'number' ? `${paddingX}px` : paddingX
    }`,
    scrollSnapType: snap === 'none' ? 'none' : `x ${snap}`,
  };

  function scrollTrack(direction) {
    const el = trackRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;

    let delta = 0;

    if (typeof scrollBy === 'number') {
      delta = scrollBy;
    } else if (scrollBy === 'item') {
      const firstItem = el.querySelector('[data-carousel-item="true"]');
      const w = firstItem?.getBoundingClientRect().width ?? el.clientWidth * 0.8;
      delta = w + (typeof gap === 'number' ? gap : 16);
    } else {
      // page
      delta = el.clientWidth * 0.9;
    }

    const nextLeft = el.scrollLeft + (direction === 'next' ? delta : -delta);
    el.scrollTo({ left: nextLeft, behavior: 'smooth' });
  }

  const hasHeader = Boolean(title || subtitle);

  return (
    <CompTag className={cx(styles.stack, className)} {...rest}>
      {hasHeader && (
        <header className={styles.header}>
          <div className={styles.headerText}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          {showArrows && (
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Scroll left"
                onClick={() => scrollTrack('prev')}
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Scroll right"
                onClick={() => scrollTrack('next')}
              >
                ›
              </button>
            </div>
          )}
        </header>
      )}

      {!hasHeader && showArrows && (
        <div className={styles.controlsOnly}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll left"
            onClick={() => scrollTrack('prev')}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll right"
            onClick={() => scrollTrack('next')}
          >
            ›
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        className={cx(styles.carousel, trackClassName)}
        style={trackStyle}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={cx(styles.item, itemClassName)}
            data-carousel-item="true"
          >
            {child}
          </div>
        ))}
      </div>
    </CompTag>
  );
}

export default Carousel;
