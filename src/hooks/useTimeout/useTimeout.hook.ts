import { useEffect } from "react";
import { Callback } from "../useCallback/useCallback.hook";

export default function useTimeout(callback: Callback<() => void>, ms: number) {
  useEffect(() => {
    const timeout = setTimeout(callback, ms);

    return () => clearTimeout(timeout);
  }, [callback, ms]);
}
