import { useCallback, useState } from "react";
import usePromise from "~/hooks/use.hook";
import { randomNumber } from "~/utils/helper.util";

function useCounter() {
  const [counter, setCounter] = useState(0);

  const increase = useCallback(() => setCounter((prev) => prev + 1), []);
  const decrease = useCallback(() => setCounter((prev) => prev - 1), []);

  return { counter, increase, decrease };
}

export default function useHomeViewModel() {
  const { counter, increase, decrease } = useCounter();
  const random = usePromise(randomNumber, []);
  // use more hooks, and only use hooks

  return { counter, increase, decrease, random };
}
