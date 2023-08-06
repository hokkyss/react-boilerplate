import type { DependencyList } from "react";

import assign from "lodash/assign";
import { useMemo, useCallback as useReactCallback } from "react";

// Generalize all function types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

export type Callback<T extends Func> = T & { stable: true };

export function stableCallback<T extends Func>(callback: T): Callback<T> {
  return assign(callback, { stable: true } as const);
}

export default function useCallback<T extends Func>(
  callback: T,
  deps: DependencyList
): Callback<T> {
  const cachedCallback = useReactCallback(callback, deps);

  const memoedCallback = useMemo(
    () => assign(cachedCallback, { stable: true } as const),
    [cachedCallback]
  );

  return memoedCallback;
}
