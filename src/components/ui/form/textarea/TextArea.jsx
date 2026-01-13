import styles from './TextArea.module.css';

function TextArea({ id, value, onChange, placeholder = '', className = '', rows = 4 }) {
    return (
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.textarea} ${className}`}
            rows={rows}
        />
    );
}

export default TextArea;