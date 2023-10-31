import type { Callback } from "../use-callback/use-callback.hook";

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
