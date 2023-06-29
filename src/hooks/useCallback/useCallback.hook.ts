/* eslint-disable @typescript-eslint/ban-types */
import {
  DependencyList,
  useMemo,
  useCallback as useReactCallback,
} from "react";

export type Callback<T extends Function> = T & { memoized: true };

export default function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList
): Callback<T> {
  const cachedCallback = useReactCallback(callback, deps);

  const memoedCallback = useMemo(
    () => Object.assign(cachedCallback, { memoized: true } as const),
    [cachedCallback]
  );

  return memoedCallback;
}
