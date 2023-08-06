import type { Callback } from "../useCallback/useCallback.hook";

import { useMemo, useState } from "react";

import useCallback from "../useCallback/useCallback.hook";

export type Queue<T> = {
  front: T;
  pop: Callback<() => void>;
  push: Callback<(item: T) => void>;
  size: number;
};

export default function useQueue<T>(): Queue<T> {
  const [state, setState] = useState<T[]>([]);

  const push = useCallback(
    (item: T) => setState((prev) => [...prev, item]),
    []
  );

  const pop = useCallback(() => setState(([, ...rest]) => rest), []);

  const front = useMemo(() => state[0], [state]);
  const size = useMemo(() => state.length, [state.length]);

  return { front, pop, push, size };
}
