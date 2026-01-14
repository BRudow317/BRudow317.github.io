/**
 * Toast.jsx
 * 
 * COMPONENT OVERVIEW:
 * A simple toast notification component for showing success/error/info messages.
 * Automatically dismisses after a timeout.
 * 
 * PATTERN: PORTALS
 * For a production app, you might render toasts using React Portals
 * to ensure they appear above all other content regardless of z-index.
 * 
 * import { createPortal } from 'react-dom';
 * return createPortal(<ToastContent />, document.body);
 * 
 * For this implementation, we use fixed positioning which works well
 * for most cases.
 */

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import styles from '../MessageCenterPage.module.css';

function getIconElement(type) {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} />;
    case 'error':
      return <XCircle size={20} />;
    case 'info':
    default:
      return <Info size={20} />;
  }
}

/**
 * Get the CSS class for a toast type.
 * @param {string} type - The toast type
 * @returns {string} The CSS module class name
 */
function getTypeClass(type) {
  switch (type) {
    case 'success':
      return styles.toastSuccess;
    case 'error':
      return styles.toastError;
    case 'info':
    default:
      return styles.toastInfo;
  }
}

/**
 * Toast - A notification component.
 * 
 * @param {Object} props
 * @param {string} props.message - The message to display
 * @param {string} props.type - Toast type: 'success', 'error', or 'info'
 * @param {number} props.duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 * @param {Function} props.onClose - Callback when toast is dismissed
 */
function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) {
  /**
   * EFFECT: Auto-dismiss after duration.
   * 
   * useEffect with a timer is a common pattern. Important notes:
   * - Return a cleanup function to clear the timer if component unmounts
   * - If duration is 0, don't set a timer
   * - Include duration and onClose in dependencies
   */
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      // Cleanup function - called when component unmounts or deps change
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeClass = getTypeClass(type);
  const iconElement = getIconElement(type);

  /**
   * INLINE STYLES:
   */
  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  };

  const closeButtonStyle = {
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: 4,
    marginLeft: 8,
    opacity: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className={`${styles.toast} ${typeClass}`} role="alert">
      <div style={contentStyle}>
        {iconElement}
        <span>{message}</span>
        {onClose && (
          <button
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Toast;

/**
 * HOOK PATTERN FOR TOAST MANAGEMENT:
 * 
 * For a more sophisticated implementation, you could create a custom hook
 * to manage toasts:
 * 
 * function useToast() {
 *   const [toasts, setToasts] = useState([]);
 *   
 *   const showToast = useCallback((message, type = 'info') => {
 *     const id = Date.now();
 *     setToasts(prev => [...prev, { id, message, type }]);
 *     return id;
 *   }, []);
 *   
 *   const hideToast = useCallback((id) => {
 *     setToasts(prev => prev.filter(t => t.id !== id));
 *   }, []);
 *   
 *   return { toasts, showToast, hideToast };
 * }
 * 
 * This would allow showing multiple toasts, stacking them, etc.
 */
