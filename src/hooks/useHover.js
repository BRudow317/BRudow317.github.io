import { useCallback, useEffect, useState } from "react";

/**
 * Track hover state for any element.
 * @example
 * const { ref, isHovered } = useHover();
 * return (
 *   <button ref={ref} className={isHovered ? styles.hovered : ""}>
 *     Hover me
 *   </button>
 * );
 */
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const [node, setNode] = useState(null);

  const ref = useCallback((element) => {
    if (!element) {
      setIsHovered(false);
    }
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node) return undefined;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    // Attach listeners to the current node so ref changes are handled safely.
    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [node]);

  return { ref, isHovered };
}
