import { ForwardedRef, RefCallback, useMemo } from "react";
import useCallback from "../useCallback/useCallback.hook";

export function resolveRef<T>(
  ref: ForwardedRef<T> | undefined,
  instance: T | null
) {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(instance);
  } else {
    ref.current = instance;
  }
}

export default function useMergeRef<T>(
  ...refs: (ForwardedRef<T> | undefined)[]
) {
  const applyRef = useCallback<RefCallback<T>>(
    (instance: T | null) => {
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }

        if (typeof ref === "function") {
          ref(instance);
        } else {
          ref.current = instance;
        }
      });
    },
    [refs]
  );

  const forkedRef = useMemo(
    () => (refs.every((ref) => !ref) ? null : applyRef),
    [applyRef, refs]
  );

  return forkedRef;
}
