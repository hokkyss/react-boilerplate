import {
  DependencyList,
  useMemo,
  useCallback as useReactCallback,
} from "react";

// Generalize all function types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

type StableCallback<T extends Func> = T & { memoized: false };
type MemoizedCallback<T extends Func> = T & { memoized: true };

export type Callback<T extends Func> = StableCallback<T> | MemoizedCallback<T>;

export function callback<T extends Func>(func: T): StableCallback<T> {
  return Object.assign(func, { memoized: false } as const);
}

export default function useCallback<T extends Func>(
  func: T,
  deps: DependencyList
): MemoizedCallback<T> {
  const cachedCallback = useReactCallback(func, deps);

  const memoedCallback = useMemo(
    () => Object.assign(cachedCallback, { memoized: true } as const),
    [cachedCallback]
  );

  return memoedCallback;
}
