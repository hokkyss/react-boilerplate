import { useState } from "react";
import { useColorScheme } from "~/components/contexts/Theme/Theme.context";
import useCallback from "~/hooks/useCallback/useCallback.hook";

function useCounter() {
  const [value, setValue] = useState(0);

  const increase = useCallback(() => setValue((prev) => prev + 1), []);
  const decrease = useCallback(() => setValue((prev) => prev - 1), []);

  return { value, increase, decrease };
}

export default function useHomeViewModel() {
  const counter = useCounter();
  const colorScheme = useColorScheme();
  // use more hooks, and only use hooks

  return { counter, colorScheme };
}
