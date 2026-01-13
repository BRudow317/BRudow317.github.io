import { useEffect, useMemo, useState } from 'react';
import styles from './ServicesCarousel.module.css';

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

// Added 2025-02-14: simple image carousel that rotates on a timer and can switch image sets.
function ServicesCarousel({
  images = [],
  imageSets = [],
  defaultSetId = null,
  intervalMs = 30000,
  autoPlay = true,
  showSetButtons = true,
  className = '',
  frameClassName = '',
  imageClassName = '',
  controlsClassName = '',
  buttonClassName = '',
  activeButtonClassName = '',
  altPrefix = 'Carousel image',
  onSetChange,
  ...rest
}) {
  const normalizedSets = useMemo(() => {
    if (Array.isArray(imageSets) && imageSets.length > 0) {
      return imageSets.map((set, setIndex) => ({
        id: set.id ?? `set-${setIndex}`,
        label: set.label ?? `Set ${setIndex + 1}`,
        images: (set.images ?? []).map((img, imgIndex) => {
          if (typeof img === 'string') {
            return { src: img, alt: `${altPrefix} ${imgIndex + 1}` };
          }
          return {
            src: img.src,
            alt: img.alt ?? `${altPrefix} ${imgIndex + 1}`,
          };
        }),
      }));
    }

    const singleImages = (images ?? []).map((img, idx) => {
      if (typeof img === 'string') {
        return { src: img, alt: `${altPrefix} ${idx + 1}` };
      }
      return { src: img.src, alt: img.alt ?? `${altPrefix} ${idx + 1}` };
    });

    return [
      {
        id: defaultSetId ?? 'default',
        label: 'Images',
        images: singleImages,
      },
    ];
  }, [altPrefix, defaultSetId, images, imageSets]);

  const initialSetIndex = useMemo(() => {
    if (!defaultSetId) return 0;
    const idx = normalizedSets.findIndex((set) => set.id === defaultSetId);
    return idx >= 0 ? idx : 0;
  }, [defaultSetId, normalizedSets]);

  const [activeSetIndex, setActiveSetIndex] = useState(initialSetIndex);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeSet = normalizedSets[activeSetIndex] ?? normalizedSets[0];
  const activeImages = activeSet?.images ?? [];
  const activeImage = activeImages[activeImageIndex] ?? null;

  useEffect(() => {
    if (!autoPlay || activeImages.length <= 1) return undefined;

    const timerId = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % activeImages.length);
    }, intervalMs);

    return () => clearInterval(timerId);
  }, [activeImages.length, autoPlay, intervalMs]);

  const handleSetChange = (index) => {
    setActiveSetIndex(index);
    setActiveImageIndex(0);
    if (onSetChange) {
      onSetChange(normalizedSets[index], index);
    }
  };

  const handleNextImage = () => {
    if (activeImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % activeImages.length);
  };

  return (
    <section className={cx(styles.root, className)} {...rest}>
      {showSetButtons && normalizedSets.length > 1 && (
        <div className={cx(styles.setControls, controlsClassName)}>
          {normalizedSets.map((set, idx) => (
            <button
              key={set.id}
              type="button"
              className={cx(
                styles.setButton,
                buttonClassName,
                idx === activeSetIndex && styles.setButtonActive,
                idx === activeSetIndex && activeButtonClassName,
              )}
              onClick={() => handleSetChange(idx)}
            >
              {set.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={cx(styles.frame, frameClassName)}
        onClick={handleNextImage}
        style={{ cursor: activeImages.length > 1 ? 'pointer' : 'default' }}
      >
        {activeImage ? (
          <img
            className={cx(styles.image, imageClassName)}
            src={activeImage.src}
            alt={activeImage.alt ?? ''}
            loading="lazy"
          />
        ) : (
          <div className={styles.emptyState}>No images available</div>
        )}
      </div>
    </section>
  );
}

export default ServicesCarousel;
