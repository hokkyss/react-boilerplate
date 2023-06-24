/* eslint-disable @typescript-eslint/ban-types */
import {
  DependencyList,
  useMemo,
  useCallback as useReactCallback,
} from "react";

export type Callback<T extends Function> = T & { memo: true };

export default function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList
): Callback<T> {
  const cachedCallback = useReactCallback(callback, deps);

  const memoedCallback = useMemo(
    () => Object.assign(cachedCallback, { memo: true } as const),
    [cachedCallback]
  );

  return memoedCallback;
}
