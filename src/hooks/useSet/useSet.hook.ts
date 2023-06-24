import { useMemo, useState } from "react";
import useCallback from "../useCallback/useCallback.hook";

export default function useSet<T extends ComparablePrimitiveType>(
  initialState = new Set<T>()
) {
  const [state, setState] = useState(initialState);

  const add = useCallback(
    (item: T) =>
      setState((prev) => {
        const next = new Set(prev);

        next.add(item);

        return next;
      }),
    []
  );

  const remove = useCallback((item: T) => {
    setState((prev) => {
      const next = new Set(prev);
      next.delete(item);
      return next;
    });
  }, []);

  const has = useCallback((item: T) => state.has(item), [state]);

  const asArray = useCallback(() => Array.from(state), [state]);

  const clear = useCallback(() => setState(new Set<T>()), []);

  const reset = useCallback(
    () => setState(new Set(initialState)),
    [initialState]
  );

  const mutator = useMemo(
    () => ({
      add,
      remove,
      clear,
      reset,
    }),
    [add, clear, remove, reset]
  );

  const accessor = useMemo(
    () => ({
      has,
      asArray,
    }),
    [asArray, has]
  );

  return [state, mutator, accessor] as const;
}
