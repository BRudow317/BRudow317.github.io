import styles from './FormShell.module.css';
function FormShell({children}){
    return (
        <div className={styles.formShell}>
            {children}
        </div>
    );
}
export default FormShell;