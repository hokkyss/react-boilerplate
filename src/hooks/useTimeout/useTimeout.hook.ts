import type { Callback } from "../useCallback/useCallback.hook";

import { useEffect } from "react";

export default function useTimeout(callback: Callback<() => void>, ms: number) {
  useEffect(() => {
    const timeout = setTimeout(callback, ms);

    return () => clearTimeout(timeout);
  }, [callback, ms]);
}
