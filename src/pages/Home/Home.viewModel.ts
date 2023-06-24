import { useState } from "react";
import useCallback from "~/hooks/useCallback/useCallback.hook";

function useCounter() {
  const [counter, setCounter] = useState(0);

  const increase = useCallback(() => setCounter((prev) => prev + 1), []);
  const decrease = useCallback(() => setCounter((prev) => prev - 1), []);

  return { counter, increase, decrease };
}

export default function useHomeViewModel() {
  const { counter, increase, decrease } = useCounter();
  // use more hooks, and only use hooks

  return { counter, increase, decrease };
}
