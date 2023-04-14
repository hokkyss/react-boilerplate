import { useCallback, useState } from "react";

// create more hooks

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const increase = useCallback(() => setCounter((prev) => prev + 1), []);

  return { counter, increase };
};

export default function useHomeViewModel() {
  const { counter, increase } = useCounter();
  // use more hooks, and only use hooks

  return { counter, increase };
}
