import { useMemo, useState } from "react";
import useCallback from "../useCallback/useCallback.hook";

export default function useQueue<T>() {
  const [state, setState] = useState<T[]>([]);

  const push = useCallback(
    (item: T) => setState((prev) => [...prev, item]),
    []
  );

  const pop = useCallback(() => setState(([, ...rest]) => rest), []);

  const front = useMemo(() => state[0], [state]);
  const size = useMemo(() => state.length, [state.length]);

  return { push, pop, front, size };
}
