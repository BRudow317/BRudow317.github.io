import styles from './Toggle.module.css';

function Toggle({children}){
    return (
        <div className={styles.toggle}>
            {children}
        </div>
    );
}
export default Toggle;