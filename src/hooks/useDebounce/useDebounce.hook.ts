import { useState, useEffect } from "react";

/**
 * Similar to `useDeferredValue` hook. Except this one has a fixed delay
 * @see {@link https://react.dev/reference/react/useDeferredValue#:~:text=There%20is%20no%20fixed%20delay%20caused%20by%20useDeferredValue%20itself}
 */
export default function useDebouncee<T>(value: T, delay = 500) {
  const [val, setVal] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setVal(value), delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return val;
}
