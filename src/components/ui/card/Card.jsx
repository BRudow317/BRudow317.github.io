// src/components/ui/card/Card.jsx
import React from 'react';
import styles from './card.module.css';

/**
 * UI Primitive: Card
 * - Consistent surface styling
 * - Optional hover lift, square aspect, padding presets
 * - Can render as different elements via `as`
 */
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

const Card = React.forwardRef(function Card(
  {
    children,
    className = '',
    as: Comp = 'div',          // 'div' | 'section' | 'article' | etc.
    padding = 'md',            // none | md | lg
    square = false,            // 1:1 aspect ratio
    hover = 'lift',            // lift | none
    interactive = false,       // adds focus styles & role/tabIndex defaults when true
    role,
    tabIndex,
    ...rest
  },
  ref
) {
  const CompTag = Comp;
  const resolvedRole = role ?? (interactive ? 'button' : undefined);
  const resolvedTabIndex = tabIndex ?? (interactive ? 0 : undefined);

  const classes = cx(
    styles.card,
    padding === 'md' ? styles.padMd : '',
    padding === 'lg' ? styles.padLg : '',
    square ? styles.square : '',
    hover === 'none' ? styles.noHover : '',
    interactive ? styles.interactive : '',
    className
  );

  return (
    <CompTag
      ref={ref}
      className={classes}
      role={resolvedRole}
      tabIndex={resolvedTabIndex}
      {...rest}
    >
      {children}
    </CompTag>
  );
});

export default Card;
