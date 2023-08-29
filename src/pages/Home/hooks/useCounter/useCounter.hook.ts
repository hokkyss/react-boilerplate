import { atom, useAtomValue, useSetAtom } from "jotai";

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

  return [counter, { decrease: decreaseCounter, increase: increaseCounter }];
}
