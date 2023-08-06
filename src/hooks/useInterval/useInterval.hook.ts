import type { Callback } from "../useCallback/useCallback.hook";

import { useEffect } from "react";

export default function useInterval(
  callback: Callback<() => void>,
  ms: number
) {
  useEffect(() => {
    const interval = setInterval(callback, ms);

    return () => clearInterval(interval);
  }, [callback, ms]);
}
