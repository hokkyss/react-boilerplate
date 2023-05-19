import { useEffect } from "react";

export default function useResizeListener(
  element: HTMLElement | null,
  callback: (entry: ResizeObserverEntry) => void,
  options: ResizeObserverOptions = { box: "border-box" }
) {
  useEffect(() => {
    if (!element) return undefined;

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API}
     */
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(callback);
    });

    resizeObserver.observe(element, options);

    return () => {
      resizeObserver.disconnect();
    };
  }, [callback, element, options]);
}
