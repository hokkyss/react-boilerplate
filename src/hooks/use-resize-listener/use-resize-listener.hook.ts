import type { Callback } from "../use-callback/use-callback.hook";

import forEach from "lodash/forEach";
import { useEffect } from "react";

export default function useResizeListener(
  element: HTMLElement | null,
  callback: Callback<(entry: ResizeObserverEntry) => void>,
  options: ResizeObserverOptions = { box: "border-box" }
) {
  useEffect(() => {
    if (!element) return undefined;

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API}
     */
    const resizeObserver = new ResizeObserver((entries) => {
      forEach(entries, callback);
    });

    resizeObserver.observe(element, options);

    return () => {
      resizeObserver.disconnect();
    };
  }, [callback, element, options]);
}
