// src/components/compounds/cardgrid/CardGrid.jsx
import styles from './CardGrid.module.css';

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

/**
 * Compound: CardGrid
 * - Layout only (does not style Card)
 * - Optional header (title/subtitle)
 * - Responsive grid with sensible defaults
 */
function CardGrid({
  title,
  subtitle,
  children,
  className = '',
  gridClassName = '',
  minItemWidth = 220, // px
  gap = 16,          // px
  align = 'stretch', // stretch | start | center
  columns,           // number | undefined
  as: Comp = 'section',
  ...rest
}) {
  const CompTag = Comp;
  const gridStyle = {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
    ...(columns
      ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
      : { gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))` }),
  };

  return (
    <CompTag className={cx(styles.stack, className)} {...rest}>
      {(title || subtitle) && (
        <header className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
      )}

      <div className={cx(styles.grid, gridClassName)} style={gridStyle}>
        {children}
      </div>
    </CompTag>
  );
}

export default CardGrid;
