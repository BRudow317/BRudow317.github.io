import styles from './Shell.module.css';

function Shell({ children }) {
    return (
        <div className={styles.shell}>
            {children}
        </div>
    );
}
export default Shell;