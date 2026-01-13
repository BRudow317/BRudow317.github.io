// src/components/ui/typography/label/Label.jsx
import styles from './label.module.css';
import typographyStyles from '../typography.module.css';

function Label({
  htmlFor,
  children,
  className = '',
  required = false,
  ...rest
}) {
  const classes = [
    styles.label,
    typographyStyles.label, // if this exists; remove if it doesn't
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {children}
      {required ? <span aria-hidden="true">*</span> : null}
    </label>
  );
}

export default Label;
