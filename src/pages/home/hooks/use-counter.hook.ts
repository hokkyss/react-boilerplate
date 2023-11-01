import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";

const counterAtom = atom(0);
const increaseCounterAtom = atom(null, (get, set) => {
  set(counterAtom, get(counterAtom) + 1);
});
const decreaseCounterAtom = atom(null, (get, set) => {
  set(counterAtom, get(counterAtom) - 1);
});

type Counter = [number, { decrease: () => void; increase: () => void }];

export default function useCounter(): Counter {
  const counter = useAtomValue(counterAtom);
  const increaseCounter = useSetAtom(increaseCounterAtom);
  const decreaseCounter = useSetAtom(decreaseCounterAtom);

  const actions = useMemo(
    () => ({ decrease: decreaseCounter, increase: increaseCounter }),
    [decreaseCounter, increaseCounter]
  );

  return [counter, actions];
}
