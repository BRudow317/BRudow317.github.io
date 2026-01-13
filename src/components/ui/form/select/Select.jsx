import styles from './Select.module.css';

function Select({ children, className = '' }) {
    return (
        <div className={styles.wrap}>
            <select className={`${styles.select} ${className}`}>
                {children}
            </select>
            <span className={styles.icon}>▼</span>
        </div>
    );
}

export default Select;