import styles from './ErrorText.module.css';
import typographyStyles from '../typography.module.css';

function ErrorText({ children, className = '' }) {
    return (
        <p className={`${styles.text} ${typographyStyles.text} ${className}`}>
            {children}
        </p>
    );
}
export default ErrorText;