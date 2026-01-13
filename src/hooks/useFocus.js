import { useCallback, useEffect, useState } from "react";

/**
 * @Description Track focus state for any element.
 * 
 * @returns {Object} - An object containing:
 *   - ref: A callback ref to attach to the target element.
 *   - isFocused: A boolean indicating whether the element is focused.
 * 
 * @example
 * const { ref, isFocused } = useFocus();
 * return (
 *   <div ref={ref} tabIndex={0} className={isFocused ? styles.focused : ""}>
 *     Focus me
 *   </div>
 * );
 */
export function useFocus() {
  const [isFocused, setIsFocused] = useState(false);
  const [node, setNode] = useState(null);

  const ref = useCallback((element) => {
    if (!element) {
      setIsFocused(false);
    }
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node) return undefined;

    const onFocusIn = () => setIsFocused(true);
    const onFocusOut = () => setIsFocused(false);

    // Use focusin/focusout to track focus within the element.
    node.addEventListener("focusin", onFocusIn);
    node.addEventListener("focusout", onFocusOut);

    return () => {
      node.removeEventListener("focusin", onFocusIn);
      node.removeEventListener("focusout", onFocusOut);
    };
  }, [node]);

  return { ref, isFocused };
}
