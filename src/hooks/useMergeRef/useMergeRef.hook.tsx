import every from "lodash/every";
import forEach from "lodash/forEach";
import isFunction from "lodash/isFunction";
import { useMemo, type ForwardedRef, type RefCallback } from "react";
import useCallback from "../useCallback/useCallback.hook";

export function resolveRef<T>(
  ref: ForwardedRef<T> | undefined,
  instance: T | null
) {
  if (!ref) return;

  if (isFunction(ref)) {
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
      forEach(refs, (ref) => resolveRef(ref, instance));
    },
    [refs]
  );

  const forkedRef = useMemo(
    () => (every(refs, (ref) => !ref) ? null : applyRef),
    [applyRef, refs]
  );

  return forkedRef;
}
