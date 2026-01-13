// src/components/ui/button/Button.jsx
import React from 'react';
import styles from './Button.module.css';

/**
 * UI Primitive: Button
 * - Keeps styling consistent via variants/sizes
 * - Supports native button props
 * - Supports refs (useful for focus management)
 */
const Button = React.forwardRef(function Button(
  {
    children,
    className = '',
    variant = 'default',   // default | primary | danger | link
    size = 'md',           // sm | md | lg
    fullWidth = false,
    loading = false,
    disabled = false,
    type = 'button',       // safe default; prevents accidental form submit
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  const classes = [
    styles.button,
    styles[variant] || '',
    styles[size] || '',
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span className={styles.content}>{children}</span>
    </button>
  );
});

export default Button;
