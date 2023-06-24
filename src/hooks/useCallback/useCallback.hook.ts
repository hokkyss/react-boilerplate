/* eslint-disable @typescript-eslint/ban-types */
import {
  DependencyList,
  useMemo,
  useCallback as useReactCallback,
} from "react";

type Callback<T extends Function> = T & { __: true };

export default function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList
): Callback<T> {
  const cachedCallback = useReactCallback(callback, deps);

  const memoedCallback = useMemo(
    () => Object.assign(cachedCallback, { __: true } as const),
    [cachedCallback]
  );

  return memoedCallback;
}
