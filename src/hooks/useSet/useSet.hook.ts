import { useMemo, useState } from "react";
import type { Callback } from "../useCallback/useCallback.hook";
import useCallback from "../useCallback/useCallback.hook";

type Mutator<T> = {
  add: Callback<(item: T) => void>;
  clear: Callback<() => void>;
  remove: Callback<(item: T) => void>;
  reset: Callback<() => void>;
};

type Accessor<T> = {
  asArray: Callback<() => T[]>;
  has: Callback<(item: T) => boolean>;
};

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

  const mutator = useMemo<Mutator<T>>(
    () => ({
      add,
      clear,
      remove,
      reset,
    }),
    [add, clear, remove, reset]
  );

  const accessor = useMemo<Accessor<T>>(
    () => ({
      asArray,
      has,
    }),
    [asArray, has]
  );

  const returnValue = useMemo<[Set<T>, Mutator<T>, Accessor<T>]>(
    () => [state, mutator, accessor],
    [state, mutator, accessor]
  );

  return returnValue;
}
